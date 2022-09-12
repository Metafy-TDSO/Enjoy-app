import { QueryClient } from 'react-query'
import { Axios } from 'axios'
import { io } from 'socket.io-client'

const { API_URL } = process.env

export const queryClient = new QueryClient()

export const apiClient = new Axios({
  baseURL: API_URL || 'https://eventos-v1-api.herokuapp.com',
  timeout: 10000,
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
      'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikd1aWxoZXJtZSIsImVtYWlsIjoiZ3VpdnB3NjhAZ21haWwuY29tIiwiYXZhdGFyVXJsIjpudWxsLCJpYXQiOjE2NjI5OTk4MTYsImV4cCI6MTY2MzYwNDYxNiwiaXNzIjoibWV0YWZ5In0.0-DvqC2MgI48Bz8on6hon3ISPA0HyJIyxgVSiMbCtgY'
  }

  config.headers = newHeaders

  return config
})

export const websocketClient = io(API_URL || 'https://eventos-v1-api.herokuapp.com', {
  extraHeaders: {
    // Mocked token for FIAP purposes
    Authorization:
      'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikd1aWxoZXJtZSIsImVtYWlsIjoiZ3VpdnB3NjhAZ21haWwuY29tIiwiYXZhdGFyVXJsIjpudWxsLCJpYXQiOjE2NjI5OTk4MTYsImV4cCI6MTY2MzYwNDYxNiwiaXNzIjoibWV0YWZ5In0.0-DvqC2MgI48Bz8on6hon3ISPA0HyJIyxgVSiMbCtgY'
  }
})
