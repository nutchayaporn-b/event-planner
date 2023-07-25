import React from 'react'
import {View, Text} from 'react-native'
import { EventModel } from '../models/eventModel'
import { Ionicons } from '@expo/vector-icons';

export interface EventCardProps {
  event: EventModel
}

export default function EventCard({event} : EventCardProps) {

  return (
    <View>
      <Text>EVENT</Text>
    </View>
  )
}
