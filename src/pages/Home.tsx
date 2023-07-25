import React from 'react'
import { Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';


export default function Home() {

  const {user} = useAuth();

  return (
    <View>
      <Text className='text-3xl text-purple-700'>{user?.email}</Text>
    </View>
  )
}
