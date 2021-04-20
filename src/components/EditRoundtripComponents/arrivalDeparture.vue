<template>
  <div>
    <q-select
      outlined
      v-model="currentRoundtrip.TransportProfile"
      input-debounce="0"
      :options="['Flugzeug', 'Auto (Bus, ...)']"
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
      <q-btn
        @click="openFluegeDeFlights()"
        class="q-mt-md"
        color="primary"
        text-color="white"
        :disable="!currentRoundtrip.Destination"
        label="Flüge auf fluege.de"
        style="width:220px"
      ></q-btn>
    </div>
    <div v-else-if="currentRoundtrip.TransportProfile === 'Auto (Bus, ...)'">
      <p style="text-align:left;">Wenn du mit dem Auto, Bus etc. fährst kannst du deine Fahrt direkt im nächsten Schritt planen.</p>
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
    },
    /**
 * Open fluege.de flights in a new tab
 * @requires childrenAges, originCode, destinationCode, adults, travelClass, depatureDate, returnDate
 */
    openFluegeDeFlights () {
      let babies = 0
      let children = 0

      this.currentRoundtrip.ChildrenAges.forEach((childAge) => {
        if (parseInt(childAge) < 2) babies++
      })
      children = this.currentRoundtrip.ChildrenAges.length - babies

      let cabinClass = this.getFluegeDeClass(this.currentRoundtrip.TravelClass)

      let originIata = this.getIataOutOfName(this.currentRoundtrip.Origin)
      let destinationIata = this.getIataOutOfName(this.currentRoundtrip.Destination)

      let fromDate = this.getFormattedDepatureReturnDate(this.datesModel.from)

      let url = 'https://www.fluege.de/flight/wait/?sFlightInput%5BflightType%5D=RT&sFlightInput%5BstoreSearch%5D=true&sFlightInput%5Bf0%5D%5BdepLocation%5D=' + originIata +
        '&sFlightInput%5Bf0%5D%5BaccMultiAirportDep%5D=&sFlightInput%5Bf0%5D%5BdepAirport%5D=' + originIata +
        '&sFlightInput%5Bf0%5D%5BarrLocation%5D=' + destinationIata + ' &sFlightInput%5Bf0%5D%5BaccMultiAirportArr%5D=' + destinationIata +
        '&sFlightInput%5Bf0%5D%5BarrAirport%5D=' + destinationIata + '&sFlightInput%5Bf0%5D%5Bdate%5D=' + fromDate +
        '&sFlightInput%5Bf1%5D%5Bdate%5D=' + this.getFormattedDepatureReturnDate(this.datesModel.to) + '&sFlightInput%5BpaxAdt%5D=' + this.currentRoundtrip.Adults + '&sFlightInput%5BpaxChd%5D=' + children +
        '&sFlightInput%5BpaxInf%5D=' + babies + '&sFlightInput%5BcabinClass%5D=' + cabinClass + '&sFlightInput%5BdepAirline%5D=&sFlightInput%5BareaSearch%5D=TRUE&pop%5Bf24%5D=on&sFlightInput%5Bf0%5D%5BtimeRange%5D=2&sFlightInput%5Bf1%5D%5BtimeRange%5D=2'
      window.open(url, '_blank')
    },
    /**
     * @returns iata for given airport name
     */
    getIataOutOfName (airportName) {
      let iataString = airportName.split('(')[1]

      if (iataString) {
        let result = iataString.split(')')[0]
        return result
      }
    },
    /**
    * Get class abbreviation from travel class string
    * @param {String} travelClass travel class string
    */
    getFluegeDeClass (travelClass) {
      if (travelClass === 'Economy' || travelClass === 'Premium Economy') return 'y'
      else if (travelClass === 'Business') return 'C'
      else return 'F'
    },
    /* Reformat date for third parties (eg. booking.com)
    * @returns string date in format jjjj-mm-dd
    */
    getFormattedDepatureReturnDate (dateString) {
      let timeParts = dateString.split(' ')
      let dateParts = timeParts[0].split('.')
      return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]
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
