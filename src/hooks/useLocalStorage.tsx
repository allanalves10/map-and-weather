import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const getStoredValue = (): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error getting "${key}" from localStorage: ${error}`)
      return initialValue as T
    }
  }

  const [storedValue, setStoredValue] = useState<T>(getStoredValue)

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting "${key}" in localStorage: ${error}`)
    }
  }

  return [storedValue, setValue]
}
