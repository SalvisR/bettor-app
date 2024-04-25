import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../@types/navigation'
import { SCREENS } from './constants'
import { NavigationContainer } from '@react-navigation/native'
import BottomNavigation from '../components/BottomNavigation'

import Home from '../features/Home/Home.screen'
import NBA from '../features/NBA/NBA.screen'
import Today from '../features/NBA/Today.screen'

const Navigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name={SCREENS.HOME}
            component={Home}
            options={{ headerShown: false, title: "Home" }}
          />
          <Stack.Screen
            name={SCREENS.NBA}
            component={NBA}
            options={{ headerShown: false, title: "NBA" }}
          />
          <Stack.Screen
            name={SCREENS.TODAY}
            component={Today}
            options={{ headerShown: false, title: "Today" }}
          />
        </Stack.Group>

      </Stack.Navigator>

      {/* <BottomNavigation /> */}

    </NavigationContainer>
  )
}

export default Navigator