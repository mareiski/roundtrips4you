<template>
  <div style="min-height:40vh;">
    <q-list
      bordered
      class="rounded-borders"
      v-show="addedStops.length > 0"
    >
      <q-item-label
        header
        class="text-weight-bold"
      >{{currentRoundtrip.Title}}</q-item-label>

      <q-separator />
      <draggable
        v-model="addedStops"
        @end="emitOnDragged($event)"
        handle=".handle"
      >
        <q-item
          v-for="(stop, index) in addedStops"
          :key="stop"
          v-ripple
          clickable
          style="padding-left:8px; padding-right:5px;"
        >
          <q-item-section avatar>
            <q-icon
              color="primary"
              name="drag_indicator"
              class="cursor-DandD handle"
            />
          </q-item-section>
          <q-item-section @click="$emit('editStop', index);">
            <q-item-label lines="1">{{stop.Title}}</q-item-label>
            <q-item-label
              caption
              lines="1"
              style="max-width:400px;"
            >
              <q-icon name="location_on" />
              {{stop.Location.label.split(',')[0]}}
              <!-- <span
                      v-if="stop.Description"
                      v-html="'<span class=&quot;text-weight-bold&quot;>' + stop.Location.label.split(',')[0] + (stop.Description ? ' - ' : '') + '</span>' + stop.Description"
                    >
                    </span> -->
            </q-item-label>
          </q-item-section>

          <q-item-section
            side
            top
            @click="$emit('editStop', index);"
          >
            <div
              class="flex justify-center"
              style="flex-direction:column; height:100%;"
            >
              {{stop.InitDate.split(' ')[0]}}
            </div>
          </q-item-section>

          <q-item-section
            side
            top
            style="padding:0;"
          >
            <div>
              <q-btn
                @click="$emit('editStop', index);"
                flat
                round
                size="13px"
                icon="settings"
              >
                <q-tooltip>Optionen</q-tooltip>
              </q-btn>
            </div>
          </q-item-section>

          <q-item-section
            side
            top
            style="padding:0;"
          >
            <div>
              <q-btn
                @click="$emit('removeStop', index)"
                v-if="addedStops.length > 1"
                flat
                round
                size="13px"
                icon="delete"
              >
                <q-tooltip>Stopp löschen</q-tooltip>
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </draggable>
      <q-separator inset="item" />
    </q-list>
    <div
      style="padding: 10px 10px 0 10px;"
      v-if="addedStops.length <= 1"
    >
      <span
        v-if="addedStop.length === 0"
        class="font-medium"
      >Klicke auf einen Ort auf der Karte um ihn hinzuzufügen oder benutze die Suche oben rechts.</span>
      <span
        v-else
        class="font-medium"
      >Füge einen weiteren Stopp hinzu, um danach deine Reise rechts unten zu speichern.</span>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'TripOverviewList',
  components: {
    draggable
  },
  props: {
    addedStops: Array,
    currentRoundtrip: Object
  },
  methods: {
    emitOnDragged (event) {
      event.addedStops = this.addedStops
      this.$emit('stopsDragged', event)
    }
  }
}
</script>
