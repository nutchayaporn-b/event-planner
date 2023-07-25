import React from 'react'
import {View, Text, FlatList, ScrollView} from 'react-native'
import EventCard from '../components/EventCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddEventCard from '../components/AddEventCard'

export default function Organizer() {

  return (
    <SafeAreaView>
      <ScrollView className='flex py-4' contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}>
        <AddEventCard/>
      </ScrollView>
    </SafeAreaView>
  )
}
