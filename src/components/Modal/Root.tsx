import { Modal as ModalMui, Box } from '@mui/material'

export function Root(props: any) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24
  }

  return (
    <ModalMui
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...props}
    >
      <Box sx={style}>{props.children}</Box>
    </ModalMui>
  )
}
