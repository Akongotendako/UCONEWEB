import { Text } from '@chakra-ui/react'
import React from 'react'

const Description = ({children, color}) => {
  return (
    <Text color={color} textStyle="lg">{children}</Text>
  )
}

export default Description