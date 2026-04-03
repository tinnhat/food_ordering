import { View, Text, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { signIn } from '@/lib/appwrite'
import * as Sentry from '@sentry/react-native'

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const submit: () => Promise<void> = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    setIsSubmitting(true)
    try {
      await signIn({
        email: formData.email,
        password: formData.password,
      })
      Alert.alert('Success', 'Signed in successfully')
      router.replace('/')
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong')
      Sentry.captureException(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
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
      <CustomButton title='Sign In' onPress={submit} isLoading={isSubmitting} />
      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-gray-100'>Don&#39;t have an account? </Text>
        <Link href='/SignUp' className='base-bold text-primary'>
          Sign Up
        </Link>
      </View>
    </View>
  )
}

export default SignIn
