export interface User {
  id: number
  name: string
  email: string
  birth: Date
  password: string
  phone: string
  avatarUrl?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}
