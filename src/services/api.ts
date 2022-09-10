import { apiClient } from './client'
import { Event } from './models'

export interface FindManyEventsDto {
  page?: number
  limit?: number
  name?: string
  idCreator?: number
  latitude?: number
  longitude?: number
  kilometers?: number
  rating?: number
}

export const getManyEvents = async (params: FindManyEventsDto): Promise<{ events: Event[] }> => {
  const result = await apiClient.get('/events', { params })
  return result.data
}

export const getEventById = async (id: number): Promise<{ event: Event }> => {
  const result = await apiClient.get('/events', { params: { id } })
  return result.data
}
