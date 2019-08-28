<template>
  <div class="edit-roundtrips q-px-lg q-pb-md">
    <h3>Reiseverlauf</h3>
    <q-timeline color="secondary">
      <q-timeline-entry heading>
        {{title}}
        <q-popup-edit v-model="title">
          <q-input
            v-model="title"
            dense
            autofocus
            counter
          />
        </q-popup-edit>
      </q-timeline-entry>

      <div class="stop-list">
        <Stop
          v-for="stop in stops"
          :key="stop"
          :title="stop.kind + ' Titel'"
          :date="stop.date"
          :icon="stop.kind == 'Stop' ? 'location_on' : 'hotel'"
          :editor-placeholder="stop.kind == 'Stop' ? 'Beschreibung des Stopps' : 'Beschreibung des Hotels'"
          editor="true"
        ></Stop>
      </div>
    </q-timeline>
    <q-list
      bordered
      class="rounded-borders"
    >
      <q-expansion-item
        clickable
        expand-separator
        v-model="addExpanded"
        class="add-item"
        @click="addButtonActive = !addButtonActive"
      >
        <template v-slot:header>
          <q-item-section style="align-items: center;">
            <q-btn
              class="add-button"
              side
              round
              color="primary"
              icon="add"
              :class="{ active: addButtonActive }"
            >
            </q-btn>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <q-form
              @submit="onSubmit"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="date"
                mask="date"
                lazy-rules
                :rules="['date']"
                class="input-item"
              >
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="date"
                    today-btn
                    :options="dateOptions"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
                <template v-slot:prepend>
                  <q-icon
                    name="event"
                    class="cursor-pointer"
                  >
                  </q-icon>
                </template>
              </q-input>
              <q-select
                outlined
                v-model="selectedOption"
                :options="options"
                label="Eintrag"
                clearable
                class="input-item"
                lazy-rules
                :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Option']"
              >
                <template v-slot:prepend>
                  <q-icon name="list" />
                </template>
              </q-select>
              <div>
                <q-btn
                  round
                  color="primary"
                  icon="add"
                  type="submit"
                >
                  <q-tooltip>
                    Eintrag hinzufügen
                  </q-tooltip>
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <h3>Allgemeine Einstellungen</h3>
    <q-form
      @submit="onSaveRoundtrip"
      bordered
      class="q-gutter-md rounded-borders"
    >
      <q-list
        bordered
        class="rounded-borders"
        style="padding:10px"
      >
        <q-toggle
          v-model="publish"
          label="Rundreise veröffentlichen"
          icon="publish"
        >
          <q-tooltip>
            Wenn deine Rundreise veröffentlicht ist kann sie jeder ansehen.
          </q-tooltip>
        </q-toggle>
        <q-select
          filled
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          label="Land auswählen"
          :options="countryOptions"
          @filter="filterFn"
          style="width: 250px; padding-bottom: 32px"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Keine Ergebnisse
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-uploader
          url="http://localhost:8080/statics/upload/"
          auto-upload
          label="Titelbild hochladen"
          accept=".jpg, image/*"
          style="max-width: 300px"
        />
        <q-uploader
          url="http://localhost:4444/upload"
          label="Weitere Bilder hochladen"
          multiple
          style="max-width: 300px"
        />
        <div class="row justify-end">
          <q-btn
            type="submit"
            :loading="submitting"
            label="Save"
            class="q-mt-md"
            color="primary"
            text-color="white"
          >
            <template v-slot:loading>
              <q-spinner-puff />
            </template>
          </q-btn>
        </div>
      </q-list>
    </q-form>
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
    onSubmit () {
      this.addExpanded = false
      this.addButtonActive = false

      this.stops.push({ date: this.date, kind: this.selectedOption })

      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message: 'Eintrag wurde erstellt'
      })
    },
    onSaveRoundtrip () {
      this.submitting = true

      // Simulating a delay here.
      setTimeout(() => {
        this.submitting = false
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Rundreise wurde gespeichert'
        })
      }, 3000)
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
