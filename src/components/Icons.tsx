import type { ReactElement } from 'react'
import React from 'react'

import ATL from '../assets/svg/Logo/ATL.svg'
import WAS from '../assets/svg/Logo/WAS.svg'
import CHA from '../assets/svg/Logo/CHA.svg'
import MIA from '../assets/svg/Logo/MIA.svg'
import ORL from '../assets/svg/Logo/ORL.svg'
import NY from '../assets/svg/Logo/NY.svg'
import PHI from '../assets/svg/Logo/PHI.svg'
import BKN from '../assets/svg/Logo/BKN.svg'
import BOS from '../assets/svg/Logo/BOS.svg'
import TOR from '../assets/svg/Logo/TOR.svg'
import CHI from '../assets/svg/Logo/CHI.svg'
import CLE from '../assets/svg/Logo/CLE.svg'
import IND from '../assets/svg/Logo/IND.svg'
import DET from '../assets/svg/Logo/DET.svg'
import MIL from '../assets/svg/Logo/MIL.svg'
import MIN from '../assets/svg/Logo/MIN.svg'
import UTA from '../assets/svg/Logo/UTA.svg'
import OKC from '../assets/svg/Logo/OKC.svg'
import POR from '../assets/svg/Logo/POR.svg'
import DEN from '../assets/svg/Logo/DEN.svg'
import MEM from '../assets/svg/Logo/MEM.svg'
import HOU from '../assets/svg/Logo/HOU.svg'
import NO from '../assets/svg/Logo/NO.svg'
import SA from '../assets/svg/Logo/SA.svg'
import DAL from '../assets/svg/Logo/DAL.svg'
import GS from '../assets/svg/Logo/GS.svg'
import LAL from '../assets/svg/Logo/LAL.svg'
import LAC from '../assets/svg/Logo/LAC.svg'
import PHO from '../assets/svg/Logo/PHO.svg'
import SAC from '../assets/svg/Logo/SAC.svg'
// import EAST from '../assets/svg/Logo/EAST.svg'
// import WEST from '../assets/svg/Logo/WEST.svg'

import { IconNames } from '../@types/icons'
// import type { ColorsType } from 'types/theme'

interface IconName {
  name: IconNames
  height?: number
  width?: number
  fill?: string | false
  stroke?: string | false
  // fill?: string | false | ColorsType
  // stroke?: string | false | ColorsType
}

const Icons = ({
  name,
  height = 20,
  width = 20,
  fill,
  stroke,
}: IconName): ReactElement | null => {
  const icons = {
    [IconNames.ATL]: <ATL />,
    [IconNames.WAS]: <WAS />,
    [IconNames.CHA]: <CHA />,
    [IconNames.MIA]: <MIA />,
    [IconNames.ORL]: <ORL />,
    [IconNames.NY]: <NY />,
    [IconNames.PHI]: <PHI />,
    [IconNames.BKN]: <BKN />,
    [IconNames.BOS]: <BOS />,
    [IconNames.TOR]: <TOR />,
    [IconNames.CHI]: <CHI />,
    [IconNames.CLE]: <CLE />,
    [IconNames.IND]: <IND />,
    [IconNames.DET]: <DET />,
    [IconNames.MIL]: <MIL />,
    [IconNames.MIN]: <MIN />,
    [IconNames.UTA]: <UTA />,
    [IconNames.OKC]: <OKC />,
    [IconNames.POR]: <POR />,
    [IconNames.DEN]: <DEN />,
    [IconNames.MEM]: <MEM />,
    [IconNames.HOU]: <HOU />,
    [IconNames.NO]: <NO />,
    [IconNames.SA]: <SA />,
    [IconNames.DAL]: <DAL />,
    [IconNames.GS]: <GS />,
    [IconNames.LAL]: <LAL />,
    [IconNames.LAC]: <LAC />,
    [IconNames.PHO]: <PHO />,
    [IconNames.SAC]: <SAC />,
    // [IconNames.EAST]: <EAST />,
    // [IconNames.WEST]: <WEST />,
  }

  if (icons[name]) {
    const icon = icons[name]
    const newProps: {
      fill?: string
      stroke?: string
    } = {}

    if (fill) newProps.fill = fill
    if (stroke) newProps.stroke = stroke

    return React.cloneElement(icon, {
      height,
      width,
      ...newProps,
    })
  }

  return null
}

export default Icons
