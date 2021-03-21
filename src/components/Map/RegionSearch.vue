<template>
  <div
    class="flex region-search"
    style="flex-direction:column;"
  >
    <q-input
      v-model="regionName"
      outlined
      :loading="searchingForRegions"
      label="Region (wenn vorhanden)"
      style="width:300px; padding:0;"
      @click="regionListVisible ? regionListVisible = false : regionListVisible = true"
    >
      <template v-slot:append>
        <q-btn
          icon="search"
          @click="searchRegion()"
          round
        ></q-btn>
      </template>
    </q-input>
    <q-card>
      <q-list>
        <q-item
          :clickable="region !== null"
          @click="[regionName = region.name, hideHotelList(), $emit('update', regionName)]"
          v-show="regionListVisible"
          v-for="region in regions"
          :key="region"
        >
          {{region !== null ? region.name : 'Es konnten keine Regionen gefunden werden'}}
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>
<style lang="less" scoped>
@import url("../../css/hotelRegionSearch.less");
</style>
<script>
const getAxios = () => import('axios')

export default {
  data () {
    return {
      regionName: '',
      regions: [],
      searchingForRegions: false,
      regionListVisible: false
    }
  },
  props: {
    country: String,
    defaultRegion: String
  },
  methods: {
    searchRegion () {
      this.searchingForRegions = true
      this.getRegions(this.country, this.regionName).then((results) => {
        if (results !== null) {
          this.regions = results.data.data
          if (this.regions.length === 0) this.regions = { region: null }
        } else {
          this.regions = { region: null }
        }
        this.regionListVisible = true
        this.searchingForRegions = false
      })
    },
    hideHotelList () {
      this.regionListVisible = false
    },
    clear () {
      this.hotelName = ''
      this.hotels = null
      this.$refs.select.resetValidation()
    },
    getRegions (country, regionPref) {
      return new Promise((resolve, reject) => {
        let context = this
        getAxios().then(axios => {
          axios.get('https://wft-geo-db.p.mashape.com/v1/geo/countries?limit=5&offset=0&namePrefix=' + country + '&languageCode=de', {
            headers: {
              'X-RapidAPI-Key': context.$store.getters['api/getGeoDBKey']
            }
          }).then(function (response) {
            // wait 2 secs because only 1 request per sec is allowed
            setTimeout(function () {
              axios.get('https://wft-geo-db.p.mashape.com/v1/geo/countries/' + response.data.data[0].code + '/regions?limit=5&offset=0&languageCode=de&namePrefix=' + regionPref, {
                headers: {
                  'X-RapidAPI-Key': context.$store.getters['api/getGeoDBKey']
                }
              }).then(function (response) {
                resolve(response)
              }).catch(function (error) {
                console.log('Error' + error)
                resolve(null)
              })
            }, 2000)
          }).catch(function (error) {
            console.log('Error' + error)
            resolve(null)
          })
        }).catch(function (error) {
          console.log('Error ' + error)
          resolve(null)
        })
      })
    }
  },
  created () {
    this.regionName = this.defaultRegion
  }

}
</script>
