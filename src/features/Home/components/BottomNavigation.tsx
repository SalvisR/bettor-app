import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlurView } from "@react-native-community/blur"
import { Icon } from '@ui-kitten/components'

const WIDTH = Dimensions.get('window').width
import { SCREENS } from '../../../navigator/constants'

type Props = {
  navigation: any
}

const BottomNavigation = ({ navigation }: Props) => {

  const handleHomeButtonPress = () => {
    navigation.navigate(SCREENS.HOME)
  }

  const handleAllButtonPress = () => {
    navigation.navigate(SCREENS.NBA)
  }

  const handleTodayButtonPress = () => {
    navigation.navigate(SCREENS.TODAY)
  }

  return (
    <BlurView
      style={styles.absolute}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="#E38035"
    >
      <TouchableOpacity onPress={handleHomeButtonPress}>
        <BlurView
          style={styles.menuButton}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="#fff"
        >
          <Icon
            name='home-outline'
            width={30}
            height={30}
            fill='#020202'
          />
        </BlurView>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAllButtonPress}>
        <BlurView
          style={styles.menuButton}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="#fff"
        >
          <Icon
            name='list-outline'
            width={30}
            height={30}
            fill='#020202'
          />
        </BlurView>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleTodayButtonPress}>
        <BlurView
          style={styles.menuButton}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="#fff"
        >
          <Icon
            name='calendar-outline'
            width={30}
            height={30}
            fill='#020202'
          />
        </BlurView>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleHomeButtonPress}>
        <BlurView
          style={styles.menuButton}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="#fff"
        >
          <Icon
            name='person-outline'
            width={30}
            height={30}
            fill='#020202'
          />
        </BlurView>
      </TouchableOpacity>


    </BlurView>
  )
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    bottom: 40,
    left: (WIDTH - 290) / 2,
    right: (WIDTH - 290) / 2,
    zIndex: 1000,
    width: 290,
    height: 80,
    borderRadius: 40,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    width: 60,
    height: 60,
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default BottomNavigation