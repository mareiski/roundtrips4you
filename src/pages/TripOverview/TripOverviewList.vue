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
        @end="$emit('stopsDragged', $event)"
        handle=".handle"
      >
        <transition-group name="flip-list">
          <q-item
            v-for="(stop, index) in addedStops"
            :key="stop"
          >
            <q-item-section avatar>
              <q-icon
                color="primary"
                name="drag_indicator"
                class="cursor-DandD handle"
              />
            </q-item-section>
            <q-item-section
              clickable
              class="cursor-pointer"
              @click="$emit('editStop', index);"
            >
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
              clickable
              class="cursor-pointer"
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
            >
              <div>
                <q-btn
                  @click="$emit('removeStop', index)"
                  flat
                  round
                  icon="delete"
                >
                  <q-tooltip>Stopp löschen</q-tooltip>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </draggable>
      <q-separator inset="item" />
    </q-list>
    <div
      style="padding: 0 10px 0 10px;"
      v-if="addedStops.length === 0"
    >
      <span>Klicke auf einen Ort auf der Karte um ihn hinzuzufügen oder benutze die Suche oben rechts.</span>
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
  }
}
</script>
