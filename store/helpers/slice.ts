import type { AsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { useLatest } from 'app/hooks/useLatest'
import { useObjectMemo } from 'app/hooks/useValues'
import { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store'
import { isEqual, get } from 'lodash'

export interface RequestSliceState<DATA = any, ERROR = any> {
  data: DATA
  error: ERROR
  loading: boolean
  status: REQUEST_STATUS
}

export const createRequestSliceState =
  <DATA = any, ERROR = any>(data: DATA = undefined, error: ERROR = undefined) =>
  () => ({
    data,
    error,
    loading: false,
    status: REQUEST_STATUS.ready,
  })

export enum REQUEST_STATUS {
  ready = 'ready',
  polling = 'polling',
  single = 'single',
}

export const createRequestSlice = <SliceState extends RequestSliceState, Returned, ThunkArg>(
  path: string,
  createInitialState: () => SliceState,
  request: AsyncThunk<Returned, ThunkArg, {}>
) => {
  const {
    actions: { setStatus },
    reducer,
  } = createSlice({
    name: path,
    initialState: createInitialState(),
    reducers: {
      setStatus(state, action: PayloadAction<REQUEST_STATUS>) {
        state.status = action.payload
      },
      // setData(state, action: PayloadAction<SliceState['data']>) {
      //   state.data = action.payload
      // },
    },
    extraReducers: (builder) => {
      builder
        .addCase(request.pending, (state) => {
          state.loading = true
        })
        .addCase(request.fulfilled, (state, action) => {
          state.loading = false
          if (!isEqual(state.data, action.payload)) {
            state.data = action.payload
          }
          state.error = undefined
        })
        .addCase(request.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload || action.error
        })
    },
  })

  const select = (state: any): SliceState => get(state, path)
  const selectStatus = (state: any): REQUEST_STATUS => select(state).status
  const selectData = (state: any): SliceState['data'] => select(state).data

  const usePolling = () => {
    const status = useSelector(selectStatus)
    const dispatch = useAppDispatch()
    const abortFnRef = useRef<() => void>()
    const statusRef = useLatest(status)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const run = useCallback(
      (props: ThunkArg, ms = 5000) => {
        const status = statusRef.current
        if (status !== REQUEST_STATUS.ready) return

        dispatch(setStatus(REQUEST_STATUS.polling))
        const fn = () => {
          const promise = dispatch(request(props))
          abortFnRef.current = () => promise.abort()
          return promise.then((action: any) => {
            if (action.error?.name === 'AbortError') return
            timerRef.current = setTimeout(() => fn(), ms)
          })
        }

        fn()
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dispatch]
    )

    const stop = useCallback(() => {
      const status = statusRef.current
      if (status !== REQUEST_STATUS.polling) return

      dispatch(setStatus(REQUEST_STATUS.ready))
      if (abortFnRef.current) abortFnRef.current()
      clearTimeout(timerRef.current)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const restart = useCallback((props: ThunkArg) => {
      const status = statusRef.current
      if (status !== REQUEST_STATUS.polling) return
      stop()
      run(props)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const returnValue = useObjectMemo({
      run,
      stop,
      restart,
    })

    // useWhyDidYouUpdate('usePolling', returnValue)
    return returnValue
  }

  const useSingle = () => {
    const status = useSelector(selectStatus)
    const dispatch = useAppDispatch()
    const abortFnRef = useRef<() => void>()
    const statusRef = useLatest(status)

    const run = useCallback(
      (props: ThunkArg) => {
        const status = statusRef.current
        if (status !== REQUEST_STATUS.ready) return Promise.reject({ name: 'RunningError', message: 'Running' })
        dispatch(setStatus(REQUEST_STATUS.single))
        const promise = dispatch(request(props))
        abortFnRef.current = () => promise.abort()
        return promise
          .then((action: any) => {
            if (action.error) return Promise.reject(action)
            return action.data
          })
          .finally(() => {
            dispatch(setStatus(REQUEST_STATUS.ready))
          })
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dispatch]
    )

    const stop = useCallback(() => {
      const status = statusRef.current
      if (status !== REQUEST_STATUS.single) return

      dispatch(setStatus(REQUEST_STATUS.ready))
      if (abortFnRef.current) abortFnRef.current()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const returnValue = useObjectMemo({
      run,
      stop,
    })

    // useWhyDidYouUpdate('useSingle', returnValue)
    return returnValue
  }

  const useRequestController = () => {
    const polling = usePolling()
    const single = useSingle()

    const useAutoPolling = useCallback(
      (query: ThunkArg, DoNotPolling: (query: ThunkArg) => boolean, ms: number, delay = 500) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (DoNotPolling(query)) return
          let timer = setTimeout(() => {
            polling.run(query, ms)
          }, delay)
          return () => {
            clearTimeout(timer)
            polling.stop()
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [query])
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )

    const returnValue = useObjectMemo({
      polling,
      single,
      usePolling: useAutoPolling,
    })
    return returnValue
  }

  return {
    reducer,
    select,
    selectData,
    useRequestController,
  }
}
