import { db, storage, auth } from '../../firebaseInit.js'

export default {
  namespaced: true,
  state: {
    roundtrips: null,
    titleImages: null
  },
  getters: {
    getAllRoundtrips: state => state.roundtrips,
    getTitleImages: state => state.titleImages,
    getSingleRoundtrip: (state) => (roundtripId) => {
      return state.roundtrips[state.roundtrips.findIndex(x => x.RTId === roundtripId)]
    }
  },
  mutations: {
    setRoundtrips: (state, roundtrips) => {
      state.roundtrips = roundtrips
    },
    setTitleImages: (state, images) => {
      state.titleImages = images
    },
    addRoundtrip: (state, newRoundtripObject) => {
      if (state.roundtrips === null) state.roundtrips = []
      state.roundtrips.push(newRoundtripObject)
    },
    removeRoundtrip: (state, roundtripDocId) => {
      if (state.roundtrips) {
        let index = state.roundtrips.findIndex(x => x.docId === roundtripDocId)
        state.roundtrips.splice(index, 1)
        state.titleImages.splice(index, 1)
      }
    }
  },
  actions: {
    fetchSingleRoundtrip ({ commit, getters }, RTId) {
      return new Promise((resolve, reject) => {
        if (getters.getAllRoundtrips && getters.getAllRoundtrips.findIndex(x => x.RTId === RTId) !== -1) {
          resolve(getters.getAllRoundtrips[getters.getAllRoundtrips.findIndex(x => x.RTId === RTId)])
        } else {
          let roundtripsRef = db.collection('Roundtrips')
            .where('RTId', '==', RTId)
            .limit(1)
          roundtripsRef.get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                if (snapshot.empty) resolve(null)

                let roundtrip = doc.data()
                roundtrip.docId = doc.id
                if (auth.user() && roundtrip.UserId === auth.user().uid) commit('addRoundtrip', roundtrip)
                resolve(roundtrip)
              })
            }).catch(function (error) {
              console.log('Error ' + error)
              resolve(null)
            })
        }
      })
    },
    fetchAllRoundtrips ({ commit, getters }, userUid) {
      return new Promise((resolve) => {
        if (getters.getAllRoundtrips && getters.getTitleImages) resolve({ roundtrips: getters.getAllRoundtrips, titleImages: getters.getTitleImages })

        let roundtripArr = []
        let roundtripDocIds = []
        let titleImages = []

        let roundtripsRef = db.collection('Roundtrips')
          .where('UserId', '==', userUid)
          .orderBy('createdAt')
          .limit(20)
        roundtripsRef.get()
          .then(snapshot => {
            let index = 0

            if (snapshot.size === 0) resolve(null)
            snapshot.forEach(doc => {
              roundtripArr.push(doc.data())

              let i = roundtripArr.findIndex(x => x.RTId === doc.data().RTId)

              // add doc id to roundtrip array
              roundtripArr[i].docId = doc.id

              roundtripDocIds.splice(i, 0, doc.id)

              var fileRef = storage.ref().child('Images/Roundtrips/' + doc.id + '/Title/titleImg')
              fileRef.getDownloadURL().then(function (url) {
                titleImages.splice(roundtripDocIds.indexOf(doc.id), 0, { src: url, RTId: doc.data().RTId })

                if (index >= snapshot.size - 1) {
                  commit('setTitleImages', titleImages)
                  resolve({ roundtrips: getters.getAllRoundtrips, titleImages: getters.getTitleImages })
                }
              }).catch(function () {
                titleImages.splice(roundtripDocIds.indexOf(doc.id), 0, { src: '../statics/dummy-image-landscape-1-150x150.jpg', docId: doc.data().RTId })

                if (index >= snapshot.size - 1) {
                  commit('setTitleImages', titleImages)
                  resolve({ roundtrips: getters.getAllRoundtrips, titleImages: getters.getTitleImages })
                }
              })

              if (index === snapshot.size - 1) commit('setRoundtrips', roundtripArr)
              index++
            })
          }).catch(function (error) {
            console.log(error)
            resolve(null)
          })
      })
    },
    addRoundtrip ({ commit }, payload) {
      return new Promise((resolve) => {
        try {
          let timeStamp = Date.now()
          let tempRTId = Math.floor(Math.random() * 10000000000000)

          let newRoundtripObject = {
            Category: 'Gruppenreise',
            Days: payload.days || '< 5 Tage',
            Description: 'Kurze Beschreibung deiner Rundreise',
            Hotels: '0',

            // set as default country (will be overitten)
            Location: ['Deutschland'],
            Region: null,
            Price: 100,
            Public: false,
            RTId: tempRTId,
            Stars: 3,
            Profile: 'Auto',
            Highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'],
            Title: payload.title,
            OfferEndPeriod: new Date(timeStamp),
            OfferStartPeriod: new Date(timeStamp),
            OfferWholeYear: true,
            UserId: payload.uid,
            createdAt: new Date(timeStamp),
            Rooms: payload.rooms,
            Adults: payload.adults,
            ChildrenAges: payload.childrenAges
          }

          if (payload.transportProfile) {
            newRoundtripObject.DepatureDate = payload.depatureDate
            newRoundtripObject.TransportProfile = payload.transportProfile
            newRoundtripObject.Origin = payload.origin
            newRoundtripObject.OriginCode = payload.originCode
            newRoundtripObject.Destination = payload.destination
            newRoundtripObject.DestinationCode = payload.destinationCode
            newRoundtripObject.ReturnDate = payload.returnDate
            newRoundtripObject.TravelClass = payload.travelClass
            newRoundtripObject.NonStop = payload.nonStop
          }

          db.collection('Roundtrips').add(newRoundtripObject).then(() => {
            commit('addRoundtrip', newRoundtripObject)

            let roundtripsRef = db.collection('Roundtrips')
              .where('RTId', '==', tempRTId)
              .limit(1)
            roundtripsRef.get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  db.collection('Roundtrips').doc(doc.id).update({
                    'RTId': doc.id
                  }).then(() => {
                    let depatureDate = null
                    if (payload.depatureDate) {
                      const dateParts = payload.depatureDate.split('.')
                      depatureDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
                    }

                    if (payload.stops) {
                      let promiseList = []
                      payload.stops.forEach((stop) => {
                        try {
                          stop.RTId = doc.id
                          promiseList.push(db.collection('RoundtripDetails').add(stop))
                        } catch (e) {
                          console.log(e)
                        }
                      })
                      Promise.all(promiseList).then(() => {
                        resolve(doc.id)
                      })
                    } else {
                      db.collection('RoundtripDetails').add({
                        BookingComLink: '',
                        DateDistance: '',
                        Description: 'Beschreibung dieses Stopps',
                        ExpediaLink: '',
                        GeneralLink: '',
                        ImageUrl: '',
                        InitDate: depatureDate || new Date(timeStamp),
                        Price: 0,
                        RTId: doc.id,
                        Title: payload.tempLocation ? 'Start in ' + payload.tempLocation.label.split(',')[0] : 'Titel des 1. Stopps',
                        Location: payload.tempLocation ? payload.tempLocation : {
                          lng: '13.3888599',
                          lat: '52.5170365',
                          label: 'Berlin, 10117, Germany'
                        }
                      }).then(() => {
                        resolve(doc.id)
                      })
                    }
                  })
                })
              })
          })
        } catch (e) {
          console.log(e)
          resolve(null)
        }
      })
    },
    deleteRoundtrip ({ commit }, roundtripDocId) {
      return new Promise((resolve) => {
        let roundtripsRef = db.collection('RoundtripDetails')
          .where('RTId', '==', roundtripDocId)
        roundtripsRef.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              db.collection('RoundtripDetails').doc(doc.id).delete()
            })
          })

        db.collection('Roundtrips').doc(roundtripDocId).delete().then(function () {
          commit('removeRoundtrip', roundtripDocId)
          resolve(true)
        }).catch(function (error) {
          console.log(error)
          resolve(false)
        })
      })
    },
    resetAllRoundtrips ({ commit }) {
      commit('setRoundtrips', null)
      commit('setTitleImages', null)
    }
  }
}
