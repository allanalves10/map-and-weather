import { Box, Button, Typography } from '@mui/material'

import { useMap } from './hooks/useMap'

import Map from './components/Map'
import Logo from './assets/logo_branca.png'

export function App() {
  const { favorites, onDeleteFav } = useMap()

  const handleDeleteFav = (a: any) => () => {
    onDeleteFav(a)
  }

  return (
    <>
      <img style={{ padding: '0.5rem', background: 'gray', height: '1rem' }} src={Logo} alt="Logo branca Bitx" />

      {!!favorites.length && (
        <>
          <Typography>Meus Favoritos</Typography>
          {favorites?.map(item => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>{item?.address}</Typography>
              <Button onClick={handleDeleteFav(item)}>remover</Button>
            </Box>
          ))}
        </>
      )}

      <Map />
    </>
  )
}
