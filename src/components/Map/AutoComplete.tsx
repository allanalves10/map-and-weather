import { Autocomplete, TextField } from '@mui/material'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'

import { useMap } from '../../hooks/useMap'

export const PlacesAutocomplete = () => {
  const { onSelection } = useMap()
  const {
    // ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      language: 'pt'
    }
  })

  const handleSelect = async (_: any, address: any) => {
    try {
      setValue(address)
      clearSuggestions()
      const [results] = await getGeocode({ address })
      const { lat, lng } = getLatLng(results)
      onSelection({ lat, lng, address })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{
        width: 300,
        position: 'absolute',
        top: '12px',
        zIndex: 1,
        left: 'calc(50% - 150px)',
        background: '#fff',
        border: 'none',
        borderRadius: '2px',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px',
        '& fieldset': { border: 'none' }
      }}
      filterOptions={x => x}
      options={
        status === 'OK' ? data.map(({ description }) => description) : []
      }
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="Sem endereço"
      onChange={handleSelect}
      onInputChange={(_, newInputValue) => {
        setValue(newInputValue)
      }}
      renderInput={params => (
        <TextField {...params} label="Pesquisar um endereço" fullWidth />
      )}
    />
  )
}
