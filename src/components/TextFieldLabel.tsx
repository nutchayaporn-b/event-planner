import React from 'react'
import { Text, View, TextInput } from 'react-native'

export interface TextFieldLabelProps {
  label?: string;
  placeholder?: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>
  isEdit?: boolean
  multiline?: boolean
}

export default function TextFieldLabel({label, placeholder = '', setValue, value, isEdit = true, multiline=false}: TextFieldLabelProps) {
  return (
    <View className='flex'>
      {label && <Text className='mb-2 text-primary-100 font-semibold text-lg'>{label}</Text>}
      <TextInput
        editable={isEdit}
        value={value}
        multiline={multiline}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        placeholderTextColor={'#9E9A96'}
        className='border-none outline-none py-1 border-b-2 border-solid border-black text-black'
      />
    </View>
  )
}
