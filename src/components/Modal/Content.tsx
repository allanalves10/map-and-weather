import { type ReactNode } from 'react'
import { Box, BoxProps } from '@mui/material'

interface ContentProps extends BoxProps {
  children: ReactNode
}

export function Content(props: ContentProps) {
  return <Box {...props} />
}
