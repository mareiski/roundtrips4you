/* eslint-disable indent */

import axios from 'axios'
import { db } from '../../firebaseInit.js'
import sharedMethods from '../../sharedMethods.js'
import { createApi } from 'unsplash-js'

export default {
    /**
      * @returns an array of cities
      */
    getCities (country, context) {
        return new Promise((resolve, reject) => {
            let fileContext = this
            fileContext.fetchDBSuggestions(country).then(function (response) {
                if (response.length > 0) {
                    resolve(response)
                } else {
                    fileContext.fetchAPISuggestions(country, context).then(function (apiResponse) {
                        resolve(apiResponse)
                    }).catch(function (error) {
                        console.log('Error' + error)
                        resolve(null)
                    })
                }
            }).catch(function (error) {
                console.log('Error' + error)
                resolve(null)
            })
        })
    },
    /**
      * fetch city suggestions from the database
      */
    fetchDBSuggestions (country) {
        return new Promise((resolve, reject) => {
            let tempCities = []
            let roundtripsRef = db.collection('SuggestedCities')
                .where('Country', '==', country)
                .limit(1)
            roundtripsRef.get()
                .then(snapshot => {
                    if (snapshot.empty) resolve(tempCities)
                    snapshot.forEach(doc => {
                        let cities = doc.data().Cities
                        if (cities.length === 0) resolve(tempCities)
                        cities.forEach(city => {
                            let cityObject = {
                                name: city.name,
                                region: city.region,
                                longitude: city.location ? city.location.lng : null,
                                latitude: city.location ? city.location.lat : null,
                                country: doc.data().Country
                            }

                            tempCities.push(cityObject)

                            if (cities.indexOf(city) === cities.length - 1) {
                                resolve(tempCities)
                            }
                        })
                    })
                })
        })
    },
    /**
      * fetch city suggestions from geo db api
      */
    fetchAPISuggestions (country, context) {
        return new Promise((resolve, reject) => {
            let fileContext = this
            axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=5&offset=0&namePrefix=' + country + '&languageCode=de', {
                headers: {
                    'X-RapidAPI-Key': context.$store.getters['api/getGeoDBKey']
                }
            }).then(function (response) {
                if (!response.data.data[0]) sharedMethods.showErrorNotification('Für diesen Ort wurde nichts gefunden')
                // wait 2 secs because only 1 request per sec is allowed
                setTimeout(function () {
                    axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=' + response.data.data[0].code + '&minPopulation=70000&sort=-population&languageCode=de&types=CITY', {
                        headers: {
                            'X-RapidAPI-Key': context.$store.getters['api/getGeoDBKey']
                        }
                    }).then(function (response) {
                        fileContext.writeInDB(response.data.data)
                        resolve(response.data.data)
                    }).catch(function (error) {
                        console.log(error)
                    })
                }, 2000)
            }).catch(function (error) {
                console.log('Error' + error)
            })
        })
    },
    /**
      * writes a fetched stop into the db
      */
    writeInDB (response) {
        let newCityObject = {}
        newCityObject.Cities = []

        response.forEach((city, index) => {
            newCityObject.Country = city.country
            if (!newCityObject.Cities.includes(city.name)) newCityObject.Cities.push({ name: city.name, region: city.region, location: { lng: city.longitude, lat: city.latitude } })
        })

        db.collection('SuggestedCities').add(newCityObject)
    },
    /**
     * gets a image from unsplash for given city name
     */
    getUnsplashImage (cityName, cityCountry, context) {
        // on your node server
        const serverApi = createApi({
            accessKey: context.$store.getters['api/getUnsplashKeys'].accessKey
        })

        serverApi.search.getPhotos({
            query: cityName + ' ' + cityCountry,
            page: 1,
            perPage: 1,
            orientation: 'landscape'
        }).then(res => {
            console(res)
        })
    },

    /**
     * gets a image from pixabay for given city name
     */
    getCityImage (cityName, cityCountry, context) {
        let key = context.$store.getters['api/getPixabayKey']
        return new Promise((resolve, reject) => {
            axios.get('https://pixabay.com/api/?key=' + key + '&lang=de&category=buildings&image_type=photo&orientation=horizontal&safesearch=true&min_height=40&per_page=3&q=' + cityName + ' ' + cityCountry, {}
            ).then(function (response) {
                if (response.data.hits[0]) resolve({ url: response.data.hits[0].webformatURL, cityName: cityName })
                else {
                    axios.get('https://pixabay.com/api/?key=' + key + '&lang=de&category=buildings&image_type=photo&orientation=horizontal&safesearch=true&min_height=40&per_page=3&q=' + cityName, {}
                    ).then(function (response) {
                        if (response.data.hits[0]) resolve({ url: response.data.hits[0].webformatURL, cityName: cityName })
                        else {
                            resolve({ url: '../../statics/dummy-image-landscape-1-150x150.jpg', cityName: cityName })
                        }
                    }).catch(function (error) {
                        console.log(error)
                    })
                }
            }).catch(function (error) {
                console.log(error)
                resolve({ url: '../../statics/dummy-image-landscape-1-150x150.jpg', cityName: cityName })
            })
        })
    }
}
