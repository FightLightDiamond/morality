import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
 import type {RootState, AppDispatch} from "./store"

/**
 * Giống như helper
 */

/**
 * Dispatch function
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

/**
 * Lấy giá trị
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector