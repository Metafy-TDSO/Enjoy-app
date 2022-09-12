import { User } from './User.model'

export interface Creator {
  id: number
  idUser: number
  rating?: number | null
  createdAt?: Date
  updatedAt?: Date | null
  user: User
}
