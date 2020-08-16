<template>
  <q-timeline-entry
    :ref="lastItem ? 'lastTimelineEntry' : null"
    icon="location_on"
  >
    <div class="stop-container">
      <div class="flex">
        <div class="flex">
          <h6 class="q-timeline__title">{{titleInput}}
            <q-popup-edit
              v-model="titleInput"
              v-if="editor"
              @save="saveData('Title', titleInput)"
              buttons
              label-set="ok"
            >
              <q-input
                v-model="titleInput"
                dense
              />
            </q-popup-edit>
            <q-icon
              v-if="editor"
              name="edit"
            />
          </h6>
          <q-chip
            size="20"
            clickable
            icon="add"
            @click="addHotel = true"
            v-if="editor && !hotelName"
          >Hotel
            <q-tooltip>Hotel hinzufügen</q-tooltip>
          </q-chip>
        </div>
        <q-dialog
          v-if="editor"
          v-model="addHotel"
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-input
                filled
                label="Check Out Datum"
                v-model="checkOutDate"
                :rules="[date || 'Bitte gib ein richtiges Datum ein']"
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
                        v-model="checkOutDate"
                        today-btn
                        mask="DD.MM.YYYY"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-card-section>
            <q-card-section>
              <HotelSearch
                :disabled="!checkOutDate"
                :lat="location.lng"
                :long="location.lat"
                :checkInDate="date"
                :checkOutDate="checkOutDate"
                :roomAmount="rooms"
                :adults="adults"
                :childrenAges="childrenAges"
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
              />
              <q-btn
                flat
                :label="addHotelDisabled ? 'Daten laden...' : 'Hotel hinzufügen'"
                @click="addHotelToStop()"
                color="primary"
                :disable="addHotelDisabled"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <q-icon
        v-if="editor && !firstStop"
        name="delete"
        class="cursor-pointer"
        @click="deleteEntry()"
      >
        <q-tooltip>Stopp löschen</q-tooltip>
      </q-icon>
    </div>
    <q-list
      bordered
      class="rounded-borders"
    >
      <q-expansion-item
        expand-separator
        v-model="expanded"
        @input="$emit('expansionChanged', { expanded: expanded, docId: docId })"
        :label="addedSights.length + (addedSights.length === 1 ? ' Sehenswürdigkeit' : ' Sehenswürdigkeiten') + (hotelName ? ' & 1 Hotel' : '') + (dailyTrips.length ? ' & ' + dailyTrips.length + (dailyTrips.length === 1 ? ' Tagesausflug' : ' Tagesausflüge') : '')"
        :caption="days !== null ?  'ca. ' + days + ' Aufenthalt' : ( firstStop || lastItem || profile === 'plane' ? '' : 'keine Verbleibende Zeit für den Aufenthalt')"
        :class="'stop-expansion-item ' + (days === null && !firstStop && !lastItem && profile !== 'plane' ? 'error-color' : '' )"
      >
        <div>
          <q-chip
            icon="location_on"
            clickable
            @click="editor ? editLocation = true : openInNewTab('https://www.google.com/maps/search/?api=1&query=' + location.label)"
          >{{location && typeof location !== 'undefined' && location.label && typeof location.label !== 'undefined' ? location.label.split(',')[0] : ( editor ? 'Ort hinzufügen' : 'kein Ort angegeben')}}
            <q-tooltip v-if="location && typeof location !== 'undefined' && location.label && typeof location.label !== 'undefined'">{{location.label}}</q-tooltip>
          </q-chip>
          <q-dialog
            v-if="editor"
            v-model="editLocation"
          >
            <q-card>
              <q-card-section class="editLocationCard">
                <CitySearch
                  ref="citySearch"
                  :parkingPlaceSearch="false"
                  :defaultLocation="location"
                  @update="updateLocation($event)"
                ></CitySearch>
                <p>oder</p>
                <q-btn @click="openInNewTab('https://www.google.com/maps/search/?api=1&query=' + location.label)">auf google anzeigen</q-btn>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Abbrechen"
                  color="primary"
                  v-close-popup
                />
                <q-btn
                  flat
                  label="OK"
                  color="primary"
                  @click="saveData('Location', tempLocation, true)"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-chip
            v-if="parkingPlace || editor"
            icon="local_parking"
            :clickable="editor"
            @click="editParkingPlace = true"
          >{{ parkingPlace && typeof parkingPlace !== 'undefined' &&  parkingPlace.label && typeof parkingPlace.label !== 'undefined' ?  parkingPlace.label.split(',')[0] : 'Parkplatz hinzufügen'}}</q-chip>
        </div>
        <q-dialog
          v-if="editor"
          v-model="editParkingPlace"
          persistent
        >
          <q-card>
            <q-card-section>
              <CitySearch
                ref="parkingPlaceSearch"
                :parkingPlaceSearch="true"
                :defaultLocation="parkingPlace"
                @update="updateParkLocation($event)"
              ></CitySearch>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                flat
                label="Abbrechen"
                color="primary"
                v-close-popup
              />
              <q-btn
                flat
                label="OK"
                color="primary"
                @click="saveData('Parking', tempParkingPlace)"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <div>
          <div v-if="sights && typeof sights !== 'undefined' && sights !== 'error'">
            <span
              v-for="(sight, index) in sights"
              :key="index"
              :href="'https://www.google.com/search?q=' + sight.name + ' ' + location.label.split(',')[0]"
              target="_blank"
              style="text-decoration:none;"
            >
              <q-chip
                v-if="editor"
                clickable
                @click="sightDialogs[sightDialogs.findIndex(x=> x.title === sight.name)].showed = true"
                :icon="sight.category === 'SIGHTS' ? 'account_balance' : 'location_on'"
              >{{sight.name}}
              </q-chip>

            </span>
            <a
              target="_blank"
              :href="'https://www.google.com/search?q=' + location.label.split(',')[0] + ' sehenswürdigkeiten'"
            >weitere auf Google</a>
            oder auf der Karte
            <q-dialog
              v-for="(sightDialog, index) in sightDialogs"
              :key="'dialog' + index"
              v-model="sightDialog.showed"
            >
              <q-card>
                <q-img
                  :src="sightDialog.src"
                  style="max-height:75vh;"
                >
                  <div class="absolute-bottom">
                    <div class="text-h6">{{sightDialog.title}}</div>
                    <div class="text-subtitle2">{{sightDialog.description}}</div>
                  </div>
                </q-img>

                <q-card-section>
                  {{sightDialog.extract}}
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="zurück"
                    color="primary"
                    v-close-popup
                  />
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
            v-else-if="editor && (!hotelName || typeof hotelName === 'undefined')"
            clickable
            @click="searchSights()"
          >{{sights === 'error' ? 'keine POIs gefunden' : 'POIs anzeigen'}}
            <q-tooltip>Sehenswürdigkeiten anzeigen</q-tooltip>
          </q-chip>
          <div
            v-if="editor"
            class="flex"
            style="flex-wrap"
          >
            <q-select
              label="Sehenswürdigkeiten hinzufügen"
              filled
              v-model="addedSights"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
              style="margin:10px 10px 10px 0; width:260px;"
              @blur="saveSights()"
              ref="sightInput"
            />
          </div>
          <div
            class="flex"
            v-else-if="addedSights && typeof addedSights !== 'undefined' && addedSights.length > 0"
            style="padding-bottom:10px;"
          >
            <b
              class="flex justify-center"
              style="flex-direction:column;"
            >Highlights:</b>
            <q-chip
              v-for="(addedSight, index) in addedSights"
              :key="index"
              clickable
              @click="openInNewTab('https://www.google.com/search?q=' + addedSight + ' ' + location.label.split(',')[0])"
            >{{addedSight}}</q-chip>
            <a
              class="flex justify-center"
              style="flex-direction:column; text-decoration:none;"
              target="_blank"
              :href="'https://www.google.com/search?q=' + location.label.split(',')[0] + ' sehenswürdigkeiten'"
            >weitere anzeigen</a>
          </div>
          <!-- Hotel data here -->
          <div>
            <q-list
              bordered
              padding
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
                  <q-item-label lines="1">
                    {{sharedMethods.capitalize(hotelName)}}
                    <q-rating
                      v-if="hotelStars && !isNaN(hotelStars)"
                      class="stars"
                      v-model="hotelStars"
                      readonly
                      size="15px"
                      color="gold"
                      style="margin-right:10px;"
                    />
                    <div>
                      <span class="raleway">
                        {{guestRating}}
                      </span>
                      <span>
                        <span class="raleway">ca. € </span>
                        <span class="raleway">{{hotelPrice}}</span>
                        <q-tooltip>ungefährer Durchschnittspreis</q-tooltip>
                      </span>
                    </div>
                  </q-item-label>
                  <q-item-label caption>
                    <a @click="openInNewTab('https://www.google.com/maps/search/?api=1&query=' + capitalize(hotelName + ', ' + hotelLocation.label))">{{hotelLocation && typeof hotelLocation !== 'undefined' && hotelLocation.label && typeof hotelLocation.label !== 'undefined' ? capitalize(hotelLocation.label) :  'kein Ort angegeben'}}</a>
                  </q-item-label>
                </q-item-section>
                <q-item-section>

                  <q-btn
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
                  <div v-if="generalLink && generalLink.length > 0">
                    <q-chip
                      icon="link"
                      dense
                      class="linkChip"
                      clickable
                      @click="openInNewTab(generalLink)"
                    >Hotelwebsite</q-chip>
                  </div>
                  <q-chip
                    icon="fab fa-bootstrap"
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
                    icon="house"
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

                <q-item-section
                  side
                  v-if="editor"
                >
                  <q-icon
                    name="clear"
                    color="primary"
                    @click="removeHotel()"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div
            style="margin-top:10px; margin-bottom:20px;"
            v-if="!editor"
            v-html="descriptionInput"
          ></div>
          <q-editor
            v-else
            v-model="descriptionInput"
            min-height="5rem"
            ref="editor_ref"
            @keyup.enter.stop
            :toolbar="editorToolbar"
            toolbar-toggle-color="primary"
            :fonts="editorFonts"
            @blur="saveWork()"
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
          <div
            class="flex"
            v-if="stopImages"
          >
            <div
              class="uploader"
              v-for="(stopImage, index) in stopImages"
              :key="index"
              style="margin-right:8px;"
            >
              <q-img
                style="height:100%;"
                :src="stopImage"
              ></q-img>
              <q-btn
                round
                v-if="editor"
                color="primary"
                icon="add"
                style="position: absolute; transform: rotate(45deg)"
                @click="removeImg(index)"
              >
              </q-btn>
              <q-btn
                round
                color="primary"
                icon="filter"
                style="position: absolute; margin-top:-113px; margin-left:120px;"
                @click="showImgDialog(stopImage)"
              >
              </q-btn>
            </div>
          </div>
          <q-dialog v-model="imgDialogVisible">
            <q-card style="width:100%; max-width:100vh; overflow:hidden;">
              <q-card-section
                class="row flex justify-end q-pb-none"
                style="z-index:100;"
              >
                <q-btn
                  icon="close"
                  flat
                  round
                  dense
                  v-close-popup
                />
              </q-card-section>
              <q-card-section style="margin-top:-35px;">
                <q-img
                  style="width:100%;"
                  :src="dialogImgSrc"
                ></q-img>
              </q-card-section>
            </q-card>

          </q-dialog>
          <div
            style="margin-top:10px;"
            class="uploader"
            v-if="editor"
          >
            <q-img style="height:100%;"></q-img>
            <q-btn
              round
              color="primary"
              icon="add"
              style="position: absolute;"
              @click="chooseImgDialog = true"
            >
              <q-tooltip>Bilder hinzufügen</q-tooltip>
            </q-btn>
          </div>
          <q-dialog
            keep-alive
            v-model="chooseImgDialog"
          >
            <q-card>
              <q-card-section class="row items-center galeryImgUploaderContainer flex justify-between">
                <div
                  class="uploader"
                  v-for="(url, index) in galeryImgUrls"
                  :key="index"
                >
                  <img
                    style="width:100%;"
                    v-lazy="url"
                  />
                  <q-btn
                    round
                    color="primary"
                    icon="add"
                    style="position: absolute;"
                    @click="addImageToStop(url)"
                  >
                  </q-btn>
                </div>
                <div
                  v-if="galeryImgUrls.length === 0"
                  class="flex"
                >
                  <div>
                    <q-img
                      src="../../statics/dummy-image-landscape-1.jpg"
                      style="height:148px; width:148px;"
                    ></q-img>
                  </div>
                  <div
                    class="flex justify-center"
                    style="max-width:300px; padding-left:10px; flex-direction:column;"
                  >Wenn du ein Bild in den Einstellungen hochlädst kannst du es hier hinzufügen.</div>
                </div>
              </q-card-section>
              <q-card-section class="row items-center flex">
                <span>Bitte verwende nur Bilder die für die Wiederverwendung eindeutig gekennzeichnet sind. <br> Ansonsten kann dein Account gesperrt werden. <br>
                  <br>
                  <a
                    style="text-decoration:underline;"
                    @click="openInNewTab('https://www.google.com/search?q=' + location.label  + '&tbm=isch&hl=de&hl=de&tbs=sur%3Af&rlz=1C1CHBF_deDE828DE828&ved=0CAQQpwVqFwoTCLCZ05jd2-cCFQAAAAAdAAAAABAD&biw=1903&bih=969')"
                  >Bildvorschläge auf Google</a>
                  <br>
                  <br>
                </span>
                <div
                  class="flex"
                  style="width:100%;"
                >
                  <q-input
                    filled
                    ref="tempImgLinkInput"
                    label="Bild per Link einfügen"
                    v-model="tempImgLink"
                    :rules="[val => validURL(val) || 'Bitte gib einen richtigen Link ein']"
                    lazy-rules
                    bottom-slots
                    outlined
                    style="padding:0; width:80%; margin-bottom:10px;"
                  ></q-input>
                  <q-btn
                    round
                    color="primary"
                    icon="add"
                    style="margin-left:10px; margin-top:5px; height:45px;"
                    :disable="!validURL(tempImgLink)"
                    @click="addImageToStop(tempImgLink)"
                  />
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Fertig"
                  color="primary"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <div
            v-if="expanded"
            class="daily-trip-container"
            v-show="dailyTrips.length"
          >
            <DailyTrip
              style="margin-top:10px;"
              v-for="(dailyTrip, index) in dailyTrips"
              :key="dailyTrip.id + index"
              :dailyTrip="dailyTrip"
              :editorToolbar="editorToolbar"
              :editorFonts="editorFonts"
              :stopDocId="docId"
              :index="index"
              :newDailyTripDate="dailyTrip.newDate ? dailyTrip.newDate : false"
              :duration="dailyTrip.duration"
              :editor="editor"
              :addedSights="dailyTrip.addedSights"
              :galeryImgUrls="galeryImgUrls"
            ></DailyTrip>
          </div>
          <div
            v-if="editor"
            class="flex justify-center"
            style="padding-top:30px;"
          >
            <q-btn
              class="add-daily-trip-button"
              side
              color="secondary"
              icon="add"
              @click="addDailyTripDialogVisible = true"
            >Tagesausflug
              <q-tooltip>Stopp ohne Übernachtung hinzufügen</q-tooltip>
            </q-btn>
          </div>
        </div>
        <!-- Place for add daily trip dialog -->
        <q-dialog v-model="addDailyTripDialogVisible">
          <q-card style="width:100%; max-width:100vh; overflow:hidden;">
            <q-card-section class="daily-trip-dialog-section">
              <q-input
                filled
                v-model="tempDailyTripDate"
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
                        v-model="tempDailyTripDate"
                        today-btn
                        mask="DD.MM.YYYY HH:mm"
                        :options="dailyTripDateOptions"
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
                        v-model="tempDailyTripDate"
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
                @update="updateDailyTripLocation($event)"
              ></CitySearch>
              <q-select
                outlined
                v-model="dailyTripProfile"
                :options="['zu Fuß', 'Fahrrad', 'Auto']"
                label="Reisemittel"
                use-input
                :rules="[val => val !== null && val !== '' || 'Bitte wähle ein Reisemittel']"
                class="input-item"
              >
                <template v-slot:prepend>
                  <q-icon name="commute" />
                </template>
              </q-select>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                flat
                label="Abbrechen"
                color="primary"
                v-close-popup
              />
              <q-btn
                flat
                label="Hizufügen"
                color="primary"
                @click="addDailyTrip()"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-expansion-item>
    </q-list>
    <template v-slot:subtitle>
      <span class="q-timeline__title cursor-pointer">
        {{date !== null && date.length > 0 ? date.split(' ')[0]: date}}
        <q-popup-proxy
          v-if="editor"
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
          persistent
        >
          <q-date
            v-model="date"
            today-btn
            mask="DD.MM.YYYY HH:mm"
          />
          <div
            class="flex justify-between"
            style="width:100%"
          >
            <q-btn
              style="margin:10px;"
              v-close-popup
              @click="date = oldDate"
            >abbrechen</q-btn>
            <q-btn
              color="primary"
              style="margin:10px;"
              @click="[saveDate(false), $refs.qTimeProxy.show()]"
              v-close-popup
            >weiter</q-btn>
          </div>
        </q-popup-proxy>
        <q-icon
          v-if="editor"
          size="16px"
          name="event"
        />
        <q-tooltip>Datum/Zeit ändern</q-tooltip>
      </span>
      <span
        class="q-timeline__title cursor-pointer"
        style="padding-right:10px;"
      >
        {{date !== null && date.length > 0 ? date.split(' ')[1]: date}}
        <q-popup-proxy
          v-if="editor"
          ref="qTimeProxy"
          transition-show="scale"
          transition-hide="scale"
          persistent
        >
          <q-time
            v-model="date"
            mask="DD.MM.YYYY HH:mm"
            format24h
          />
          <br>
          <q-toggle
            v-model="changeAllDatesActive"
            label="Alle Daten ändern"
            icon="update"
          >
            <q-tooltip>
              Aktivieren um alle nachfolgenden Daten ebenfalls zu ändern
            </q-tooltip>
          </q-toggle>
          <div
            class="flex justify-between"
            style="width:100%"
          >
            <q-btn
              style="margin:10px;"
              v-close-popup
              @click="date = oldDate"
            >abbrechen</q-btn>
            <q-btn
              color="primary"
              style="margin:10px;"
              @click="saveDate(true)"
              v-close-popup
            >fertig</q-btn>
          </div>
        </q-popup-proxy>
        <q-icon
          v-if="editor"
          size="16px"
          name="access_time"
        />
        <q-tooltip>Zeit ändern</q-tooltip>
      </span>
      <!-- <span class="q-timeline__title">{{days !== null ?  'ca. ' + days + ' Aufenthalt' : ( firstStop || lastItem ? '' : 'keine Verbleibende Zeit für den Aufenthalt') }}</span> -->
    </template>
  </q-timeline-entry>
</template>
<script>
import { db } from '../../firebaseInit.js'
import { date, scroll } from 'quasar'
import axios from 'axios'
import sharedMethods from '../../sharedMethods'

var querystring = require('querystring')
const { setScrollPosition } = scroll

let timeStamp = Date.now()
let lastDailyTripDate = null

export default {
  name: 'stop',
  components: {
    CitySearch: () => import('../Map/CitySearch'),
    HotelSearch: () => import('../Map/HotelSearch'),
    DailyTrip: () => import('./dailyTrip')
  },
  computed: {
    sharedMethods () {
      return sharedMethods
    }
  },
  props: {
    title: String,
    date: String,
    editorPlaceholder: String,
    editor: Boolean,
    docId: String,
    generalLink: String,
    location: Object,
    days: String,
    parkingPlace: Object,
    lastItem: Boolean,
    hotelStars: Number,
    hotelName: String,
    hotelPrice: Number,
    guestRating: String,
    transportLocations: Array,
    hotelLocation: Object,
    hotelContact: Object,
    checkOutDate: String,
    adults: Number,
    childrenAges: Array,
    rooms: Number,
    firstStop: Boolean,
    galeryImgUrls: Array,
    stopImages: Array,
    addedSights: Array,
    dailyTrips: Array,
    nextStopDate: String,
    profile: String
  },
  data () {
    return {
      titleInput: this.title,
      descriptionInput: this.editorPlaceholder,
      showDateEntry: true,
      showTimeEntry: false,
      preventPasting: false,
      editParkingPlace: false,
      tempParkingPlace: {},
      editLocation: false,
      tempLocation: {},
      savedEditorContent: this.editorPlaceholder,
      sights: null,
      chooseImgDialog: false,
      tempImgLink: null,
      dialogImgSrc: null,
      imgDialogVisible: false,
      oldAddedSights: [],
      addHotel: false,
      generalTempLink: '',
      formattedDate: date.formatDate(timeStamp, 'DD.MM.YYYY'),
      addDailyTripDialogVisible: false,
      tempDailyTripLocation: {},
      tempDailyTripDate: this.date,
      dailyTripProfile: 'Auto',
      accessToken: 'pk.eyJ1IjoibWFyZWlza2kiLCJhIjoiY2pkaHBrd2ZnMDIyOTMzcDIyM2lra3M0eSJ9.wcM4BSKxfOmOzo67iW-nNg',
      expanded: false,
      changeAllDatesActive: false,
      oldDate: null,
      sightDialogs: [],
      showTransportDialog: false,
      addHotelDisabled: true,

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
    saveDate (refresh) {
      const lastScrollPos = document.documentElement.scrollTop
      let newInitDate = sharedMethods.getDateFromString(this.date)

      // time entry also has changed
      if (refresh) {
        if (this.changeAllDatesActive) this.changeAllDates()
        else this.oldDate = this.date
      }

      let context = this
      db.collection('RoundtripDetails').doc(this.docId).update({
        'InitDate': newInitDate
      }).then(function () {
        if (refresh && !context.changeAllDatesActive) {
          // resort stops and prepare views with new array
          context.getParent('EditRoundtrips').resortAndPrepareStops(newInitDate, context.docId)
        }
        setTimeout(function () {
          sharedMethods.scrollToOffset(lastScrollPos)
        }, 500)
      })
    },
    getDailyTripDuration (startLocation, endLocation, dailyStopProfile, index, cityFromLabel, defaultCityLabel, trip) {
      var url = 'https://api.mapbox.com/directions/v5/mapbox/' + dailyStopProfile + '/' + startLocation[0] + ',' + startLocation[1] + ';' + endLocation[0] + ',' + endLocation[1] + '?geometries=geojson&access_token=' + this.accessToken
      let context = this

      axios.get(url)
        .then(response => {
          var data = response.data.routes[0]

          if (data !== null && typeof data !== 'undefined') {
            let duration = context.msToTime(data.duration * 1000)

            let distance = Math.floor(data.distance / 1000) > 0 ? Math.floor(data.distance / 1000) + ' km' : ''
            if (distance !== '') distance = ' (' + distance + ')'

            this.dailyTrips[index].duration = { duration: duration, distance: distance, cityFromLabel: cityFromLabel, defaultCityLabel: defaultCityLabel }
            if (this.dailyTrips[index + 1] && !this.dailyTrips[index + 1].newDate) this.getDailyTripDays(trip, index, data.duration)
            else if (index === this.dailyTrips.length - 1) this.dailyTrips.sort(this.compare)
            else {
              // if its the last item resort daily trips to force a refresh
              if (index === this.dailyTrips.length - 1) this.dailyTrips.sort(this.compare)
            }
          } else {
            this.dailyTrips[index].duration = { duration: null, distance: null, cityFromLabel: null, defaultCityLabel: null }
            if (this.dailyTrips[index + 1]) this.getDailyTripDays(trip, index, null)
          }
        }).catch(exception => {
          console.log(exception)
          this.dailyTrips[index].duration = { duration: null, distance: null, cityFromLabel: null, defaultCityLabel: null }
        })
    },
    getDailyTripDays (trip, index, duration) {
      let dailyTripDays = null

      let dateTimeParts = trip.date.split(' ')
      let dateParts = dateTimeParts[0].split('.')
      let timeParts = dateTimeParts[1].split(':')
      let currentInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

      dateTimeParts = this.dailyTrips[index + 1].date.split(' ')
      dateParts = dateTimeParts[0].split('.')
      timeParts = dateTimeParts[1].split(':')
      let nextInitDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], '00')

      let dateDistance = 0
      if (duration) dateDistance = (nextInitDate.valueOf() - currentInitDate.valueOf()) - duration
      else dateDistance = nextInitDate.valueOf() - currentInitDate.valueOf()

      dailyTripDays = this.msToTime(dateDistance)

      this.dailyTrips[this.dailyTrips.findIndex(x => x.id === trip.id)].days = { days: dailyTripDays, id: trip.id }
    },
    msToTime (duration) {
      var ms = duration % 1000
      duration = (duration - ms) / 1000

      var secs = duration % 60
      duration = (duration - secs) / 60

      var minutes = duration % 60
      var hours = (duration - minutes) / 60

      let returnVal
      if ((hours === 0 && minutes === 0) || (hours < 0 || minutes < 0)) returnVal = null
      else if (hours === 0) returnVal = minutes + ' min'
      else if (minutes === 0) returnVal = hours + ' h'
      else returnVal = hours + ' h ' + minutes + ' min'

      return returnVal
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
    validURL (str) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
      return !!pattern.test(str)
    },
    getChildrenText () {
      let text = '&group_children=' + this.childrenAges.length
      this.childrenAges.forEach(child => {
        text += '&age=' + child
      })
      return text
    },
    getExpediaChildrenText () {
      let text = null
      this.childrenAges.forEach((childAge, index) => {
        text += (index !== 0 ? '_' : '') + childAge
      })
      return text
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
    changeExpansion (expanded) {
      this.expanded = expanded
    },
    addHotelToStop () {
      console.log(this.transportLocations)
      db.collection('RoundtripDetails').doc(this.docId).update({
        HotelLocation: this.hotelLocation,
        HotelStars: this.hotelStars,
        HotelContact: this.hotelContact,
        HotelName: this.hotelName,
        GeneralLink: this.generalTempLink,
        CheckOutDate: this.checkOutDate,
        HotelPrice: this.hotelPrice,
        GuestRating: this.guestRating,
        TransportLocations: this.transportLocations

      }).then(results => {
        this.generalLink = this.generalTempLink

        let parentStops = this.getParent('EditRoundtrips').stops
        let parentStop = parentStops[parentStops.findIndex(x => x.DocId === this.docId)]
        parentStop.HotelLocation = this.hotelLocation
        parentStop.HotelStars = this.hotelStars
        parentStop.HotelContact = this.hotelContact
        parentStop.HotelName = this.hotelName
        parentStop.GeneralLink = this.generalTempLink
        parentStop.CheckOutDate = this.checkOutDate
        parentStop.HotelPrice = this.hotelPrice
        parentStop.GuestRating = this.guestRating

        console.log(parentStops.TransportLocations)
        console.log(this.transportLocations)
        parentStops.TransportLocations = this.transportLocations

        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Hotel wurde hinzugefügt'
        })
      })
    },
    removeHotel () {
      db.collection('RoundtripDetails').doc(this.docId).update({
        HotelLocation: null,
        HotelStars: null,
        HotelContact: null,
        HotelName: null,
        GeneralLink: null,
        HotelPrice: null,
        GuestRating: null,
        TransportLocations: null

      }).then(results => {
        this.hotelName = null

        let parentStops = this.getParent('EditRoundtrips').stops
        let parentStop = parentStops[parentStops.findIndex(x => x.DocId === this.docId)]
        parentStop.HotelLocation = null
        parentStop.HotelStars = null
        parentStop.HotelContact = null
        parentStop.HotelName = null
        parentStop.GeneralLink = null
        parentStop.CheckOutDate = null
        parentStop.HotelPrice = null
        parentStop.GuestRating = null
        parentStop.TransportLocations = null

        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Hotel wurde entfernt'
        })
      })
    },
    addDailyTrip () {
      if (this.tempDailyTripDate && this.tempDailyTripLocation && this.dailyTripProfile) {
        let createdStop = { id: this.dailyTrips.length, date: this.tempDailyTripDate, location: this.tempDailyTripLocation, descriptionInput: 'Tagesausflug nach ' + this.tempDailyTripLocation.label.split(',')[0], profile: this.getDailyTripProfile() }
        this.dailyTrips.push(createdStop)

        this.dailyTrips.sort(this.compare)
        this.dailyTrips.forEach((dailyTrip, index) => {
          dailyTrip.newDate = this.newDailyTripDate(dailyTrip.date)

          if (index === 0) {
            this.getDailyTripDuration([this.location.lng, this.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, 0, this.location.label, this.location.label, dailyTrip)
          } else {
            this.getDailyTripDuration([this.dailyTrips[index - 1].location.lng, dailyTrip.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.dailyTrips[index - 1].location.label, this.location.label, dailyTrip)
          }
        })

        db.collection('RoundtripDetails').doc(this.docId).update({
          DailyTrips: this.dailyTrips

        }).then(results => {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Tagesausflug wurde hinzugefügt'
          })
        })
      }
    },
    changeAllDates () {
      let millis = sharedMethods.getDateFromString(this.date).valueOf() - sharedMethods.getDateFromString(this.oldDate).valueOf()
      this.oldDate = this.date
      this.getParent('EditRoundtrips').changeAllFollowingStopDates(this.docId, millis, sharedMethods.getDateFromString(this.date))
    },
    deleteDailyTrip (index) {
      if (this.docId === null || this.docId === '' || this.docId === 'undefined') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        })
        return false
      }

      this.dailyTrips.splice(index, 1)

      this.dailyTrips.sort(this.compare)
      this.dailyTrips.forEach((dailyTrip, index) => {
        dailyTrip.newDate = this.newDailyTripDate(dailyTrip.date)

        if (index === 0) {
          this.getDailyTripDuration([this.location.lng, this.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.location.label, this.location.label, dailyTrip)
        } else {
          this.getDailyTripDuration([this.dailyTrips[index - 1].location.lng, dailyTrip.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.dailyTrips[index - 1].location.label, this.location.label, dailyTrip)
        }
      })

      db.collection('RoundtripDetails').doc(this.docId).update({
        DailyTrips: this.dailyTrips

      }).then(results => {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Tagesausflug wurde gelöscht'
        })
        return true
      })
    },
    saveSights () {
      if (this.addedSights !== this.oldAddedSights) {
        this.oldAddedSights = this.addedSights

        let parentStops = this.getParent('EditRoundtrips').stops
        parentStops[parentStops.findIndex(x => x.DocId === this.docId)].Sights = this.addedSights

        this.saveData('Sights', this.addedSights, false)
      }
    },
    newDailyTripDate (dateToCheck) {
      if (!lastDailyTripDate || dateToCheck.split(' ')[0] !== lastDailyTripDate.split(' ')[0]) {
        lastDailyTripDate = dateToCheck
        return true
      }
      return false
    },
    saveDailyTrips (index, value, field) {
      if (field === 'description') this.dailyTrips[index].descriptionInput = value
      else if (field === 'sights') this.dailyTrips[index].addedSights = value
      else if (field === 'date') this.dailyTrips[index].date = value

      this.saveData('DailyTrips', this.dailyTrips, false)
    },
    saveDailyTripImgs (index, images) {
      this.dailyTrips[index].stopImages = images
      this.saveData('DailyTrips', this.dailyTrips, false)
    },
    saveData (field, value, updateParent) {
      try {
        let context = this
        db.collection('RoundtripDetails').doc(this.docId).update({
          ['' + field]: value
        }).then(function () {
          if (field !== 'Description') {
            // context.$q.notify({
            //   message: 'Deine Änderungen wurde gespeichert',
            //   color: 'green-4',
            //   textColor: 'white',
            //   icon: 'check_circle'
            // })
          }
          if (field === 'Location') context.getParent('EditRoundtrips').fetchAndSaveCountries()
          if (updateParent) context.getParent('EditRoundtrips').loadRoundtripDetails(context.$route.params.id, false)
        })
      } catch (e) {
        console.log(e)
      }
    },
    scrollTo (offset) {
      const duration = 400
      setScrollPosition(document.documentElement, offset, duration)
    },
    saveWork () {
      this.saveSights()

      this.saveData('Description', this.descriptionInput, false)

      let parentStops = this.getParent('EditRoundtrips').stops
      parentStops[parentStops.findIndex(x => x.DocId === this.docId)].Description = this.descriptionInput

      this.savedEditorContent = this.descriptionInput
    },
    updateLocation (event) {
      if (event !== null && this.location.label !== event.label) {
        this.tempLocation = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
      }
    },
    updateParkLocation (event) {
      if (event !== null) {
        this.tempParkingPlace = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
      }
    },
    updateDailyTripLocation (event) {
      if (event !== null) {
        this.tempDailyTripLocation = {
          lng: event.x,
          lat: event.y,
          label: event.label
        }
      }
    },
    getDailyTripProfile () {
      switch (this.dailyTripProfile) {
        case 'zu Fuß':
          return 'walking'
        case 'Fahrrad':
          return 'cycling'
        default:
          return 'driving'
      }
    },
    capitalize (s) {
      s = s.toLowerCase()
      s = s.charAt(0).toUpperCase() + s.slice(1)
      return s
    },
    formatOn () {
      this.preventPasting = !this.preventPasting
    },
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
    showImgDialog (src) {
      this.dialogImgSrc = src
      this.imgDialogVisible = true
    },
    addImageToStop (src) {
      if (!this.stopImages) this.stopImages = []
      this.stopImages.push(src)
      this.tempImgLink = ''
      this.$refs.tempImgLinkInput.resetValidation()

      let parentStops = this.getParent('EditRoundtrips').stops
      parentStops[parentStops.findIndex(x => x.DocId === this.docId)].StopImages = this.stopImages

      let context = this
      db.collection('RoundtripDetails').doc(this.docId).update({
        'StopImages': this.stopImages
      }).catch(function (error) {
        context.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        })
        console.log(error)
      })
    },
    removeImg (index) {
      if (!this.stopImages) return
      this.stopImages.splice(index, 1)

      let parentStops = this.getParent('EditRoundtrips').stops
      parentStops[parentStops.findIndex(x => x.DocId === this.docId)].StopImages = this.stopImages

      let context = this
      db.collection('RoundtripDetails').doc(this.docId).update({
        'StopImages': this.stopImages
      }).catch(function (error) {
        context.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        })
        console.log(error)
      })
    },
    deleteEntry () {
      if (this.docId === null || this.docId === '' || this.docId === 'undefined') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Der Eintrag konnte nicht gelöscht werden'
        })
        return false
      }

      this.getParent('EditRoundtrips').removeStop(this.docId)

      if (!this.$store.getters['demoSession/isInDemoSession']) {
        const context = this
        db.collection('RoundtripDetails').doc(context.docId).delete().then(function () {
          sharedMethods.showSuccessNotification('Eintrag wurde gelöscht')
        }).catch(function (error) {
          console.log(error)
          sharedMethods.showErrorNotification('Der Eintrag konnte nicht gelöscht werden')
        })
      } else {
        this.$store.commit('demoSession/removeStop', this.docId)
      }
    },
    openInNewTab (link) {
      window.open(link, '_blank')
    },
    dailyTripDateOptions (date) {
      if (this.date && this.date.length > 0) {
        let dateTimeParts = this.date.split(' ')
        let dateParts = dateTimeParts[0].split('.')
        const currentStopDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

        const currentDate = new Date(date)

        if (this.nextStopDate && this.nextStopDate.length > 0) {
          dateTimeParts = this.nextStopDate.split(' ')
          dateParts = dateTimeParts[0].split('.')
          const nextStopDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])

          // date must be between current and next stop date
          return currentDate >= currentStopDate && currentDate < nextStopDate
        } else {
          return currentDate >= currentStopDate
        }
      }
      return null
    },
    getParent (name) {
      let p = this.$parent
      while (typeof p !== 'undefined') {
        if (p.$options.name === name) {
          return p
        } else {
          p = p.$parent
        }
      }
      return false
    },
    searchSights () {
      if (this.location.lng && this.location.lat) {
        this.getSights(this.location.lng, this.location.lat).then((results) => {
          if (results !== null) {
            this.sights = results.data.data

            const headers = {
              'Content-Type': 'application/json; charset=UTF-8'
            }

            // get sight dialog content
            const context = this
            this.sights.forEach((sight, index) => {
              axios.get('https://de.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=description%7Cextracts%7Cpageimages&titles=' + sight.name + '&exintro=1&explaintext=1&piprop=name%7Coriginal',
                { headers: headers })
                .then(function (response) {
                  const pages = response.data.query.pages
                  const firstPageName = Object.keys(pages)[0]

                  const title = pages[firstPageName].title
                  const description = pages[firstPageName].description
                  const extract = pages[firstPageName].extract
                  const src = pages[firstPageName].original ? pages[firstPageName].original.source : ''

                  context.sightDialogs.splice(index, 0, { title: title || sight.name, showed: false, description: description, extract: extract || 'Es konnten leider keine Informationen gefunden werden', src: src })
                }).catch(function (error) {
                  console.log('Error' + error)
                  context.sightDialogs.splice(index, 0, { title: sight.name, showed: false, description: '', extract: 'Es konnten leider keine Informationen gefunden werden', src: '' })
                })
            })
          } else {
            this.sights = 'error'
          }
        })
      }
    },
    getSights (long, lat) {
      return new Promise((resolve, reject) => {
        const url = 'https://api.amadeus.com/v1/security/oauth2/token'

        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }

        const data = querystring.stringify({
          grant_type: 'client_credentials', // gave the values directly for testing
          client_id: 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
          client_secret: 'lHQlUheyyAZtGQDA'
        })

        axios.post(url, data, {
          headers: headers,
          form: {
            'grant_type': 'client_credentials',
            'client_id': 'SEW3oULNfsxB4xOMAwY291ilj9bwWekH',
            'client_secret': 'lHQlUheyyAZtGQDA'
          }
        }).then(function (response) {
          let token = response.data.access_token
          const tokenString = 'Bearer ' + token

          console.log(token)

          axios.get('https://api.amadeus.com/v1/reference-data/locations/pois?latitude=' + lat + '&longitude=' + long + '&radius=10&page[limit]=5&page[offset]=0&categories=SIGHTS', {
            headers: {
              'Authorization': tokenString
            }
          }).then(function (response) {
            resolve(response)
          }).catch(function (error) {
            console.log('Error' + error)
            resolve(null)
          })
        }).catch(function (error) {
          console.log('Error on Authentication' + error)
          resolve(null)
        })
      })
    },
    compare (a, b) {
      const dateA = sharedMethods.getDateFromString(a.date)
      const dateB = sharedMethods.getDateFromString(b.date)

      if (dateA > dateB) return 1
      if (dateB > dateA) return -1

      return 0
    }
  },
  created () {
    this.oldAddedSights = this.addedSights
    this.oldDate = this.date

    this.dailyTrips.sort(this.compare)
    this.dailyTrips.forEach((dailyTrip, index) => {
      dailyTrip.newDate = this.newDailyTripDate(dailyTrip.date)
      if (index === 0) {
        this.getDailyTripDuration([this.location.lng, this.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.location.label, this.location.label, dailyTrip)
      } else {
        this.getDailyTripDuration([this.dailyTrips[index - 1].location.lng, dailyTrip.location.lat], [dailyTrip.location.lng, dailyTrip.location.lat], dailyTrip.profile, index, this.dailyTrips[index - 1].location.label, this.location.label, dailyTrip)
      }
    })
  },
  mounted () {
    if (this.lastItem) {
      sharedMethods.scrollToOffset(this.$refs.lastTimelineEntry)
    }
  }
}
</script>
