import { StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import React, { ReactElement, useState, useEffect, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import { Button, Layout, Text } from '@ui-kitten/components'

import { SCREENS } from '../../navigator/constants'

import {
  LineChart,
} from "react-native-chart-kit"

import Card from './components/Card'
import BottomNavigation from './components/BottomNavigation'
import { useNbaStore, NbaStore } from '../../store/useNbaStore'

const screenWidth = Dimensions.get("window").width

const Home = ({ navigation }): ReactElement => {
  const insets = useSafeAreaInsets()
  const [predictions, setPredictions] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const allPredictions = useNbaStore(state => state.predictions)

  const data = {
    // labels: ["January", "February", "March", "April", "May", "June"],
    labels: [],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 88],
        color: (opacity = 1) => `#9b9b9c`, // optional line color
        strokeWidth: 2 // optional
      }
    ],
    // legend: ["Rainy Days"] // optional
  }

  const getData = async () => {
    try {
      const predictionsLength = predictions.length
      if (predictionsLength < 0) {
        console.log('predictionsLength', predictionsLength)
        setLoading(true)
      }

      const todays_date = `${moment().format('YYYY-MM-DD')}T00:00:00`
      let predictionsCollection = await firestore()
        .collection('nba_predictions_1')
        .where('Day', '==', todays_date)
        .orderBy('DateTime', 'desc')
        .get()

      if (predictionsCollection.empty) {
        const yesterday_date = `${moment().subtract(1, 'days').format('YYYY-MM-DD')}T00:00:00`
        predictionsCollection = await firestore()
          .collection('nba_predictions_1')
          .where('Day', '==', yesterday_date)
          .orderBy('DateTime', 'desc')
          .get()
      }

      const predictionsData = predictionsCollection.docs.map(doc => doc.data())

      setPredictions(predictionsData as [])

      const winningGames = predictionsData.filter((prediction) => prediction.Result === prediction.PredictedWinner)
      const averageWinRate = winningGames.length / predictionsData.length
      // setPredictionAverageWinRate(Number(averageWinRate.toFixed(2)))

      setLoading(false)

    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  // Get most recent predictions winning rate
  const mostRecentPredictionsRate = useMemo(() => {

    if (!allPredictions || !allPredictions.length) {
      return "No data available"
    }

    const todays_date = `${moment().format('YYYY-MM-DD')}T00:00:00`
    const todaysPredictions = allPredictions.filter((prediction) => prediction.Day === todays_date)

    const yesterday_date = `${moment().subtract(1, 'days').format('YYYY-MM-DD')}T00:00:00`
    const yesterdayPredictions = allPredictions.filter((prediction) => prediction.Day === yesterday_date)


    const winningGames = todaysPredictions.filter((prediction) => prediction.Result === prediction.PredictedWinner)
    if (winningGames && winningGames.length) {
      const allGamesLength = todaysPredictions.filter((prediction) => prediction.Result).length
      return (winningGames.length / allGamesLength) * 100
    }

    const yesterdayWinningGames = yesterdayPredictions.filter((prediction) => prediction.Result === prediction.PredictedWinner)
    const allGamesLength = yesterdayPredictions.filter((prediction) => prediction.Result).length
    return (yesterdayWinningGames.length / allGamesLength) * 100

  }, [allPredictions])

  return (
    <Layout style={{ backgroundColor: "#020202", flex: 1 }}>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: insets.top + 10, paddingBottom: insets.bottom }]}
      >
        <Text style={styles.title}>Today</Text>

        <View style={{ marginRight: 'auto', zIndex: 1 }}>

          <View style={styles.glowingCircle} />

          <Text style={styles.mostRecentText}>Most recent</Text>
          <Text style={styles.percents}>{typeof mostRecentPredictionsRate == 'number' ? mostRecentPredictionsRate.toFixed(2) + "%" : mostRecentPredictionsRate}</Text>
          <Text style={styles.gamesCount}>Winning rate</Text>
        </View>

        <View style={{ marginLeft: -68, marginTop: 50 }}>
          <LineChart
            data={data}
            width={screenWidth + 62}
            height={150}
            chartConfig={{
              // backgroundGradientFrom: "#111427",
              // backgroundGradientTo: "#111427",
              backgroundGradientFrom: "#020202",
              backgroundGradientTo: "#020202",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: () => `#020202`,
              labelColor: () => `red`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "3.5",
                strokeWidth: "0",
                stroke: "#6C1E0A",
                fill: "#E38035"
              }
            }}
            withVerticalLines={false}
            withHorizontalLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            fromZero={true}
          />


        </View>
        <Text style={[styles.gamesCount, { textAlign: 'right', marginTop: -20, fontSize: 18 }]}>Now</Text>

        <ScrollView
          horizontal={true}
          style={styles.cardsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {predictions?.map((item, index) => (<Card key={index} item={item} />))}
        </ScrollView>


        {/* <Button onPress={() => navigation.navigate(SCREENS.NBA)} style={{ marginTop: 'auto', marginBottom: 20 }}>
        NBA
      </Button> */}
      </ScrollView>

      <BottomNavigation navigation={navigation} />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 31,
    backgroundColor: "#020202"
  },
  text: {
    marginHorizontal: 8,
  },
  title: {
    fontSize: 54,
    fontWeight: '400',
    marginBottom: 80,
    color: 'white'
  },
  mostRecentText: {
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 5,
    color: 'white'
  },
  percents: {
    fontSize: 54,
    fontWeight: '400',
    // marginBottom: 20,
    color: 'white'
  },
  gamesCount: {
    fontSize: 14,
    fontWeight: '300',
    color: 'white',
    opacity: 0.3,
  },
  cardsContainer: {
    marginLeft: - 31,
    marginRight: -31,
    paddingHorizontal: 31,
    marginTop: 40,
  },
  glowingCircle: {
    width: 70,
    height: 70,
    borderRadius: 75,
    backgroundColor: "#020202",
    position: 'absolute',
    alignSelf: 'center',
    top: 40,
    left: -200,


    shadowColor: '#fff',
    shadowOffset: {
      width: 200,
      height: -15,
    },
    shadowOpacity: 1,
    shadowRadius: 90,
    elevation: 5,
  },
})

export default Home