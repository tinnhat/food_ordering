import { SplashScreen, Stack } from 'expo-router'
import './global.css'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'

export default function RootLayout() {
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

  return <Stack screenOptions={{ headerShown: false }} />
}
