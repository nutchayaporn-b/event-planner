import React from 'react'
import {Pressable, View} from 'react-native'

export interface IconButtonProps {
  onPress: any;
  icon: React.ReactNode;
  buttonClassName?: string;
}

export default function IconButton({onPress, icon, buttonClassName} : IconButtonProps) {
  return (
    <View className={buttonClassName}>
      <Pressable onPress={onPress}>
        {icon}
      </Pressable>
    </View>
  )
}
