import { Text, FlatList, ActivityIndicator, RefreshControl, ImageBackground } from 'react-native'
import React, { useEffect, useState, useCallback, ReactElement } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import firestore from '@react-native-firebase/firestore'
import functions from '@react-native-firebase/functions'
import { Layout } from '@ui-kitten/components'

import Card from './components/Card'
import BottomNavigation from '../../components/BottomNavigation'

import BgImg from '../../assets/img/bg.jpg'
import { useNbaStore, NbaStore } from '../../store/useNbaStore'

const NBA = (): ReactElement => {
  const insets = useSafeAreaInsets()
  const predictions = useNbaStore(state => state.predictions)
  const setPredictions = useNbaStore(state => state.setPredictions)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [predictionAverageWinRate, setPredictionAverageWinRate] = useState(0)

  const [refreshing, setRefreshing] = useState(false);

  const updateFinishedGames = async () => {
    try {
      const updateFinishedGamePredictionResult = functions().httpsCallable('request_prediction_results')
      await updateFinishedGamePredictionResult({})
    } catch (error: any) {
      console.log(error)
    }
  }

  const getData = async () => {
    try {
      const predictionsLength = predictions.length
      if (predictionsLength < 1) {
        setLoading(true)
      }
      await updateFinishedGames()

      const predictionsCollection = await firestore().collection('nba_predictions_1').orderBy('DateTime', 'desc').get()
      const predictionsData = predictionsCollection.docs.map(doc => doc.data())

      setPredictions(predictionsData as NbaStore['predictions'])

      const winningGames = predictionsData.filter((prediction) => prediction.Result === prediction.PredictedWinner)
      const allGamesLength = predictionsData.filter((prediction) => prediction.Result).length
      const averageWinRate = (winningGames.length / allGamesLength) * 100
      setPredictionAverageWinRate(Number(averageWinRate.toFixed(2)))

      setLoading(false)
      setRefreshing(false)

    } catch (error: any) {
      setError(error.message)
      setRefreshing(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getData()
  }, [])

  return (
    <ImageBackground source={BgImg} style={{ flex: 1 }} blurRadius={20}>
      <Layout style={{ paddingTop: insets.top, flex: 1, backgroundColor: 'transparent', paddingHorizontal: 15 }}>

        {error ? (<Text>{error}</Text>) : null}
        {loading ? (
          <ActivityIndicator size='large' color='black' />
        ) : (
          <>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: 'white' }}>Average Win Rate: {predictionAverageWinRate}%</Text>

            <FlatList
              data={predictions}
              renderItem={(data) => <Card data={data.item} />}
              initialNumToRender={4}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
          </>
        )}

      </Layout>

      <BottomNavigation />
    </ImageBackground>
  )
}

export default NBA