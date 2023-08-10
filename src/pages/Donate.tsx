import React from 'react'
import {View, Text, Pressable} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconButton from '../components/IconButton'
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import FormLabel from '../components/FormLabel';
import BasicButton from '../components/BasicButton';

export default function Donate() {
    const navigation = useNavigation();

    const [accountName, setAccountName] = React.useState('');
    const [name, setName] = React.useState('');
    const [bank, setBank] = React.useState('');
    
    const handleGoNext = () => {
        console.log(
          accountName,
          name,
          bank
        )
      }

    return (
<SafeAreaView className='flex-1 justify-center items-center mt-10 px-8'>
      <IconButton
          onPress={() => navigation.goBack()}
          icon={<AntDesign name="left" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-2 left-8"
        />
        <Text className='text-3xl text-primary-800'>july</Text>
        <Text className='text-3xl text-primary-100'>Donate</Text>
        <View className='self-start flex w-full mt-4'>
        <FormLabel
          label='Account Name:'
          placeholder=''
          value={accountName}
          setValue={(text: any) => setAccountName(text)}
          fullWidth
        />
      </View>
      <View className='self-start flex w-full mt-4'>
        <FormLabel
          label='Name:'
          placeholder=''
          value={name}
          setValue={(text: any) => setName(text)}
          fullWidth
        />
      </View>
      <View className='self-start flex w-full mt-4'>
        <FormLabel
          label='Bank:'
          placeholder=''
          value={bank}
          setValue={(text: any) => setBank(text)}
          fullWidth
        />
      </View>
      <View className='h-8'></View>
      <BasicButton textClassName='text-white' buttonClassName='px-16 py-2 bg-primary-800 rounded-3xl' onClick={() => handleGoNext()}>Save</BasicButton>

    </SafeAreaView>
    )
}