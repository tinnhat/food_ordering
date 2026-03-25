import { View, Text, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

const SignUp = () => {
   const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      fullName: '',
    })
  
    const submit: () => Promise<void> = async () => {
      if (!formData.email || !formData.password || !formData.fullName) {
        Alert.alert('Error', 'Please fill in all fields')
        return
      }
      setIsSubmitting(true)
      try {
        router.replace('/')
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong')
      } finally {
        setIsSubmitting(false)
      }
    }
  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
      <CustomInput
        label='Full Name'
        placeholder='Enter your full name'
        value={formData.fullName}
        onChangeText={text => setFormData(pre => ({ ...pre, fullName: text }))}
      />
      <CustomInput
        label='Email'
        placeholder='Enter your email'
        keyboardType='email-address'
        value={formData.email}
        onChangeText={text => setFormData(pre => ({ ...pre, email: text }))}
      />
      <CustomInput
        label='Password'
        placeholder='Enter your password'
        secureTextEntry
        value={formData.password}
        onChangeText={text => setFormData(pre => ({ ...pre, password: text }))}
      />
      
      <CustomButton title='Sign Up' onPress={submit} isLoading={isSubmitting} />
      <View className='flex justify-center mt-5 flex-row gap-2'>
              <Text className='base-regular text-gray-100'>Already have an account? </Text>
              <Link href='/SignIn' className='base-bold text-primary'>
                Sign In
              </Link>
            </View>
    </View>
  )
}

export default SignUp
