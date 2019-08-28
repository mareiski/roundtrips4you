<template>
  <div class="roundtrip-details q-px-lg q-pb-md">
    {{ this.$route.params.id }}
    <h3>Reiseverlauf</h3>
    <q-timeline color="secondary">
      <div class="stop-list">
        <Stop
          v-for="stop in stops"
          :key="stop"
          :title="stop.kind + ' Titel'"
          :date="stop.date"
          :icon="stop.kind == 'Stop' ? 'location_on' : 'hotel'"
          :editor-placeholder="stop.kind == 'Stop' ? 'Beschreibung des Stopps' : 'Beschreibung des Hotels'"
        ></Stop>
      </div>
    </q-timeline>
  </div>
</template>
<style lang="less">
@import "../css/editRoundtrips.less";
</style>
<script>
import { date } from 'quasar'
import Stop from '../pages/EditRoundtripComponents/stop'

let timeStamp = Date.now()
let formattedDate = date.formatDate(timeStamp, 'YYYY/MM/DD')

const stringOptions = [
  'Deutschland', 'Italien', 'Vietnam'
]

export default {
  components: {
    Stop
  },
  data () {
    return {
      options: ['Stop', 'Hotel'],
      selectedOption: null,
      date: formattedDate,
      addButtonActive: false,
      publish: false,
      addExpanded: false,
      title: 'Meine Rundreise',
      country: 'Land auswählen',
      submitting: false,
      countryOptions: stringOptions,
      stops: [
        {
          date: '2019/08/17',
          kind: 'Stop'
        },
        {
          date: '2019/08/18',
          kind: 'Hotel'
        }
      ]
    }
  },
  methods: {
    dateOptions (date) {
      return date >= formattedDate
    },
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
