import type { AsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { useLatest } from '@vinci-protocol/hooks'
import { useObjectMemo } from '@vinci-protocol/hooks'
import { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store'
import { isEqual, get } from 'lodash'
import { safeGet } from 'utils/get'

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
    actions: { setStatus: setStatusAction, setData },
    reducer,
  } = createSlice({
    name: path,
    initialState: createInitialState(),
    reducers: {
      setStatus(state, action: PayloadAction<REQUEST_STATUS>) {
        state.status = action.payload
      },
      setData(state, action: PayloadAction<SliceState['data']>) {
        state.data = action.payload
      },
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

  const useStatus = () => {
    const status = useSelector(selectStatus)
    const dispatch = useAppDispatch()
    const statusRef = useLatest(status)
    const setStatus = useCallback(
      (status: REQUEST_STATUS) => {
        dispatch(setStatusAction(status))
        statusRef.current = status
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dispatch]
    )
    const getStatus = useCallback(() => {
      return statusRef.current
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
      setStatus,
      getStatus,
    }
  }

  const usePolling = () => {
    const dispatch = useAppDispatch()
    const { setStatus, getStatus } = useStatus()
    const abortFnRef = useRef<() => void>()
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const propsRef = useRef({} as any)
    const run = useCallback(
      (props: ThunkArg, ms = 5000) => {
        propsRef.current = { ms, props }
        const status = getStatus()
        if (status !== REQUEST_STATUS.ready) return Promise.reject({ name: 'RunningError', message: 'Running' })
        setStatus(REQUEST_STATUS.polling)

        const fn = () => {
          const promise = dispatch(request(props))
          abortFnRef.current = () => promise.abort()
          return promise.then((action: any) => {
            if (action.error?.name === 'AbortError') return
            timerRef.current = setTimeout(() => fn(), ms)
          })
        }

        fn()

        return Promise.resolve()
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dispatch]
    )

    const stop = useCallback(() => {
      const status = getStatus()
      if (status !== REQUEST_STATUS.polling) return

      setStatus(REQUEST_STATUS.ready)
      if (abortFnRef.current) abortFnRef.current()
      clearTimeout(timerRef.current)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const restart = useCallback((props?: ThunkArg, ms?: number) => {
      const status = getStatus()
      if (status !== REQUEST_STATUS.polling) return
      stop()
      run(props || propsRef.current.props, ms || propsRef.current.ms || 5000)
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
    const { setStatus, getStatus } = useStatus()
    const dispatch = useAppDispatch()
    const abortFnRef = useRef<() => void>()

    const run = useCallback(
      (props: ThunkArg) => {
        const status = getStatus()
        if (status !== REQUEST_STATUS.ready) return Promise.reject({ name: 'RunningError', message: 'Running' })
        setStatus(REQUEST_STATUS.single)
        const promise = dispatch(request(props))
        abortFnRef.current = () => promise.abort()
        return promise
          .then((action: any) => {
            if (action.error) return Promise.reject(action)
            return safeGet(() => action.payload.data || action.payload)
          })
          .finally(() => {
            setStatus(REQUEST_STATUS.ready)
          })
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dispatch]
    )

    const stop = useCallback(() => {
      const status = getStatus()
      if (status !== REQUEST_STATUS.single) return

      setStatus(REQUEST_STATUS.ready)
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
    const dispatch = useAppDispatch()
    const polling = usePolling()
    const single = useSingle()
    const clearData: () => void = useCallback(() => {
      dispatch(setData(undefined))
    }, [dispatch])

    const useAutoPolling = useCallback(
      (query: ThunkArg, isStop: (query: ThunkArg) => boolean, ms: number, delay = 500) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (isStop(query)) return
          const timer = setTimeout(() => {
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
      clearData,
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
