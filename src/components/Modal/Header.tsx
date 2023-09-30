import { type ReactNode } from 'react'
import { Box, Button } from '@mui/material'

interface HeaderProps {
  children: ReactNode
  onClose: () => void
}

export function Header(props: HeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      {...props}
    >
      {props.children}
      <Button onClick={props.onClose}>X</Button>
    </Box>
  )
}
