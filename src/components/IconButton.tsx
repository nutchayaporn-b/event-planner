import React from 'react'
import {Pressable} from 'react-native'

export interface IconButtonProps {
  onPress: any;
  icon: React.ReactNode;
  buttonClassName: string;
}

export default function IconButton({onPress, icon} : IconButtonProps) {
  return (
    <Pressable onPress={onPress}>
      {icon}
    </Pressable>
  )
}
