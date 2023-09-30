import { Box, CircularProgress } from '@mui/material'
import { createContext, ReactNode, useCallback, useState } from 'react'

interface LoadProviderProps {
  children: ReactNode
}

interface LoadContextType {
  isLoading: boolean
  toggleLoading: (loading: boolean) => void
}

export const LoaderContext = createContext({} as LoadContextType)

export function LoaderProvider({ children }: LoadProviderProps) {
  const [isLoading, setIsLoading] = useState(false)

  const toggleLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        toggleLoading
      }}
    >
      {children}
    </LoaderContext.Provider>
  )
}
