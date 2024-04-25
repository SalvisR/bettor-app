import { Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback, ReactElement } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import firestore from '@react-native-firebase/firestore'
import { TopNavigation, Layout, Button } from '@ui-kitten/components'
import moment from 'moment'

import Card from './components/Card'

const NBA = (): ReactElement => {
  const insets = useSafeAreaInsets()
  const [predictions, setPredictions] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [predictionAverageWinRate, setPredictionAverageWinRate] = useState(0)

  const [refreshing, setRefreshing] = useState(false)

  const getData = async () => {
    try {
      const predictionsLength = predictions.length
      if (predictionsLength < 0) {
        console.log('predictionsLength', predictionsLength)
        setLoading(true)
      }

      const todays_date = `${moment().format('YYYY-MM-DD')}T00:00:00`
      const predictionsCollection = await firestore()
        .collection('nba_predictions_1')
        .where('Day', '==', todays_date)
        .orderBy('DateTime', 'desc')
        .get()


      const predictionsData = predictionsCollection.docs.map(doc => doc.data())

      setPredictions(predictionsData as [])

      const winningGames = predictionsData.filter((prediction) => prediction.Result === prediction.PredictedWinner)
      const averageWinRate = winningGames.length / predictionsData.length
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
  console.log(loading)
  return (
    <Layout style={{ paddingTop: insets.top, flex: 1 }}>
      <TopNavigation title='Bettor' alignment='center' />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 15, paddingTop: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {error ? (<Text>{error}</Text>) : null}
        {loading ? (
          <ActivityIndicator size='large' color='black' />
        ) : (
          <>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#fff' }}>Average Win Rate: {predictionAverageWinRate}%</Text>
            {predictions && predictions?.map((prediction, index) => (
              <Card key={index} data={prediction} />
            ))}
          </>
        )}
      </ScrollView>
    </Layout>
  )
}

export default NBA