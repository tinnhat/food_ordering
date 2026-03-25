import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'

const MainLayout = () => {
  const isAuthenticated = false; 
  if(!isAuthenticated) {
    return <Redirect href="/SignIn" />
  }
  return <Slot />
}

export default MainLayout
