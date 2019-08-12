<template>
  <div class="roundtrips">
    <h2 class="topic">{{country}}: {{roundtrips.length}} Rundreisen gefunden</h2>
    <div id="CardBackgroundImg"></div>
    <div id="RoundtripCardBackgroundImgPlaceholder">
      <div class="filter-container">
        <div class="fliter-card">
          <h2>Suche</h2>
          <q-input
            filled
            v-model="countryInput"
            mask="text"
          >
            <q-popup-proxy
              ref="regionProxy"
              :breakpoint="600"
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
                      v-model="countryInput"
                      @click="() => $refs.regionProxy.hide()"
                    >
                      <q-item-section>Deutschland</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-model="countryInput"
                      @click="() => $refs.regionProxy.hide()"
                      v-ripple
                    >
                      <q-item-section>Italien</q-item-section>
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
                      @click="() => $refs.regionProxy.hide()"
                    >
                      <q-item-section>Vietnam</q-item-section>
                    </q-item>
                  </q-list>
                </q-expansion-item>
              </q-list>
            </q-popup-proxy>
          </q-input>
          <q-input
            filled
            v-model="date"
            mask="date"
            :rules="['date']"
          >
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="date"
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
          >
            <template v-slot:prepend>
              <q-icon name="access_time" />
            </template>
          </q-select>
          <a class="button">Suchen</a>

        </div>
        <div class="fliter-card">
          <h2>Filter</h2>
          <p>
            Preis ab {{ step.min }} € bis {{ step.max }} €
          </p>
          <q-range
            v-model="step"
            :min="0"
            :max="45"
            :step="5"
            :left-label-value="step.min + ' €'"
            :right-label-value="step.max + ' €'"
            label
            color="deep-orange"
          />
          <input />
          <input />
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
                :style="{ backgroundImage: 'url('+ require('../assets/' + roundtrip.imageUrl) +')' }"
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
                  :src="require('../assets/' + roundtrip.advertiser + '.png')"
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
export default {
  data () {
    return {
      date: '2018/11/03',
      country: 'Italien',
      model: null,
      countryInput: null,
      options: [
        '< 5 Tage', '5-8 Tage', '9-11 Tage', '12-15 Tage', '> 15 Tage'
      ],
      step: {
        min: 10,
        max: 20
      },
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
          description: 'Entdecke Venedig auf einer der sch�nsten Routen Italiens.',
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
          description: 'Entdecke Venedig auf einer der sch�nsten Routen Italiens.',
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
          description: 'Entdecke Venedig auf einer der sch�nsten Routen Italiens.',
          tags: ['Gruppenreise', 'inklusive Flug', 'kleine Reisegruppe'],
          advertiser: 'gebeco',
          price: '330'
        }
      ]
    }
  },
  name: 'roundtripdetails'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
