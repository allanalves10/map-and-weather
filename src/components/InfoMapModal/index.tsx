import { memo, useCallback, useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { useMap } from '../../hooks/useMap'

import * as Modal from '../Modal'

interface InfoMapModalProps {
  open: boolean
  onClose: () => void
}

function InfoMapModal(props: InfoMapModalProps) {
  const { data, favorites, currentSelection, onFav, onDeleteFav } = useMap()
  const [isActiveFav, setIsActiveFav] = useState(false)

  const handleFavorites = useCallback(() => {
    console.log('currentSelection')
    console.log(currentSelection)
    onFav(currentSelection)
  }, [])

  useEffect(() => {
    console.log({ favorites, currentSelection, data })
    // if ()
  }, [])

  return (
    <Modal.Root {...props}>
      <Modal.Header
        onClose={props.onClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#1f5c8b',
          padding: '24px 0 0 24px'
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ color: '#fafcff' }} />
            <Typography sx={{ color: '#fafcff' }}>
              {currentSelection?.address?.toUpperCase()}
            </Typography>
          </Box>
          <Button onClick={handleFavorites}>
            <FavoriteIcon sx={{ color: '#ec4741' }} />
          </Button>
        </Box>
      </Modal.Header>
      <Modal.Content sx={{ background: '#1d4277', padding: '24px 24px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: '#fafcff' }}>Sexta-feira</Typography>
            <Typography sx={{ color: '#fafcff' }}>
              Umidade: {data?.humidity}%
              <Typography sx={{ color: '#fafcff' }}>
                Vento: {Math.round(data?.wind_speed)} km/h
              </Typography>
            </Typography>
            <Typography
              sx={{ color: '#fafcff', fontSize: '3rem', fontWeight: 'bold' }}
            >
              {Math.round(data?.temp)}&#176;
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {!!data && (
              <>
                <img
                  src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
                />
                <Typography sx={{ color: '#fafcff' }}>
                  {data?.weather[0]?.description?.toUpperCase()}
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Modal.Content>
    </Modal.Root>
  )
}

export default memo(InfoMapModal)
