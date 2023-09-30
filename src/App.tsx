import { Box, Button, Typography } from '@mui/material'

import { useMap } from './hooks/useMap'

import Map from './components/Map'
import Logo from './assets/logo_branca.png'

export function App() {
  const { favorites, onDeleteFav } = useMap()

  const handleDeleteFav = (a: any) => {
    onDeleteFav(a)
  }

  return (
    <Box sx={{ padding: '0.5rem', margin: '0', background: 'gray', height: '1rem' }}>
      <img src={Logo} style={{ height: '1rem' }} alt="Logo branca Bitx" />
      <Map />
      <Box sx={{ margin: '2rem 0', paddingBottom: '2rem' }}>
        <Typography variant="h5">Meus Favoritos</Typography>
        {favorites.length > 0 &&
          favorites.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '1rem',
              }}
            >
              <Typography>{item.address}</Typography>
              <Button type='button' variant="outlined" onClick={() => handleDeleteFav(item)}>
                Remover
              </Button>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
