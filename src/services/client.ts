import { QueryClient } from 'react-query'
import { Axios } from 'axios'
import { io } from 'socket.io-client'

const { API_URL } = process.env

export const queryClient = new QueryClient()

export const apiClient = new Axios({
  baseURL: API_URL || 'http://127.0.0.1:3000/',
  timeout: 5000,
  headers: {
    'Content-type': 'application/json'
  },
  validateStatus: status => status >= 200 && status < 400,
  transformRequest: [
    function transformRequest(data) {
      if (data && JSON.stringify(data)) {
        const formattedData = JSON.stringify(data)

        return formattedData
      }

      return data
    }
  ],
  transformResponse: [
    function transformResponse(data) {
      try {
        return JSON.parse(data)
      } catch {
        return data
      }
    }
  ]
})

apiClient.interceptors.request.use(async config => {
  const { headers } = config
  // Mocked token for FIAP purposes
  const newHeaders = {
    ...headers,
    Authorization:
      'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikd1aWxoZXJtZSBWaWVpcmEiLCJlbWFpbCI6Imd1aXZwdzY4QGdtYWlsLmNvbSIsImF2YXRhclVybCI6bnVsbCwiaWF0IjoxNjYyNzc2MzAzLCJleHAiOjE2NjMzODExMDMsImlzcyI6Im1ldGFmeSJ9.856NsBCUS2OZuDgoWve-El9LmsxCXwpYM1CB1SZQ_H0'
  }

  config.headers = newHeaders

  return config
})

export const websocketClient = io(API_URL || 'http://127.0.0.1:3000/', {
  extraHeaders: {
    // Mocked token for FIAP purposes
    Authorization:
      'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikd1aWxoZXJtZSBWaWVpcmEiLCJlbWFpbCI6Imd1aXZwdzY4QGdtYWlsLmNvbSIsImF2YXRhclVybCI6bnVsbCwiaWF0IjoxNjYyNzc2MzAzLCJleHAiOjE2NjMzODExMDMsImlzcyI6Im1ldGFmeSJ9.856NsBCUS2OZuDgoWve-El9LmsxCXwpYM1CB1SZQ_H0'
  }
})
