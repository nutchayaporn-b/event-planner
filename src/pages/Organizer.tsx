import React from 'react'
import {View, Text, FlatList, ScrollView} from 'react-native'
import EventCard from '../components/EventCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddEventCard from '../components/AddEventCard'
import { useAuth } from '../contexts/AuthContext'

export default function Organizer() {

  const {user} = useAuth();
  console.log(user)
  return (
    <SafeAreaView>
      <ScrollView className='flex py-4' contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}>
        <Text>{user?.email}</Text>
        <AddEventCard/>
      </ScrollView>
    </SafeAreaView>
  )
}
