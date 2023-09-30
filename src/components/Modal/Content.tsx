import { type ReactNode } from 'react'
import { Box } from '@mui/material'

interface ContentProps {
  children: ReactNode
}

export function Content(props: ContentProps) {
  return <Box {...props} />
}
