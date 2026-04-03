import { SplashScreen, Stack } from 'expo-router'
import './global.css'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import * as Sentry from '@sentry/react-native'
import useAuthStore from '@/store/auth.store'

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
})

export default Sentry.wrap(function RootLayout() {
  const { isLoading, fetchAuthenticatedUser} = useAuthStore()
  const [fontsLoaded, error] = useFonts({
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
    'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
  })

  useEffect(() => {
    if (error) {
      console.error('Error loading fonts:', error)
    }
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [error, fontsLoaded])

  useEffect(() => {
    fetchAuthenticatedUser()
  }, [])

  if (isLoading || !fontsLoaded) {
    return null
  }

  return <Stack screenOptions={{ headerShown: false }} />
});
