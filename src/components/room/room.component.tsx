import * as React from 'react'
import { Stage } from '@inlet/react-pixi'
import Creep from '../creep/creep.component'
import { selectCreeps } from '../../redux/room/room.selctors'
import { useSelector } from 'react-redux'

const roomSize = 50

const Room = () => {
  const [windowSize, setWindowSize] = React.useState(getWindowSize())

  React.useLayoutEffect(() => {
    window.addEventListener('resize', () => setWindowSize(getWindowSize()))
  }, [])

  const creeps = useSelector(selectCreeps)
  const cellSize = windowSize / roomSize

  return <Stage width={windowSize} height={windowSize} options={{ antialias: true }}>
    {creeps.map(creep => <Creep x={creep.x * cellSize} y={creep.y * cellSize} color={0xff0000} radius={cellSize} cellSize={cellSize} />)}
  </Stage>
}

const getWindowSize = () => {
  return Math.min(window.innerWidth, window.innerHeight)
}

export default Room
