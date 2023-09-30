import { useContext } from 'react'
import { MapContext } from '../contexts/mapContext'

export const useMap = () => useContext(MapContext)
