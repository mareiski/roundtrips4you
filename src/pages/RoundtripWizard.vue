<template>
  <div
    id="roundtripWizard"
    :style="!isRTEditMode ? 'padding-top:20px;' : ''"
    :class="!isRTEditMode ? 'q-px-lg q-pb-md' : ''"
  >
    <q-dialog
      v-model="showCancelDialog"
      persistent
    >
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Ungesicherte Änderungen</div>
          <span>Wenn du jetzt zurück gehst werden deine Änderungen verworfen! <br /> Möchtest du trotzdem zurück?</span>
        </q-card-section>
        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            label="Änderungen verwerfen"
            v-close-popup
            flat
            @click="cancelDialogNext(); $store.commit('demoSession/resetRoundtrip')"
          />
          <q-btn
            type="submit"
            label="Abbrechen"
            flat
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div
      style="margin-bottom:20px;"
      v-if="!$store.getters['demoSession/isInDemoSession']"
    >
      <a
        v-show="!isRTEditMode"
        @click="$router.push('/meine-rundreisen')"
      >
        <q-icon name="keyboard_arrow_left"></q-icon>
        meine Rundreisen
      </a>
    </div>
    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      :contracted="isMobile"
      animated
      keep-alive
      v-if="!isRTEditMode"
    >
      <template v-slot:navigation>
        <!-- placholder for sticky nav -->
        <div style="height:80px;"></div>
      </template>

      <template v-slot:message>
        <div
          class="sticky-navigation"
          :style="!isRTEditMode ? 'top: 93vh;' : ''"
        >
          <q-stepper-navigation class="flex justify-end">
            <template v-if="step === 1">
              <q-btn
                color="primary"
                :disable="!currentRoundtrip.Title || !currentRoundtrip.Rooms || !currentRoundtrip.Adults"
                @click="step = 2; unsavedChanges = true"
                label="weiter"
              />
              <q-tooltip v-if="!currentRoundtrip.Title">Bitte gib einen Titel an</q-tooltip>
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
                @click="step = 3; unsavedChanges = true"
                color="primary"
                :disable="currentRoundtrip.TransportProfile === 'Reisemittel wählen' || (currentRoundtrip.TransportProfile === 'Flugzeug' && (!currentRoundtrip.TransportProfile || !currentRoundtrip.Origin || !currentRoundtrip.Destination || !currentRoundtrip.DepatureDate || !currentRoundtrip.ReturnDate || !currentRoundtrip.TravelClass || !currentRoundtrip.NonStop))"
                label="Weiter"
              />
            </template>

            <template v-else-if="step === 3">
              <div class="flex justfiy-between">
                <div
                  class="flex justify-center"
                  style="flex-direction:column;"
                >
                  <span>{{totalTripDistance}} km, {{totalTripDuration}} Tag(e)</span>
                </div>
                <div>
                  <q-btn
                    flat
                    @click="step = 2"
                    color="primary"
                    label="zurück"
                    class="q-ml-sm"
                    v-if="!isRTEditMode"
                  />
                  <q-btn
                    color="primary"
                    :disable="addedStops.length <= 1"
                    :label="unsavedChanges ? (!isRTEditMode ? 'Reise fertigstellen' : 'Reise speichern') : 'Reise ansehen'"
                    class="q-ml-sm"
                    :loading="saving"
                    @click="unsavedChanges ? createTrip(false) : $router.push('/rundreise-ansehen/' + $route.params.id)"
                  />
                </div>
              </div>
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
        v-if="!isRTEditMode"
      >
        <q-input
          v-model="currentRoundtrip.Title"
          :rules="[val => val !== null &&  val !== ''  || 'Bitte gib einen Titel an', val => val[0] !== ' ' || 'Das erste Zeichen kann kein Leerzeichen sein']"
          label="Titel"
          outlined
          ref="titleInput"
        >
          <template v-slot:prepend>
            <q-icon name="title" />
          </template>
        </q-input>

        <div>
          <p>Die folgenden Infos benötigen wir, um bei der Hotelsuche bereits alle Daten für dich einzugeben. <br /> Du kannst dies auch später noch ändern</p>
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
        <p>Wenn du das genaue Datum noch nicht weißt, kannst du es auch später noch ändern.</p>
        <q-input
          filled
          v-model="currentStop.InitDate"
          error-message="Bitte gib ein richtiges Datum an"
          :error="!isDateTimeValid()"
          lazy-rules
          bottom-slots
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
        v-if="!isRTEditMode"
      >
        <ArrivalDeparture
          v-if="currentRoundtrip.DepatureDate"
          :currentRoundtrip="currentRoundtrip"
          :startDate="currentStop.InitDate.split(' ')[0]"
          @updateArrivalDeparture="updateArrivalDeparture($event)"
        ></ArrivalDeparture>
      </q-step>

      <q-step
        :name="3"
        title="Reise erstellen"
        icon="place"
        :done="step > 3"
        :header-nav="step > 3"
      >

        <TripOverview
          :addedStops="addedStops"
          :currentRoundtrip="currentRoundtrip"
          :isEditMode="isRTEditMode"
          @stopsDragged="onStopsDragged($event)"
          @editStop="editStop($event);"
          @removeStop="removeStop($event)"
          @addStop="handleAddStopFromMap($event)"
          @update="updateFromSuggestedCity($event)"
          @distanceUpdate="updateTotalTripDistance($event)"
          @addSight="addSightFromMap($event)"
          ref="tripOverview"
        ></TripOverview>
      </q-step>

    </q-stepper>
    <div v-else>
      <TripOverview
        :addedStops="addedStops"
        :currentRoundtrip="currentRoundtrip"
        :isEditMode="isRTEditMode"
        @stopsDragged="onStopsDragged($event)"
        @editStop="editStop($event);"
        @removeStop="removeStop($event)"
        @addStop="handleAddStopFromMap($event)"
        @update="updateFromSuggestedCity($event)"
        @distanceUpdate="updateTotalTripDistance($event)"
        @addSight="addSightFromMap($event)"
        ref="tripOverview"
      ></TripOverview>
      <div
        class="sticky-navigation"
        style="justify-content:space-between;"
      >
        <div class="flex">
          <span>{{totalTripDistance}} km, {{totalTripDuration}} Tag(e)</span>
          <q-btn
            class="q-mt-md"
            text-color="primary"
            flat
            @click="showAutoRoutedialog = true"
            :disable="addedStops.length <= 2"
            label="auto Route erstellen"
            style="margin:0; margin-left:20px;"
          >
            <q-tooltip v-if="addedStops.length <= 2">Bitte erstelle mehr als 2 Stopps</q-tooltip>
          </q-btn>
        </div>
        <q-btn
          color="primary"
          :label="unsavedChanges ? (!isRTEditMode ? 'Reise fertigstellen' : 'Reise speichern') : 'Reise ansehen'"
          class="q-ml-sm"
          :loading="saving"
          @click="unsavedChanges ? createTrip(false) : $router.push('/rundreise-ansehen/' + $route.params.id)"
        />
      </div>
    </div>

    <q-dialog
      v-model="showAddStopDialog"
      class="bg-white"
    >
      <q-card>
        <q-card-section>
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
            v-model.number="currentStop.DayDuration"
            type="number"
            filled
            label="Dauer in Tagen"
            :rules="[val => val !== '' && val >= 0 || 'Bitte gib eine Anzahl von Tagen ein']"
            lazy-rules
          />
          <div style="margin-bottom:20px;">
            <span>Ankunftszeit:</span>
            <span class="cursor-pointer font-medium">
              {{ currentStop.InitDate.split(' ')[1] }}
              <q-icon
                name="access_time"
                class="cursor-pointer"
              ></q-icon>
              <q-popup-proxy
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time
                  v-model="currentStop.InitDate"
                  mask="DD.MM.YYYY HH:mm"
                  format24h
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      label="Fertig"
                      color="primary"
                      flat
                    />
                  </div>
                </q-time>
              </q-popup-proxy>
            </span>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            label="Abbrechen"
          />
          <q-btn
            color="primary"
            :disable="!currentStop.Title && currentStop.DayDuration <= 0"
            @click="() => { addStop(true) }"
            v-close-popup
            label="hinzufügen"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="showEditStopDialog"
      persistent
    >
      <q-card id="editStopDialogCard">
        <q-card-section>
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
            v-model.number="currentStop.DayDuration"
            type="number"
            filled
            label="Dauer in Tagen"
            :rules="[val => val !== null &&  val !== '' && val >= 0 || 'Bitte gib eine Anzahl von Tagen ein']"
            lazy-rules
          />
          <div style="margin-bottom:20px;">
            <span>Ankunft:</span>
            <span class="cursor-pointer font-medium">
              {{ currentStop.InitDate.split(' ')[1] }}
              <q-icon
                name="access_time"
                class="cursor-pointer"
              ></q-icon>
              <q-popup-proxy
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time
                  v-model="currentStop.InitDate"
                  mask="DD.MM.YYYY HH:mm"
                  format24h
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      label="Fertig"
                      color="primary"
                      flat
                    />
                  </div>
                </q-time>
              </q-popup-proxy>

            </span>
          </div>
          <q-select
            outlined
            v-model="inputProfile"
            :options="['zu Fuß', 'Fahrrad', 'Auto']"
            label="Reisemittel ab Ort"
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
            v-if="!currentStop.HotelName"
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
              v-if="currentStop.HotelName"
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
                    <span style="padding-right:5px;">{{capitalize(currentStop.HotelName)}}</span>
                    <q-rating
                      v-if="currentStop.HotelStars && !isNaN(currentStop.HotelStars)"
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
                        v-if="currentStop.GuestRating"
                        class="raleway"
                      >
                        {{currentStop.GuestRating}},&nbsp;
                      </span>
                      <span v-if="currentStop.HotelPrice">
                        <span class="raleway">ca. € </span>
                        <span class="raleway">{{currentStop.HotelPrice}}</span>
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
                    >{{currentStop.HotelLocation && typeof currentStop.HotelLocation !== 'undefined' && currentStop.HotelLocation.label && typeof currentStop.HotelLocation.label !== 'undefined' ? capitalize(currentStop.HotelLocation.label) :  'kein Ort angegeben'}}</a>
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-btn
                    v-if="currentStop.TransportLocations && currentStop.TransportLocations.lenght > 0"
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
                          v-for="location in currentStop.TransportLocations"
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
                  <div v-if="currentStop.GeneralTempLink && currentStop.GeneralTempLink.length > 0">
                    <q-chip
                      icon="link"
                      dense
                      class="linkChip"
                      clickable
                      @click="openInNewTab(currentStop.GeneralTempLink)"
                    >Hotelwebsite</q-chip>
                  </div>
                  <q-chip
                    icon="launch"
                    v-if="currentStop.HotelName && typeof currentStop.HotelName !== 'undefined'
                     "
                    dense
                    style="width:117px;"
                    class="linkChip"
                    clickable
                    @click="openInNewTab('https://www.booking.com/searchresults.de.html?ss=' + capitalize(currentStop.HotelName) + '&checkin_year=' + date.split(' ')[0].split('.')[2] + '&checkin_month=' + date.split('.')[1] + '&checkin_monthday=' + date.split('.')[0] + '&checkout_year=' + currentStop.CheckOutDate.split('.')[2] + '&checkout_month=' + currentStop.CheckOutDate.split('.')[1] + '&checkout_monthday=' + currentStop.CheckOutDate.split('.')[0] + '&group_adults=' + adults + getChildrenText() +  '&no_rooms=' + rooms + '&ac_langcode=de')"
                  > booking.com
                    <q-tooltip>Hotel auf booking.com</q-tooltip>
                  </q-chip>
                  <q-chip
                    icon="launch"
                    v-if="currentStop.HotelName && typeof currentStop.HotelName !== 'undefined'
                    "
                    dense
                    style="width:117px;"
                    class="linkChip"
                    clickable
                    @click="openInNewTab('https://www.expedia.de/Hotel-Search?adults=' + adults + 'children=' + getExpediaChildrenText() + '%2C1_3&destination=' + capitalize(currentStop.HotelName) + '&endDate=' + currentStop.CheckOutDate.split(' ')[0].split('.')[2] + '-' + currentStop.CheckOutDate.split('.')[1] + '-' + currentStop.CheckOutDate.split('.')[0] + '&rooms=' + rooms + '&sort=RECOMMENDED&startDate=' + date.split(' ')[0].split('.')[2] + '-' + date.split('.')[1] + '-' + date.split('.')[0] + '&theme=&useRewards=true')"
                  > expedia
                    <q-tooltip>Hotel auf expedia</q-tooltip>
                  </q-chip>
                </q-item-section>
                <q-item-section
                  side
                  v-if="currentStop.HotelContact && typeof currentStop.HotelContact !== 'undefined'
                  "
                >
                  <div class="hotel-contact">
                    <q-chip
                      v-if="currentStop.HotelContact.email && typeof currentStop.HotelContact.email !== 'undefined'
                      "
                      icon="email"
                      clickable
                      @click="openInNewTab('mailto:' + currentStop.HotelContact.email)"
                    >{{ currentStop.HotelContact.email}}
                    </q-chip>
                    <q-chip
                      icon="phone"
                      v-if="currentStop.HotelContact.phone && typeof currentStop.HotelContact.phone !== 'undefined'
                      "
                      clickable
                      @click="openInNewTab('tel:' + currentStop.HotelContact.phone)"
                    >{{currentStop.HotelContact.phone}}
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

          <!-- <div v-if="suggestedSights && suggestedSights !== 'error'">
            <span
              v-for="(sight, index) in suggestedSights"
              :key="index"
              :href="'https://www.google.com/search?q=' + sight.name + ' ' + currentStop.Location ? currentStop.Location.label.split(',')[0] : ''"
              target="_blank"
              style="text-decoration:none;"
            >
              <q-chip
                clickable
                @click="$refs.sightDialog.openSightDialog(addedSight)"
                :icon="sight.category === 'SIGHTS' ? 'account_balance' : 'location_on'"
              >{{sight.name}}
              </q-chip>

            </span>
            <a
              target="_blank"
              v-if="currentStop.Location"
              :href="'https://www.google.com/search?q=' +  currentStop.Location.label.split(',')[0] + ' Sehenswürdigkeiten'"
            >weitere auf Google</a>
            <SightDialog
              :addAble="true"
              ref="sightDialog"
            ></SightDialog>
          </div> -->

          <q-select
            label="gemerkte Orte"
            filled
            v-model="currentStop.Sights"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            style="margin:10px 10px 10px 0;"
            ref="sightInput"
          >
            <template v-slot:prepend>
              <q-icon
                name="add"
                @click.stop
              />
            </template>
          </q-select>

          <span>Klicke auf diesen Stopp auf der Karte um dir Orte vorschlagen zu lassen<br></span>

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
          <div class="flex">
            <q-input
              filled
              ref="tempImgLinkInput"
              label="Bild per Link einfügen"
              v-model="tempImgLink"
              :rules="[val => sharedMethods.validURL(val) || 'Bitte gib einen richtigen Link ein']"
              lazy-rules
              bottom-slots
              outlined
              style="padding:0; width:80%; margin-bottom:10px;"
            ></q-input>
            <q-btn
              round
              color="primary"
              icon="add"
              :disable="!sharedMethods.validURL(tempImgLink)"
              style="margin-left:10px; margin-top:5px; height:45px;"
              @click="addImageToStop(tempImgLink)"
            />
          </div>
          <Uploader
            :RTId="currentRoundtrip.RTId"
            :stopImages="currentStop.StopImages ? currentStop.StopImages : null"
            :uploadDisabled="false"
            @imageAdded="addImageToStop($event)"
            @imageDeleted="removeImageFromStop($event)"
          />
          <p>Bitte verwende nur Bilder die für die Wiederverwendung eindeutig gekennzeichnet sind.</p>
        </q-card-section>
        <q-card-actions
          align="right"
          class="sticky-navigation"
        >
          <q-btn
            flat
            label="Abbrechen"
            color="primary"
            v-close-popup
          />
          <q-btn
            label="Speichern"
            color="primary"
            :disable="currentStop.DayDuration < 0"
            @click="() => { addStop(true) }"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      persistent
      v-model="showAutoRoutedialog"
    >
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Wenn du eine automatische Route erstellst wird die aktuelle Reihenfolge deiner Route verändert. Möchtest du Fortfahren?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="kürzeste Route setzen"
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
  </div>
</template>
<style lang="less">
@import "../css/roundtripWizard.less";

// dont remove this, neccessary for inline display of editor content in trip overview
.MsoListParagraph {
  display: inline !important;
}
</style>
<script>
import { countries } from '../countries.js'
import axios from 'axios'
import sharedMethods from '../sharedMethods.js'
import { date } from 'quasar'
// import draggable from 'vuedraggable'
import { auth, db } from '../firebaseInit.js'
const turf = () => import('@turf/turf')

let timeStamp = Date.now()
let formattedScheduleDate = date.formatDate(timeStamp, 'DD.MM.YYYY')

export default {
  components: {
    HotelSearch: () => import('../components/Map/HotelSearch.vue'),
    ArrivalDeparture: () => import('../components/EditRoundtripComponents/arrivalDeparture.vue'),
    TripOverview: () => import('../components/TripOverview/TripOverview.vue'),
    Uploader: () => import('../components/Uploader/Uploader.vue')
  },
  computed: {
    isMobile () {
      return window.matchMedia('(max-width: 550px)').matches
    },
    user () {
      return auth.user()
    },
    sharedMethods () {
      return sharedMethods
    }
  },
  watch: {
    step: function () {
      sharedMethods.scrollToOffset(0)
    }
  },
  name: 'RoundtripWizard',
  data () {
    return {
      step: 1,
      countryOptions: countries,
      country: 'Land wählen',
      preventPasting: false,
      originOptions: [],
      destinationOptions: [],
      unsavedChanges: false,
      currentRoundtrip: {
        Title: '',
        Rooms: 1,
        Adults: 2,
        ChildrenAges: [],
        Children: 0,
        TransportProfile: 'Reisemittel wählen',
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
        Profile: 'driving',
        DayDuration: 1
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
      showCancelDialog: false,
      cancelDialogNext: null,

      addedStops: [],
      sightDialog: { showed: false, title: '', imgSrc: '', description: '', shortDescription: '' },
      addHotel: false,
      addHotelDisabled: true,
      inputProfile: 'Auto',
      showAutoRoutedialog: false,

      isRTEditMode: false,
      saving: false,

      totalTripDuration: 0,
      totalTripDistance: 0,

      // -1 if no stop to edit (normal mode) else put index of stop to edit
      stopToEdit: -1,

      showAddStopDialog: false,
      showEditStopDialog: false,

      tempImgLink: '',

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
     @param reset if current stop should be resetted
     */
    addStop (reset) {
      console.log('stopToEdit ' + this.stopToEdit)
      this.unsavedChanges = true

      // remove placeholder if not changed
      if (this.currentStop.Description === 'Raum für Notizen, Beschreibungen...') this.currentStop.Description = ''

      // add days of current stop to current date to get next stop init date
      let currentDate = sharedMethods.getDateFromString(this.currentStop.InitDate)
      currentDate.setDate(currentDate.getDate() + this.currentStop.DayDuration)

      // this stop was already added to addedStops (edit mode)
      if (this.stopToEdit > -1) {
        if (this.addedStops[this.stopToEdit].DayDuration !== this.currentStop.DayDuration) {
          const dayDistance = this.currentStop.DayDuration - this.addedStops[this.stopToEdit].DayDuration

          // update dates of all following stops
          for (let i = this.stopToEdit + 1; i < this.addedStops.length; i++) {
            const currentStopDate = sharedMethods.getDateFromString(this.addedStops[i].InitDate)

            currentStopDate.setDate(currentStopDate.getDate() + dayDistance)

            this.addedStops[i].InitDate = date.formatDate(currentStopDate, 'DD.MM.YYYY HH:mm')
          }
        }

        this.addedStops[this.stopToEdit] = this.currentStop

        // set next stop init date to last stops one
        currentDate = sharedMethods.getDateFromString(this.addedStops[this.addedStops.length - 1].InitDate)
        currentDate.setDate(currentDate.getDate() + this.addedStops[this.addedStops.length - 1].DayDuration)

        // stay in edit mode if reset is false
        if (reset) this.stopToEdit = -1
      } else {
        this.addedStops.push(this.currentStop)
      }

      if (reset) {
        this.currentStop = {
          Title: 'neuer Stopp',
          Description: 'Raum für Notizen, Beschreibungen...',
          Location: null,
          Sights: [],
          InitDate: date.formatDate(currentDate, 'DD.MM.YYYY HH:mm'),
          Profile: 'driving',
          DayDuration: 1
        }
      }

      // reload map
      if (this.$refs.tripOverview) this.$refs.tripOverview.refreshMap()

      this.updateTotalTripDuration()
    },
    /**
     * Set roundtrip to shortest route possible (get it from getShortestRoute & reset init dates)
     * @see getShortestRoute()
     */
    setTripToShortestRoute () {
      this.getShortestRoute().then(suggestedStops => {
        let initDate = sharedMethods.getDateFromString(this.addedStops[0].InitDate)

        suggestedStops.forEach((stop, index) => {
          stop.InitDate = date.formatDate(initDate, 'DD.MM.YYYY HH:mm')
          initDate.setDate(initDate.getDate() + 1)

          if (index === suggestedStops.length - 1) this.addedStops = suggestedStops
        })

        this.updateTotalTripDuration()
      })
    },
    /**
     * called when a sight via map poi button was marked (added to stop)
     */
    addSightFromMap (event) {
      let stopToAddSightTo = this.addedStops[this.addedStops.findIndex(x => x.Location.label === event.cityName)]
      stopToAddSightTo.Sights.push(event.poi.name)
    },
    /**
     * get shortest route in comparing the distances between every stop
     * @see getShortestDistance()
     */
    async getShortestRoute () {
      let stopsTaken = [this.addedStops[0]]

      // get shortest distance between all points and add them to stops taken
      for (let index = 0; index < this.addedStops.length; index++) {
        if (index > 0) {
          await this.getShortestDistance(stopsTaken[stopsTaken.length - 1], stopsTaken).then(foundStop => {
            if (foundStop !== null) {
              stopsTaken.push(foundStop)
              // tod go here to next stop not before
            }
          })

          if (index === this.addedStops.length - 1) return stopsTaken
        }
      }
    },
    /**
     * Get shortest distance between two stops
     * @param originStop the origin to start from
     * @param {Array} stopsTaken array of stops already in suggested route
     * @see getDinstanceFromLatLonInKm()
     */
    getShortestDistance (originStop, stopsTaken) {
      return new Promise((resolve) => {
        let distances = []
        let stop = null
        let promiseList = []

        // get distances for all stops
        this.addedStops.forEach(stop => {
          if (!stopsTaken.includes(stop)) {
            promiseList.push(
              this.getDistanceFromLatLonInKm(originStop.Location.lng, originStop.Location.lat, stop.Location.lng, stop.Location.lat)
                .then(calcDistance => {
                  distances.push({ distance: calcDistance, stop: stop })
                })
            )
          }
        })

        Promise.all(promiseList).then(vals => {
          if (distances.length > 0) {
            let distanceValues = []

            distances.forEach(distanceArr => {
              distanceValues.push(distanceArr.distance)
            })

            let minVal = Math.min.apply(null, distanceValues)
            stop = distances[distances.findIndex(x => x.distance === minVal)].stop
            console.log(stop)
            resolve(stop)
          }
        })
      })
    },
    /**
     * get the distance between two lat lng positions in km
     */
    getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
      return new Promise((resolve) => {
        turf().then(turf => {
          var from = turf.point([lat1, lon1])
          var to = turf.point([lat2, lon2])
          var options = { units: 'kilometers' }

          var distance = turf.distance(from, to, options)

          resolve(distance)
        }).catch(e => {
          console.log(e)
          return 0
        })
      })
    },
    deg2rad (deg) {
      return deg * (Math.PI / 180)
    },
    /**
    called when user selects arrival departure features
     */
    updateArrivalDeparture (event) {
      this.currentRoundtrip.TransportProfile = event.transportProfile
      this.currentRoundtrip.Origin = event.origin
      this.currentRoundtrip.Destination = event.destination
      this.currentRoundtrip.DepatureDate = event.depatureDate
      this.currentRoundtrip.ReturnDate = event.returnDate
      this.currentRoundtrip.TravelClass = event.travelClass
      this.currentRoundtrip.NonStop = event.nonStop
    },
    /**
     *  removes the stop with the given index
     */
    removeStop (index) {
      this.unsavedChanges = true

      // all following dates of deleted stop must be updated
      // following stop of deleted stop gets deleted stops date

      // get date of stop to delete
      const deletedStopDate = this.addedStops[index].InitDate

      // delete this stop from db
      if (this.addedStops[index].DocId) db.collection('RoundtripDetails').doc(this.addedStops[index].DocId).delete()

      // delete stop
      this.addedStops.splice(index, 1)

      // set following date to delete stop date
      this.addedStops[index].InitDate = deletedStopDate

      for (let i = index + 1; i < this.addedStops.length; i++) {
        let previousStopDate = sharedMethods.getDateFromString(this.addedStops[i - 1].InitDate)

        previousStopDate.setDate(previousStopDate.getDate() + this.addedStops[i - 1].DayDuration)
        this.addedStops[i].InitDate = date.formatDate(previousStopDate, 'DD.MM.YYYY')
      }

      let lastStop = this.addedStops[this.addedStops.length - 1]
      let currentDate = sharedMethods.getDateFromString(lastStop.InitDate)
      currentDate.setDate(currentDate.getDate() + lastStop.DayDuration)

      this.currentStop.InitDate = date.formatDate(currentDate, 'DD.MM.YYYY HH:mm')

      // reload map
      console.log('reload from delete')
      if (this.$refs.tripOverview) this.$refs.tripOverview.refreshMap()

      if (this.addedStops.length === 0) this.step = 3
      this.updateTotalTripDuration()
    },
    /**
     * creates the roundtrip (write the temp data into db)
     */
    createTrip (stay) {
      if (!this.unsavedChanges && !stay) this.$router.push('/rundreise-ansehen/' + this.$route.params.id)

      // need this json stringify to prevent update of location when the click location changes
      let stops = JSON.parse(JSON.stringify(this.addedStops))

      // make all date strings to real dates
      stops.forEach((stop, index) => {
        stop.InitDate = sharedMethods.getDateFromString(this.addedStops[index].InitDate)
      })

      this.currentRoundtrip.Title = this.currentRoundtrip.Title.charAt(0).toUpperCase() + this.currentRoundtrip.Title.slice(1)
      this.currentRoundtrip.Title = this.currentRoundtrip.Title.trim()

      let tripDuration = this.getTripDuration()
      let daysString = '< 5 Tage'

      if (tripDuration < 5) {
        daysString = '< 5 Tage'
      } else if (tripDuration >= 5 && tripDuration <= 8) {
        daysString = '5-8 Tage'
      } else if (tripDuration >= 9 && tripDuration <= 11) {
        daysString = '9-11 Tage'
      } else if (tripDuration >= 12 && tripDuration <= 15) {
        daysString = '12-15 Tage'
      } else if (tripDuration > 15) {
        daysString = '> 15 Tage'
      }

      this.currentRoundtrip.Days = daysString

      this.getRoundtripCountries().then(countries => {
        if (this.$store.getters['demoSession/isInDemoSession'] && auth.user() === null) {
          this.$store.dispatch({ type: 'demoSession/addRoundtrip', roundtripObject: this.currentRoundtrip, tempLocation: countries, originCode: null, destinationCode: null, stops: stops }).then(() => {
            this.unsavedChanges = false
            this.$router.push('/registrieren')
          })
        } else if (this.isRTEditMode) {
          let promiseList = []

          // update existing roundtrip
          this.addedStops.forEach(stop => {
            if (stop.DocId) {
              // this stop is existing
              promiseList.push(db.collection('RoundtripDetails').doc(stop.DocId).update(stop))
            } else {
              // this is a new stop
              stop.RTId = this.$route.params.id
              promiseList.push(db.collection('RoundtripDetails').add(stop))
            }
          })

          this.saving = true
          let context = this

          Promise.all(promiseList).then(() => {
            context.saving = false
            context.unsavedChanges = false
            sharedMethods.showSuccessNotification('Reise wurde gespeichert')

            if (!stay) {
              setTimeout(function () {
                context.$router.push('/rundreise-ansehen/' + context.$route.params.id)
              }, 1000)
            }
          })
        } else {
          // add roundtrip normally

          this.saving = true
          try {
            this.$store.dispatch({ type: 'roundtrips/addRoundtrip', title: this.currentRoundtrip.Title, days: daysString, uid: auth.user().uid, rooms: this.currentRoundtrip.Rooms, adults: this.currentRoundtrip.Adults, childrenAges: this.currentRoundtrip.ChildrenAges, tempLocation: countries, depatureDate: this.currentRoundtrip.DepatureDate, transportProfile: this.currentRoundtrip.TransportProfile, origin: this.currentRoundtrip.Origin, originCode: null, destination: this.currentRoundtrip.Destination, destinationCode: null, returnDate: this.currentRoundtrip.ReturnDate, travelClass: this.currentRoundtrip.TravelClass, nonStop: this.currentRoundtrip.NonStop, stops: stops })
              .then(docId => {
                if (docId && docId !== null) {
                  let context = this

                  if (!stay) {
                    // wait to ensure roundtrip is fully added
                    setTimeout(function () {
                      this.saving = false
                      context.unsavedChanges = false
                      context.$router.push('/rundreise-ansehen/' + docId)
                    }, 500)
                  }
                } else {
                  this.saving = false
                  sharedMethods.showErrorNotification('Deine Rundreise konnte nicht erstellt werden, bitte versuche es erneut')
                }
              })
          } catch (error) {
            console.log(error)
            this.saving = false
            sharedMethods.showErrorNotification('Deine Rundreise konnte nicht erstellt werden, bitte versuche es erneut')
            return false
          }
        }
      })
    },
    /**
     * updates total trip duration
     */
    updateTotalTripDuration () {
      if (this.addedStops.length === 1) this.totalTripDuration = this.addedStops[0].DayDuration
      else {
        let startDate = sharedMethods.getDateFromString(this.addedStops[0].InitDate)

        let stopDate = sharedMethods.getDateFromString(this.addedStops[this.addedStops.length - 1].InitDate)
        const oneDay = 24 * 60 * 60 * 1000

        const diffDays = Math.round(Math.abs((startDate - stopDate) / oneDay))
        this.totalTripDuration = diffDays + this.addedStops[this.addedStops.length - 1].DayDuration
      }
    },
    /**
     * called from map
     * resets amount if -1 will be passed
     */
    updateTotalTripDistance (distance) {
      console.log(distance)
      if (distance === -1) this.totalTripDistance = 0
      else this.totalTripDistance += distance
    },
    getRoundtripCountries () {
      return new Promise((resolve) => {
        let tempCountries = []
        let promiseList = []

        this.addedStops.forEach((stop, index) => {
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
          resolve(tempCountries)
        })
      })
    },
    getTripDuration () {
      let startDate = sharedMethods.getDateFromString(this.addedStops[0].InitDate)

      let stopDate = sharedMethods.getDateFromString(this.addedStops[this.addedStops.length - 1].InitDate)
      const oneDay = 24 * 60 * 60 * 1000

      const diffDays = Math.round(Math.abs((startDate - stopDate) / oneDay))
      this.tripDuration = diffDays
    },
    onStopsDragged (event) {
      this.unsavedChanges = true

      // dont do anything if stop was not moved
      if (event.newIndex === event.oldIndex) return

      // know this is messy but only solution to update added stop with right value
      let newAddedStops = JSON.parse(JSON.stringify(event.addedStops))

      // stop was moved > recalculate dates
      // set dragged stop date to dragged on stop
      // set next date to this date + dragged stop date days etc.
      // set previous date to this date - previos date days etc.

      let draggedStop = newAddedStops[event.newIndex]

      let draggedUp = event.oldIndex > event.newIndex

      let draggedOnStop = newAddedStops[event.newIndex - 1]
      if (draggedUp) draggedOnStop = newAddedStops[event.newIndex + 1]

      // set dragged stop date to dragged on stop date
      draggedStop.InitDate = JSON.parse(JSON.stringify(draggedOnStop.InitDate))

      // set all following dates to previous date +  previous date day duration
      for (let i = event.newIndex + 1; i < newAddedStops.length; i++) {
        let previousStopDate = sharedMethods.getDateFromString(newAddedStops[i - 1].InitDate)

        previousStopDate.setDate(previousStopDate.getDate() + newAddedStops[i - 1].DayDuration)
        newAddedStops[i].InitDate = date.formatDate(previousStopDate, 'DD.MM.YYYY HH:mm')
      }

      // set all previous dates to following date - previous date day duration
      for (let i = event.newIndex - 1; i >= 0; i--) {
        let followingStopDate = sharedMethods.getDateFromString(newAddedStops[i + 1].InitDate)

        followingStopDate.setDate(followingStopDate.getDate() - newAddedStops[i].DayDuration)

        console.log(followingStopDate)
        newAddedStops[i].InitDate = date.formatDate(followingStopDate, 'DD.MM.YYYY HH:mm')
      }

      this.addedStops = JSON.parse(JSON.stringify(newAddedStops))

      // important do not reload map here !!! will be done by map automatically
    },
    /**
     * called when a user clicks on a stop to edit it
     */
    editStop (index) {
      this.currentStop = JSON.parse(JSON.stringify(this.addedStops[index]))
      this.stopToEdit = index
      this.showEditStopDialog = true
    },
    titleInUse (promise) {
      promise.then(val => {
        console.log(val === 'Dieser Titel ist bereits vergeben')
        this.isTitleInUse = val === 'Dieser Titel ist bereits vergeben'
      })
    },
    isUniqueTitle (val) {
      let promise = sharedMethods.isUniqueTitle(val)
      this.titleInUse(promise)
      return promise
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
      checkOutDate.setDate(checkOutDate.getDate() + this.currentStop.DayDuration)
      checkOutDate = date.formatDate(checkOutDate, 'DD.MM.YYYY')
      return checkOutDate
    },
    isDateTimeValid () {
      return sharedMethods.isDateTimeValid(this.currentStop.InitDate)
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
      this.unsavedChanges = true

      this.currentStop.Location = {
        lng: event.longitude,
        lat: event.latitude,
        label: event.name
      }

      this.currentStop.Title = 'Stopp in ' + event.name.split(',')[0]
      this.step = 5
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
        this.currentStop.Title = 'Stopp in ' + event.label.split(',')[0]
        this.step = 5
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
              'x-rapidapi-key': this.$store.getters['api/getHotels4Key'],
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
          this.writeHotelData(event.address, hotelLat, hotelLng, null, null, null, null)
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
    getOrigins (val, update, abort) {
      sharedMethods.filterAirports(val, update, abort, this, 'originOptions')
    },
    getDestinations (val, update, abort) {
      sharedMethods.filterAirports(val, update, abort, this, 'destinationOptions')
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
    },
    /**
     * adds a new url to stop (called from uploader)
     */
    addImageToStop (imageUrl) {
      if (!this.currentStop.StopImages) this.currentStop.StopImages = []
      this.currentStop.StopImages.push(imageUrl)

      // save stop
      this.addStop(false)
      this.tempImgLink = ''
    },
    removeImageFromStop (imageUrl) {
      if (this.currentStop.StopImages) {
        this.currentStop.StopImages.splice(this.currentStop.StopImages.indexOf(imageUrl), 1)

        // save stop
        this.addStop(false)
      }
    },
    handleAddStopFromMap (event) {
      this.unsavedChanges = true
      // let lastDate = this.currentStop.InitDate

      // check if we didn't add this stop before
      if (this.currentStop.Location !== event.location) {
        this.currentStop = {
          Title: 'Stopp in ' + event.location.label,
          Description: 'Raum für Notizen, Beschreibungen...',
          Location: event.location,
          Sights: [],
          InitDate: event.date,
          Profile: 'driving',
          DayDuration: 1
        }

        this.showAddStopDialog = true
        // this.step = 5
      }
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
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.unsavedChanges) {
      this.showCancelDialog = true
      this.cancelDialogNext = next
    } else {
      next()
    }
  },
  created () {
    auth.authRef().onAuthStateChanged(() => {
      if (!this.$store.getters['demoSession/isInDemoSession'] && !auth.user()) {
        this.$store.commit('demoSession/setAsDemoSession')
      } else {
        let RTId = this.$route.params.id
        if (RTId) {
          // we are in edit rt mode
          this.isRTEditMode = true
          this.step = 6

          this.currentRoundtrip.Title = 'Laden...'
          this.$store.dispatch('roundtrips/fetchSingleRoundtrip', RTId).then(roundtrip => {
            this.currentRoundtrip = roundtrip
          })

          this.$store.dispatch('images/loadAllImgs', RTId)

          // get stops
          let roundtripsRef = db.collection('RoundtripDetails')
            .where('RTId', '==', RTId)
            .orderBy('InitDate')
          roundtripsRef.get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                let stop = doc.data()

                if (typeof stop.InitDate !== 'string') {
                  let initDate = new Date(stop.InitDate.seconds * 1000)
                  stop.InitDate = date.formatDate(initDate, 'DD.MM.YYYY HH:mm')
                }

                if (!stop.DayDuration) stop.DayDuration = 0

                stop.DocId = doc.id

                this.addedStops.push(stop)
                this.addedStops.sort(this.compare)

                this.updateTotalTripDuration()
              })
            })
        }
      }
    })
  }
}
</script>
