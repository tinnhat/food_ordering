import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'

const CartButton = () => {
  const totalItems = 10
  return (
    <TouchableOpacity className='flex-center flex-row gap-x-2 bg-primary px-4 py-2 rounded-full'>
      <Image source={images.bag} className='size-4' resizeMode='contain' tintColor={'#fff'} />
      {totalItems > 0 && (
        <View className='cart-badge'>
          <Text className='small-bold text-white'>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default CartButton
