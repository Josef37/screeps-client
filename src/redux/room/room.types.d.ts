type Room =
  RoomInit
  & Partial<RoomDiff>
  & {name: string}

type RoomInit = {
  objects: Record<string, RoomObject>,
  users: Record<string, RoomUser>,
}

type RoomDiff = {
  objects: Record<string, RoomObject>,
  gameTime: number,
  users?: Record<string, RoomUser>
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
