import React, { useEffect, useState } from 'react'
import {View, Text, Image} from 'react-native'
import { EventModel } from '../models/eventModel'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { EvilIcons } from '@expo/vector-icons';
import * as Location from 'expo-location'

export interface EventCardProps {
  event: EventModel
}

export default function EventCard({event} : EventCardProps) {

  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let position = (await Location.reverseGeocodeAsync({
        latitude: event.location?.latitude as number,
        longitude: event.location?.longitude as number,
      }))[0];
      setLocation(position.city + ", " + position.district + ", " + position.name)
    })();
  }, []);

  return (
    <View className='flex w-[95%] items-center border-b-2 py-4 border-primary-800 border-solid'>
      {event.image && 
        <Image
          source={{uri: event.image}}
          className='w-[300px] h-[300px] object-cover'
        />
      }
      <View className='flex w-4/5'>
        <Text className='text-primary-800 mt-4 text-xl font-semibold'>{event.name}</Text>
        <Text className='text-primary-100 mt-2 text-lg mb-1'>{event.description}</Text>
        <Text className='text-primary-100 text-lg mb-1'>{moment(event.date?.toDate()).format('MMMM Do YYYY')}</Text>
        <View className='flex flex-row items-center'>
          <EvilIcons name="location" size={32} color="black" className='mr-2' />
          <Text className='text-primary-100 text-[14px'>{location}</Text>
        </View>
      </View>
    </View>
  )
}
