import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from '../navigator/constants'
import { BlurView } from "@react-native-community/blur"

type Props = {}

const BottomNavigationEl = (props: Props) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const handleAll = () => {
    navigation.navigate(SCREENS.NBA)
  }
  const handleToday = () => {
    navigation.navigate(SCREENS.TODAY)
  }

  const handleSelect = (index: number) => {
    if (index === 0) {
      handleAll()
    } else {
      handleToday()
    }
  }

  return (
    <BlurView
      style={styles.absolute}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
    >
      <BottomNavigation
        selectedIndex={0}
        onSelect={handleSelect}
        style={{ paddingBottom: insets.bottom + 10, backgroundColor: "rgba(53, 55, 65, 0.85)" }}
      >
        <BottomNavigationTab
          title='All'
          style={{ paddingTop: 10 }}
          icon={<Icon
            {...props}
            name='calendar-outline'
          />}
        />
        <BottomNavigationTab
          title='Today'
          style={{ paddingTop: 10 }}
          icon={<Icon
            {...props}
            name='award-outline'
          />}
        />

      </BottomNavigation>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  absolute: {
    position: "absolute",
    // top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})

export default BottomNavigationEl