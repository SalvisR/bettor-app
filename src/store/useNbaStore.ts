import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

// export const useNbaStore = create((set) => ({
//   predictions: [],
//   setPredictions: (newPredictions) => set({ predictions: newGames }),
// }))

type Prediction = {
  AwayTeam: string
  AwayTeamPrediction: number
  DateTime: string
  Day: string
  HomeTeam: string
  HomeTeamPrediction: number
  PredictedWinner: string
  Result: string
}

export interface NbaStore {
  predictions: Prediction[]
  setPredictions: (newPredictions: Prediction[]) => void
}

export const useNbaStore = create<(NbaStore)>()(
  persist(
    (set) => ({
      predictions: [],
      setPredictions: (newPredictions) => set({ predictions: newPredictions }),
    }),
    {
      name: 'nba-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)