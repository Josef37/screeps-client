import * as React from 'react'
import { Container, Graphics } from '@inlet/react-pixi'
import PIXI from 'pixi.js'

export interface CreepProps {
  x: number,
  y: number,
  color: number,
  radius: number,
  cellSize: number,
}

const Creep = ({ x, y, color, radius, cellSize }: CreepProps) => {
  const draw = React.useCallback((g: PIXI.Graphics) => {
    g.beginFill(color)
    g.lineStyle(0.2 * radius, 0x444444)
    g.drawCircle(0, 0, radius)
    g.endFill()
  }, [color, radius])

  return <Container x={x + cellSize / 2} y={y + cellSize / 2}>
    <Graphics draw={draw} />
  </Container>
}

export default Creep
