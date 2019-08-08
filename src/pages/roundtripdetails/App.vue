<template>
    <div class="roundtrips">
        <h2 class="topic">{{country}}: {{roundtrips.length}} Rundreisen gefunden</h2>
        <div id="CardBackgroundImg"></div>
        <div id="RoundtripCardBackgroundImgPlaceholder">
            <div class="filter-container">
                <div class="fliter-card">
                    <h2>Suche</h2>
                    <div class="destination-dropdown-container">
                        <div onclick="document.getElementById('ContinentUl').classList.toggle('active'); this.classList.toggle('active');" class="dropdown">
                            <span>Land</span>
                            <font-awesome-icon icon="chevron-down" />
                        </div>
                        <ul id="ContinentUl">
                            <li>
                                <div onclick="document.getElementById('EuropeUl').classList.toggle('active');  this.classList.toggle('active');" class="dropdown">
                                    <span>Europa</span>
                                    <font-awesome-icon icon="chevron-down" />
                                </div>
                                <ul id="EuropeUl">
                                    <li>Italien</li>
                                    <li>Italien</li>
                                    <li>Italien</li>
                                </ul>
                                <div onclick="document.getElementById('AsiaUl').classList.toggle('active');  this.classList.toggle('active');" class="dropdown">
                                    <span>Asien</span>
                                    <font-awesome-icon icon="chevron-down" />
                                </div>
                                <ul id="AsiaUl">
                                    <li>Italien</li>
                                    <li>Italien</li>
                                    <li>Italien</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="q-pa-md">
                        <div class="q-gutter-md" style="max-width: 300px">
                            <q-input filled v-model="date">
                                <template v-slot:prepend>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-date v-model="date" mask="YYYY-MM-DD HH:mm" />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>

                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                    </div>
                        <input />
                        <a class="button">Suchen</a>
                   
                </div>
                <div class="fliter-card">
                    <h2>Filter</h2>

                    <template>
                        <div class="q-pa-md q-gutter-sm">
                            <q-btn label="Alert" color="primary" @click="alert = true" />
                            <q-btn label="Confirm" color="primary" @click="confirm = true" />
                            <q-btn label="Prompt" color="primary" @click="prompt = true" />

                            <q-dialog v-model="alert">
                                <q-card>
                                    <q-card-section>
                                        <div class="text-h6">Alert</div>
                                    </q-card-section>

                                    <q-card-section>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
                                    </q-card-section>

                                    <q-card-actions align="right">
                                        <q-btn flat label="OK" color="primary" v-close-popup />
                                    </q-card-actions>
                                </q-card>
                            </q-dialog>
                                <q-card-section>
                                    <div class="text-h6">Alert</div>
                                </q-card-section>

                                <q-card-section>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
                                </q-card-section>

                                <q-card-actions align="right">
                                    <q-btn flat label="OK" color="primary" v-close-popup />
                                </q-card-actions>

                            <q-dialog v-model="confirm" persistent>
                                <q-card>
                                    <q-card-section class="row items-center">
                                        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
                                        <span class="q-ml-sm">You are currently not connected to any network.</span>
                                    </q-card-section>

                                    <q-card-actions align="right">
                                        <q-btn flat label="Cancel" color="primary" v-close-popup />
                                        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
                                    </q-card-actions>
                                </q-card>
                            </q-dialog>

                            <q-dialog v-model="prompt" persistent>
                                <q-card style="min-width: 400px">
                                    <q-card-section>
                                        <div class="text-h6">Your address</div>
                                    </q-card-section>

                                    <q-card-section>
                                        <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" />
                                    </q-card-section>

                                    <q-card-actions align="right" class="text-primary">
                                        <q-btn flat label="Cancel" v-close-popup />
                                        <q-btn flat label="Add address" v-close-popup />
                                    </q-card-actions>
                                </q-card>
                            </q-dialog>
                        </div>
                    </template> 
                    <p>
                        Preis ab {{ step.min }} € bis {{ step.max }} €
                    </p>

                    <q-range v-model="step"
                             :min="0"
                             :max="45"
                             :step="5"
                             :left-label-value="step.min + ' €'"
                             :right-label-value="step.max + ' €'"
                             label
                             color="deep-orange" />
                    <input />
                    <input />
                    <a class="button">Suchen</a>
                </div>

                </div>
            <div class="roundtrip-cards-container">
                <div class="roundtrip-card-container" v-for="roundtrip in roundtrips" :key="roundtrip">
                    <div class="roundtrip-card">
                        <div class="card-left-col">
                            <div class="card-image" :style="{ backgroundImage: 'url('+ require('@/assets/' + roundtrip.imageUrl) +')' }"></div>
                        </div>
                        <div class="card-center-col">
                            <div class="card-row">
                                <span class="card-category">{{roundtrip.category}}</span>
                                <h2 class="country-title">{{roundtrip.title}}</h2>
                            </div>
                            <div class="card-row">
                                <q-rating class="stars" v-model="roundtrip.stars" size="15px" color="gold" readonly />
                                <font-awesome-icon class="marker" icon="map-marker-alt" />
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
                                <img class="advertiser-logo" :src="require('@/assets/' + roundtrip.advertiser + '.png')" />
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
    @import '../../styles/roundtrips.less';
</style>
<script>
    export default {
        data() {
            return {
                input: '',
                date: '2018/11/03',
                country: 'Italien',
                  alert: false,
      confirm: false,
      prompt: false,
      address: '',
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
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
