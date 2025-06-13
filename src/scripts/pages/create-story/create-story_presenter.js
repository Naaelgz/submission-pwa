import Map from '../../utils/map'
import { saveStory } from '../../utils/indexeddb-helper'

export default class CreateStoryPresenter {
  #map
  #clickedLatLng = null
  #marker = null
  #view
  #model

  constructor({ view, model }) {
    this.#view = view
    this.#model = model
  }

  async handleLoadMap(selector) {
    this.#map = await new Map({
      mapContainer: selector,
    })

    this.#map.attachEventListener('click', async event => {
      if (this.#marker) {
        this.#map.mapConfig.removeLayer(this.#marker)
      }

      this.#marker = await L.marker(event.latlng)
      this.#marker.addTo(this.#map.mapConfig)
      this.#clickedLatLng = event.latlng
      this.#view.updateLatLngValue(this.#clickedLatLng)
    })
  }

  async handleSubmitStory(data) {
    let { photo, description } = data

    // Validasi tambahan
    if (!description || !description.trim()) {
      alert('Description field cannot be empty')
      console.warn('Empty description')
      return
    }

    if (!photo) {
      alert('Photo is required. Make sure you take a picture first.')
      console.warn('No photo taken')
      return
    }

    if (!data.lat || !data.lon) {
      alert('Please select a location on the map.')
      console.warn('No location selected')
      return
    }

    this.#view.showLoading()
    try {
      let response = await this.#model.postNewStory(data)
      if (response.error) {
        throw new Error(`API Error: ${response.message}`)
      }

      const saved = {
        id: response.story?.id ?? +new Date(),
        description,
        photo,
        lat: data.lat,
        lon: data.lon,
        createdAt: new Date().toISOString(),
      }

      await saveStory(saved)
      console.info('Story saved to IndexedDB:', saved)

      if (this.#marker) {
        this.#map.mapConfig.removeLayer(this.#marker)
      }

      this.#view.submitStorySuccess()
    } catch (error) {
      console.error('Failed to save story:', error)
      alert('Failed to upload and save story. See console for more info.')
    } finally {
      this.#view.hideLoading()
    }
  }
}
