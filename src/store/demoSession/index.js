import { db } from '../../firebaseInit.js'
import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    roundtrip: null,
    stops: null,
    tourShowed: false
  },
  getters: {
    getRoundtrip: state => state.roundtrip,
    getStops: state => state.stops,
    isInDemoSession: state => (state.roundtrip !== null),
    getRoundtripId: state => state.roundtrip.RTId,
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
    }
  },
  actions: {
    createRoundtrip ({ commit }, title) {
      return new Promise((resolve, reject) => {
        let tempRTId = Math.floor(Math.random() * 10000000000000)
        let timeStamp = Date.now()
        let firebaseTimeStamp = firebase.firestore.Timestamp.fromDate(new Date(timeStamp))

        let newRoundtripObject = {
          Category: 'Gruppenreise',
          Days: '< 5 Tage',
          Description: 'Kurze Beschreibung deiner Rundreise',
          Hotels: '0',
          Location: ['Deutschland'],
          Region: null,
          Price: 100,
          Public: false,
          RTId: tempRTId,
          Stars: 3,
          Profile: 'Auto',
          Highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'],
          Title: title,
          OfferEndPeriod: firebaseTimeStamp,
          OfferStartPeriod: firebaseTimeStamp,
          OfferWholeYear: true,
          ChildrenAges: [],
          Rooms: 1,
          Adults: 1,
          createdAt: firebaseTimeStamp,
          docId: tempRTId
        }
        commit('setRoundtrip', newRoundtripObject)

        let tempStopDocId = (Math.floor(Math.random() * 10000000000000)).toString() + 'A'

        let newStopArray = [{
          BookingComLink: '',
          DateDistance: '',
          Description: 'Beschreibung dieses Stopps',
          ExpediaLink: '',
          GeneralLink: '',
          ImageUrl: '',
          InitDate: firebaseTimeStamp,
          Price: 0,
          RTId: tempRTId,
          Title: 'Titel des 1. Stopps',
          DocId: tempStopDocId,
          Location: {
            lng: '13.3888599',
            lat: '52.5170365',
            label: 'Berlin, 10117, Germany'
          }
        }]
        commit('setStops', newStopArray)

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
          db.collection('Roundtrips').add(state.roundtrip).then(r => {
            let roundtripsRef = db.collection('Roundtrips')
              .where('RTId', '==', state.roundtrip.RTId)
              .limit(1)
            roundtripsRef.get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  db.collection('Roundtrips').doc(doc.id).update({
                    'RTId': doc.id
                  })

                  state.stops.forEach((stop, index) => {
                    db.collection('RoundtripDetails').add(stop).then(results => {
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
