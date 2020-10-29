<template>
  <div class="edit-roundtrips q-px-lg q-pb-md">
    <div
      class="flex"
      style="flex-direction:column;"
    >
      <div style="display:inline-block;">
        <router-link
          v-if="user"
          style="text-decoration:none; display:inline-block;"
          to="/meine-rundreisen"
        >
          <q-icon name="keyboard_arrow_left"></q-icon>
          zurück zu meinen Rundreisen
        </router-link>
      </div>
      <div class="flex justify-between">
        <div style="display:inline-block;">
          <h3 v-show="!title">
            <q-skeleton
              width="200px"
              height="50px"
              type="text"
            />
          </h3>
          <h3
            id="v-step-0"
            style="display:inline-block; padding-right:10px;"
            v-show="title"
          >{{title}}
            <q-popup-edit
              v-model="title"
              buttons
              label-set="Speichern"
              @save="title !== null && title !== ''  && title[0] !== ' ' ? saveTitle(title) : showWrongTitleNotify()"
            >
              <q-input
                v-model="title"
                :rules="[val => val !== null &&  val !== ''  || 'Bitte gib einen Titel an', val => isUniqueTitle(val), val => val[0] !== ' ' || 'Das erste Zeichen kann kein Leerzeichen sein']"
                dense
                autofocus
              >
              </q-input>
            </q-popup-edit>
          </h3>
        </div>
        <div
          class="flex justify-center"
          style="flex-direction:column;"
        >
          <router-link
            to="/faq"
            style="text-decoration:none;"
            target="_blank"
          >
            <q-icon
              name="help"
              size="25px"
            ></q-icon>
            Hilfe
          </router-link>
        </div>
      </div>
    </div>
    <div
      style="width:100%;"
      class="sticky at-top"
    >
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        outside-arrows
        mobile-arrows
        style="padding-top:20px;"
      >
        <q-tab
          id="v-step-1"
          name="inspiration"
          label="Inspiration"
        >
        </q-tab>
        <q-tab
          id="v-step-2"
          name="route"
          label="Reiseverlauf"
        />
        <q-tab
          id="v-step-3"
          name="start"
          label="An-/Abreise"
          :disable="!user"
        >
          <q-tooltip v-if="!user">Speichere deine Reise um diese Funktion nutzen zu können</q-tooltip>
        </q-tab>
        <q-tab
          id="v-step-4"
          name="settings"
          label="Einstellungen"
          :disable="!user"
        >
          <q-tooltip v-if="!user">Speichere deine Reise um diese Funktion nutzen zu können</q-tooltip>
        </q-tab>
        <q-tab
          id="v-step-5"
          name="map"
          label="Karte"
        />
      </q-tabs>

      <q-separator />
    </div>

    <q-tab-panels
      v-model="tab"
      animated
      ref="tabPanels"
      keep-alive
      @transition="sharedMethods.scrollToOffset(200)"
    >
      <q-tab-panel name="inspiration">
        <h4>Inspiration</h4>
        <CitySuggestion
          :dates="initDates"
          :RTId="$route.params.id"
          :predefinedCountry="countries[0] && countries[0].length > 0 ? countries[0] : null"
        ></CitySuggestion>
      </q-tab-panel>
      <q-tab-panel name="route">
        <q-timeline color="secondary">
          <q-timeline-entry heading>
            <div class="flex justify-between">
              <h4>Reiseverlauf</h4>
              <q-toggle
                style="font-size:18px; line-height:normal;"
                @input="sharedMethods.expandAllStops(getContext, stops)"
                v-model="allStopsExpanded"
                :disable="!stopsLoaded"
                label="alle Stopps ausklappen"
              ></q-toggle>
            </div>
          </q-timeline-entry>

          <template v-if="!stopsLoaded">
            <template v-for="n in 2">
              <q-timeline-entry :key="n">
                <template v-slot:subtitle>
                  <q-skeleton
                    width="200px"
                    height="10px"
                    type="rect"
                    style="margin-bottom:10px;"
                  />
                </template>
                <div
                  class="flex"
                  style="margin-bottom:10px;"
                >
                  <q-skeleton
                    width="150px"
                    height="15px"
                    type="rect"
                    style="margin-right:10px; margin-top:2px;"
                  />
                  <q-skeleton
                    height="20px"
                    width="60px"
                    type="QChip"
                    style="margin-bottom:10px;"
                  />
                </div>
                <q-skeleton
                  width="90%"
                  height="50px"
                  type="rect"
                />
              </q-timeline-entry>

              <q-timeline-entry
                icon="speed"
                :key="'A' + n"
              >
                <template v-slot:subtitle>
                  <q-skeleton
                    width="300px"
                    height="10px"
                    type="rect"
                    style="margin-bottom:20px;"
                  />
                </template>
                <q-skeleton
                  height="25px"
                  width="60px"
                  type="QChip"
                  style="margin-bottom:10px;"
                />
              </q-timeline-entry>
            </template>
          </template>

          <div
            class="stop-list"
            v-show="stopsLoaded"
          >
            <transition-group
              name="flip-list"
              tag="div"
            >
              <template v-for="(stop, index) in stops">
                <Stop
                  :key="stop.DocId"
                  :title="stop.Title"
                  :date="stop.InitDate"
                  :nextStopDate="stops[index + 1] ? stops[index + 1].InitDate : null"
                  :editor-placeholder="stop.Description"
                  :editor="true"
                  :docId="stop.DocId"
                  :general-link="stop.GeneralLink"
                  :location="stop.Location && typeof stop.Location !== 'undefined' && stop.Location ? stop.Location : null"
                  :parkingPlace="stop.Parking && typeof stop.Parking !== 'undefined' && stop.Parking ? stop.Parking : null"
                  :lastItem="index === stops.length -1"
                  :hotelStars="parseInt(stop.HotelStars)"
                  :hotelName="stop.HotelName"
                  :hotelPrice="stop.HotelPrice"
                  :guestRating="stop.GuestRating"
                  :transportLocations="stop.TransportLocations"
                  :hotelLocation="stop.HotelLocation"
                  :hotelContact="stop.HotelContact"
                  :checkOutDate="stop.CheckOutDate ? stop.CheckOutDate : getDefaultCheckOutDate(stop)"
                  :adults="parseInt(adults)"
                  :childrenAges="childrenAges"
                  :rooms="parseInt(rooms)"
                  :firstStop="index === 0"
                  :galeryImgUrls="galeryImgUrls"
                  :stopImages="typeof stop.StopImages === 'undefined' ? null : stop.StopImages"
                  :addedSights="stop.Sights ? stop.Sights : []"
                  :days="typeof days[days.findIndex(x => x.docId === stop.DocId)] !== 'undefined' ? days[days.findIndex(x => x.docId === stop.DocId)].days : null"
                  :dailyTrips="stop.DailyTrips ? stop.DailyTrips : []"
                  :expanded="stop.expanded"
                  :profile="stop.Profile"
                  @expansionChanged="sharedMethods.expansionChanged(getContext, $event)"
                  :class="'stop' + stop.DocId"
                  :ref="stop.DocId"
                ></Stop>
                <Duration
                  style="transition: all 1s;"
                  :key="'Stop' + stop.DocId"
                  v-if="index !== stops.length - 1"
                  :duration="durations[durations.findIndex(x => x.docId === stop.DocId)] && durations[durations.findIndex(x => x.docId === stop.DocId)].duration ? (durations[durations.findIndex(x => x.docId === stop.DocId)].duration + durations[durations.findIndex(x => x.docId === stop.DocId)].distance) : null"
                  :origin="stop.Location.label"
                  :destination="stops[index + 1 ] ? stops[index + 1 ].Location.label : null"
                  :editor="true"
                  :defaultProfile="stop.Profile && typeof stop.Profile !== 'undefined' ? getStringProfile(stop.Profile) : inputProfile"
                  :doc-id="stop.DocId + 'duration'"
                ></Duration>
                <q-timeline-entry
                  :key="'Stop' + stop.DocId"
                  v-else
                  style="display:none;"
                ></q-timeline-entry>
              </template>
            </transition-group>
          </div>
        </q-timeline>
        <span ref="AddStopExpansionItem"></span>
        <q-list
          bordered
          class="rounded-borders"
        >
          <q-expansion-item
            clickable
            expand-separator
            v-model="addExpanded"
            class="add-item"
            :disable="!stopsLoaded"
            @click="[addButtonActive = !addButtonActive, scrollOnAddButtonClicked()]"
          >
            <template v-slot:header>
              <q-item-section
                style="align-items: center; flex-direction:row;"
                class="flex"
              >
                <q-btn
                  class="add-button"
                  side
                  round
                  :disable="!stopsLoaded"
                  color="primary"
                  icon="add"
                  :class="{ active: addButtonActive }"
                >
                </q-btn>
                <span style="font-size:20px;">Stopp hinzufügen</span>
              </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <q-form
                  @submit.prevent="onAddStop"
                  class="q-gutter-md addEntryForm"
                  ref="addEntryForm"
                >
                  <q-input
                    filled
                    v-model="date"
                    error-message="Bitte gib ein richtiges Datum an"
                    :error="!isDateTimeValid()"
                    lazy-rules
                    bottom-slots
                    style="width:300px"
                    class="input-item"
                    outlined
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
                            v-model="date"
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
                            v-model="date"
                            mask="DD.MM.YYYY HH:mm"
                            format24h
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <CitySearch
                    ref="citySearch"
                    :parkingPlaceSearch="false"
                    :defaultLocation="null"
                    @update="updateLocation($event)"
                  ></CitySearch>
                  <CitySearch
                    ref="parkingPlaceSearch"
                    :parkingPlaceSearch="true"
                    @update="updateParkingPlace($event)"
                    :defaultLocation="null"
                  ></CitySearch>
                  <div>
                    <q-btn
                      round
                      color="primary"
                      icon="add"
                      type="submit"
                    >
                      <q-tooltip>
                        Stopp hinzufügen
                      </q-tooltip>
                    </q-btn>
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <div style="display:inline-block; margin-top:30px;">
          <q-btn
            @click="showAutoRoutedialog = true"
            class="q-mt-md"
            color="primary"
            text-color="white"
            :disable="!stopsLoaded || stops.length <= 1"
            label="automatische Route erstellen"
          >
          </q-btn>
          <q-tooltip v-if="stops.length <= 1">Erstelle mehr als 1 Stopp um diese Funktion zu benutzen</q-tooltip>
        </div>
        <q-dialog
          persistent
          v-model="showAutoRoutedialog"
        >
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm">Wenn du eine automatische Route erstellst geht die aktuelle Reihenfolge deiner Reise verloren.</span>
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
        <p style="padding-top:10px; font-family:Raleway;">Insgesamt {{tripDuration}} Tage {{tripDistance ? ' und ' + tripDistance + 'km' : ''}}</p>
      </q-tab-panel>
      <q-tab-panel name="start">
        <div class="arrival-depature-container">
          <h4>An-/Abreise</h4>
          <q-form
            bordered
            class="q-gutter-md rounded-borders"
          >
            <q-select
              outlined
              v-model="arrivalDepatureProfile"
              input-debounce="0"
              :options="['Flugzeug', 'Andere']"
              label="Reisemittel"
              :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Reisemittel']"
              style="padding-bottom: 32px"
              @blur="onSaveArrivalDepature"
            >
              <template v-slot:prepend>
                <q-icon name="commute" />
              </template>
            </q-select>
            <div
              v-if="arrivalDepatureProfile === 'Flugzeug'"
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
                v-model="origin"
                hide-dropdown-icon
                label="Abflugsort"
                :options="originOptions"
                @filter="getFlightOrigins"
                style="max-width:300px;"
                @blur="onSaveArrivalDepature"
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
                v-model="destination"
                hide-dropdown-icon
                label="Ankunftsort"
                :options="destinationOptions"
                @filter="getDestinations"
                style="max-width:300px;"
                :rules="[val => val !== null && val !== '' || 'Bitte wähle einen Ort']"
                @blur="onSaveArrivalDepature"
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
                v-model="depatureDate"
                label="Abflugsdatum"
                class="input-item rounded-borders"
                @blur="onSaveArrivalDepature"
              >
                <q-popup-proxy
                  ref="qDateProxy1"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="depatureDate"
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
                  <q-tooltip>Datum ändern</q-tooltip>

                </template>
              </q-input>
              <q-input
                outlined
                v-model="returnDate"
                label="Rückflugsdatum"
                class="input-item rounded-borders"
                @blur="onSaveArrivalDepature"
              >
                <q-popup-proxy
                  ref="qDateProxy1"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="returnDate"
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
                  <q-tooltip>Datum ändern</q-tooltip>
                </template>
              </q-input>
              <q-select
                outlined
                v-model="travelClass"
                input-debounce="0"
                :options="['Economy', 'Premium Economy', 'Business', 'First']"
                label="Reiseklasse auswählen"
                :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Klasse']"
                @blur="onSaveArrivalDepature"
              >
                <template v-slot:prepend>
                  <q-icon name="star" />
                </template>
              </q-select>
              <q-select
                outlined
                v-model="nonStop"
                input-debounce="0"
                :options="['Ja', 'Nein']"
                label="Non Stop"
                :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Option']"
                @blur="onSaveArrivalDepature"
              >
                <template v-slot:prepend>
                  <q-icon name="flight" />
                </template>
              </q-select>
            </div>
            <div v-else>
              <p>Bei einem anderem Reisemittel können wir dir bei der Planung deiner An- und Abreise leider nicht helfen.</p>
              <p>Wenn du mit dem Auto fährst, kannst du deinen Startort gleich als ersten Ort im Reiseverlauf festlegen.</p>
            </div>
            <!-- price -->
            <div
              class="flex justify-between"
              style="flex-wrap:wrap;"
            >
              <div class="flex">
                <q-btn
                  @click="openBookingComFlights()"
                  class="q-mt-md"
                  color="primary"
                  text-color="white"
                  :disable="!destination"
                  v-if="arrivalDepatureProfile === 'Flugzeug'"
                  label="Flüge auf Booking.com"
                  style="width:220px"
                ></q-btn>
              </div>
              <div class="flex">
                <q-btn
                  @click="openFluegeDeFlights()"
                  class="q-mt-md"
                  color="primary"
                  text-color="white"
                  :disable="!destination"
                  v-if="arrivalDepatureProfile === 'Flugzeug'"
                  label="Flüge auf fluege.de"
                  style="width:220px"
                ></q-btn>
              </div>
            </div>
          </q-form>
        </div>
      </q-tab-panel>
      <q-tab-panel
        class="settings"
        name="settings"
      >
        <q-form
          bordered
          class="q-gutter-md rounded-borders"
        >
          <h4>Reise teilen</h4>
          <q-list
            bordered
            class="rounded-borders"
            style="padding:10px"
          >
            <q-item-label style="padding-bottom:5px;">Wenn deine Rundreise veröffentlicht ist kann sie jeder ansehen und bearbeiten, nachfolgende Daten werden angezeigt/benötigt.</q-item-label>
            <q-toggle
              v-model="publish"
              label="Rundreise veröffentlichen"
              icon="share"
              :disable="!user || !user.displayName"
              @input="onSaveRoundtrip"
            >
              <q-tooltip v-if="!user || !user.displayName">
                Bitte erstelle zuerst einen Benutzernamen
              </q-tooltip>
            </q-toggle>
            <div v-show="publish">
              <b>Link zur Karte veröffentlichen</b>
              <p>Über den Folgenden Link kannst du die Karte deiner Reise veröffentlichen. Ebenso wird ein Link zu der ganzen Reise auf Roundtrips4you veröffentlicht.</p>
              <a :href="'https://roundtrips4you.de/MapWidget/' + RTId">https://roundtrips4you.de/MapWidget/{{RTId}}</a>
              <q-icon
                style="margin-left:10px;"
                size="25px;"
                name="file_copy"
                class="cursor-pointer"
                @click="copyShareLink('share-link')"
              />
              <input
                type="hidden"
                id="share-link"
                :value="shareLink"
              >
              <br><br>
              <p>Dieser Link darf auch per Iframe in eine Website eingebettet werden. Dazu einfach den folgenden Code kopieren und an die entsprechende Stelle einfügen.</p>
              <span>&lt;iframe src='https://roundtrips4you.de/MapWidget/{{RTId}}'&gt;&lt;/iframe&gt;</span>
              <q-icon
                style="margin-left:10px;"
                size="25px;"
                name="file_copy"
                class="cursor-pointer"
                @click="copyShareLink('share-code')"
              />
              <input
                type="hidden"
                id="share-code"
                :value="shareCode"
              >
            </div>
            <q-select
              outlined
              v-model="category"
              :options="categoryOptions"
              label="Kategorie"
              use-input
              :rules="[val => val !== null && val !== '' || 'Bitte wähle eine Kategorie']"
              class="input-item"
              @blur="onSaveRoundtrip"
            >
              <template v-slot:prepend>
                <q-icon name="access_time" />
              </template>
            </q-select>
            <div class="flex">
              <q-rating
                class="stars"
                v-model="stars"
                size="15px"
                color="gold"
                :readonly="!isNaN(hotelRatingAvg())"
                style="margin-right:10px;"
                @blur="onSaveRoundtrip"
              />
              <q-item-label>Durchschittliche Hotelbewertung {{!isNaN(hotelRatingAvg()) ? '(errechnet)' : ''}}</q-item-label>
            </div>
            <q-input
              v-model="descriptionInput"
              outlined
              autogrow
              label="Kurze Beschreibung"
              @blur="onSaveRoundtrip"
              :rules="[val => val !== null && val !== '' || 'Bitte gib eine Beschreibung an',
          val => val.length > 10 && val.length < 160 || 'Bitte gib eine Beschreibung zwischen 10 und 160 Zeichen an' ]"
            > <template v-slot:prepend>
                <q-icon name="subject" />
              </template>
            </q-input>
            <q-select
              outlined
              v-model="inputProfile"
              :options="['zu Fuß', 'Fahrrad', 'Auto']"
              label="Reisemittel"
              use-input
              :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Reisemittel']"
              class="input-item"
              @input="getGeneralProfile()"
              @blur="onSaveRoundtrip"
            >
              <template v-slot:prepend>
                <q-icon name="commute" />
              </template>
            </q-select>
            <q-input
              v-model="highlight1"
              label="Highlight 1"
              outlined
              @blur="onSaveRoundtrip"
              :rules="[val => val !== null && val !== '' || 'Bitte gib ein Highlight an']"
            > <template v-slot:prepend>
                <q-icon name="star" />
              </template></q-input>
            <q-input
              v-model="highlight2"
              label="Highlight 2"
              outlined
              @blur="onSaveRoundtrip"
              :rules="[val => val !== null && val !== '' || 'Bitte gib ein Highlight an']"
            > <template v-slot:prepend>
                <q-icon name="star" />
              </template></q-input>
            <q-input
              v-model="highlight3"
              label="Highlight 3"
              outlined
              :rules="[val => val !== null && val !== '' || 'Bitte gib ein Highlight an']"
              @blur="onSaveRoundtrip"
            > <template v-slot:prepend>
                <q-icon name="star" />
              </template>
            </q-input>
            <q-input
              @blur="onSaveRoundtrip"
              v-model="price"
              label="Pauschalpreis ohne Freizeitgestaltung"
              type="number"
              outlined
              :rules="[val => val !== null && val !== 0 && val > 0 || 'Bitte gib einen Preis an']"
            ><template v-slot:prepend>
                <q-icon name="euro">
                </q-icon>
              </template>
            </q-input>
            <q-item-label style="padding-bottom:5px; margin-top:10px;">Angebotszeitraum</q-item-label>
            <q-toggle
              v-model="wholeYearOffer"
              label="Ganzes Jahr"
              icon="event"
              @input="onSaveRoundtrip"
            >
            </q-toggle>
            <q-input
              :disable="wholeYearOffer"
              outlined
              v-model="OfferStartPeriod"
              label="von"
              class="q-field--with-bottom"
              @blur="onSaveRoundtrip"
            >
              <q-popup-proxy
                ref="qDateProxy1"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="OfferStartPeriod"
                  today-btn
                  mask="DD.MM.YYYY"
                  @input="() => [$refs.qDateProxy1.hide(), OfferEndPeriod = OfferStartPeriod]"
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
              @blur="onSaveRoundtrip"
              :disable="wholeYearOffer"
              outlined
              v-model="OfferEndPeriod"
              class="q-field--with-bottom"
              label="bis"
            >
              <q-popup-proxy
                ref="qDateProxy2"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="OfferEndPeriod"
                  today-btn
                  mask="DD.MM.YYYY"
                  :options="scheduleDateOptions"
                  @input="() => $refs.qDateProxy2.hide()"
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
            <RegionSearch
              v-if="countries.length === 1"
              :country="countries[0]"
              :defaultRegion="region"
              @update="updateRegion($event)"
              @blur="onSaveRoundtrip"
            ></RegionSearch>
          </q-list>
          <!-- <h4>Allgemeine Einstellungen</h4>
          <q-list
            bordered
            class="rounded-borders"
            style="padding:10px"
          >
            <div
              v-if="Array.isArray(countries)"
              style="padding-bottom: 10px;"
            >
              <div
                v-for="(countryNum, index) in countries"
                :key="countryNum"
                class="flex"
              >
                <q-select
                  @filter="filterFn"
                  outlined
                  v-model="countries[index]"
                  :options="countryOptions"
                  label="Land"
                  clearable
                  class="input-item"
                  use-input
                  style="margin-top:10px; margin-right:10px; padding:0;"
                  :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Land']"
                  @blur="onSaveRoundtrip"
                >
                  <template v-slot:prepend>
                    <q-icon name="explore" />
                  </template>
                </q-select>
                <div
                  class="add-country-container"
                  style="padding:0;"
                >
                  <q-btn
                    v-if="parseInt(index ) !== 0"
                    @click="countries.splice(index, 1)"
                    round
                    icon="add"
                    side
                    style="transform:rotate(45deg);"
                    @blur="onSaveRoundtrip"
                  />
                </div>
              </div>
            </div>
            <div v-else>
              <q-select
                @filter="filterFn"
                outlined
                v-model="countries"
                :options="countryOptions"
                label="Land"
                clearable
                class="input-item"
                use-input
                style="margin-top:10px; margin-right:10px; padding:0;"
                :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Land']"
                @blur="onSaveRoundtrip"
              >
                <template v-slot:prepend>
                  <q-icon name="explore" />
                </template>
              </q-select>
            </div>
            <q-btn
              v-if="Array.isArray(countries)"
              @click="countries.push('')"
              label="Land hinzufügen"
              style="margin-bottom:30px;"
              @blur="onSaveRoundtrip"
            />

          </q-list> -->
          <h4>Persönliche Informationen</h4>
          <q-list
            bordered
            class="rounded-borders"
            style="padding:10px"
          >
            <p style="margin-bottom:15px;">Diese werden nur dir angezeigt und auch beim Veröffentlichen nicht berücksichtigt.</p>
            <div>
              <q-input
                v-model="rooms"
                label="Zimmer"
                type="number"
                @blur="onSaveRoundtrip"
                :rules="[val => val !== null &&  val !== '' && val > 0  || 'Bitte gib eine Zimmeranzahl an']"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="house" />
                </template>
              </q-input>
              <q-input
                v-model="adults"
                label="Erwachsene"
                type="number"
                @blur="onSaveRoundtrip"
                :rules="[val => val !== null &&  val !== '' && val > 0  || 'Bitte gib die Anzahl der Erwachsenen Reisenden an', val => val <= parseInt(rooms) * 9 || 'Bitte wähle mehr Zimmer']"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="group" />
                </template>
              </q-input>
              <q-input
                v-model="children"
                label="Kinder"
                type="number"
                @blur="parseInt(children) === 0 ? onSaveRoundtrip() : null"
                @input="childrenAges.length = parseInt(children)"
                :rules="[val => val !== null &&  val !== '' && val >= 0  && val <= 20|| 'Bitte gib die Anzahl der Kinder auf der Reise an']"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="child_friendly" />
                </template>
              </q-input>
              <div
                class="flex"
                v-if="parseInt(children) > 0  && parseInt(children) <= 20"
              >
                <q-input
                  v-for="childNum in parseInt(children)"
                  :key="childNum"
                  v-model="childrenAges[childNum - 1]"
                  :label="'Alter Kind ' + childNum"
                  type="number"
                  @blur="onSaveRoundtrip"
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
          </q-list>
          <h4>Bilder</h4>
          <q-list
            bordered
            class="rounded-borders"
            style="padding:10px"
          >
            <div>
              <p>Bitte verwende nur Bilder die für die Wiederverwendung eindeutig gekennzeichnet sind.</p>
              <span>Titelbild</span>
              <div class="uploader">
                <q-img
                  style="height:100%;"
                  :src="titleImgUrl"
                ></q-img>
                <q-btn
                  round
                  color="primary"
                  icon="add"
                  style="position: absolute;"
                  :disable="titleUploadDisabled"
                  @click="() => $refs.titleUpload.pickFiles()"
                >
                  <q-inner-loading
                    :showing="titleUploadDisabled"
                    style="border-radius:50%"
                  >
                    <q-spinner
                      size="42px"
                      color="primary"
                    >
                    </q-spinner>
                  </q-inner-loading>
                </q-btn>
              </div>
              <q-uploader
                url=""
                label="Titelbild hochladen"
                accept=".jpg, image/*"
                style="max-width: 300px; display:none;"
                hide-upload-btn
                ref="titleUpload"
                @added="fileAdded($event, 'title')"
              />
            </div>
            <q-uploader
              url=""
              label="Weitere Bilder hochladen"
              multiple
              style="max-width: 300px; display:none;"
              hide-upload-btn
              ref="galeryUpload"
              @added="fileAdded($event, 'galery')"
            />
            <span>weitere Bilder</span>
            <div class="galeryImgUploaderContainer">
              <div
                class="uploader"
                v-for="(url, index) in galeryImgUrls"
                :key="index"
              >
                <q-img
                  style="height:100%;"
                  :src="url"
                ></q-img>
                <q-btn
                  round
                  color="primary"
                  icon="add"
                  style="transform:rotate(45deg); position: absolute;"
                  @click="removeFile(index)"
                >
                </q-btn>
              </div>
              <div class="uploader">
                <q-btn
                  round
                  color="primary"
                  icon="add"
                  :disable="visible"
                  @click="() => $refs.galeryUpload.pickFiles()"
                  style="position:relative;"
                >
                  <q-inner-loading
                    :showing="visible"
                    style="border-radius:50%"
                  >
                    <q-spinner
                      size="42px"
                      color="primary"
                    >
                    </q-spinner>
                  </q-inner-loading>
                </q-btn>
              </div>
            </div>
          </q-list>
        </q-form>
        <h4 v-if="companyProfile">Unternehmenseinstellungen</h4>
        <q-list
          v-if="companyProfile"
          bordered
          class="rounded-borders"
          style="padding:10px;"
        >
          <q-input
            v-model="tripWebsite"
            outlined
            clear-icon
            @blur="tripWebsite && urlReg.test(tripWebsite)  ? saveData('tripWebsite', tripWebsite) : null"
            :rules="[val => !val || urlReg.test(val) || 'Bitte gib einen richtigen Link an']"
            label="Link zu dieser Reise"
            lazy-rules
          />
        </q-list>
        <h4>Danger Zone</h4>
        <q-list
          bordered
          class="rounded-borders"
          style="padding:10px; border-color:red;"
        >
          <p style="font-size:18px;">Diese Rundreise und alle enthaltenen Inhalte löschen</p>
          <q-btn
            :loading="deleting"
            label="Löschen"
            class="q-mt-md"
            color="primary"
            text-color="white"
            @click="deleteDialog = true;"
          >
            <template v-slot:loading>
              <q-spinner />
            </template>
          </q-btn>
          <q-dialog
            persistent
            v-model="deleteDialog"
          >
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm">Willst du wirklich diese Rundreise und alle enthaltenen Inhalte löschen ? Dies kann nicht mehr rückgängig gemacht werden.</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Rundreise Löschen"
                  @click="deleteRoundtrip()"
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
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="map">
        <h4>Karte</h4>
        <Map
          :profile="profile"
          :stops="stops"
          :childrenAges="childrenAges"
          :rooms="Number(rooms)"
          :adults="Number(adults)"
          :editor="true"
          ref="map"
        ></Map>
      </q-tab-panel>
    </q-tab-panels>
    <v-tour
      name="myTour"
      :steps="steps"
      :options="tourOptions"
      :callbacks="tourCallbacks"
    ></v-tour>
  </div>
</template>
<style lang="less">
@import "../css/editRoundtrips.less";
</style>
<script>
import { date, Loading } from 'quasar'
import { auth, db, storage } from '../firebaseInit.js'
import axios from 'axios'
import { TaskQueue } from 'cwait'
import sharedMethods from '../sharedMethods'

require('vue-tour/dist/vue-tour.css')

let timeStamp = Date.now()
let formattedDate = date.formatDate(timeStamp, 'DD.MM.YYYY HH:mm')
let formattedScheduleDate = date.formatDate(timeStamp, 'DD.MM.YYYY')

// stop parameters
let BookingComLink = '',
  DateDistance = '',
  ExpediaLink = '',
  ImageUrl = '',
  Price = 0,
  RTId = 0

let details = []
let documentIds = []
let roundtripDocId = ''
let galeryImgId = 0
let tempLastClickLocation = {}

// context of vue app (set in mounted)
let context

import Map from '../pages/Map/Map'

export default {
  name: 'EditRoundtrips',
  components: {
    Stop: () => import('../pages/EditRoundtripComponents/stop'),
    CitySearch: () => import('../pages/Map/CitySearch'),
    Map,
    Duration: () => import('../pages/EditRoundtripComponents/duration'),
    // HotelSearch: () => import('../pages/Map/HotelSearch'),
    RegionSearch: () => import('../pages/Map/RegionSearch'),
    CitySuggestion: () => import('../pages/Map/CitySuggestion')
  },
  data () {
    return {
      pageTitle: 'Reise bearbeiten',
      category: 'Familienreise',
      categoryOptions: [],
      date: formattedDate,
      addButtonActive: false,
      publish: false,
      addExpanded: false,
      title: '',
      countries: [],
      submitting: false,
      offersSubmitting: false,
      deleting: false,
      regionOptions: null,
      stops: [],
      documentIds: [],
      titleImgUrl: null,
      galeryImgUrls: [],
      stars: 3,
      tempStars: 3,
      descriptionInput: null,
      highlight1: null,
      highlight2: null,
      highlight3: null,
      inputProfile: null,
      deleteDialog: false,
      OfferStartPeriod: formattedScheduleDate,
      OfferEndPeriod: formattedScheduleDate,
      visible: false,
      titleUploadDisabled: false,
      urlReg: /^(http:\/\/|https:\/\/)/,
      generalTempLink: '',
      price: 0,
      location: {},
      wholeYearOffer: false,
      accessToken: 'pk.eyJ1IjoibWFyZWlza2kiLCJhIjoiY2pkaHBrd2ZnMDIyOTMzcDIyM2lra3M0eSJ9.wcM4BSKxfOmOzo67iW-nNg',
      durations: [],
      profile: '',
      region: null,
      parkingPlace: {},
      uploading: false,
      tab: 'route',
      rooms: 0,
      adults: 0,
      children: 0,
      childrenAges: [],
      hotelName: null,
      hotelLocation: {},
      hotelStars: 0,
      hotelContact: {},
      arrivalDepatureProfile: 'Flugzeug',
      origin: null,
      destination: null,
      depatureDate: formattedScheduleDate,
      returnDate: formattedScheduleDate,
      travelClass: 'Economy',
      nonStop: 'Ja',
      originOptions: [],
      originCodes: [],
      destinationOptions: [],
      destinationCodes: [],
      originCode: null,
      destinationCode: null,
      initDates: [],
      showAutoRoutedialog: false,
      days: [],
      stopsLoaded: false,
      firstLoad: true,
      tripDuration: 0,
      allStopsExpanded: false,
      currentExpansionStates: [],
      companyProfile: false,
      tripWebsite: null,
      RTId: null,
      shareLink: null,
      shareCode: null,
      tripDistance: 0,
      tourCallbacks: {
        onPreviousStep: this.onPreviosTourStep,
        onNextStep: this.onNextTourStep,
        onStart: this.onTourStart
      },

      tourOptions: {
        useKeyboardNavigation: true,
        startTimeout: 2000,
        enableScrolling: false,
        highlight: true,
        labels: {
          buttonSkip: 'überspringen',
          buttonPrevious: 'zurück',
          buttonNext: 'weiter',
          buttonStop: 'fertig'
        }
      },

      // steps used for tour
      steps: [
        {
          target: '#v-step-0',
          content: `Dies ist der Titel deiner Reise um diesen zu ändern klicke einfach darauf`,
          params: {
            placement: 'left'
          }
        },
        {
          target: '#v-step-1',
          content: `Hier kannst du dir Städte zu deinem Reiseland vorschlagen lassen`,
          params: {
            placement: window.matchMedia('(max-width: 550px)').matches ? 'right' : 'top'
          }
        },
        {
          target: '#v-step-2',
          content: `Den Verlauf deiner Reise kannst du hier bearbeiten`,
          params: {
            placement: window.matchMedia('(max-width: 550px)').matches ? 'right' : 'top'
          }
        },
        {
          target: '#v-step-3',
          content: !window.matchMedia('(max-width: 550px)').matches ? `Unter diesem Punkt kannst du deine An-/Abreise planen` : `Unter diesem Punkt kannst du nach dem Speichern deine An-/Abreise planen`,
          params: {
            placement: window.matchMedia('(max-width: 550px)').matches ? 'right' : 'top'
          }
        },
        {
          target: '#v-step-4',
          content: !window.matchMedia('(max-width: 550px)').matches ? `In den Einstellungen kannst du deine Reise teilen, Bilder hochladen usw.` : `Nach dem Speichern kannst du in den Einstellungen deine Reise teilen, Bilder hochladen usw.`,
          params: {
            placement: window.matchMedia('(max-width: 550px)').matches ? 'left' : 'top'
          }
        },
        {
          target: '#v-step-5',
          content: `Hier findest du eine Karte mit allen Stopps, diese können hier ebenfalls hinzugefügt werden`,
          params: {
            placement: window.matchMedia('(max-width: 550px)').matches ? 'left' : 'top'
          }
        }
      ]
    }
  },
  meta () {
    return {
      title: this.pageTitle,
      meta: {
        description: { name: 'description', content: 'Reise auf roundtrips4you jetzt bearbeiten, komplett kostenlos, online und unkompliziert. Dein Reiseplaner mit Kartenfunktion, Städtevorschlag, Hotelsuche...' }
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    },
    sharedMethods () {
      return sharedMethods
    },
    getContext () {
      return context
    },
    isInDemoSession () {
      return this.$store.getters['demoSession/isInDemoSession']
    }
  },
  methods: {
    /**
     * Called when user goes one step back in tour
     * @param {number} currentStep current step as number (before change)
     */
    onPreviosTourStep (currentStep) {
      if (currentStep === 2) {
        this.$refs.tabPanels.goTo('inspiration')
      } else if (currentStep === 3) {
        this.$refs.tabPanels.goTo('route')
      } else if (currentStep === 4 && !this.isInDemoSession) {
        this.$refs.tabPanels.goTo('start')
      } else if (currentStep === 5 && !this.isInDemoSession) {
        this.$refs.tabPanels.goTo('settings')
      } else if (currentStep === 6) {
        this.$refs.tabPanels.goTo('map')
      }
      sharedMethods.scrollToOffset(0)
    },
    /**
     * Called when user goes one step forward in tour
     * @param {number} currentStep current step as number (before change)
     */
    onNextTourStep (currentStep) {
      if (currentStep === 0) {
        this.$refs.tabPanels.goTo('inspiration')
      } else if (currentStep === 1) {
        this.$refs.tabPanels.goTo('route')
      } else if (currentStep === 2 && !this.isInDemoSession) {
        this.$refs.tabPanels.goTo('start')
      } else if (currentStep === 3 && !this.isInDemoSession) {
        this.$refs.tabPanels.goTo('settings')
      } else if (currentStep === 4) {
        this.$refs.tabPanels.goTo('map')
      }
      sharedMethods.scrollToOffset(0)
    },
    /**
     * Called when tour is started => prevent to show tour again in this session
     */
    onTourStart () {
      this.$store.commit('demoSession/setTourShowed', true)
    },
    /**
     * show a POI on the edit roundtrips map
     * @param {Number} lat lat coordinate of POI
     * @param {Number} lng lng coordinate of POI
     */
    flyToPointOnEditRTMap (lat, lng) {
      this.tab = 'map'

      let context = this
      setTimeout(function () {
        context.$refs.map.flyToPointOnMap(lat, lng)
      }, 500)
    },
    /**
     * Copy share link of roundtrip to clipboard
     * @param {String} elementId the id of the element, where the link to copy is
     * @example copyShareLink('share-link-element')
     */
    copyShareLink (elementId) {
      let testingCodeToCopy = document.querySelector('#' + elementId)
      testingCodeToCopy.setAttribute('type', 'text')
      testingCodeToCopy.select()

      try {
        document.execCommand('copy')
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Link wurde erfolgreich kopiert'
        })
      } catch (err) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Oops da ist wohl was schiefgelaufen'
        })
      }

      // unselect the range
      testingCodeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    },
    /**
     * Quasar date options for offer period
     */
    scheduleDateOptions (date) {
      const dateTimeParts = this.OfferStartPeriod.split(' ')
      const dateParts = dateTimeParts[0].split('.')
      const compareDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
      const currentDate = new Date(date)

      return currentDate > compareDate
    },
    /**
     * Open booking.com flights in a new tab
     * @requires childrenAges, originCode, destinationCode, adults, travelClass, depatureDate, returnDate
     */
    openBookingComFlights () {
      let childrenAgeString = ''
      this.childrenAges.forEach((childAge, index) => {
        childrenAgeString += childAge
        if (index < this.childrenAges.length - 1) childrenAgeString += '%2C'
      })

      let url = 'https://flights.booking.com/flights/' + this.originCode + '-' + this.destinationCode + '/?type=ROUNDTRIP&adults=' + this.adults +
        '&cabinClass=' + this.travelClass.replace(/ /g, '_').toUpperCase() + '&children=' + childrenAgeString + '&depart=' + this.getFormattedDepatureReturnDate(this.depatureDate) + '&return=' + this.getFormattedDepatureReturnDate(this.returnDate) + '&sort=BEST'
      window.open(url, '_blank')
    },
    /**
     * Open booking.com flights in a new tab
     * @requires childrenAges, originCode, destinationCode, adults, travelClass, depatureDate, returnDate
     */
    openFluegeDeFlights () {
      let babies = 0
      let children = 0

      this.childrenAges.forEach((childAge, index) => {
        if (parseInt(childAge) < 2) babies++
      })
      children = this.childrenAges.length - babies

      let cabinClass = this.getFluegeDeClass(this.travelClass)

      let url = 'https://www.fluege.de/flight/wait/?sFlightInput%5BflightType%5D=RT&sFlightInput%5BstoreSearch%5D=true&sFlightInput%5Bf0%5D%5BdepLocation%5D=' + this.originCode +
        '&sFlightInput%5Bf0%5D%5BaccMultiAirportDep%5D=&sFlightInput%5Bf0%5D%5BdepAirport%5D=' + this.originCode +
        '&sFlightInput%5Bf0%5D%5BarrLocation%5D=' + this.destinationCode + ' &sFlightInput%5Bf0%5D%5BaccMultiAirportArr%5D=' + this.destinationCode +
        '&sFlightInput%5Bf0%5D%5BarrAirport%5D=' + this.destinationCode + '&sFlightInput%5Bf0%5D%5Bdate%5D=' + this.getFormattedDepatureReturnDate(this.depatureDate) +
        '&sFlightInput%5Bf1%5D%5Bdate%5D=' + this.getFormattedDepatureReturnDate(this.returnDate) + '&sFlightInput%5BpaxAdt%5D=' + this.adults + '&sFlightInput%5BpaxChd%5D=' + children +
        '&sFlightInput%5BpaxInf%5D=' + babies + '&sFlightInput%5BcabinClass%5D=' + cabinClass + '&sFlightInput%5BdepAirline%5D=&sFlightInput%5BareaSearch%5D=TRUE&pop%5Bf24%5D=on&sFlightInput%5Bf0%5D%5BtimeRange%5D=2&sFlightInput%5Bf1%5D%5BtimeRange%5D=2'
      window.open(url, '_blank')
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
    /**
     * Set roundtrip to shortest route possible (get it from getShortestRoute & reset init dates)
     * @see getShortestRoute()
     */
    setTripToShortestRoute () {
      let suggestedStops = this.getShortestRoute()
      let initDate = sharedMethods.getDateFromString(this.stops[0].InitDate)

      suggestedStops.forEach((stop, index) => {
        db.collection('RoundtripDetails').doc(stop.DocId).update({
          'InitDate': initDate
        })
        stop.InitDate = date.formatDate(initDate, 'DD.MM.YYYY HH:mm')
        initDate.setDate(initDate.getDate() + 1)

        if (index === suggestedStops.length - 1) this.stops = suggestedStops
      })
      // this.fetchSingleRoundtrip(this.$route.params.id)
      // this.fetchRoundtripStops(this.$route.params.id, false)
    },
    /**
     * Get shortest route in comparing the distances between every stop
     * @see getShortestDistance()
     */
    getShortestRoute () {
      let stopsTaken = [this.stops[0]]
      this.stops.forEach((stop, index) => {
        if (index > 0) {
          let foundStop = this.getShortestDistance(stopsTaken[stopsTaken.length - 1], stopsTaken)
          if (foundStop !== null) {
            stopsTaken.push(foundStop)
          }
        }
      })
      return stopsTaken
    },
    /**
     * Get shortest distance between two stops
     * @param originStop the origin to start from
     * @param {Array} stopsTaken array of stops already in suggested route
     * @see getDinstanceFromLatLonInKm()
     */
    getShortestDistance (originStop, stopsTaken) {
      let distances = []
      let stop = null
      this.stops.forEach(stop => {
        if (!stopsTaken.includes(stop)) {
          distances.push({ distance: this.getDistanceFromLatLonInKm(originStop.Location.lng, originStop.Location.lat, stop.Location.lng, stop.Location.lat), stop: stop })
        }
      })
      if (distances.length > 0) {
        let distanceValues = []

        distances.forEach(distanceArr => {
          distanceValues.push(distanceArr.distance)
        })

        let minVal = Math.min.apply(null, distanceValues)
        stop = distances[distances.findIndex(x => x.distance === minVal)].stop
      }
      return stop
    },
    /**
     * Get the distance between two lat lng positions in km
     * @example getDistanceFromLatLonInKm(42.2, 11.2, 42.6, 11.6)
     */
    getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
      var R = 6371 // Radius of the earth in km
      var dLat = this.deg2rad(lat2 - lat1) // deg2rad below
      var dLon = this.deg2rad(lon2 - lon1)
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)

      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      var d = R * c // Distance in km
      return d
    },
    deg2rad (deg) {
      return deg * (Math.PI / 180)
    },
    /**
     * Scrolls down when user expands add stop expansion item to center it on screen
     */
    scrollOnAddButtonClicked () {
      if (this.addExpanded) sharedMethods.scrollToRef(this.$refs['AddStopExpansionItem'])
    },
    /**
     * Called when add new stop event is fired -> call add stop method
     * @see addStop()
     */
    onAddStop () {
      if (!this.isDateTimeValid()) return false
      this.addExpanded = false
      this.addButtonActive = false

      try {
        this.addStop(this.date, this.location, this.generalTempLink, this.parkingPlace)
      } catch (e) {
        console.log(e)
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht erstellt werden'
        })
      }
      return false
    },
    // searchOffers () {
    //   return new Promise((resolve, reject) => {
    //     const url = 'https://test.api.amadeus.com/v1/security/oauth2/token'

    //     const headers = {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }

    //     const data = querystring.stringify({
    //       grant_type: 'client_credentials', // gave the values directly for testing
    //       client_id: 'NMNW1UbSmcYyd3UVUvGZ5NKUCAcOq2dp',
    //       client_secret: '5NLWAdMXnOyNxWnk'
    //     })

    //     axios.post(url, data, {
    //       headers: headers,
    //       form: {
    //         'grant_type': 'client_credentials',
    //         'client_id': 'NMNW1UbSmcYyd3UVUvGZ5NKUCAcOq2dp',
    //         'client_secret': '5NLWAdMXnOyNxWnk'
    //       }
    //     }).then(function (response) {
    //       let token = response.data.access_token
    //       const tokenString = 'Bearer ' + token

    //       let nonStopFlight = context.nonStop === 'Ja'

    //       axios.get('https://test.api.amadeus.com/v1/shopping/flight-offers?origin=' + context.originCode +
    //         '&destination=' + context.destinationCode + '&departureDate=' + context.getFormattedDepatureReturnDate(context.depatureDate) +
    //         '&travelClass=' + context.travelClass.toUpperCase() + '&nonStop=' + nonStopFlight + '&max=10&currency=EUR', {
    //         headers: {
    //           'Authorization': tokenString
    //         }
    //       }).then(function (response) {
    //         resolve(response)
    //       }).catch(function (error) {
    //         console.log('Error' + error)
    //         resolve(null)
    //       })
    //     }).catch(function (error) {
    //       console.log('Error on Authentication' + error)
    //       resolve(null)
    //     })
    //   })
    // },
    /**
     * Reformat date for third parties (eg. booking.com)
     * @returns string date in format jjjj-mm-dd
     */
    getFormattedDepatureReturnDate (dateString) {
      let dateParts = dateString.split('.')
      return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]
    },
    /**
     * Add stop to trip
     * @param DateString init date of stop as string
     * @param Location location object of new stop (contains: lat, lng, label)
     * @param Parking same as location but with parking location
     * @todo check if general link is neccessary
     * @important don't remove or move to another file (this method is also called from stop file)
     */
    addStop (DateString, Location, GeneralLink, Parking) {
      RTId = this.$route.params.id

      this.generalTempLink = null
      if (typeof this.$refs.urlInput !== 'undefined') this.$refs.urlInput.resetValidation()
      if (typeof this.$refs.citySearch !== 'undefined') this.$refs.citySearch.clear()

      let locationLabel = Location.label
      if (Location.label.includes(',')) locationLabel = Location.label.split(',')[0]

      let newStopObject = {
        BookingComLink,
        DateDistance,
        Description: 'Beschreibung zu ' + locationLabel,
        ExpediaLink,
        GeneralLink,
        ImageUrl,
        InitDate: DateString,
        Price,
        RTId,
        Title: 'Zwischenstopp in ' + locationLabel,
        Location,
        Parking: Parking
      }

      if (this.isInDemoSession) {
        this.$store.dispatch('demoSession/addNewStop', newStopObject)
        this.generalTempLink = null

        let tempStopDocId = (Math.floor(Math.random() * 10000000000000)).toString() + 'A'
        let results = { id: tempStopDocId }
        this.handleAddStopResults(results, newStopObject)
      } else {
        db.collection('RoundtripDetails').add(newStopObject).then(results => {
          this.handleAddStopResults(results, newStopObject)
        })
      }
    },
    /**
     * Handles the results retrieved from adding a stop
     * @param results results from firebase (only used to get doc id)
     * @param newStopObject the object of the stop added
     */
    handleAddStopResults (results, newStopObject) {
      // clear all values
      if (this.$refs.addEntryForm) this.$refs.addEntryForm.reset()

      this.generalTempLink = null
      this.location = {}

      if (this.$refs.citySearch) this.$refs.citySearch.clear()
      if (this.$refs.parkingPlaceSearch) this.$refs.parkingPlaceSearch.clear()

      this.addExpanded = false

      let docId = results.id
      newStopObject.DocId = docId
      newStopObject.expanded = false
      console.log('push Stop')

      for (var i = 0; i < this.stops.length && this.compare(this.stops[i], newStopObject) < 0; i++) { }
      this.stops.splice(i, 0, newStopObject)

      this.documentIds.splice(this.stops.findIndex(x => x.docId === docId), 0, docId)

      // save all values like in load roundtrip details
      let initDates = []
      let hotelCount = 0
      let days = 0
      let daysString = ''

      // get dates
      this.stops.forEach((stop) => {
        let initDate = stop.InitDate
        if (stop.InitDate.seconds) initDate = new Date(stop.InitDate.seconds * 1000)

        if (this.stops.indexOf(stop) === this.stops.length - 1) {
          // add one day
          const currentInitDate = sharedMethods.getDateFromString(initDate)
          const newInitDate = sharedMethods.getDateFromString(initDate)

          newInitDate.setDate(currentInitDate.getDate() + 1)
          this.date = date.formatDate(newInitDate, 'DD.MM.YYYY HH:mm')
        }

        if (stop.HotelName) hotelCount++

        if (!initDates.includes(initDate)) initDates.push(initDate)
      })

      if (initDates.length > 0) {
        let maxDate = new Date(Math.max.apply(null, initDates))
        let minDate = new Date(Math.min.apply(null, initDates))

        days = parseInt((maxDate.getTime() - minDate.getTime()) / (24 * 3600 * 1000))
      }

      this.initDates = initDates

      if (days < 5) {
        daysString = '< 5 Tage'
      } else if (days >= 5 && days <= 8) {
        daysString = '5-8 Tage'
      } else if (days >= 9 && days <= 11) {
        daysString = '9-11 Tage'
      } else if (days >= 12 && days <= 15) {
        daysString = '12-15 Tage'
      } else if (days > 15) {
        daysString = '> 15 Tage'
      }

      // save days and hotels
      if (daysString.length > 0) {
        this.saveData('Days', daysString)
      }
      this.saveData('Hotels', hotelCount)

      this.durations = []
      let tempUrls = []
      let tempUrlDocObjects = []

      this.stops.forEach((stop, index) => {
        if (index >= 1) {
          let url = this.getDurationUrl([this.stops[index - 1].Location.lng, this.stops[index - 1].Location.lat],
            [stop.Location.lng, stop.Location.lat], index !== this.stops.length ? this.stops[index - 1].DocId : this.stops[index].DocId,
            index !== this.stops.length ? this.stops[index - 1].Profile : this.stops[index].Profile, index !== this.stops.length ? this.stops[index - 1] : this.stops[index], index !== this.stops.length ? index - 1 : index)

          if (url) {
            tempUrls.push(url)
            tempUrlDocObjects.push({ id: this.stops[index - 1].DocId, url: url })
          }
        } else {
          if (this.stops.length === 1) this.stopsLoaded = true
        }

        // if its the last stop
        if (index === this.stops.length - 1) {
          this.stopsLoaded = true

          // get durations
          const urls = tempUrls
          const queue = new TaskQueue(Promise, 5)
          Promise.all(urls.map(queue.wrap(async url => axios.get(url)))).then(results => {
            results.forEach((result, resultIndex) => {
              const docId = tempUrlDocObjects[tempUrlDocObjects.findIndex(x => x.url === result.config.url)].id
              this.writeDuration(result.data.routes[0], docId)
            })
          }).catch(function (error) {
            console.log(error)
          })
        }
      })

      this.getTripDuration()

      this.saveFrequentlyChangingData()

      this.currentExpansionStates.push({ docId: docId, expanded: false })

      // reload Map
      console.log('LoadMap')
      console.log(this.stops)
      if (this.$refs.map) this.$refs.map.loadMap(null, this.stops)

      // setTimeout(function () {
      //   const el = document.getElementsByClassName('stop' + docId)[0]

      //   if (el) context.scrollTo(el.offsetTop)
      // }, 500)

      sharedMethods.showSuccessNotification('Eintrag wurde erstellt')
    },
    /**
     * Remove stop from trip
     * @param stopDocId firebase document id of the stop to remove
     * @important don't remove or move to another file (this method is also called from stop file)
     */
    removeStop (stopDocId) {
      this.documentIds.splice(this.documentIds.indexOf(stopDocId), 1)

      this.stops.splice(this.stops.findIndex(x => x.DocId === stopDocId), 1)

      // save all values like in load roundtrip details
      let initDates = []
      let hotelCount = 0
      let days = 0
      let daysString = ''

      // get dates
      this.stops.forEach((stop) => {
        let initDate = stop.InitDate
        if (stop.InitDate.seconds) initDate = new Date(stop.InitDate.seconds * 1000)

        if (this.stops.indexOf(stop) === this.stops.length - 1) {
          // add one day
          const currentInitDate = sharedMethods.getDateFromString(initDate)
          const newInitDate = sharedMethods.getDateFromString(initDate)

          newInitDate.setDate(currentInitDate.getDate() + 1)
          this.date = date.formatDate(newInitDate, 'DD.MM.YYYY HH:mm')
        }

        if (stop.HotelName) hotelCount++

        if (!initDates.includes(initDate)) initDates.push(initDate)
      })

      if (initDates.length > 0) {
        let maxDate = new Date(Math.max.apply(null, initDates))
        let minDate = new Date(Math.min.apply(null, initDates))

        days = parseInt((maxDate.getTime() - minDate.getTime()) / (24 * 3600 * 1000))
      }

      this.initDates = initDates

      if (days < 5) {
        daysString = '< 5 Tage'
      } else if (days >= 5 && days <= 8) {
        daysString = '5-8 Tage'
      } else if (days >= 9 && days <= 11) {
        daysString = '9-11 Tage'
      } else if (days >= 12 && days <= 15) {
        daysString = '12-15 Tage'
      } else if (days > 15) {
        daysString = '> 15 Tage'
      }

      // save days and hotels
      if (daysString.length > 0) {
        this.saveData('Days', daysString)
      }
      this.saveData('Hotels', hotelCount)

      this.durations = []
      let tempUrls = []
      let tempUrlDocObjects = []

      this.stops.forEach((stop, index) => {
        if (index >= 1) {
          let url = this.getDurationUrl([this.stops[index - 1].Location.lng, this.stops[index - 1].Location.lat],
            [stop.Location.lng, stop.Location.lat], index !== this.stops.length ? this.stops[index - 1].DocId : this.stops[index].DocId,
            index !== this.stops.length ? this.stops[index - 1].Profile : this.stops[index].Profile, index !== this.stops.length ? this.stops[index - 1] : this.stops[index], index !== this.stops.length ? index - 1 : index)

          if (url) {
            tempUrls.push(url)
            tempUrlDocObjects.push({ id: this.stops[index - 1].DocId, url: url })
          }
        }

        // if its the last stop
        if (index === this.stops.length - 1) {
          // get durations
          this.stopsLoaded = true
          const urls = tempUrls
          const queue = new TaskQueue(Promise, 5)
          Promise.all(urls.map(queue.wrap(async url => axios.get(url)))).then(results => {
            results.forEach((result, resultIndex) => {
              const docId = tempUrlDocObjects[tempUrlDocObjects.findIndex(x => x.url === result.config.url)].id
              this.writeDuration(result.data.routes[0], docId)
            })
          }).catch(function (error) {
            console.log(error)
          })
        }
      })

      this.getTripDuration()

      this.saveFrequentlyChangingData()

      this.currentExpansionStates.splice(this.currentExpansionStates.findIndex(x => x.docId === stopDocId), 1)

      // reload Map
      if (this.$refs.map) this.$refs.map.loadMap(null)
    },
    /**
     * Save saveFrequentlyChangingData (eg. days, hotels & countries)
     */
    saveFrequentlyChangingData () {
      let daysString = ''
      let days = 1
      let initDates = []
      let hotelCount = 0

      this.fetchAndSaveCountries()

      this.stops.forEach((stop, index) => {
        let dateTimeParts = stop.InitDate.split(' ')
        let dateParts = dateTimeParts[0].split('.')
        let timeParts = dateTimeParts[1].split(':')
        let initDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

        if (!initDates.includes(initDate)) initDates.push(initDate)
        if (stop.HotelName) hotelCount++
      })

      if (initDates.length > 0) {
        let maxDate = new Date(Math.max.apply(null, initDates))
        let minDate = new Date(Math.min.apply(null, initDates))

        days = parseInt((maxDate.getTime() - minDate.getTime()) / (24 * 3600 * 1000))
      }

      if (isNaN(days)) days = 1
      if (isNaN(hotelCount)) hotelCount = 0

      if (days < 5) {
        daysString = '< 5 Tage'
      } else if (days >= 5 && days <= 8) {
        daysString = '5-8 Tage'
      } else if (days >= 9 && days <= 11) {
        daysString = '9-11 Tage'
      } else if (days >= 12 && days <= 15) {
        daysString = '12-15 Tage'
      } else if (days > 15) {
        daysString = '> 15 Tage'
      }
      if (daysString.length > 0) {
        this.saveData('Days', daysString)
      }
      this.saveData('Hotels', hotelCount)
    },
    /**
     * fetch trip countries and save them
     * @important don't remove or move to another file (this method is also called from stop file)
     */
    fetchAndSaveCountries () {
      let tempCountries = []
      let promiseList = []

      this.stops.forEach((stop, index) => {
        let url = 'http://api.geonames.org/countryCodeJSON?lang=de&lat=' + stop.Location.lat + '&lng=' + stop.Location.lng + '&username=roundtrips4you'

        promiseList.push(
          axios.get(url)
            .then(response => {
              if (!tempCountries.includes(response.data.countryName)) tempCountries.push(response.data.countryName)
            }).catch(function (error) {
              console.log(error)
            })
        )
      })

      Promise.all(promiseList).then(vals => {
        this.countries = []
        this.countries = tempCountries

        // save countries
        this.saveData('Location', this.countries)
      })
    },
    /**
     * Delete the current roundtrip
     */
    deleteRoundtrip () {
      console.log(roundtripDocId)
      if (roundtripDocId === null || roundtripDocId === '' || roundtripDocId === 'undefined') return false
      try {
        this.$store.dispatch('roundtrips/deleteRoundtrip', roundtripDocId).then(success => {
          if (success) {
            sharedMethods.showSuccessNotification('Rundreise wurde gelöscht')
            context.$router.push('/meine-rundreisen')
          } else {
            sharedMethods.showErrorNotification('Die Rundreise konnte nicht gelöscht werden')
          }
        })
      } catch (error) {
        console.log(error)
        sharedMethods.showErrorNotification('Die Rundreise konnte nicht gelöscht werden')
      }
    },
    /**
     * Save the current trip (save all fields)
     */
    onSaveRoundtrip () {
      this.submitting = true

      let dateParts = this.OfferStartPeriod.split('.')
      let offerStartPeriod = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

      dateParts = this.OfferEndPeriod.split('.')
      let offerEndPeriod = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

      if (this.saveData('Public', this.publish) &&
        this.saveData('Location', this.countries) &&
        this.saveData('Category', this.category) &&
        this.saveData('Stars', this.stars) &&
        this.saveData('Description', this.descriptionInput) &&
        this.saveData('Highlights', [this.highlight1, this.highlight2, this.highlight3]) &&
        this.saveData('Region', this.region) &&
        this.saveData('Profile', this.inputProfile) &&
        this.saveData('OfferStartPeriod', offerStartPeriod) &&
        this.saveData('OfferEndPeriod', offerEndPeriod) &&
        this.saveData('Price', this.price) &&
        this.saveData('OfferWholeYear', this.wholeYearOffer) &&
        this.saveData('Rooms', this.rooms) &&
        this.saveData('Adults', this.adults) &&
        this.saveData('ChildrenAges', this.childrenAges)
      ) {
        this.submitting = false
        // this.$q.notify({
        //   color: 'green-4',
        //   textColor: 'white',
        //   icon: 'check_circle',
        //   message: 'Rundreise wurde gespeichert'
        // })
      } else {
        this.submitting = false
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Bitte überprüfe deine Angaben'
        })
      }
    },
    /**
     * Save arrival and depature data
     */
    onSaveArrivalDepature () {
      this.submitting = true

      if (this.arrivalDepatureProfile === 'Flugzeug') {
        let dateParts = this.depatureDate.split('.')
        let depatureDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

        dateParts = this.returnDate.split('.')
        let returnDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

        try {
          db.collection('RoundtripDetails').doc(this.documentIds[0]).update({
            'InitDate': depatureDate
          })
        } catch (error) {
          console.log(error)
        }

        if (this.saveData('TransportProfile', this.arrivalDepatureProfile) &&
          this.saveData('Origin', this.origin) &&
          this.saveData('OriginCode', this.originCodes[this.originOptions.indexOf(this.origin)] ? this.originCodes[this.originOptions.indexOf(this.origin)] : this.originCode) &&
          this.saveData('Destination', this.destination) &&
          this.saveData('DestinationCode', this.destinationCodes[this.destinationOptions.indexOf(this.destination)] ? this.destinationCodes[this.destinationOptions.indexOf(this.destination)] : this.destinationCode) &&
          this.saveData('DepatureDate', depatureDate) &&
          this.saveData('ReturnDate', returnDate) &&
          this.saveData('TravelClass', this.travelClass) &&
          this.saveData('NonStop', this.nonStop)
        ) {
          this.submitting = false
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Daten wurden gespeichert'
          })
        } else {
          this.submitting = false
        }
      } else {
        if (this.saveData('TransportProfile', this.arrivalDepatureProfile)) {
          this.submitting = false
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Daten wurden gespeichert'
          })
        } else {
          this.submitting = false
        }
      }
    },
    /**
     * Quasar select filter for flight origins (filter airports)
     */
    getFlightOrigins (val, update, abort) {
      sharedMethods.filterAirports(val, update, abort, true, context)
    },
    /**
     *  Quasar select filter for flight destinations (filter airports)
     */
    getDestinations (val, update, abort) {
      sharedMethods.filterAirports(val, update, abort, false, context)
    },
    /**
     * fetches data of the roundtrip for the given id
     * @param RTId the id of the roundtrip to fetch (current RT id)
     */
    fetchSingleRoundtrip (RTId) {
      if (this.isInDemoSession) {
        let roundtrip = this.$store.getters['demoSession/getRoundtrip']
        this.writeRoundtripIntoFields(roundtrip)
      } else {
        this.$store.dispatch('roundtrips/fetchSingleRoundtrip', RTId).then(roundtrip => {
          this.writeRoundtripIntoFields(roundtrip)
        }).catch(err => {
          console.log('Error getting Roundtrip', err)

          // show this message only if it's not a user
          if (auth.user()) {
            sharedMethods.showErrorNotification('Es gibt fehlende Angaben bei deiner Rundreise')
          }
        })
      }
    },
    /**
     * Writes the current roundtrip data into local fields
     * @param roundtrip the roundtrip object that contains all data
     */
    writeRoundtripIntoFields (roundtrip) {
      this.shareLink = 'https://roundtrips4you.de/MapWidget/' + RTId
      this.shareCode = '<iframe src="https://roundtrips4you.de/MapWidget/' + RTId + '"></iframe>'

      this.title = roundtrip.Title
      this.publish = roundtrip.Public
      this.countries = roundtrip.Location
      this.stars = roundtrip.Stars
      this.category = roundtrip.Category
      this.descriptionInput = roundtrip.Description
      this.highlight1 = roundtrip.Highlights[0]
      this.highlight2 = roundtrip.Highlights[1]
      this.highlight3 = roundtrip.Highlights[2]
      this.inputProfile = roundtrip.Profile
      this.region = roundtrip.Region
      this.price = roundtrip.Price
      this.wholeYearOffer = roundtrip.OfferWholeYear
      this.rooms = roundtrip.Rooms
      this.adults = roundtrip.Adults
      this.children = roundtrip.ChildrenAges.length
      this.childrenAges = roundtrip.ChildrenAges

      if (roundtrip.tripWebsite) this.tripWebsite = roundtrip.tripWebsite

      this.pageTitle = this.title + ' bearbeiten'

      this.arrivalDepatureProfile = roundtrip.TransportProfile ? roundtrip.TransportProfile : 'Flugzeug'
      this.origin = roundtrip.Origin

      let retrievedDate = new Date(roundtrip.OfferEndPeriod.seconds * 1000)
      this.OfferEndPeriod = date.formatDate(retrievedDate, 'DD.MM.YYYY')

      retrievedDate = new Date(roundtrip.OfferStartPeriod.seconds * 1000)
      this.OfferStartPeriod = date.formatDate(retrievedDate, 'DD.MM.YYYY')

      if (this.arrivalDepatureProfile === 'Flugzeug') {
        this.destination = roundtrip.Destination
        this.travelClass = roundtrip.TravelClass ? roundtrip.TravelClass : 'Economy'
        this.nonStop = roundtrip.NonStop ? roundtrip.NonStop : 'Ja'
        this.originCode = roundtrip.OriginCode
        this.destinationCode = roundtrip.DestinationCode

        if (this.depatureDate && roundtrip.DepatureDate) {
          retrievedDate = new Date(roundtrip.DepatureDate.seconds * 1000)
          this.depatureDate = date.formatDate(retrievedDate, 'DD.MM.YYYY')
        } else {
          this.depatureDate = formattedScheduleDate
        }

        if (this.returnDate && roundtrip.ReturnDate) {
          retrievedDate = new Date(roundtrip.ReturnDate.seconds * 1000)
          this.returnDate = date.formatDate(retrievedDate, 'DD.MM.YYYY')
        } else {
          this.depatureDate = formattedScheduleDate
        }
      }

      // get the default profile of the roundtrip
      this.getGeneralProfile()

      this.loadInitImgs()
    },
    /**
   * fetch all category options from firebase db
   */
    fetchCategories () {
      let roundtripsRef = db.collection('Categories')
      roundtripsRef.get()
        .then(snapshot => {
          this.categoryOptions = []
          snapshot.forEach(doc => {
            this.categoryOptions.push(doc.data().Category)
          })
        })
    },
    /**
   * update location object witch city search results
   * @param event event from city search update callback
   */
    updateLocation (event) {
      if (event !== null) {
        this.location = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
      } else {
        this.location = {}
      }
    },
    /**
   * update location object witch parking place search results
   * @param event event from parking place search update callback
   */
    updateParkingPlace (event) {
      if (event !== null) {
        this.parkingPlace = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
      }
    },
    /**
   * update region object witch region search results
   * @param event event from region search update callback
   */
    updateRegion (event) {
      if (event !== null) {
        this.region = event
      }
    },
    /**
   * fetch the stops of the current trip
   * @param RTId the current roundtrip id
   * @param refreshAll deletes all already fetched stops
   */
    fetchRoundtripStops (RTId, refreshAll) {
      if (!this.firstLoad && refreshAll) {
        Loading.show({
          spinnerColor: 'primary'
        })
      }

      if (refreshAll) this.stops = []

      details = []
      documentIds = []

      if (this.isInDemoSession) {
        let stops = this.$store.getters['demoSession/getStops']
        stops.forEach(stop => {
          details.push(stop)
          documentIds.splice(stops.findIndex(x => x.docId === stop.Docid), 0, stop.DocId)
        })
        this.getDataOutOfStops(refreshAll)
        Loading.hide()
      } else {
        let roundtripsRef = db.collection('RoundtripDetails')
          .where('RTId', '==', RTId)
          .orderBy('InitDate')
        roundtripsRef.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let index = details.push(doc.data()) - 1
              details[index].DocId = doc.id
              documentIds.splice(details.findIndex(x => x.docId === doc.id), 0, doc.id)
            })
            this.getDataOutOfStops(refreshAll)
            this.stops.sort(this.compare)
            Loading.hide()
          })
          .catch(err => {
            console.log('Error getting Roundtrips', err)
            sharedMethods.showErrorNotification('Deine Rundreise konnte nicht geladen werden, bitte versuche es erneut')
            Loading.hide()
          })
      }
    },
    /**
     * handles all the data from stops assinged to this roundtrip
     * @requires details the fetched stops
     */
    getDataOutOfStops (refreshAll) {
      let lastScrollPos = document.documentElement.scrollTop
      this.documentIds = documentIds

      let daysString = ''
      let days = 1
      let initDates = []
      let hotelCount = 0

      // get dates
      details.forEach((stop) => {
        let initDate = null
        if (typeof stop.InitDate !== 'string') {
          initDate = new Date(stop.InitDate.seconds * 1000)
          stop.InitDate = date.formatDate(initDate, 'DD.MM.YYYY HH:mm')
        } else {
          initDate = sharedMethods.getDateFromString(stop.InitDate)
        }

        if (details.indexOf(stop) === details.length - 1) {
          // add one day
          const newInitDate = initDate

          newInitDate.setDate(newInitDate.getDate() + 1)
          this.date = date.formatDate(newInitDate, 'DD.MM.YYYY HH:mm')
        }

        if (stop.HotelName) hotelCount++

        if (!initDates.includes(initDate)) initDates.push(initDate)
      })

      if (initDates.length > 0) {
        let maxDate = new Date(Math.max.apply(null, initDates))
        let minDate = new Date(Math.min.apply(null, initDates))

        days = parseInt((maxDate.getTime() - minDate.getTime()) / (24 * 3600 * 1000))
      }

      this.initDates = initDates

      if (days < 5) {
        daysString = '< 5 Tage'
      } else if (days >= 5 && days <= 8) {
        daysString = '5-8 Tage'
      } else if (days >= 9 && days <= 11) {
        daysString = '9-11 Tage'
      } else if (days >= 12 && days <= 15) {
        daysString = '12-15 Tage'
      } else if (days > 15) {
        daysString = '> 15 Tage'
      }

      // save days and hotels
      if (daysString.length > 0) {
        this.saveData('Days', daysString)
      }
      this.saveData('Hotels', hotelCount)

      this.durations = []
      let tempUrls = []
      let tempUrlDocObjects = []

      details.forEach((stop, index) => {
        if (index >= 1) {
          let url = this.getDurationUrl([details[index - 1].Location.lng, details[index - 1].Location.lat],
            [stop.Location.lng, stop.Location.lat], index !== details.length ? details[index - 1].DocId : details[index].DocId,
            index !== details.length ? details[index - 1].Profile : details[index].Profile, index !== details.length ? details[index - 1] : details[index], index !== details.length ? index - 1 : index)

          if (url) {
            tempUrls.push(url)
            tempUrlDocObjects.push({ id: details[index - 1].DocId, url: url })
          }
        } else {
          if (details.length === 1) {
            this.stops = details
            this.stopsLoaded = true
          }
        }

        // if its the last stop
        if (index === details.length - 1) {
          this.stops = details
          this.stopsLoaded = true

          // get durations
          const urls = tempUrls
          const queue = new TaskQueue(Promise, 5)
          Promise.all(urls.map(queue.wrap(async url => axios.get(url)))).then(results => {
            results.forEach((result, resultIndex) => {
              const docId = tempUrlDocObjects[tempUrlDocObjects.findIndex(x => x.url === result.config.url)].id
              this.writeDuration(result.data.routes[0], docId)
            })
          }).catch(function (error) {
            console.log(error)
          })
          this.getTripDuration()
          this.saveFrequentlyChangingData()
          // reload Map
          if (this.$refs.map) this.$refs.map.loadMap(null)

          if (!this.firstLoad && refreshAll) {
            setTimeout(function () {
              sharedMethods.scrollToOffset(lastScrollPos)
            }, 500)
          }

          setTimeout(function () {
            let emptyStates = !context.currentExpansionStates.length

            context.stops.forEach((stop, index) => {
              if (emptyStates || !context.currentExpansionStates) {
                context.currentExpansionStates.push({ docId: stop.DocId, expanded: (index === 0) })
                if (context.$refs[stop.DocId]) index === 0 ? context.$refs[stop.DocId][0].changeExpansion(true) : context.$refs[stop.DocId][0].changeExpansion(false)
              } else {
                if (context.currentExpansionStates[context.currentExpansionStates.findIndex(x => x.docId === stop.DocId)]) {
                  context.$refs[stop.DocId][0].changeExpansion(context.currentExpansionStates[context.currentExpansionStates.findIndex(x => x.docId === stop.DocId)].expanded)
                } else {
                  // this stop was not already added
                  index === 0 ? context.$refs[stop.DocId][0].changeExpansion(true) : context.$refs[stop.DocId][0].changeExpansion(false)
                }
              }
            })
            Loading.hide()
          }, 500)
        }
      })

      this.firstLoad = false
    },
    /**
     * rearanges all stops and updates all components (called when a stops date was updated)
     * @param newInitDate new date of stop to update
     * @param currentDocId doc id of stop to update
     */
    resortAndPrepareStops (newInitDate, currentDocId) {
      // update date
      this.stops[this.stops.findIndex(x => x.DocId === currentDocId)].InitDate = date.formatDate(newInitDate, 'DD.MM.YYYY HH:mm')

      // prepare from resortet stops
      this.stops.sort(this.compare)

      this.days = []
      this.durations = []
      let tempUrls = []
      let tempUrlDocObjects = []

      this.stops.forEach((stop, index) => {
        if (index >= 1) {
          let url = this.getDurationUrl([this.stops[index - 1].Location.lng, this.stops[index - 1].Location.lat],
            [stop.Location.lng, stop.Location.lat], index !== this.stops.length ? this.stops[index - 1].DocId : this.stops[index].DocId,
            index !== this.stops.length ? this.stops[index - 1].Profile : this.stops[index].Profile, index !== this.stops.length ? this.stops[index - 1] : this.stops[index], index !== this.stops.length ? index - 1 : index)

          if (url) {
            tempUrls.push(url)
            tempUrlDocObjects.push({ id: this.stops[index - 1].DocId, url: url })
          }

          // this.getDuration([this.stops[index - 1].Location.lng, this.stops[index - 1].Location.lat],
          //   [stop.Location.lng, stop.Location.lat], index !== this.stops.length ? this.stops[index - 1].DocId : this.stops[index].DocId,
          //   index !== this.stops.length ? this.stops[index - 1].Profile : this.stops[index].Profile, index !== this.stops.length ? this.stops[index - 1] : this.stops[index], index !== this.stops.length ? index - 1 : index)
        }

        // if its the last stop
        if (index === this.stops.length - 1) {
          this.stopsLoaded = true

          // get duration
          const urls = tempUrls
          const queue = new TaskQueue(Promise, 5)
          Promise.all(urls.map(queue.wrap(async url => axios.get(url)))).then(results => {
            results.forEach((result, resultIndex) => {
              const docId = tempUrlDocObjects[tempUrlDocObjects.findIndex(x => x.url === result.config.url)].id
              this.writeDuration(result.data.routes[0], docId)
            })
          }).catch(function (error) {
            console.log(error)
          })
        }
      })

      this.getTripDuration()
    },
    /**
    * sorts trip stops after their init dates (must be placed in sort())
    */
    compare (a, b) {
      const initDateA = sharedMethods.getDateFromString(a.InitDate)
      const initDateB = sharedMethods.getDateFromString(b.InitDate)

      if (initDateA > initDateB) return 1
      if (initDateB > initDateA) return -1

      return 0
    },
    getDurationUrl (startLocation, endLocation, docId, stopProfile, stop, index) {
      let profile = this.profile
      if (stopProfile !== null && typeof stopProfile !== 'undefined' && stopProfile.length > 0) profile = stopProfile

      if (profile !== 'plane') {
        return 'https://api.mapbox.com/directions/v5/mapbox/' + profile + '/' + startLocation[0] + ',' + startLocation[1] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + this.accessToken
      } else {
        return null
      }
    },
    writeDuration (result, docId) {
      if (result !== null && typeof result !== 'undefined') {
        let duration = sharedMethods.msToTime(result.duration * 1000)

        let distance = Math.floor(result.distance / 1000) > 0 ? Math.floor(result.distance / 1000) : ''
        if (distance !== '') {
          this.tripDistance = this.tripDistance + distance
          distance = ' (' + distance + 'km)'
        }

        this.durations.splice(this.stops.findIndex(x => x.DocId === docId), 0, { duration: duration, durationInMs: result.duration * 1000, distance: distance, docId: docId })

        this.getDays(this.stops[this.stops.findIndex(x => x.DocId === docId)], result.duration * 1000)
      } else {
        this.durations.splice(this.stops.findIndex(x => x.DocId === docId), 0, { duration: null, distance: null, docId: docId })
        if (this.stops.indexOf(stop) === this.stops.length - 2) this.stopsLoaded = true
      }
    },
    getDefaultCheckOutDate (stop) {
      let initDate = null
      if (stop.InitDate.seconds) initDate = new Date(stop.InitDate.seconds * 1000)
      else initDate = sharedMethods.getDateFromString(stop.InitDate)

      // add one day
      const defaultCheckOutDate = initDate
      defaultCheckOutDate.setDate(initDate.getDate() + 1)

      return date.formatDate(defaultCheckOutDate, 'DD.MM.YYYY')
    },
    getDays (stop, duration) {
      let days = 0

      let dateTimeParts = stop.InitDate.split(' ')
      let dateParts = dateTimeParts[0].split('.')
      let timeParts = dateTimeParts[1].split(':')
      let currentInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

      dateTimeParts = this.stops[this.stops.indexOf(stop) + 1].InitDate.split(' ')
      dateParts = dateTimeParts[0].split('.')
      timeParts = dateTimeParts[1].split(':')
      let nextInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

      let dateDistance = 0
      if (duration) dateDistance = (nextInitDate.valueOf() - currentInitDate.valueOf()) - duration
      else dateDistance = nextInitDate.valueOf() - currentInitDate.valueOf()

      days = sharedMethods.msToTime(dateDistance)

      this.days.splice(this.stops.findIndex(x => x.DocId === stop.DocId), 0, { days: days, docId: stop.DocId })

      if (this.stops.indexOf(stop) === this.stops.length - 2) {
        setTimeout(function () {
          context.stopsLoaded = true
        }, 500)
      }
    },
    saveTitle (val) {
      this.isUniqueTitle(val).then(uniqueTitle => {
        if (uniqueTitle !== 'Dieser Titel ist bereits vergeben') {
          this.saveData('Title', val)
        } else {
          this.showWrongTitleNotify()
        }
      })
    },
    saveData (field, value) {
      if (roundtripDocId === null || roundtripDocId === '' || typeof roundtripDocId === 'undefined') return false
      // if (value === null || value === '' || typeof value === 'undefined') return false
      try {
        db.collection('Roundtrips').doc(roundtripDocId).update({
          ['' + field]: value
        })
      } catch (error) {
        console.log(error)
        return false
      }
      return true
    },
    getGaleryImgId () {
      const returnVal = galeryImgId
      galeryImgId++
      return returnVal
    },
    fileAdded: function (event, kind) {
      let files = event
      let uploadIndex = 0

      // disable another upload
      if (kind === 'galery') this.visible = true
      else this.titleUploadDisabled = true
      this.uploadNext(files, kind, uploadIndex)

      this.$refs.titleUpload.reset()
      this.$refs.galeryUpload.reset()
    },
    uploadNext (files, kind, uploadIndex) {
      if (!this.uploading) {
        this.upload(files[uploadIndex], kind, uploadIndex + this.galeryImgUrls.length, uploadIndex === files.length - 1, files.length, uploadIndex).then(function (success) {
          context.uploading = false
          uploadIndex++
          if (uploadIndex < files.length) context.uploadNext(files, kind, uploadIndex)
        })
      }
    },
    upload (file, kind, count, lastItem, absoluteFiles, uploadIndex) {
      this.uploading = true

      return new Promise((resolve, reject) => {
        let kindPath = 'Title/titleImg'
        if (kind === 'galery') {
          kindPath = 'Galery/galeryImg' + count
        }
        const fileRef = storage.ref().child('Images/Roundtrips/' + roundtripDocId + '/' + kindPath)

        fileRef.put(file).then(function (snapshot) {
          context.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Bild ' + (uploadIndex + 1) + ' von ' + absoluteFiles + ' wurde erfolgreich hochgeladen'
          })
          if (lastItem) {
            context.visible = false
            context.titleUploadDisabled = false
          }
          fileRef.getDownloadURL().then(function (url) {
            if (kind === 'galery') {
              context.galeryImgUrls.push(url)
            } else if (kind === 'title') {
              context.titleImgUrl = url
            }
          })
          resolve(true)
        }).catch(function (error) {
          console.log(error)
          context.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Das Bild konnte nicht hochgeladen werden'
          })

          context.visible = false
          context.titleUploadDisabled = false
          resolve(false)
        })
      })
    },
    loadInitImgs () {
      var fileRef = storage.ref().child('Images/Roundtrips/' + roundtripDocId + '/Title/titleImg')
      fileRef.getDownloadURL().then(function (url) {
        context.titleImgUrl = url
      }).catch(e => { })

      fileRef = storage.ref().child('Images/Roundtrips/' + roundtripDocId + '/Galery')
      fileRef.listAll().then(function (res) {
        res.items.forEach(function (itemRef) {
          fileRef = storage.ref().child(itemRef.fullPath)
          context.galeryImgUrls = []
          fileRef.getDownloadURL().then(function (url, index) {
            context.galeryImgUrls.push(url)
          })
        })
      }).catch(function () { })
    },
    removeFile (index) {
      let galeryImgNameArr = this.galeryImgUrls[index].split('Galery%2F')
      let galeryImgName = galeryImgNameArr[1]
      galeryImgName = galeryImgName.substring(0, galeryImgName.indexOf('?alt'))

      const fileRef = storage.ref().child('Images/Roundtrips/' + roundtripDocId + '/Galery/' + galeryImgName)
      fileRef.delete().then(function (snapshot) {
        context.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Bild wurde erfolgreich gelöscht'
        })
        context.galeryImgUrls.splice(index, 1)
      })
    },
    hasDisplayPermission (RTId, userId) {
      let roundtripsRef = db.collection('Roundtrips')
        .where('RTId', '==', RTId)
        .where('UserId', '==', userId)
        .limit(1)
      roundtripsRef.get()
        .then(snapshot => {
          return Number(snapshot.size) === 1
        })
    },
    hotelRatingAvg () {
      let sum = 0
      let count = 0

      this.stops.forEach((stop, index) => {
        if (stop.HotelName) {
          sum += parseInt(stop.HotelStars, 10)
          count++
        }
      })

      return sum / count
    },
    changeAllFollowingStopDates (stopId, millis, currentStopDate) {
      let index = this.stops.findIndex(x => x.DocId === stopId) + 1
      let promiseList = []

      for (index; index < this.stops.length; index++) {
        let currentInitDate = sharedMethods.getDateFromString(this.stops[index].InitDate)

        let newInitDateMillis = 0

        if (millis < 0) {
          newInitDateMillis = currentInitDate.valueOf() - Math.abs(millis)
        } else {
          newInitDateMillis = currentInitDate.valueOf() + millis
        }

        const newInitDate = new Date(newInitDateMillis)

        this.stops[index].InitDate = date.formatDate(newInitDate, 'DD.MM.YYYY HH:mm')

        const docId = this.stops[index].DocId

        promiseList.push(
          db.collection('RoundtripDetails').doc(docId).update({
            'InitDate': newInitDate
          })
        )
      }

      Promise.all(promiseList).then(v => {
        context.resortAndPrepareStops(currentStopDate, stopId)
      })
    },
    isDateTimeValid () {
      var testDate = this.date
      if (testDate === null || testDate.length === 0) return false
      var matches = testDate.match(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/)
      if (matches === null) return false
      var year = parseInt(matches[3], 10)
      var month = parseInt(matches[2], 10) - 1
      var day = parseInt(matches[1], 10)
      var hour = parseInt(matches[4], 10)
      var minute = parseInt(matches[5], 10)
      var date = new Date(year, month, day, hour, minute)
      if (date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day ||
        date.getHours() !== hour ||
        date.getMinutes() !== minute
      ) {
        return false
      } else {
        return true
      }
    },
    getGeneralProfile () {
      switch (this.inputProfile) {
        case 'zu Fuß':
          this.profile = 'walking'
          break
        case 'Fahrrad':
          this.profile = 'cycling'
          break
        default:
          this.profile = 'driving'
          break
      }
    },
    getStringProfile (profile) {
      switch (profile) {
        case 'walking':
          return 'zu Fuß'
        case 'cycling':
          return 'Fahrrad'
        case 'plane':
          return 'Flugzeug'
        default:
          return 'Auto'
      }
    },
    showWrongTitleNotify () {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: 'Bitte gib einen anderen Titel ein'
      })
    },
    copyRT (originalRT, UserId, newTitle) {
      this.isUniqueTitle(newTitle).then(uniqueTitle => {
        if (newTitle === null || newTitle === '' || uniqueTitle === 'Dieser Titel ist bereits vergeben') {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Ooops da ist wohl was schiefgelaufen'
          })
          this.$router.push('/meine-rundreisen')
          return false
        } else {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Rundreise wird zum bearbeiten kopiert...'
          })
        }

        let timeStamp = Date.now()

        // create a temporary random id
        let tempRTId = Math.floor(Math.random() * 10000000000000)

        let newRoundtrip = {}

        let originalRTId = originalRT.RTId

        // copy all values
        newRoundtrip = originalRT

        // change all different values here
        newRoundtrip.RTId = tempRTId
        newRoundtrip.UserId = UserId
        newRoundtrip.Public = false
        newRoundtrip.Title = newTitle
        newRoundtrip.createdAt = new Date(timeStamp)

        // create new document with original rt data
        db.collection('Roundtrips').add(newRoundtrip).then(result => {
          console.log(originalRTId)

          db.collection('Roundtrips').doc(result.id).update({
            'RTId': result.id
          }).catch(ex => {
            console.log(ex)
          })

          // get roundtrip details and update with original rt data
          let roundtripDetailsRef = db.collection('RoundtripDetails')
            .where('RTId', '==', originalRTId)
          roundtripDetailsRef.get()
            .then(detailsSnapshot => {
              detailsSnapshot.forEach(detailDoc => {
                let docData = detailDoc.data()

                // copy all original values
                let newRoundtripDetails = docData

                // change different values here
                newRoundtripDetails.RTId = result.id

                db.collection('RoundtripDetails').add(newRoundtripDetails).then(result => {
                  // -- everything succeeded --

                  // add new copy entry to user
                  let userRef = db.collection('User')
                    .where('UserUID', '==', UserId)
                    .limit(1)
                  userRef.get()
                    .then(snapshot => {
                      snapshot.forEach(doc => {
                        let userRTEdited = doc.data().RTEdited
                        db.collection('User').doc(UserId).update({
                          'RTEdited': (userRTEdited + 1)
                        })
                      })
                    }).catch(ex => {
                      console.log(ex)
                    })

                  // refresh page
                  this.$router.push('/meine-rundreisen')
                }).catch(ex => {
                  console.log(ex)
                })
              })
            })
        }).catch(ex => {
          console.log(ex)
        })
      }
      )
    },
    getTripDuration () {
      let startDate = sharedMethods.getDateFromString(this.stops[0].InitDate)

      let stopDate = sharedMethods.getDateFromString(this.stops[this.stops.length - 1].InitDate)
      const oneDay = 24 * 60 * 60 * 1000

      const diffDays = Math.round(Math.abs((startDate - stopDate) / oneDay))
      this.tripDuration = diffDays
    },
    isUniqueTitle (value) {
      return new Promise((resolve, reject) => {
        value = value.toLowerCase()
        value = value.charAt(0).toUpperCase() + value.slice(1)
        value = value.trim()
        let roundtripsRef = db.collection('Roundtrips')
          .where('Title', '==', value)
          .limit(1)
        roundtripsRef.get()
          .then(snapshot => {
            resolve(snapshot.size === 0 || 'Dieser Titel ist bereits vergeben')
          }).catch(function (error) {
            console.log('Error ' + error)
            resolve(null)
          })
      })
    },
    getUserData () {
      let userRef = db.collection('User')
        .where('UserUID', '==', auth.user().uid)
        .limit(1)
      userRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.companyProfile = !!doc.data().companyProfile

            // if (doc.data().website) this.CompanyWebsite = doc.data().website
            // if (doc.data().companyDescription) this.companyDescription = doc.data().companyDescription
          })
        })
    },
    getUserRoundtrips () {
      this.$store.dispatch('roundtrips/fetchAllRoundtrips', auth.user().uid).then(result => {
        let roundtripsRef = db.collection('RoundtripDetails')
          .where('RTId', '==', result.roundtrips[0].RTId)
          .orderBy('InitDate')
        roundtripsRef.get()
          .then(RTDetailsSnapshot => {
            // if the user has only one Roundtrip and also just one Stopp was added
            if (Number(result.roundtrips.length) === 1 && Number(RTDetailsSnapshot.size) === 1) {
              // if (!this.$store.getters['demoSession/tourShowed']) this.$tours['myTour'].start()
              setTimeout(function () {
                sharedMethods.scrollToOffset(0)
              }, 2000)
            }
          })
      })
    }
  },
  mounted () {
    context = this
    this.$root.$on('addStop', (formattedDate, lastClickLocation) => {
      // check if we didn't add this stop before
      if (tempLastClickLocation !== lastClickLocation) {
        tempLastClickLocation = lastClickLocation
        this.addStop(formattedDate, tempLastClickLocation, null, null)
      }
    })
  },
  created () {
    auth.authRef().onAuthStateChanged((user) => {
      const params = this.$route.params.id
      let RTId = params
      let title = null

      if (params.includes('&')) {
        RTId = params.split('&')[0]
        title = params.split('&')[1]
      }

      this.RTId = RTId
      this.stars = !isNaN(this.hotelRatingAvg()) ? this.hotelRatingAvg() : 3

      if (this.isInDemoSession) {
        this.fetchSingleRoundtrip(RTId)
        this.fetchRoundtripStops(RTId, false)
        this.fetchCategories()

        // always start tour here
        // if (!this.$store.getters['demoSession/tourShowed']) this.$tours['myTour'].start()

        setTimeout(function () {
          sharedMethods.scrollToOffset(0)
        }, 2000)
      }

      this.$store.dispatch('roundtrips/fetchSingleRoundtrip', RTId).then(roundtrip => {
        if (roundtrip === null) sharedMethods.showErrorNotification('Diese Reise existiert leider nicht (mehr)')
        roundtripDocId = roundtrip.docId

        if (auth.user() === null) this.$router.push('/login')

        let isCreator = auth.user().uid === roundtrip.UserId
        let isPublic = roundtrip.Public === true

        if (isCreator) {
          this.fetchSingleRoundtrip(RTId)
          this.fetchRoundtripStops(RTId, false)
          this.fetchCategories()
          this.getUserData()
          this.getUserRoundtrips()
        } else if (isPublic) {
          this.copyRT(roundtrip, auth.user().uid, title)
        } else {
          sharedMethods.showErrorNotification('Ooops da ist leider etwas schiefgelaufen, diese Rundreise ist Privat')
          this.$router.push('/meine-rundreisen')
        }
      })
    })
  },
  beforeDestroy () {
    this.saveFrequentlyChangingData()
  }
}
</script>
