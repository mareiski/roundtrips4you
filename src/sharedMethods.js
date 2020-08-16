/* eslint-disable indent */

/**
 *  This class contains all methods shared between the pages and components
 *  (mostly used for EditRoundtrips and RoundtripDetails & their components)
 */
let getAxios = () => import('axios')
var querystring = require('querystring')
import { Notify, scroll } from 'quasar'
const { setScrollPosition, getScrollTarget } = scroll

export default {
    /**
     * @returns a date from a date string in format dd.mm.yy MM:hh
     * @param {String} string date string to get date from
     */
    getDateFromString (string) {
        const dateTimeParts = string.split(' ')
        const dateParts = dateTimeParts[0].split('.')
        const timeParts = dateTimeParts[1].split(':')
        return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')
    },
    /**
     * Sets all expansion states of all stops to true (expanded)
     * @param {*} context context of file
     * @param {array} stops list of all stops
     */
    expandAllStops (context, stops) {
        stops.forEach(stop => {
            if (context.allStopsExpanded) {
                if (context.$refs[stop.DocId]) context.$refs[stop.DocId][0].changeExpansion(true)
            } else context.$refs[stop.DocId][0].changeExpansion(context.currentExpansionStates[context.currentExpansionStates.findIndex(x => x.docId === stop.DocId)].expanded)
        })
    },
    /**
     * Change the expansion of one stop
     * @param {*} context context of file
     * @param {*} event event called from expansion item
     */
    expansionChanged (context, event) {
        context.allStopsExpanded = false
        context.currentExpansionStates[context.currentExpansionStates.findIndex(x => x.docId === event.docId)].expanded = event.expanded
    },
    /**
     * Filter airport suggestions for select element
     * @param {String} val search term
     * @param {boolean} originSearch search for origin or depature
     * @param {*} context context of file
     */
    filterAirports (val, update, abort, originSearch, context) {
        if (val.length < 3) {
            abort()
            return
        }
        if (val.length >= 3) {
            this.fetchAirports(val).then((results) => {
                update(() => {
                    if (!results) return false

                    if (originSearch) {
                        context.originOptions = []
                        context.originCodes = []
                    } else {
                        context.destinationOptions = []
                        context.destinationCodes = []
                    }

                    results.data.data.forEach(city => {
                        if (originSearch) {
                            context.originOptions.push(this.capitalize(city.address.cityName) + ' (' + city.iataCode + ')')
                            context.originCodes.push(city.iataCode)
                        } else {
                            context.destinationOptions.push(this.capitalize(city.address.cityName) + ' (' + city.iataCode + ')')
                            context.destinationCodes.push(city.iataCode)
                            context.destinationAddresses.push(this.capitalize(city.address.cityName))
                        }
                    })
                }).catch(e => {
                    return false
                })
            })
        }
    },
    /**
     * Fetch ariport suggestions for a search term
     * @param {*} val search term
     */
    fetchAirports (val) {
        return new Promise((resolve, reject) => {
            getAxios().then(axios => {
                const url = 'https://api.amadeus.com/v1/security/oauth2/token'

                const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

                const data = querystring.stringify({
                    grant_type: 'client_credentials',
                    client_id: 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
                    client_secret: 'lHQlUheyyAZtGQDA'
                })

                axios.post(url, data, {
                    headers: headers,
                    form: {
                        'grant_type': 'client_credentials',
                        'client_id': 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
                        'client_secret': 'lHQlUheyyAZtGQDA'
                    }
                }).then(function (response) {
                    let token = response.data.access_token
                    const tokenString = 'Bearer ' + token

                    axios.get('https://api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&view=LIGHT&keyword=' + val, {
                        headers: {
                            'Authorization': tokenString
                        }
                    }).then(function (response) {
                        resolve(response)
                    }).catch(function (error) {
                        console.log('Error' + error)
                        resolve(null)
                    })
                }).catch(function (error) {
                    console.log('Error on Authentication' + error)
                    resolve(null)
                })
            })
        })
    },
    /**
     * Capitalizes the given string
     */
    capitalize (s) {
        s = s.toLowerCase()
        s = s.charAt(0).toUpperCase() + s.slice(1)
        return s
    },
    /**
     * Display a quasar notify error message
     */
    showErrorNotification (message) {
        Notify.create({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: message
        })
    },
    /**
     * Display a quasar notify success message
     */
    showSuccessNotification (message) {
        Notify.create({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: message
        })
    },
    /**
     * Scroll to a specific offset
     * @param {Number} offset numer in pixels from top
     */
    scrollToOffset (offset) {
        const duration = 400
        setScrollPosition(document.documentElement, offset, duration)
    },
    /**
     * Scrolls to a element
     * @param refName element get via $refs
     */
    scrollToRef (el) {
        const target = getScrollTarget(el)
        const offset = el.offsetTop
        const duration = 400
        setScrollPosition(target, offset, duration)
    }
}
