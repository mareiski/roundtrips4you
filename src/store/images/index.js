import { storage } from '../../firebaseInit.js'
import sharedMethods from '../../sharedMethods.js'

export default {
    namespaced: true,
    state: {
        images: [],
        uploadProgress: 10
    },
    mutations: {
        setGaleryImgs: (state, payload) => {
            let currentImageObject = state.images[state.images.findIndex(x => x.RTId === payload.RTId)]

            if (currentImageObject) {
                currentImageObject.galeryImgUrls = payload.galeryImgUrls
            } else {
                state.images.push({
                    RTId: payload.RTId,
                    galeryImgUrls: payload.galeryImgUrls,
                    titleImgUrl: null
                })
            }
        },
        addGaleryImg: (state, payload) => {
            let currentImageObject = state.images[state.images.findIndex(x => x.RTId === payload.RTId)]

            if (currentImageObject) {
                currentImageObject.galeryImgUrls.push(payload.newUrl)
            }
        },
        removeGaleryImg: (state, payload) => {
            let currentImageObject = state.images[state.images.findIndex(x => x.RTId === payload.RTId)]

            if (currentImageObject) {
                currentImageObject.galeryImgUrls.splice(currentImageObject.galeryImgUrls.indexOf(payload.url), 1)
            }
        },
        setTitleImg: (state, payload) => {
            let currentImageObject = state.images[state.images.findIndex(x => x.RTId === payload.RTId)]

            if (currentImageObject) {
                currentImageObject.titleImgUrl = payload.titleImgUrl
            } else {
                state.images.push({
                    RTId: payload.RTId,
                    galeryImgUrls: [],
                    titleImgUrl: payload.titleImgUrl
                })
            }
        },
        setUploadProgress: (state, progress) => {
            state.uploadProgress = progress
        }
    },
    getters: {
        getGaleryImgUrls: (state) => (RTId) => {
            let currentImageObject = state.images[state.images.findIndex(x => x.RTId === RTId)]
            return currentImageObject ? currentImageObject.galeryImgUrls : []
        },
        getTitleImg: (state) => (RTId) => {
            let currentImageObject = state.images[state.images.findIndex(x => x.RTId === RTId)]
            return currentImageObject ? currentImageObject.titleImgUrl : null
        },
        getUploadProgress: state => state.uploadProgress
    },
    actions: {
        loadAllImgs ({ state, dispatch }, RTId) {
            let currentImageObject = state.images[state.images.findIndex(x => x.RTId === RTId)]
            if (!currentImageObject) {
                dispatch('loadTitleImg', RTId)
                dispatch('loadGaleryImgs', RTId)
            }
        },
        loadTitleImg ({ commit }, RTId) {
            return new Promise(resolve => {
                let fileRef = storage
                    .ref()
                    .child('Images/Roundtrips/' + RTId + '/Title/titleImg')

                fileRef
                    .getDownloadURL()
                    .then(function (url) {
                        commit('setTitleImg', { RTId: RTId, titleImgUrl: url })
                        resolve(url)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            })
        },
        loadGaleryImgs ({ commit }, RTId) {
            return new Promise(resolve => {
                let galeryImgUrls = []
                let fileRef = storage
                    .ref()
                    .child('Images/Roundtrips/' + RTId + '/Galery')
                fileRef
                    .listAll()
                    .then(function (res) {
                        let promiseList = []
                        res.items.forEach(function (itemRef) {
                            fileRef = storage.ref().child(itemRef.fullPath)

                            promiseList.push(fileRef.getDownloadURL().then(function (url) {
                                galeryImgUrls.push(url)
                            }))

                            Promise.all(promiseList).then(() => {
                                commit('setGaleryImgs', { RTId: RTId, galeryImgUrls: galeryImgUrls })
                                resolve(galeryImgUrls)
                            })
                        })
                    })
                    .catch(e => {
                        console.log(e)
                        commit('setGaleryImgs', { RTId: RTId, galeryImgUrls: galeryImgUrls })
                        resolve(galeryImgUrls)
                    })
            })
        },
        deleteImage ({ getters, commit }, payload) {
            let galeryImgs = getters.getGaleryImgUrls(payload.RTId)
            let index = galeryImgs.indexOf(payload.url)

            if (index && index >= 0 && galeryImgs[index]) {
                let galeryImgNameArr = galeryImgs[index].split('Galery%2F')
                let galeryImgName = galeryImgNameArr[1]
                galeryImgName = galeryImgName.substring(0, galeryImgName.indexOf('?alt'))

                const fileRef = storage.ref().child('Images/Roundtrips/' + payload.RTId + '/Galery/' + galeryImgName)
                fileRef.delete().then(() => {
                    sharedMethods.showSuccessNotification('Bild gelöscht')
                    commit('removeGaleryImg', ({ RTId: payload.RTId, url: payload.url }))
                })
            } else {
                console.log('cant delete image, index: ' + index + ' galeryImgs[index]: ' + galeryImgs[index])
            }
        }
    }
}
