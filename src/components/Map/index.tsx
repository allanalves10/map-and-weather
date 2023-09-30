import { memo, useEffect, useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

import { useGeolocation } from '../../hooks/useGeolocation'
import { useMap } from '../../hooks/useMap'

import { PlacesAutocomplete } from './AutoComplete'
import InfoMapModal from '../InfoMapModal'

import './styles.css'

function Map() {
  const [openModal, setOpenModal] = useState(false)
  const { currentSelection, favorites, getDataWather } = useMap()
  const { position } = useGeolocation()

  const containerStyle = {
    width: '100%',
    height: '800px'
  }

  useEffect(() => {
    console.log('favorites')
    console.log(favorites)
  }, [favorites])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDhpsujj1PJAP94ceIltKr2qLonruPjdEQ',
    libraries: ['places']
  })

  const handleOpenModal = (event: google.maps.MapMouseEvent, currentSelection: any) => {
    console.log('currentSelection')
    console.log(currentSelection)
    console.log('event')
    console.log(event)
    const { latLng } = event
    console.log(latLng)
    getDataWather({ lat: latLng?.lat(), lng: latLng?.lng() })
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {openModal && (
        <InfoMapModal open={openModal} onClose={handleCloseModal} />
      )}
      <h2
        style={{
          fontWeight: 'bold',
          fontSize: '1.75rem',
          marginBottom: '1rem'
        }}
      >
        Mapa de Serviços
      </h2>
      <div style={{ position: 'relative', maxWidth: '1124px' }}>
        {isLoaded ? (
          <>
            <PlacesAutocomplete />

            <GoogleMap
              mapContainerStyle={containerStyle}
              center={position}
              zoom={10}
            >
              {currentSelection !== null && (
                <Marker
                  position={currentSelection}
                  onClick={(event) => handleOpenModal(event, currentSelection)}
                />
              )}

              {favorites?.map(favorite => (
                <Marker position={{ ...favorite }} onClick={(event) => handleOpenModal(event, favorite)} />
              ))}
            </GoogleMap>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default memo(Map)
