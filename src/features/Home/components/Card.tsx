import { StyleSheet, View, Text } from 'react-native'
import React, { useMemo } from 'react'

import Icons from '../../../components/Icons'
import { IconNames } from '../../../@types/icons'

type Props = {
  item: {
    AwayTeam: string
    AwayTeamPrediction: number
    DateTime: string
    Day: string
    HomeTeam: string
    HomeTeamPrediction: number
    PredictedWinner: string
    Result: string
  }
}

const Card = ({ item }: Props) => {

  const predictedWinner = useMemo(() => {
    const result = {
      logo: <Icons name={IconNames[item.AwayTeam]} height={50} width={50} />,
      team: item.AwayTeam,
      percents: item.AwayTeamPrediction,
      loserPercents: item.HomeTeamPrediction
    }
    if (item.HomeTeamPrediction > item.AwayTeamPrediction) {
      result.logo = <Icons name={IconNames[item.HomeTeam]} height={50} width={50} />
      result.team = item.HomeTeam
      result.percents = item.HomeTeamPrediction
      result.loserPercents = item.AwayTeamPrediction
    }

    return result
  }, [item.Result, item.PredictedWinner])

  return (
    <View style={styles.container}>
      <View style={styles.row}>

        <View style={styles.logoCircle}>
          {predictedWinner?.logo}

        </View>

        <View style={{ marginLeft: 20 }}>
          <Text style={styles.teamName}>{predictedWinner?.team}</Text>
          <Text style={styles.text}>Full team name</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progress, { width: `${predictedWinner.percents}%` }]}></View>
      </View>

      <View style={[styles.row, { justifyContent: 'space-between', marginTop: 10 }]}>
        <Text style={styles.winnerPercents}>{predictedWinner?.percents}%</Text>
        <Text style={styles.loserPercents}>{predictedWinner?.loserPercents}%</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 180,
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F5F5",
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamName: {
    fontSize: 24,
    fontWeight: '500',
    color: "#111427",
  },
  text: {
    fontSize: 14,
    color: "#111427",
    opacity: 0.4,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    marginTop: 20,
  },
  progress: {
    height: 6,
    backgroundColor: "#E38035",
    borderRadius: 6
  },
  winnerPercents: {
    fontSize: 20,
    fontWeight: '500',
    color: "#111427",
  },
  loserPercents: {
    fontSize: 20,
    fontWeight: '500',
    color: "#111427",
    opacity: 0.35,
  }
})

export default Card