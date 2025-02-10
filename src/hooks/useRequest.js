import axios from 'axios'
import { getHostName } from 'helpers/getHostName'

const handleUnauthorized = (response) => {
  if (response?.data?.code === '4') {
    console.log(response.data)
    sessionStorage.clear()
    window.location = '/'
    return -1
  }
  return response.data
}

export const useRequest = (link, data, headers) => {
  const server = axios.create({
    baseURL: `${getHostName()}/${link}`,
    withCredentials: true,
  })

  const get = async url => {
    try {
      const response = await server.get(url, { headers })
      return handleUnauthorized(response)
    } catch (e) {
      return e.response || null
    }
  }

  const post = async url => {
    try {
      const response = await server.post(url, data, { headers });
      return handleUnauthorized(response)
    } catch (e) {
      return e.response || null
    }
  }

  return {
    get,
    post,
  }
}
