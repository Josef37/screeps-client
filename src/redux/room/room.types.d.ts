type RoomState = {
  id?: string,
  prevId?: string,
  objects: Record<string, RoomObject>,
  users: Record<string, RoomUser>,
  gameTime?: number,
}

type RoomInit = {
  objects: Record<string, RoomObject>,
  users: Record<string, RoomUser>,
}

type RoomDiff = {
  objects: Record<string, RoomObject>,
  users?: Record<string, RoomUser>
  gameTime: number,
}

type RoomObject = {
  _id: string,
  room: string,
  type: string,
  x: number,
  y: number,
}

type RoomUser = {
  _id: string,
  username: string
}
