import { useEffect, useState } from 'react'

const positionDefault = {
  lat: -1.345,
  lng: -48.4219
}
export const useGeolocation = () => {
  const [position, setPosition] = useState<any>(null)

  useEffect(() => {
    // Verifique se o navegador suporta geolocalização
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        err => {
          console.log(err.message)
        }
      )
      return
    } 

    setPosition(positionDefault)    
  }, [])

  return { position }
}
