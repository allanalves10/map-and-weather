import { createContext, useCallback, useState } from 'react'
import qs from 'qs'
import { api } from '../services/api'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useLoader } from '../hooks/useLoader'

import { LocationTypes } from '../types/LocationTypes'

interface MapProviderProps {
  children: React.ReactNode
}

type LatLngData = {
  lat: number | undefined
  lng: number | undefined
}

type MapData = {
  data: any
  favorites: any[]
  getDataWather: (latLng: LatLngData) => Promise<void>
  onFav: (fav: LocationTypes) => void
  currentSelection: any
  onSelection: (fav: any) => void
  onDeleteFav: any
}

export const MapContext = createContext({} as MapData)

export function MapProvider({ children }: MapProviderProps) {
  const [data, setData] = useState()
  const [favoritesStorage, setFavoritesStorage] =
    useLocalStorage<any>('favorites')
  const [favorites, setFavorites] = useState<any[]>(() => {
    return favoritesStorage ? favoritesStorage : []
  })
  const [currentSelection, setCurrentSelection] = useState<LocationTypes>()
  const { toggleLoading } = useLoader()

  const getDataWather = useCallback(async (latLng: LatLngData) => {
    try {
      toggleLoading(true)
      const res = await api.get('/data/3.0/onecall', {
        params: {
          lat: latLng.lat,
          lon: latLng.lng,
          exclude: ['minutely', 'hourly', 'daily'],
          units: 'metric',
          lang: 'pt_br',
          appid: import.meta.env.VITE_KEY_WEATHER_MAP
        },
        paramsSerializer: params =>
          qs.stringify(params, { arrayFormat: 'comma' })
      })

      setData(res.data.current)
    } catch (err) {
      console.error(err)
    } finally {
      toggleLoading(false)
    }
  }, [])

  const addFavorites = useCallback((fav: LocationTypes) => {
    setFavorites(prevState => {
      const favState = [...prevState, fav]
      setFavoritesStorage(favState)
      return favState
    })
  }, [])

  const deleteFavorites = useCallback((fav: LocationTypes) => {
    setFavorites(prevState => {
      const arrFiltered = prevState.filter(i => i.address !== fav.address)
      setFavoritesStorage(arrFiltered)
      return arrFiltered
    })
  }, [])

  const updateCurrentSelection = useCallback((value: LocationTypes) => {
    setCurrentSelection(value)
  }, [])

  return (
    <MapContext.Provider
      value={{
        data,
        favorites,
        getDataWather,
        onFav: addFavorites,
        onDeleteFav: deleteFavorites,
        currentSelection,
        onSelection: updateCurrentSelection
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
