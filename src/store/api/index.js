/* eslint-disable indent */
import { db } from '../../firebaseInit.js'

export default {
    namespaced: true,
    state: {
        Hotels4Key: null,
        MapboxKey: null,
        GeoDBKey: null,
        PixabayKey: null,
        AmadeusKeys: {
            id: null,
            secret: null
        },
        StoryblokKey: null,
        GooglePlacesKey: null,
        UnsplashKeys: {
            UnsplashKey: null,
            UnsplashSecret: null
        }
    },
    getters: {
        getHotels4Key: state => state.Hotels4Key,
        getMapboxKey: state => state.MapboxKey,
        getGeoDBKey: state => state.GeoDBKey,
        getPixabayKey: state => state.PixabayKey,
        getAmadeusKeys: state => state.AmadeusKeys,
        getGooglePlacesKey: state => state.GooglePlacesKey,
        getStoryblokKey: state => state.StoryblokKey,
        getUnsplashKeys: state => state.UnsplashKeys
    },
    actions: {
        getAllKeys ({ state }) {
            return new Promise((resolve) => {
                db.collection('API').get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            let data = doc.data()

                            switch (data.name) {
                                case 'Hotels4RapidApi':
                                    state.Hotels4Key = data.key
                                    break
                                case 'Mapbox':
                                    state.MapboxKey = data.accessToken
                                    break
                                case 'GeodDBRapidApi':
                                    state.GeoDBKey = data.key
                                    break
                                case 'Pixabay':
                                    state.PixabayKey = data.key
                                    break
                                case 'Amadeus':
                                    state.AmadeusKeys.id = data.client_id
                                    state.AmadeusKeys.secret = data.client_secret
                                    break
                                case 'StoryblokKey':
                                    state.StoryblokKey = data.accessToken
                                    break
                                case 'GooglePlaces':
                                    state.GooglePlacesKey = data.apiKey
                                    break
                                case 'Unsplash':
                                    state.UnsplashKey = data.accessKey
                                    state.UnsplashSecret = data.secretKey
                                    break
                            }
                            resolve(true)
                        })
                    }).catch(() => {
                        resolve(false)
                    })
            })
        }
    }
}
