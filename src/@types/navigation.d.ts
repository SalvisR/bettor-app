import { type StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  Home: undefined
  Nba: undefined
  Today: undefined
}

export type ApplicationScreenProps = StackScreenProps<RootStackParamList>
