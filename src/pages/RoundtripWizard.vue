<template>
  <div
    id="roundtripWizard"
    style="padding-top:20px;"
    class="q-px-lg q-pb-md"
  >
    <div style="margin-bottom:20px;">
      <a @click="$router.push('meine-rundreisen')">zu meinen Rundreisen</a>
    </div>
    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      animated
      keep-alive
    >
      <template v-slot:navigation>
        <!-- placholder for sticky nav -->
        <div style="height:80px;"></div>
      </template>

      <template v-slot:message>
        <div class="sticky-navigation">
          <q-stepper-navigation class="flex justify-end">
            <template v-if="step === 1">
              <q-btn
                color="primary"
                :disable="!currentRoundtrip.Title || !currentRoundtrip.Rooms || !currentRoundtrip.Adults"
                @click="step = 2"
                label="weiter"
              />
            </template>

            <template v-else-if="step === 2">
              <q-btn
                flat
                @click="step = 1"
                color="primary"
                label="Zurück"
                class="q-ml-sm"
              />
              <q-btn
                @click="step = 3"
                color="primary"
                :disable="(currentRoundtrip.TransportProfile === 'Flugzeug' && (!currentRoundtrip.TransportProfile || !currentRoundtrip.Origin || !currentRoundtrip.Destination || !currentRoundtrip.DepatureDate || !currentRoundtrip.ReturnDate || !currentRoundtrip.TravelClass || !currentRoundtrip.NonStop))"
                label="Weiter"
              />
            </template>

            <template v-else-if="step === 3">
              <q-btn
                flat
                @click="step = 2"
                color="primary"
                label="zurück"
                class="q-ml-sm"
              />
              <q-btn
                color="primary"
                v-if="addedStops.length > 0"
                @click="step = 6"
                label="zur Reiseübersicht"
              />
            </template>

            <template v-else-if="step === 5">
              <q-btn
                flat
                @click="!inspirationDone ? step = 3 : step = 4"
                color="primary"
                label="zurück"
                class="q-ml-sm"
              />
              <q-btn
                color="primary"
                :disable="!currentStop.Title && currentStopDayDuration <= 0"
                @click="() => { done3 = true; step = 6; addStop() }"
                label="hinzufügen"
              />
            </template>

            <template v-else-if="step === 6">
              <q-btn
                color="primary"
                @click="step = 3"
                icon="add"
                label="weiteren Stopp"
              />
              <q-btn
                flat
                color="primary"
                label="Reise fertigstellen"
                class="q-ml-sm"
                @click="createTrip()"
              />
            </template>
          </q-stepper-navigation>
        </div>
      </template>

      <q-step
        :name="1"
        title="Allgemeine Infos"
        icon="settings"
        :done="step > 1"
        :header-nav="step > 1"
      >
        <q-input
          v-model="currentRoundtrip.Title"
          :rules="[val => val !== null &&  val !== ''  || 'Bitte gib einen Titel an', val => isUniqueTitle(val), val => val[0] !== ' ' || 'Das erste Zeichen kann kein Leerzeichen sein']"
          label="Titel"
          outlined
          ref="titleInput"
        >
          <template v-slot:prepend>
            <q-icon name="title" />
          </template>
        </q-input>

        <div>
          <q-input
            v-model="currentRoundtrip.Rooms"
            label="Zimmer"
            type="number"
            :rules="[val => val !== null &&  val !== '' && val > 0  || 'Bitte gib eine Zimmeranzahl an']"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="house" />
            </template>
          </q-input>

          <q-input
            v-model="currentRoundtrip.Adults"
            label="Erwachsene"
            type="number"
            :rules="[val => val !== null &&  val !== '' && val > 0  || 'Bitte gib die Anzahl der Erwachsenen Reisenden an', val => val <= parseInt(currentRoundtrip.Rooms) * 9 || 'Bitte wähle mehr Zimmer']"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="group" />
            </template>
          </q-input>
          <q-input
            v-model="currentRoundtrip.Children"
            label="Kinder"
            type="number"
            @input="currentRoundtrip.ChildrenAges.length = parseInt(currentRoundtrip.ChildrenAges)"
            :rules="[val => val !== null &&  val !== '' && val >= 0  && val <= 20|| 'Bitte gib die Anzahl der Kinder auf der Reise an']"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="child_friendly" />
            </template>
          </q-input>
          <div
            class="flex justify-center"
            style="margin:auto; margin-top:20px;"
            v-if="parseInt(currentRoundtrip.Children) > 0  && parseInt(currentRoundtrip.Children) <= 20"
          >
            <q-input
              v-for="childNum in parseInt(currentRoundtrip.Children)"
              :key="childNum"
              v-model="currentRoundtrip.ChildrenAges[childNum - 1]"
              :label="'Alter Kind ' + childNum"
              type="number"
              style="margin-right:10px;"
              :rules="[val => val !== null &&  val !== '' && val > 0 || 'Bitte gib das Alter des Kindes an']"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="child_friendly" />
              </template>
            </q-input>
          </div>
        </div>
        <q-input
          filled
          v-model="currentStop.InitDate"
          error-message="Bitte gib ein richtiges Datum an"
          :error="!isDateTimeValid()"
          lazy-rules
          bottom-slots
          style="width:300px"
          class="input-item"
          outlined
          label="Startdatum"
        >
          <template v-slot:prepend>
            <q-icon
              name="event"
              class="cursor-pointer"
            >
              <q-popup-proxy
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="currentStop.InitDate"
                  today-btn
                  mask="DD.MM.YYYY HH:mm"
                />
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon
              name="access_time"
              class="cursor-pointer"
            >
              <q-popup-proxy
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time
                  v-model="currentStop.InitDate"
                  mask="DD.MM.YYYY HH:mm"
                  format24h
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-step>

      <q-step
        :name="2"
        title="An-/Abreise"
        icon="flight"
        :done="step > 2"
        :header-nav="step > 2"
      >
        <q-select
          outlined
          v-model="currentRoundtrip.TransportProfile"
          input-debounce="0"
          :options="['Flugzeug', 'Andere']"
          label="Reisemittel"
          :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Reisemittel']"
          style="padding-bottom: 32px"
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
            @filter="getOrigins"
            style="width:300px;"
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
            style="width:300px;"
            @input="destinationChanged($event)"
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
          <q-input
            outlined
            v-model="currentRoundtrip.DepatureDate"
            label="Abflugsdatum"
            class="input-item rounded-borders q-field--with-bottom"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="currentRoundtrip.DepatureDate"
                today-btn
                mask="DD.MM.YYYY"
                @input="updateReturnDate()"
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
          <q-input
            outlined
            v-model="currentRoundtrip.ReturnDate"
            label="Rückflugsdatum"
            class="input-item rounded-borders q-field--with-bottom"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="currentRoundtrip.ReturnDate"
                today-btn
                mask="DD.MM.YYYY"
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
            v-model="currentRoundtrip.TravelClass"
            input-debounce="0"
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
        <div v-else>
          <p style="text-align:left;">Bei einem anderem Reisemittel können wir dir bei der Planung deiner An- und Abreise aktuell leider nicht helfen.</p>
          <p style="text-align:left;">Du kannst dafür sofort mit der Reiseplanung beginnen!</p>
        </div>
      </q-step>

      <q-step
        :name="3"
        title="Reiseziel"
        icon="place"
        :done="step > 3"
        :header-nav="step > 3"
      >

        <div class="flex justify-around add-stop-choose-container">
          <q-card bordered>
            <q-card-section>
              <div class="text-h6">Land wählen</div>
              <p>Wähle ein Land aus, damit dir Städte vorgeschlagen werden können</p>
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <q-select
                outlined
                v-model="country"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="countryOptions"
                label="Land auswählen"
                @filter="filterCountries"
                @input="step = 4"
                :rules="[val => val !== null && val !== '' && val !== 'Land wählen' || 'Bitte wähle ein Land']"
              >
                <template v-slot:prepend>
                  <q-icon name="explore" />
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Keine Ergebnisse
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                :disable="!country || country === 'Land wählen'"
                @click="step = 4"
                flat
              >Städte vorschlagen</q-btn>
            </q-card-actions>
          </q-card>

          <q-card bordered>
            <q-card-section>
              <div class="text-h6">Ort direkt hinzufügen</div>
              <p>Wähle einen Ort aus um in direkt zur Reise hinzuzufügen</p>

            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <CitySearch
                ref="citySearch"
                :parkingPlaceSearch="false"
                :defaultLocation="currentStop.Location"
                @update="updateLocation($event)"
              ></CitySearch>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                :disable="!currentStop.Location"
                flat
                @click="inspirationDone = false; step = 5"
              >wählen</q-btn>
            </q-card-actions>
          </q-card>
          <q-card
            bordered
            class="map-card"
          >
            <q-card-section>
              <div class="text-h6">Auf Karte wählen</div>
              <p>Wähle einen Ort auf der Karte um ihn zur Reise hinzuzufügen</p>

            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <Map
                :profile="addedStops[0] ? addedStops[0].Profile : 'driving'"
                :stops="addedStops"
                :childrenAges="currentRoundtrip.ChildrenAges"
                :rooms="Number(currentRoundtrip.Rooms)"
                :adults="Number(currentRoundtrip.Adults)"
                :editor="true"
                ref="addStopMap"
              ></Map>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                :disable="!currentStop.Location"
                flat
                @click="inspirationDone = false; step = 5"
              >wählen</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </q-step>
      <q-step
        :name="4"
        title="Inspiration"
        icon="star"
        :done="inspirationDone"
        :disable="step != 4 && !inspirationDone"
        :header-nav="step > 4"
      >

        <CitySuggestion
          :dates="null"
          :RTId="$route.params.id"
          :predefinedCountry="country"
          :shouldAddCity="false"
          @update="updateFromSuggestedCity($event)"
        ></CitySuggestion>
      </q-step>

      <q-step
        :name="5"
        title="Details"
        icon="subject"
        :done="step > 5"
        :header-nav="step > 5"
      >
        <q-input
          v-model="currentStop.Title"
          :rules="[val => val !== null &&  val !== ''  || 'Bitte gib einen Titel an']"
          style="font-family:Raleway; font-size:1.25rem;"
          autofocus
          label="Titel"
          label-color="secondary"
          filled
          lazy-rules
        />

        <q-input
          v-model.number="currentStopDayDuration"
          type="number"
          filled
          label="Dauer in Tagen"
          :rules="[val => val !== null &&  val !== '' && val > 0 || 'Bitte gib eine Anzahl von Tagen ein']"
          lazy-rules
        />
        <q-select
          outlined
          v-model="inputProfile"
          :options="['zu Fuß', 'Fahrrad', 'Auto']"
          label="Reisemittel"
          use-input
          :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Reisemittel']"
          class="input-item"
          @input="getGeneralProfile()"
        >
          <template v-slot:prepend>
            <q-icon name="commute" />
          </template>
        </q-select>

        <div
          style="margin-bottom:30px"
          v-if="!hotelName"
        >
          <q-btn
            size="20"
            icon="add"
            @click="addHotel = true"
          >Hotel hinzufügen
          </q-btn>
        </div>

        <div style="margin-bottom:20px;">
          <q-list
            bordered
            padding
            dense
            class="rounded-borders"
            v-if="hotelName"
          >
            <q-item class="hotel-list">
              <q-item-section
                avatar
                top
              >
                <q-avatar
                  color="secondary"
                  text-color="white"
                  font-size="20px"
                  icon="hotel"
                >
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label
                  lines="2"
                  class="flex"
                  style="flex-wrap:wrap; white-space:normal;"
                >
                  <span style="padding-right:5px;">{{capitalize(hotelName)}}</span>
                  <q-rating
                    v-if="hotelStars && !isNaN(hotelStars)"
                    class="stars"
                    v-model="hotelStars"
                    readonly
                    size="15px"
                    color="gold"
                    style="margin-right:10px; padding-right:5px;"
                  />
                  <div
                    class="flex"
                    style="flex-wrap:wrap; white-space:normal;"
                  >
                    <span
                      v-if="guestRating"
                      class="raleway"
                    >
                      {{guestRating}},&nbsp;
                    </span>
                    <span v-if="hotelPrice">
                      <span class="raleway">ca. € </span>
                      <span class="raleway">{{hotelPrice}}</span>
                      <q-tooltip>ungefährer Durchschnittspreis pro Person & Nacht</q-tooltip>
                    </span>
                  </div>
                </q-item-label>
                <q-item-label
                  caption
                  style="overflow:hidden;"
                >
                  <a
                    class="ellipsis"
                    @click="openInNewTab('https://www.google.com/maps/search/?api=1&query=' + capitalize(hotelName + ', ' + hotelLocation.label))"
                  >{{hotelLocation && typeof hotelLocation !== 'undefined' && hotelLocation.label && typeof hotelLocation.label !== 'undefined' ? capitalize(hotelLocation.label) :  'kein Ort angegeben'}}</a>
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-btn
                  v-if="transportLocations && transportLocations.lenght > 0"
                  style="width:150px;"
                  @click="showTransportDialog = true"
                >Transport
                </q-btn>
              </q-item-section>
              <q-dialog v-model="showTransportDialog">
                <q-card>
                  <q-card-section
                    class="row items-center flex"
                    style="flex-direction:column;"
                  >
                    <q-list>
                      <div
                        class="flex"
                        style="flex-direction:column;"
                        v-for="location in transportLocations"
                        :key="location"
                      >
                        <q-item
                          v-for="sublocation in location.locations"
                          :key="sublocation"
                          clickable
                          @click="openInNewTab('https://www.google.com/maps/search/?api=1&query=' + sublocation.name)"
                        >
                          <q-item-section>
                            <span>
                              <q-icon :name="getHotelTransportationIcon(location.category)" />
                              <span>{{sublocation.name}}</span>
                            </span>
                            <p>{{sublocation.distanceInTime}}</p>
                          </q-item-section>
                        </q-item>
                      </div>
                    </q-list>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn
                      flat
                      label="OK"
                      color="primary"
                      v-close-popup
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <q-item-section side>
                <div v-if="generalTempLink && generalTempLink.length > 0">
                  <q-chip
                    icon="link"
                    dense
                    class="linkChip"
                    clickable
                    @click="openInNewTab(generalTempLink)"
                  >Hotelwebsite</q-chip>
                </div>
                <q-chip
                  icon="launch"
                  v-if="hotelName && typeof hotelName !== 'undefined'"
                  dense
                  style="width:117px;"
                  class="linkChip"
                  clickable
                  @click="openInNewTab('https://www.booking.com/searchresults.de.html?ss=' + capitalize(hotelName) + '&checkin_year=' + date.split(' ')[0].split('.')[2] + '&checkin_month=' + date.split('.')[1] + '&checkin_monthday=' + date.split('.')[0] + '&checkout_year=' + checkOutDate.split('.')[2] + '&checkout_month=' + checkOutDate.split('.')[1] + '&checkout_monthday=' + checkOutDate.split('.')[0] + '&group_adults=' + adults + getChildrenText() +  '&no_rooms=' + rooms + '&ac_langcode=de')"
                > booking.com
                  <q-tooltip>Hotel auf booking.com</q-tooltip>
                </q-chip>
                <q-chip
                  icon="launch"
                  v-if="hotelName && typeof hotelName !== 'undefined'"
                  dense
                  style="width:117px;"
                  class="linkChip"
                  clickable
                  @click="openInNewTab('https://www.expedia.de/Hotel-Search?adults=' + adults + 'children=' + getExpediaChildrenText() + '%2C1_3&destination=' + capitalize(hotelName) + '&endDate=' + checkOutDate.split(' ')[0].split('.')[2] + '-' + checkOutDate.split('.')[1] + '-' + checkOutDate.split('.')[0] + '&rooms=' + rooms + '&sort=RECOMMENDED&startDate=' + date.split(' ')[0].split('.')[2] + '-' + date.split('.')[1] + '-' + date.split('.')[0] + '&theme=&useRewards=true')"
                > expedia
                  <q-tooltip>Hotel auf expedia</q-tooltip>
                </q-chip>
              </q-item-section>
              <q-item-section
                side
                v-if="hotelContact && typeof hotelContact !== 'undefined'"
              >
                <div class="hotel-contact">
                  <q-chip
                    v-if="hotelContact.email && typeof hotelContact.email !== 'undefined'"
                    icon="email"
                    clickable
                    @click="openInNewTab('mailto:' + hotelContact.email)"
                  >{{ hotelContact.email}}
                  </q-chip>
                  <q-chip
                    icon="phone"
                    v-if="hotelContact.phone && typeof hotelContact.phone !== 'undefined'"
                    clickable
                    @click="openInNewTab('tel:' + hotelContact.phone)"
                  >{{hotelContact.phone}}
                  </q-chip>
                </div>
              </q-item-section>

              <q-item-section side>
                <q-icon
                  name="clear"
                  color="primary"
                  @click="removeHotel()"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <q-dialog v-model="addHotel">
          <q-card>
            <q-card-section>
              <h6 style="margin:0;">Hotels auf booking.com ansehen:</h6>
              <q-chip
                icon="launch"
                v-if="currentStop.Location"
                dense
                style="width:117px;margin-bottom:40px;"
                class="linkChip"
                clickable
                @click="openInNewTab('https://www.booking.com/searchresults.de.html?ss=' + currentStop.Location.label.split(',')[0] + '&checkin_year=' + currentStop.InitDate.split(' ')[0].split('.')[2] + '&checkin_month=' + currentStop.InitDate.split('.')[1] + '&checkin_monthday=' + currentStop.InitDate.split('.')[0] + '&checkout_year=' + getCheckOutDate().split('.')[2] + '&checkout_month=' + getCheckOutDate().split('.')[1] + '&checkout_monthday=' + getCheckOutDate().split('.')[0] + '&group_adults=' + currentRoundtrip.Adults + getChildrenText() +  '&no_rooms=' + currentRoundtrip.Rooms + '&ac_langcode=de')"
              > booking.com
              </q-chip>

              <h6 style="margin:0;">Hotel hinzufügen:</h6>

              <HotelSearch
                v-if="currentStop.Location && currentStop.Location.lat"
                :disabled="!getCheckOutDate()"
                :lat="currentStop.Location.lat.toString()"
                :long="currentStop.Location.lng.toString()"
                :checkInDate="currentStop.InitDate"
                :checkOutDate="getCheckOutDate()"
                :roomAmount="parseInt(currentRoundtrip.Rooms)"
                :adults="parseInt(currentRoundtrip.Adults)"
                :childrenAges="currentRoundtrip.ChildrenAges"
                @update="updateHotelData($event)"
                ref="hotelSearch"
              ></HotelSearch>
            </q-card-section>
            <q-card-section>
              <q-input
                v-model="generalTempLink"
                ref="urlInput"
                type="url"
                style="width:300px;"
                :rules="[val => !val || urlReg.test(val) || 'Bitte gib einen richtigen Link an']"
                label="Hotel link (optional)"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="link" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                flat
                label="Abbrechen"
                color="primary"
                v-close-popup
                @click="removeHotel()"
              />
              <q-btn
                flat
                label="Hotel hinzufügen"
                @click="addHotelToStop()"
                color="primary"
                :disable="addHotelDisabled"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <div v-if="suggestedSights && typeof suggestedSights !== 'undefined' && suggestedSights !== 'error'">
          <span
            v-for="(sight, index) in suggestedSights"
            :key="index"
            :href="'https://www.google.com/search?q=' + sight.name + ' ' + currentStop.Location ? currentStop.Location.label.split(',')[0] : ''"
            target="_blank"
            style="text-decoration:none;"
          >
            <q-chip
              clickable
              @click="openSightDialog(sight)"
              :icon="sight.category === 'SIGHTS' ? 'account_balance' : 'location_on'"
            >{{sight.name}}
            </q-chip>

          </span>
          <a
            target="_blank"
            v-if="currentStop.Location"
            :href="'https://www.google.com/search?q=' +  currentStop.Location.label.split(',')[0] + ' sehenswürdigkeiten'"
          >weitere auf Google</a>
          <q-dialog v-model="sightDialog.showed">
            <q-card>
              <q-card-section
                class="row flex justify-end q-pb-none"
                style="z-index:100; width:100%; position:absolute; color:white;"
              >
                <q-btn
                  icon="close"
                  flat
                  round
                  dense
                  v-close-popup
                />
              </q-card-section>
              <q-img
                :src="sightDialog.imgSrc"
                style="max-height:75vh;"
              >
                <div class="absolute-bottom">
                  <div class="text-h6">{{sightDialog.title}}</div>
                  <div class="text-subtitle2">{{sightDialog.shortDescription}}</div>
                </div>
              </q-img>

              <q-card-section>
                {{sightDialog.description}}
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="hinzufügen"
                  color="primary"
                  v-close-popup
                  @click="[$refs.sightInput.add(sightDialog.title, true), saveSights()]"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
        <q-chip
          v-else
          clickable
          @click="searchSights()"
        >{{suggestedSights === 'error' ? 'keine POIs gefunden' : 'POIs anzeigen'}}
          <q-tooltip>Sehenswürdigkeiten anzeigen</q-tooltip>
        </q-chip>

        <q-select
          label="Sehenswürdigkeiten"
          filled
          v-model="currentStop.Sights"
          use-input
          use-chips
          multiple
          hide-dropdown-icon
          input-debounce="0"
          new-value-mode="add-unique"
          style="margin:10px 10px 10px 0; width:260px;"
          ref="sightInput"
        >
          <template v-slot:prepend>
            <q-icon
              name="add"
              @click.stop
            />
          </template>
        </q-select>

        <q-editor
          v-model="currentStop.Description"
          min-height="5rem"
          ref="editor_ref"
          @keyup.enter.stop
          :toolbar="editorToolbar"
          toolbar-toggle-color="primary"
          :fonts="editorFonts"
          @paste.native="evt => pasteCapture(evt)"
          style="margin-top:10px; margin-bottom:10px;"
          :definitions="{
        format: {
          top: 'Formatierung bei Kopieren beibehaten',
          icon: $q.iconSet.editor.formatting,
          label: 'Format bei Kopie ' + (this.preventPasting ? 'aus' : 'an'),
          handler: formatOn
        }
        }"
        />
      </q-step>

      <q-step
        :name="6"
        title="Reiseübersicht"
        icon="timeline"
        :header-nav="step > 6"
      >

        <q-list
          bordered
          class="rounded-borders"
        >
          <q-item-label
            header
            class="text-weight-bold"
          >{{currentRoundtrip.Title}}</q-item-label>

          <q-separator />
          <q-item
            v-for="(stop, index) in addedStops"
            :key="stop"
          >
            <q-item-section>
              <q-item-label lines="1">{{stop.Title}}</q-item-label>
              <q-item-label
                caption
                lines="2"
              >
                <span class="text-weight-bold">{{stop.Location.label.split(',')[0]}}</span>
                {{stop.Description ? ' - ' + stop.Description : ''}}
              </q-item-label>
            </q-item-section>

            <q-item-section
              side
              top
              class="flex"
              style="flex-direction:row;"
            >
              <div
                class="flex justify-center"
                style="flex-direction:column; height:100%;"
              >
                {{stop.InitDate.split(' ')[0]}}
              </div>
              <div>
                <q-btn
                  @click="removeStop(index)"
                  flat
                  round
                  icon="delete"
                >
                  <q-tooltip>Stopp löschen</q-tooltip>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>

          <q-separator inset="item" />
        </q-list>
        <div style="display:inline-block; margin-top:30px;">
          <q-btn
            @click="showAutoRoutedialog = true"
            class="q-mt-md"
            color="primary"
            text-color="white"
            :disable="addedStops.length <= 1"
            no-caps
            label="automatische Route erstellen"
          >
          </q-btn>
          <q-tooltip v-if="addedStops.length <= 1">Erstelle mehr als 1 Stopp um diese Funktion zu benutzen</q-tooltip>
        </div>
        <q-dialog
          persistent
          v-model="showAutoRoutedialog"
        >
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm">Wenn du eine automatische Route erstellst wird die aktuelle Reihenfolge deiner Reise verändert. Möchtest du Fortfahren</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                label="Rundreise automatisch erstellen"
                @click="setTripToShortestRoute()"
                color="primary"
                v-close-popup
              />
              <q-btn
                flat
                label="Abbrechen"
                color="primary"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <div style="margin-top:20px;">
          <Map
            :profile="addedStops[0] ? addedStops[0].Profile : 'driving'"
            :stops="addedStops"
            :childrenAges="currentRoundtrip.ChildrenAges"
            :rooms="Number(currentRoundtrip.Rooms)"
            :adults="Number(currentRoundtrip.Adults)"
            :editor="true"
            ref="overviewMap"
          ></Map>
        </div>
      </q-step>
    </q-stepper>
  </div>
</template>
<style lang="less">
@import "../css/roundtripWizard.less";
</style>
<script>
import { countries } from '../countries.js'
import axios from 'axios'
import sharedMethods from '../sharedMethods.js'
import { date } from 'quasar'
import Map from '../pages/Map/Map'
import { auth } from '../firebaseInit.js'

let timeStamp = Date.now()
let formattedScheduleDate = date.formatDate(timeStamp, 'DD.MM.YYYY')

export default {
  components: {
    CitySearch: () => import('../pages/Map/CitySearch.vue'),
    CitySuggestion: () => import('../pages/Map/CitySuggestion.vue'),
    HotelSearch: () => import('../pages/Map/HotelSearch'),
    Map
  },
  data () {
    return {
      step: 1,
      inspirationDone: false,
      countryOptions: countries,
      country: 'Land wählen',
      preventPasting: false,
      originOptions: [],
      destinationOptions: [],
      currentRoundtrip: {
        Title: 'meine Reise',
        Rooms: 1,
        Adults: 2,
        ChildrenAges: [],
        Children: 0,
        TransportProfile: 'Flugzeug',
        Origin: null,
        Destination: null,
        DepatureDate: formattedScheduleDate,
        ReturnDate: formattedScheduleDate,
        TravelClass: 'Economy',
        NonStop: 'Ja'
      },
      currentStop: {
        Title: 'neuer Stopp',
        Description: 'Raum für Notizen, Beschreibungen...',
        Location: null,
        Sights: [],
        InitDate: formattedScheduleDate + ' 10:00',
        Profile: 'driving'
      },

      // leave this outside of current stop to avoid to much fields in db (will only be added to current stop if need to)
      hotelLocation: {},
      hotelStars: 0,
      hotelContact: {},
      hotelName: null,
      generalTempLink: null,
      hotelPrice: 0,
      guestRating: 0,
      transportLocations: [],

      addedStops: [],
      suggestedSights: null,
      sightDialog: { showed: false, title: '', imgSrc: '', description: '', shortDescription: '' },
      currentStopDayDuration: 1,
      addHotel: false,
      addHotelDisabled: true,
      inputProfile: 'Auto',
      showAutoRoutedialog: false,

      // -1 if no stop to edit (normal mode) else put index of stop to edit
      stopToEdit: -1,

      editorFonts: {
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      },
      editorToolbar: [
        [
          {
            label: '',
            icon: this.$q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['fullscreen'],
        [
          {
            label: 'Größe',
            icon: this.$q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: 'Schrift',
            icon: this.$q.iconSet.editor.font,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          }
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['format', 'image'],
        ['undo', 'redo']
      ]
    }
  },
  methods: {
    /**
     * adds the current stop to the stops array
     */
    addStop () {
      // remove placeholder if not changed
      if (this.currentStop.Description === 'Raum für Notizen, Beschreibungen...') this.currentStop.Description = ''

      this.addedStops.push(this.currentStop)

      // add days of current stop to current date
      const currentDate = sharedMethods.getDateFromString(this.currentStop.InitDate)
      currentDate.setDate(currentDate.getDate() + this.currentStopDayDuration)

      this.currentStop = {
        Title: 'neuer Stopp',
        Description: 'Raum für Notizen, Beschreibungen...',
        Location: null,
        Sights: [],
        InitDate: date.formatDate(currentDate, 'DD.MM.YYYY HH:mm'),
        Profile: 'driving'
      }

      // reload both maps
      if (this.$refs.overviewMap) this.$refs.overviewMap.loadMap(null, this.addedStops)
      if (this.$refs.addStopMap) this.$refs.addStopMap.loadMap(null, this.addedStops)
    },
    /**
     *  removes the stop with the given index
     */
    removeStop (index) {
      this.addedStops.splice(index, 1)

      // reload both maps
      if (this.$refs.overviewMap) this.$refs.overviewMap.loadMap(null, this.addedStops)
      if (this.$refs.addStopMap) this.$refs.addStopMap.loadMap(null, this.addedStops)

      if (this.addedStops.length === 0) this.step = 3
    },
    /**
     * creates the roundtrip (write the temp data into db)
     */
    createTrip () {
      // need this json stringify to prevent update of location when the click location changes
      let stops = JSON.parse(JSON.stringify(this.addedStops))

      // make all date strings to real dates
      stops.forEach((stop, index) => {
        stop.InitDate = sharedMethods.getDateFromString(this.addedStops[index].InitDate)
      })

      try {
        this.$store.dispatch({ type: 'roundtrips/addRoundtrip', title: this.currentRoundtrip.Title, uid: auth.user().uid, rooms: this.currentRoundtrip.Rooms, adults: this.currentRoundtrip.Adults, childrenAges: this.currentRoundtrip.ChildrenAges, tempLocation: this.addedStops[0].Location, depatureDate: this.currentRoundtrip.DepatureDate, transportProfile: this.currentRoundtrip.TransportProfile, origin: this.currentRoundtrip.Origin, originCode: null, destination: this.currentRoundtrip.Destination, destinationCode: null, returnDate: this.currentRoundtrip.ReturnDate, travelClass: this.currentRoundtrip.TravelClass, nonStop: this.currentRoundtrip.NonStop, stops: stops }).then(docId => {
          if (docId && docId !== null) {
            let context = this
            // wait to ensure roundtrip is fully added
            setTimeout(function () {
              context.$router.push('/rundreise-bearbeiten/' + docId)
            }, 500)
          } else {
            sharedMethods.showErrorNotification('Deine Rundreise konnte nicht erstellt werden, bitte versuche es erneut')
          }
        })
      } catch (error) {
        console.log(error)
        sharedMethods.showErrorNotification('Deine Rundreise konnte nicht erstellt werden, bitte versuche es erneut')
        return false
      }
    },
    isUniqueTitle (val) {
      return sharedMethods.isUniqueTitle(val)
    },
    getChildrenText () {
      let text = '&group_children=' + this.currentRoundtrip.ChildrenAges.length
      this.currentRoundtrip.ChildrenAges.forEach(child => {
        text += '&age=' + child
      })
      return text
    },
    capitalize (value) {
      return sharedMethods.capitalize(value)
    },
    addHotelToStop () {
      this.currentStop.HotelLocation = this.hotelLocation
      this.currentStop.HotelStars = this.hotelStars
      this.currentStop.HotelContact = this.hotelContact
      this.currentStop.HotelName = this.hotelName
      this.currentStop.GeneralLink = this.generalTempLink
      this.currentStop.CheckOutDate = this.getCheckOutDate()
      this.currentStop.HotelPrice = this.hotelPrice
      this.currentStop.GuestRating = this.guestRating
      this.currentStop.TransportLocations = this.transportLocations
    },
    removeHotel () {
      this.hotelName = null

      delete this.currentStop.HotelLocation
      delete this.currentStop.HotelStars
      delete this.currentStop.HotelContact
      delete this.currentStop.HotelName
      delete this.currentStop.GeneralLink
      delete this.currentStop.CheckOutDate
      delete this.currentStop.HotelPrice
      delete this.currentStop.GuestRating
      delete this.currentStop.TransportLocations
    },
    /**
     * gets the check out date (add duration of days to init date)
     */
    getCheckOutDate () {
      // add days of current stop to current date
      let checkOutDate = sharedMethods.getDateFromString(this.currentStop.InitDate)
      checkOutDate.setDate(checkOutDate.getDate() + this.currentStopDayDuration)
      checkOutDate = date.formatDate(checkOutDate, 'DD.MM.YYYY')
      return checkOutDate
    },
    isDateTimeValid () {
      return sharedMethods.isDateTimeValid(this.currentStop.InitDate)
    },
    /**
     * filter countries method used in filter method of quasar select component
     */
    filterCountries (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = countries.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    getGeneralProfile () {
      switch (this.inputProfile) {
        case 'zu Fuß':
          this.currentStop.Profile = 'walking'
          break
        case 'Fahrrad':
          this.currentStop.Profile = 'cycling'
          break
        default:
          this.currentStop.Profile = 'driving'
          break
      }
    },
    openInNewTab (link) {
      window.open(link, '_blank')
    },
    /**
     * called from city suggestions, when user adds a new city
     */
    updateFromSuggestedCity (event) {
      this.currentStop.Location = {
        lng: event.longitude,
        lat: event.latitude,
        label: event.name
      }

      this.currentStop.Title = 'Zwischenstopp in ' + event.name.split(',')[0]
      this.step = 5
      this.inspirationDone = true
    },
    /**
   * update location object with location serch results
   * @param event event from location search update callback
   */
    updateLocation (event) {
      if (event !== null) {
        this.currentStop.Location = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
        this.currentStop.Title = 'Zwischenstopp in ' + event.label.split(',')[0]
        this.step = 5
        this.inspirationDone = false
      } else {
        this.currentStop.Location = null
      }
    },
    formatOn () {
      this.preventPasting = !this.preventPasting
    },
    /**
     * method for q-editor
     */
    pasteCapture (evt) {
      if (this.preventPasting) {
        let text, onPasteStripFormattingIEPaste
        evt.preventDefault()
        if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
          text = evt.originalEvent.clipboardData.getData('text/plain')
          this.$refs.editor_ref.runCmd('insertText', text)
        } else if (evt.clipboardData && evt.clipboardData.getData()) {
          text = evt.clipboardData.getData('text/plain')
          this.$refs.editor_ref.runCmd('insertText', text)
        } else if (window.clipboardData && window.clipboardData.getData) {
          if (!onPasteStripFormattingIEPaste) {
            onPasteStripFormattingIEPaste = true
            this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text)
          }
          onPasteStripFormattingIEPaste = false
        }
      }
    },
    /**
     * open sight dialog to show data from wikivoyage about sight
     */
    openSightDialog (sight) {
      // get sight dialog content from wikivoyage
      const context = this
      sharedMethods.getWikivoyageData(sight.name).then(result => {
        if (result !== null) {
          context.sightDialog.title = result.title || sight.name
          context.sightDialog.description = result.description || 'Es konnten leider keine Informationen gefunden werden'
          context.sightDialog.shortDescription = result.shortDescription
          context.sightDialog.imgSrc = result.imgSrc
          context.sightDialog.showed = true
        } else {
          context.sightDialog.title = sight.name
          context.sightDialog.description = 'Es konnten leider keine Informationen gefunden werden'
          context.sightDialog.shortDescription = ''
          context.sightDialog.imgSrc = ''
          context.sightDialog.showed = true
        }
      })
    },
    /**
     * search the sights for current location
     */
    searchSights () {
      if (this.currentStop.Location.lng && this.currentStop.Location.lat) {
        sharedMethods.getSights(this.currentStop.Location.lng, this.currentStop.Location.lat).then((results) => {
          if (results !== null) {
            this.suggestedSights = results.data.data
          } else {
            this.suggestedSights = 'error'
          }
        })
      }
    },
    updateHotelData (event) {
      if (event !== null) {
        this.addHotelDisabled = true
        let hotelLat = event.latitude
        let hotelLng = event.longitude

        this.hotelName = event.name

        if (event.destinationId) {
          axios.get('https://hotels4.p.rapidapi.com/properties/get-details?locale=de_DE&currency=EUR&id=' + event.destinationId, {
            headers: {
              'content-type': 'application/octet-stream',
              'x-rapidapi-host': 'hotels4.p.rapidapi.com',
              'x-rapidapi-key': '18b409d797msh45b84c0227df18cp1fea51jsne88847e3f3c8',
              'useQueryString': true
            }
          })
            .then((response) => {
              console.log(response)

              let body = response.data.data.body
              let propertyDescription = body.propertyDescription

              let label = propertyDescription.address.fullAddress

              let avgPrice = propertyDescription.featuredPrice.currentPrice.plain

              let guestRating = body.guestReviews.brands.formattedRating + ' ' + body.guestReviews.brands.badgeText

              let transportLocations = response.data.transportation.transportLocations

              this.writeHotelData(label, hotelLat, hotelLng, propertyDescription.starRating, avgPrice, guestRating, transportLocations)
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.writeHotelData(event.label, hotelLat, hotelLng, null, null, null, null)
        }
      }
    },
    writeHotelData (label, lat, lng, rating, price, guestRating, transportLocations) {
      this.hotelLocation = {
        lng: lat,
        lat: lng,
        label: label
      }

      price && typeof price !== 'undefined' ? this.hotelPrice = price : this.hotelPrice = null

      guestRating && typeof guestRating !== 'undefined' ? this.guestRating = guestRating : this.guestRating = null

      typeof transportLocations !== 'undefined' ? this.transportLocations = transportLocations : this.transportLocations = null

      rating && typeof rating !== 'undefined' ? this.hotelStars = rating : this.hotelStars = null

      this.addHotelDisabled = false

      // if (contact) this.hotelContact = contact
    },
    getHotelTransportationIcon (category) {
      switch (category) {
        case 'airport':
          return 'flight'
        case 'train-station':
          return 'train'
        case 'metro':
          return 'subway'
        default:
          return 'cummute'
      }
    },
    destinationChanged (val) {
      // todo destination codes are not defined
      this.getLocationFromIataCode(this.destinationCodes[this.destinationOptions.indexOf(val)], this.destinationAddresses[this.destinationOptions.indexOf(val)])
    },
    getLocationFromIataCode (code, countryName) {
      let context = this
      axios.get('http://iatageo.com/getLatLng/' + code
      ).then(function (response) {
        context.tempLocation = {
          lat: response.data.latitude,
          lng: response.data.longitude,
          label: countryName
        }
      }).catch(function (error) {
        console.log('Error' + error)
      })
    },
    getOrigins (val, update, abort) {
      sharedMethods.filterAirports(val, update, abort, true, this)
    },
    getDestinations (val, update, abort) {
      sharedMethods.filterAirports(val, update, abort, false, this)
    },
    getLocationString (locations) {
      let locationString = ''
      locations.forEach((location, index) => {
        locationString = locationString + (index !== 0 ? ', ' : '') + location
      })
      return locationString
    },
    updateReturnDate () {
      let dateParts = this.currentRoundtrip.DepatureDate.split('.')
      let depatureDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
      let returnDate = depatureDate
      returnDate.setDate(depatureDate.getDate() + 1)

      this.currentRoundtrip.ReturnDate = date.formatDate(returnDate, 'DD.MM.YYYY')
    }
  },
  mounted () {
    // listen to add stop method called from map
    this.$root.$on('addStop', (formattedDate, lastClickLocation) => {
      let lastDate = this.currentStop.InitDate

      // check if we didn't add this stop before
      if (this.currentStop.Location !== lastClickLocation) {
        this.currentStop = {
          Title: 'Zwischenstopp in ' + lastClickLocation.label,
          Description: 'Raum für Notizen, Beschreibungen...',
          Location: lastClickLocation,
          Sights: [],
          InitDate: lastDate,
          Profile: 'driving'
        }

        this.step = 5
      }
    })
  }
}
</script>
