import instance from '@/services/api'

export class PlanetService {
  async getPlanets () {
    try {
      const response = await instance.get('/planets', { headers: {
        'Content-Type': 'application/json'
      }})
      return response.data
    } catch (error) {
      return error
    }
  }
  async getPlanetDetails (id) {
    try {
      const response = await instance.get(`/planets/${id}`, { headers: {
        'Content-Type': 'application/json'
      }})
      return response.data
    } catch (error) {
      return error
    }
  }
  async getPlanetsFromPage (page) {
    try {
      const response = await instance.get(`/planets/?page=${page}`, { 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response.data
    } catch (error) {
      return error
    }
  }
}