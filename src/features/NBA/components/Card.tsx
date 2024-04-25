import { StyleSheet, View } from 'react-native'
import React, { useMemo, useEffect, useState } from 'react'
import { Card, Text } from '@ui-kitten/components'
import moment from 'moment-timezone'
import TimeZone from 'react-native-timezone'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

import Icons from '../../../components/Icons'
import { IconNames } from '../../../@types/icons'

type Props = {
  data: {
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

const CardEl = ({ data }: Props) => {
  const [animation, setAnimation] = useState(0)
  const [showIcon, setShowIcon] = useState(false)

  const date = useMemo(() => {
    const timezone = TimeZone.getTimeZone()

    return moment(data.DateTime).tz(timezone).format('D.MMM.YYYY, hh:mm A')
  }, [data.DateTime])

  const status = useMemo(() => {
    if (!data.Result) return 'basic'

    if (data.Result === data.PredictedWinner) return 'success'

    return 'danger'
  }, [data.Result])

  useEffect(() => {
    (data.HomeTeamPrediction > data.AwayTeamPrediction) ? setAnimation(data.HomeTeamPrediction) : setAnimation(data.AwayTeamPrediction)
  }, [data])

  const onAnimationCompleted = () => {
    if (!animation) return null
    setShowIcon(true)
  }

  const predictedWinner = useMemo(() => {
    const result = {
      logo: <Icons name={IconNames[data.AwayTeam]} height={50} width={50} />,
      team: data.AwayTeam,
      percents: data.AwayTeamPrediction,
    }
    if (data.HomeTeamPrediction > data.AwayTeamPrediction) {
      result.logo = <Icons name={IconNames[data.HomeTeam]} height={50} width={50} />
      result.team = data.HomeTeam
      result.percents = data.HomeTeamPrediction
    }

    return result
  }, [data.Result, data.PredictedWinner])

  return (
    <Card status={status} style={styles.card}>
      <View style={styles.container}>

        <Text style={[styles.text, { textAlign: 'center' }]}>{date}</Text>

        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.text}>{data.HomeTeam}</Text>
          <Text style={styles.text}>vs</Text>
          <Text style={styles.text}>{data.AwayTeam}</Text>
        </View>

        <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
          <AnimatedCircularProgress
            size={120}
            width={12}
            duration={2500}
            fill={animation}
            tintColor="#e28035"
            onAnimationComplete={onAnimationCompleted}
            backgroundColor="#fff"
            rotation={180}
            lineCap="round"
          />

          {showIcon && (
            <View style={{ position: 'absolute', width: 120, height: 120, alignItems: 'center', justifyContent: 'center' }}>
              {predictedWinner.logo}
              <Text
                style={{ color: 'black' }}
              >{predictedWinner.percents}%</Text>
            </View>
          )}

        </View>



        {/* <View style={styles.row}>
          <Text style={styles.text}>Home Team</Text>
          <View style={styles.row}>
            <Icons name={IconNames[data.HomeTeam]} height={20} width={20} />

            <Text style={styles.text}>{data.HomeTeam} - {data.HomeTeamPrediction}%</Text>

          </View>
        </View> */}

        {/* <View style={styles.row}>
          <Text style={styles.text}>Away Team</Text>

          <View style={styles.row}>
            <Icons name={IconNames[data.AwayTeam]} height={20} width={20} />

            <Text style={styles.text}>{data.AwayTeam} - {data.AwayTeamPrediction}%</Text>

          </View>
        </View> */}

        {/* <View style={styles.row}>
          <Text style={styles.text}>Predicted Winner</Text>
          <Text style={styles.text}>{data.PredictedWinner}</Text>
        </View> */}

        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.text}>Result</Text>
          <Text
            style={{
              color: data.Result ? data.Result === data.PredictedWinner ? 'green' : 'red' : 'black',
              fontWeight: 'bold'
            }}
          >{data.Result ? data.Result : 'No result yet'}</Text>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    // backgroundColor: '#fff',
    // padding: 20,
    // marginBottom: 20,
    // borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CardEl