import { db } from '../../firebaseInit.js'
import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    isInDemoSession: false,
    roundtrip: null,
    stops: null,

    // todo remove
    tourShowed: false
  },
  getters: {
    getRoundtrip: state => state.roundtrip,
    getStops: state => state.stops,
    isInDemoSession: state => state.isInDemoSession,
    getRoundtripId: state => state.roundtrip ? state.roundtrip.RTId : null,
    tourShowed: state => state.tourShowed
  },
  mutations: {
    setRoundtrip: (state, roundtrip) => {
      state.roundtrip = roundtrip
    },
    setStops: (state, stops) => {
      console.log(stops)
      state.stops = stops
    },
    addStop: (state, stop) => {
      if (state.stops === null) state.stops = []
      state.stops.push(stop)
    },
    removeStop: (state, docId) => {
      if (state.stops.findIndex(x => x.DocId === docId) === -1) return false
      state.stops.splice(state.stops.findIndex(x => x.DocId === docId), 1)
    },
    setTourShowed: (state, showed) => {
      state.tourShowed = showed
    },
    resetRoundtrip: (state) => {
      state.roundtrip = null
      state.stops = null
      state.isInDemoSession = false
    },
    setAsDemoSession: (state) => {
      state.isInDemoSession = true
    }
  },
  actions: {
    addRoundtrip ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let tempRTId = Math.floor(Math.random() * 10000000000000)
        let timeStamp = Date.now()
        let firebaseTimeStamp = firebase.firestore.Timestamp.fromDate(new Date(timeStamp))

        payload.roundtripObject.Location = payload.tempLocation
        payload.roundtripObject.OriginCode = payload.originCode
        payload.roundtripObject.DestinationCode = payload.destinationCode

        payload.roundtripObject.Category = 'Gruppenreise'
        payload.roundtripObject.Description = 'Kurze Beschreibung deiner Rundreise'
        payload.roundtripObject.Hotels = '0'
        payload.roundtripObject.Region = null
        payload.roundtripObject.Price = 100
        payload.roundtripObject.Public = false
        payload.roundtripObject.RTId = tempRTId
        payload.roundtripObject.Stars = 3
        payload.roundtripObject.Profile = 'Auto'
        payload.roundtripObject.Highlights = ['Highlight 1', 'Highlight 2', 'Highlight 3']
        payload.roundtripObject.OfferEndPeriod = firebaseTimeStamp
        payload.roundtripObject.OfferStartPeriod = firebaseTimeStamp
        payload.roundtripObject.OfferWholeYear = true
        payload.roundtripObject.createdAt = firebaseTimeStamp
        payload.roundtripObject.docId = tempRTId

        commit('setRoundtrip', payload.roundtripObject)
        commit('setStops', payload.stops)

        resolve(tempRTId)
      })
    },
    addNewStop ({ commit, state }, newRoundtripObject) {
      newRoundtripObject.RTId = state.roundtrip.RTId
      commit('addStop', newRoundtripObject)
    },
    saveRoundtrip ({ state, commit }, userId) {
      return new Promise((resolve, reject) => {
        try {
          state.roundtrip.UserId = userId
          db.collection('Roundtrips').add(state.roundtrip).then(() => {
            let roundtripsRef = db.collection('Roundtrips')
              .where('RTId', '==', state.roundtrip.RTId)
              .limit(1)
            roundtripsRef.get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  db.collection('Roundtrips').doc(doc.id).update({
                    'RTId': doc.id
                  })

                  let promiseList = []
                  state.stops.forEach((stop, index) => {
                    stop.RTId = doc.id
                    promiseList.push(db.collection('RoundtripDetails').add(stop))

                    Promise.all(promiseList).then(() => {
                      if (index === state.stops.length - 1) {
                        commit('resetRoundtrip')
                        resolve(doc.id)
                      }
                    })
                  })
                })
              })
          })
        } catch (e) {
          console.log(e)
          commit('resetRoundtrip')
          resolve(null)
        }
      })
    }
  }
}
