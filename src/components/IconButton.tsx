import React from 'react'
import {Pressable} from 'react-native'

export interface IconButtonProps {
  onPress: any;
  icon: React.ReactNode
}

export default function IconButton({onPress, icon} : IconButtonProps) {
  return (
    <Pressable onPress={onPress}>
      {icon}
    </Pressable>
  )
}
