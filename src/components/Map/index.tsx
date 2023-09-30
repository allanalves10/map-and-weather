import { memo, useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

import { useGeolocation } from '../../hooks/useGeolocation'
import { useMap } from '../../hooks/useMap'

import { PlacesAutocomplete } from './AutoComplete'
import InfoMapModal from '../InfoMapModal'

import './styles.css'

function Map() {
  const [openModal, setOpenModal] = useState(false)
  const { currentSelection, favorites, getDataWather, onSelection } = useMap()
  const { position } = useGeolocation()

  const containerStyle = {
    width: '100%',
    height: '800px'
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDhpsujj1PJAP94ceIltKr2qLonruPjdEQ',
    libraries: ['places']
  })

  const handleOpenModal = (
    event: google.maps.MapMouseEvent,
    currentSelection: any
  ) => {
    const { latLng } = event
    getDataWather({ lat: latLng?.lat(), lng: latLng?.lng() })
    onSelection(currentSelection)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '2rem 0' }}>
      {openModal && (
        <InfoMapModal open={openModal} onClose={handleCloseModal} />
      )}
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
                  onClick={event => handleOpenModal(event, currentSelection)}
                />
              )}

              {favorites?.map(favorite => (
                <Marker
                  position={{ ...favorite }}
                  onClick={event => handleOpenModal(event, favorite)}
                />
              ))}
            </GoogleMap>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default memo(Map)
