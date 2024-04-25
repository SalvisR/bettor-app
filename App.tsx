import React from 'react'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { default as theme } from './custom-theme.json'
import Navigator from './src/navigator'

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <Navigator />
      </ApplicationProvider>
    </SafeAreaProvider>
  )
}

export default App
