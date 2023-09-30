import { useContext } from 'react'
import { LoaderContext } from '../contexts/loaderContext'

export const useLoader = () => useContext(LoaderContext)
