import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../reducers'

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector