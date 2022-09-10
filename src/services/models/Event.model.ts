export interface Region {
  latitude: number
  longitude: number
}

export interface Event extends Region {
  id: number
  name: string
  description: string
  rating?: number | null
  startAt: Date
  endsAt: Date
  address: string
  idCreator: number
  imageUrl: string
  createdAt?: Date | null
  updatedAt?: Date | null
}
