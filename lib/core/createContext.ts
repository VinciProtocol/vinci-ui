import { createContext as c } from 'react'

/**
 * 泛型约束获取注入令牌
 *
 * @export
 * @template T
 * @param {(...args: any[]) => T} func
 * @param {(T | undefined)} [initialValue=undefined]
 * @returns
 */
export function createContext<T>(func: (...args: any[]) => T, initialValue: T | undefined = undefined) {
  return c(initialValue as T)
}
