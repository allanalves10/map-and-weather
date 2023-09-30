import { Box, Button, Typography } from '@mui/material'

import { useMap } from './hooks/useMap'

import Map from './components/Map'

export function App() {
  const { favorites, onDeleteFav } = useMap()

  const handleDeleteFav = (a: any) => () => {
    onDeleteFav(a)
  }

  return (
    <>
      <h1>BitXxxxx</h1>

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
