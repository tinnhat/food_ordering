import { View, Text, Image } from 'react-native'
import React from 'react'
import { Redirect, Slot, Tabs } from 'expo-router'
import useAuthStore from '@/store/auth.store'
import { TabBarIconProps } from '@/type'
import { images } from '@/constants'
import cn from 'clsx'

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
  return (
    <View className='tab-icon'>
      <Image
        source={icon}
        className='size-5'
        resizeMode='contain'
        tintColor={focused ? '#fe8c00' : '#5d5f6d'}
      />
      <Text className={cn('text-sm font-bold', focused ? 'text-primary' : 'text-gray-500')}>
        {title}
      </Text>
    </View>
  )
}

const MainLayout = () => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) {
    return <Redirect href='/SignIn' />
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: 'absolute',
          bottom: 40,
          backgroundColor: '#fff',
          shadowColor: '#1a1a1a',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.home} title='Home' />
          ),
        }}
      />
      <Tabs.Screen
        name='Cart'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.bag} title='Cart' />
          ),
        }}
      />
      <Tabs.Screen
        name='Search'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.search} title='Search' />
          ),
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.user} title='Profile' />
          ),
        }}
      />
    </Tabs>
  )
}

export default MainLayout
