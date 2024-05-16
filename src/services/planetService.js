import instance from '@/services/api'

async function fetchData(url) {
  try {
    const response = await instance.get(url)
    return response.data
  } catch (error) {
    console.error('API error:', error)
    throw new Error('An error occurred while fetching data from the API.')
  }
}

export class PlanetService {
  getPlanets() {
    return fetchData('/planets')
  }

  getPlanetDetails(id) {
    return fetchData(`/planets/${id}`)
  }

  getPlanetsFromPage(page) {
    return fetchData(`/planets/?page=${page}`)
  }
}