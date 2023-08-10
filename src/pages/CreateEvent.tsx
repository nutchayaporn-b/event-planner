import React from 'react'
import {View, Text, Pressable} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconButton from '../components/IconButton'
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import {RadioButton} from 'react-native-paper'
import { EventType } from '../models/eventModel';
import TextFieldLabel from '../components/TextFieldLabel';
import FormLabel from '../components/FormLabel';
import { DatePickerModal } from 'react-native-paper-dates';
import { EvilIcons } from '@expo/vector-icons';
import BasicButton from '../components/BasicButton';

export default function CreateEvent() {

  const navigation = useNavigation();

  const [typeOfEvent, setTypeOfEvent] = React.useState<EventType>('Regular');
  const [eventName, setEventName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false);
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  const [location, setLocation] = React.useState('');

  const handleGoNext = () => {
    console.log(
      typeOfEvent,
      eventName,
      date,
      location
    )
  }

  return (
    <SafeAreaView className='flex-1 justify-center items-center mt-10 px-8'>
      <IconButton
          onPress={() => navigation.goBack()}
          icon={<AntDesign name="left" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-2 left-8"
        />
      <Text className='text-3xl text-primary-100'>Create Event</Text>
      <View className='h-8'></View>
      <Text className='text-xl text-primary-100 self-start font-semibold'>Type of event</Text>
      <View className='flex flex-row items-center self-start mt-4'>
        <RadioButton
          value={"Regular"}
          status={typeOfEvent === "Regular" ? 'checked' : 'unchecked'}
          onPress={() => setTypeOfEvent('Regular')}
        />
        <Text className='text-primary-200 text-[18px]'>Regular Event</Text>
        <RadioButton
          value={"Private"}
          status={typeOfEvent === "Private" ? 'checked' : 'unchecked'}
          onPress={() => setTypeOfEvent('Private')}
        />
        <Text className='text-primary-200 text-[18px]'>Private Event</Text>
      </View>
      <View className='self-start flex w-full mt-4'>
        <FormLabel
          label='Event Name'
          placeholder=''
          value={eventName}
          setValue={(text: any) => setEventName(text)}
          fullWidth
        />
      </View>
      <View className='self-start flex w-full mt-4'>
        <FormLabel
          label='Description'
          placeholder=''
          value={description}
          setValue={(text: any) => setDescription(text)}
          fullWidth
        />
      </View>
      <View className="flex mt-4 self-start">
          <Pressable onPress={() => setOpen(true)}>
            <TextFieldLabel
              label="Event Date"
              value={new Date(date!)?.toDateString()}
              setValue={setDate}
              isEdit={false}
            />
          </Pressable>
          <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
      </View>
      <View className='flex mt-4 self-start mb-6'>
        <Text className='text-primary-200 text-[18px] mb-2'>Location</Text>
        <Pressable className='flex flex-row' onPress={() => console.log('Open map')}>
          <EvilIcons name="location" size={24} color="black" />
          <Text>{location ? location : "Find location on Maps"}</Text>
        </Pressable>
      </View>
      <BasicButton textClassName='text-white' buttonClassName='px-16 py-2 bg-primary-800 rounded-3xl' onClick={() => handleGoNext()}>Next</BasicButton>
    </SafeAreaView>
  )
}
