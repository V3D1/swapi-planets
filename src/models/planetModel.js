export class Planet {
  constructor (element) {
    this.name = element.name
    this.population = element.population
    this.rotation_period = element.rotation_period
    this.climate = element.climate
    this.gravity = element.gravity
    this.created = new Date(element.created).toLocaleString()
    this.url = this.getIdFromUrl(element.url)
  }

  getIdFromUrl(url) {
    const urlParts = url.split('/');
    if (urlParts.length < 3 || !urlParts[urlParts.length - 2]) {
      throw new Error('Nieprawidłowy URL: ' + url);
    }
    return urlParts[urlParts.length - 2];
  }
}
