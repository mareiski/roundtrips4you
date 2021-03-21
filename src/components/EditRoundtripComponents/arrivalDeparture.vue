<template>
  <div>
    <q-select
      outlined
      v-model="currentRoundtrip.TransportProfile"
      input-debounce="0"
      :options="['Flugzeug', 'Andere']"
      label="Reisemittel"
      :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Reisemittel']"
      style="padding-bottom: 32px"
      @blur="emitArrivalDepartureChange()"
    >
      <template v-slot:prepend>
        <q-icon name="commute" />
      </template>
    </q-select>
    <div
      v-if="currentRoundtrip.TransportProfile === 'Flugzeug'"
      class="flight-container"
    >
      <q-select
        outlined=""
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        clearable
        ref="select"
        v-model="currentRoundtrip.Origin"
        hide-dropdown-icon
        label="Abflugsort"
        :options="originOptions"
        @blur="emitArrivalDepartureChange()"
        @filter="getOrigins"
        :rules="[val => val !== null && val !== '' || 'Bitte wähle einen Ort']"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              zu viele/keine Ergebnisse, bitte weitertippen
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:prepend>
          <q-icon name="flight_takeoff" />
        </template>
      </q-select>
      <q-select
        outlined=""
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        clearable
        ref="select"
        v-model="currentRoundtrip.Destination"
        hide-dropdown-icon
        label="Ankunftsort"
        :options="destinationOptions"
        @filter="getDestinations"
        @blur="emitArrivalDepartureChange()"
        :rules="[val => val !== null && val !== '' || 'Bitte wähle einen Ort']"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              zu viele/keine Ergebnisse, bitte weitertippen
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:prepend>
          <q-icon name="flight_land" />
        </template>
      </q-select>
      <div style="margin-bottom:20px;">
        <p>Reisezeitraum</p>
        <q-date
          today-btn
          mask="DD.MM.YYYY"
          v-model="datesModel"
          @input="emitArrivalDepartureChange()"
          range
        />
      </div>
      <q-select
        outlined
        v-model="currentRoundtrip.TravelClass"
        input-debounce="0"
        @blur="emitArrivalDepartureChange()"
        :options="['Economy', 'Premium Economy', 'Business', 'First']"
        label="Reiseklasse auswählen"
        :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Klasse']"
      >
        <template v-slot:prepend>
          <q-icon name="star" />
        </template>
      </q-select>
      <q-select
        outlined
        @blur="emitArrivalDepartureChange()"
        v-model="currentRoundtrip.NonStop"
        input-debounce="0"
        :options="['Ja', 'Nein']"
        label="Non Stop"
        :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Option']"
      >
        <template v-slot:prepend>
          <q-icon name="flight" />
        </template>
      </q-select>
    </div>
    <div v-else-if="currentRoundtrip.TransportProfile === 'Andere'">
      <p style="text-align:left;">Bei einem anderem Reisemittel können wir dir bei der Planung deiner An- und Abreise aktuell leider nicht helfen.</p>
      <p style="text-align:left;">Du kannst dafür sofort mit der Reiseplanung beginnen!</p>
    </div>
  </div>
</template>
<script>
import { date } from 'quasar'
import sharedMethods from '../../sharedMethods.js'

let timeStamp = Date.now()
let currentDate = new Date(timeStamp)
currentDate.setDate(currentDate.getDate() + 1)
let formattedScheduleDate = date.formatDate(timeStamp, 'DD.MM.YYYY')
let formattedNextScheduleDate = date.formatDate(currentDate, 'DD.MM.YYYY')

export default {
  data () {
    return {
      datesModel: {
        from: this.startDate ? this.startDate : (this.currentRoundtrip.DepatureDate ? sharedMethods.getStringDateFromTimestamp(this.currentRoundtrip.DepatureDate) : formattedScheduleDate),
        to: this.currentRoundtrip.ReturnDate ? (typeof this.currentRoundtrip.ReturnDate === 'string' ? this.currentRoundtrip.ReturnDate : sharedMethods.getStringDateFromTimestamp(this.currentRoundtrip.ReturnDate)) : formattedNextScheduleDate
      },
      originOptions: [],
      destinationOptions: []
    }
  },
  props: {
    currentRoundtrip: Object,
    startDate: String
  },
  methods: {
    getOrigins (val, update, abort) {
      sharedMethods.filterAirports(val, update, abort, this, 'originOptions')
    },
    getDestinations (val, update, abort) {
      sharedMethods.filterAirports(val, update, abort, this, 'destinationOptions')
    },
    emitArrivalDepartureChange () {
      let data = {
        transportProfile: this.currentRoundtrip.TransportProfile,
        origin: this.currentRoundtrip.Origin,
        destination: this.currentRoundtrip.Destination,
        depatureDate: this.datesModel.from,
        returnDate: this.datesModel.to,
        travelClass: this.currentRoundtrip.TravelClass,
        nonStop: this.currentRoundtrip.NonStop
      }
      this.$emit('updateArrivalDeparture', data)
    }
  },
  created () {
    if (this.datesModel.from === this.datesModel.to) {
      let toDate = sharedMethods.getDateFromString(this.datesModel.to)
      toDate.setDate(toDate.getDate() + 1)
      this.datesModel.to = date.formatDate(toDate, 'DD.MM.YYYY')
    }
  }
}
</script>
