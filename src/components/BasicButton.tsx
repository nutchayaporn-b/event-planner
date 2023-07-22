import React from 'react'
import {Pressable, Text} from 'react-native'

export interface BasicButtonProps {
  buttonClassName?: string;
  textClassName?: string;
  onClick?: () => void;
  children: React.ReactNode
}

export default function BasicButton({buttonClassName, textClassName, onClick, children} : BasicButtonProps) {
  return (
    <Pressable className={buttonClassName ? buttonClassName : ""} onPress={onClick}>
      <Text className={textClassName ? textClassName : ""}>{children}</Text>
    </Pressable>
  )
}
