import { Box } from '@chakra-ui/react'
import React from 'react'

const CardContainer = ({children}) => {
  return (
    <Box borderColor="#FFF" borderWidth="1px" rounded="md" p="5">
        {children}
    </Box>
  )
}

export default CardContainer