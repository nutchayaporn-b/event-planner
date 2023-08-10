import React from 'react'
import {View, Text} from 'react-native'
import BasicButton from '../components/BasicButton'
import { useNavigation } from '@react-navigation/native'

export default function Home() {

  const navigation = useNavigation()

  return (
    <View className='flex-1 justify-center items-center flex-row'>
      <BasicButton buttonClassName='flex py-6 items-center bg-primary-800 w-1/3' textClassName='text-white text-xl' onClick={() => navigation.navigate("Guest")}>
        Guest
      </BasicButton>
      <View className='w-8'></View>
      <BasicButton buttonClassName='flex py-6 items-center bg-primary-800 w-1/3' textClassName='text-white text-xl' onClick={() => navigation.navigate("Organizer")}>
        Organizer
      </BasicButton>
      <BasicButton buttonClassName='flex py-6 items-center bg-primary-800 w-1/3' textClassName='text-white text-xl' onClick={() => navigation.navigate("Donate")}>
        Donate
      </BasicButton>
    </View>
  )
}
