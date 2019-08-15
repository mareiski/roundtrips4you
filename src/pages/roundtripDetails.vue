<template>
  <div class="roundtrips">
    <h2 class="topic">{{country}}: {{roundtrips.length}} Rundreisen gefunden</h2>
    <div id="CardBackgroundImg"></div>
    <div id="RoundtripCardBackgroundImgPlaceholder">
      <div class="filter-container">
        <div class="fliter-card">
          <h2>Suche</h2>
          <q-expansion-item
            icon="explore"
            expand-separator
            :label="country"
            ref="expansionItem"
            class="input-item"
          >
            <q-list
              bordered
              class="rounded-borders"
            >
              <q-expansion-item
                expand-separator
                label="Europa"
                group="regionGroup"
              >
                <q-list
                  bordered
                  separator
                >
                  <q-item
                    clickable
                    v-ripple
                    @click="() => $refs.expansionItem.label = this.$root.$el.getElementsByClassName('q-item-section')[0].innerHTML"
                  >
                    <q-item-section
                      class="q-item-section"
                      @click="() =>  $refs.expansionItem.hide()"
                      ref="iconSection"
                    >Deutschland</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    @click="() => $refs.expansionItem.label = this.$root.$el.getElementsByClassName('q-item-section')[1].innerHTML"
                    v-ripple
                  >
                    <q-item-section
                      class="q-item-section"
                      @click="() =>  $refs.expansionItem.hide()"
                    >Italien</q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
              <q-expansion-item
                expand-separator
                label="Asien"
                group="regionGroup"
                v-model="countryInput"
              >
                <q-list
                  bordered
                  separator
                >
                  <q-item
                    clickable
                    v-ripple
                    @click="() => $refs.expansionItem.label = this.$root.$el.getElementsByClassName('q-item-section')[2].innerHTML"
                  >
                    <q-item-section
                      class="q-item-section"
                      @click="() =>  $refs.expansionItem.hide()"
                    >Vietnam</q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </q-list>
          </q-expansion-item>
          <q-input
            filled
            v-model="date"
            mask="date"
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
            v-model="model"
            :options="options"
            label="Zeitraum"
            clearable
            class="input-item"
          >
            <template v-slot:prepend>
              <q-icon name="access_time" />
            </template>
          </q-select>
          <a class="button">Suchen</a>

        </div>
        <div class="fliter-card">
          <h2>Filter</h2>
          <q-list
            bordered
            class="rounded-borders"
          >
            <q-expansion-item
              label="Preis pro Person"
              class="filter-expansion"
              default-opened
            >
              <q-range
                v-model="step"
                :min="0"
                :max="330"
                :step="10"
                :left-label-value="step.min + ' €'"
                :right-label-value="step.max + ' €'"
                label
                color="deep-orange"
              />
              <p>
                Preis ab {{ step.min }} € bis {{ step.max }} €
              </p>
            </q-expansion-item>
            <q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Reiseart
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Die Art deiner Reise
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
              <q-checkbox
                v-for="kind in tripKind"
                :key="kind"
                :label="kind"
                v-model="filteredTripKinds"
                :val="kind"
                color="dark-orange"
              />
            </q-expansion-item>
            <q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Reisemerkmal
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Die Merkmale deiner Reise
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
              <q-checkbox
                v-for="attr in roundtripAttr"
                :key="attr"
                :label="attr"
                v-model="filteredRoundtripAttr"
                :val="attr"
                color="dark-orange"
              />
            </q-expansion-item>
            <q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Reisekategorie
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Die Kategorie der Reise
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
              <q-checkbox
                v-for="category in roundtripCategories"
                :key="category"
                :label="category"
                v-model="filteredRoundtripCategory"
                :val="category"
                color="dark-orange"
              />
            </q-expansion-item>
            <q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Region
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Die Region in der deine Reise stattfindet
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
              <q-checkbox
                label="Gruppenreise"
                v-model="orange"
                color="dark-orange"
              />
              <q-checkbox
                label="Gruppenreise"
                v-model="orange"
                color="dark-orange"
              />
            </q-expansion-item>
            <q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Sehenswürdigkeiten
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Die Sehenswürdigkeiten auf deiner Reise
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
              <q-checkbox
                label="Gruppenreise"
                v-model="orange"
                color="dark-orange"
              />
              <q-checkbox
                label="Gruppenreise"
                v-model="orange"
                color="dark-orange"
              />
            </q-expansion-item>
            <q-expansion-item
              class="filter-expansion"
              default-opened
            >
              <template v-slot:header>
                <q-item-section>
                  Veranstalter
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info">
                    <q-tooltip>
                      Der Veranstalter für deine Reise
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
              </template>
              <q-checkbox
                label="Gruppenreise"
                v-model="orange"
                color="dark-orange"
              />
              <q-checkbox
                label="Gruppenreise"
                v-model="orange"
                color="dark-orange"
              />
            </q-expansion-item>
          </q-list>
          <a class="button">Suchen</a>
        </div>
      </div>
      <div class="roundtrip-cards-container">
        <div
          class="roundtrip-card-container"
          v-for="roundtrip in roundtrips"
          :key="roundtrip"
        >
          <div class="roundtrip-card">
            <div class="card-left-col">
              <div
                class="card-image"
                :style="{ backgroundImage: 'url('+ require('../statics/' + roundtrip.imageUrl) +')' }"
              ></div>
            </div>
            <div class="card-center-col">
              <div class="card-row">
                <span class="card-category">{{roundtrip.category}}</span>
                <h2 class="country-title">{{roundtrip.title}}</h2>
              </div>
              <div class="card-row">
                <q-rating
                  class="stars"
                  v-model="roundtrip.stars"
                  size="15px"
                  color="gold"
                  readonly
                />
                <font-awesome-icon
                  class="marker"
                  icon="map-marker-alt"
                />
                <span class="country-title">{{country}}</span>
              </div>
              <div class="card-row">
                <span class="card-days">{{roundtrip.days}} Tage,</span>
                <span class="card-hotels">{{roundtrip.hotels}} Hotels</span>
              </div>
              <div class="card-row">
                <p class="card-description">{{roundtrip.description}}</p>
              </div>
              <div class="card-bottom-row">
                <span class="card-tag">{{roundtrip.tags[0]}}</span>
                <span class="card-tag">{{roundtrip.tags[1]}}</span>
                <span class="card-tag">{{roundtrip.tags[2]}}</span>
              </div>
            </div>
            <div class="card-right-col">
              <div class="card-row">
                <img
                  class="advertiser-logo"
                  :src="require('../statics/' + roundtrip.advertiser + '.png')"
                />
              </div>
              <div class="card-bottom-row">
                <a class="button price-button"><span>&euro;</span>{{roundtrip.price}}<span>p.P.</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
@import "../css/roundtrips.less";
</style>
<script>
import { date } from 'quasar'
let timeStamp = Date.now()
let formattedDate = date.formatDate(timeStamp, 'YYYY/MM/DD')

export default {
  data () {
    return {
      date: formattedDate,
      country: 'Italien',
      model: null,
      orange: false,
      options: [
        '< 5 Tage', '5-8 Tage', '9-11 Tage', '12-15 Tage', '> 15 Tage'
      ],
      step: {
        min: 0,
        max: 330
      },
      filteredRoundtripAttr: [],
      roundtripAttr: ['inklusive Flug', 'kleine Reisegruppe'],
      filteredTripKinds: [],
      tripKind: ['Gruppenreise'],
      roundtripCategories: ['einblick'],
      filteredRoundtripCategory: [],
      roundtrips: [
        {
          id: '0',
          title: 'Venedig entdecken',
          category: 'einblick',
          imageUrl: 'venice.jpg',
          stars: 5,
          location: 'Italien',
          days: '10',
          hotels: '5',
          description: 'Entdecke Venedig auf einer der schönsten Routen Italiens.',
          tags: ['Gruppenreise', 'inklusive Flug', 'kleine Reisegruppe'],
          advertiser: 'gebeco',
          price: '330'
        },
        {
          id: '1',
          title: 'Venedig entdecken',
          category: 'einblick',
          imageUrl: 'venice.jpg',
          stars: 5,
          location: 'Italien',
          days: '10',
          hotels: '5',
          description: 'Entdecke Venedig auf einer der schönsten Routen Italiens.',
          tags: ['Gruppenreise', 'inklusive Flug', 'kleine Reisegruppe'],
          advertiser: 'gebeco',
          price: '330'
        },
        {
          id: '3',
          title: 'Venedig entdecken',
          category: 'einblick',
          imageUrl: 'venice.jpg',
          stars: 3,
          location: 'Italien',
          days: '10',
          hotels: '5',
          description: 'Entdecke Venedig auf einer der schönsten Routen Italiens.',
          tags: ['Gruppenreise', 'inklusive Flug', 'kleine Reisegruppe'],
          advertiser: 'gebeco',
          price: '330'
        }
      ]
    }
  },
  name: 'roundtripdetails',
  methods: {
    dateOptions (date) {
      return date >= formattedDate
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
