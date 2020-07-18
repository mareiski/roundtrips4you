<template>
  <div class="faqs q-px-lg q-pb-md">
    <h3 style="padding-top:20px;">FAQs</h3>
    <h4>Allgemein</h4>
    <q-list bordered>
      <q-expansion-item
        icon="location_city"
        label="Städte vorschlagen lassen"
        group="general"
      >
        <q-card>
          <q-card-section>
            Um dir Städte vorschlagen zu lassen klickst du in deiner Rundreise einfach auf Inspiration und dann auf den Städte vorschlagen Button.
            Es werden dir die jeweiligen Städte angezeigt, mit einem klick auf das Plus rechts oben kannst du den Ort zu deiner Reise hinzufügen.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        icon="flight"
        label="Flüge finden"
        group="general"
      >
        <q-card>
          <q-card-section>
            Um mit deinen Daten bei verschiedenen Anbietern Flüge zu finden musst du auf An-/Abreise klicken. Anschließend musst du als Reisemittel Flugzeug auswählen.
            Jetzt werden dir die Felder mit den benötigten Daten angezeigt. Am unteren Rand findest du die Buttons die dich zu den Angeboten des angebenen Anbieters bringen.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        icon="share"
        label="Reise teilen"
        group="general"
      >
        <q-card>
          <q-card-section>
            Um deine Reise zu teilen musst du sie in den Einstellungen veröffentlichen. Danach erscheint sie automatisch auf Roundtrips4you.
            Zusätzlich kannst du auch den Link zu deiner Reise kopieren und diesen in deine Website oder deinen Blog einbinden.
            Bevor du deine Reise veröffentlichst solltest du jedoch darauf achten das du alle Felder unter der Veröffentlichungsfunktion richtig ausgefüllt hast.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="general"
        icon="account_circle"
        label="Profil und Reputation"
      >
        <q-card>
          <q-card-section>
            Jeder User bekommt je nach dem was er für die Community von Roundtrips4you leistet bestimmte Punkte, die Reputation.
            Reputation bekommt man hauptsächlich wenn man Rundreisen veröffentlicht oder eigene Rundreisen von anderen Usern bearbeitet wurden.
            Zusätzlich erhält man Badges für das Erreichen von bestimmten Zielen.
            Profile sind grundsätzlich erst dann öffentlich wenn du einen Benutzernamen angibst.
            Bei öffenltichen Profilen können veröffentlichte Reisen und die genaue zusammensetzung der Reputation eingesehen werden.
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />
    </q-list>

    <h4>Editor</h4>
    <q-list bordered>
      <q-expansion-item
        icon="location_on"
        label="Stopp"
        group="editor"
      >
        <q-card>
          <q-card-section>
            Ein Stopp ist ein normales Reiseziel auf deiner Tour, normalerweise bleibst du dort über Nacht oder du machst dort einen Zwischenstopp zu deinem nächsten Ziel
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        icon="event"
        label="Tagesausflug"
        group="editor"
      >
        <q-card>
          <q-card-section>
            Ein Tagesausflug kann nur von einem Stopp aus gemacht werden. Dort bleibst du normalerweise nur für eine Weile und fährst am Ende des Tages wieder zu dem Ausgangspunkt zurück.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        icon="hotel"
        label="Hotels"
        group="editor"
      >
        <q-card>
          <q-card-section>
            Ein Hotel kann nur einem Stopp hinzugefügt werden. Suche dazu nach dem Hotelnamen. Sollte das Hotel nicht gefunden werden, kannst du dieses manuell hinzufügen.
            Die Links zu den gängigen Buchungsportalen werden automatisch erstellt und angezeigt.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="editor"
        icon="account_balance"
        label="Sehenswürdigkeiten"
      >
        <q-card>
          <q-card-section>
            Über den Button POIs anzeigen oder über die Karte kannst du bekannte Sehenswürdigkeiten zu dem jeweiligen Stopp finden und auch hinzufügen.
            Mit einem Klick darauf werden dir außerdem Infos über den Ort angezeigt.

          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />

      <q-expansion-item
        group="editor"
        icon="local_parking"
        label="Parkplätze"
      >
        <q-card>
          <q-card-section>
            Ein Parkplatz kann über den gleichnamigen Button hinzugefügt werden, dazu muss man nur die Straße des Platzes kennen.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="editor"
        icon="perm_media"
        label="Bilder"
      >
        <q-card>
          <q-card-section>
            Bilder können über das Plus in dem Rechteck am unteren Rand eines Stopps hinzugefügt werden. Man kann Bilder aus dem Web oder den Einstellungen zu einem Stopp hinzufügen.
            Bilder kann man in den Einstellungen in die Mediathek laden. Diese werden dann auch beim veröffentlichen ganz oben angezeigt.

          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="editor"
        icon="perm_media"
        label="Rundreise autom. zusammenstellen"
      >
        <q-card>
          <q-card-section>
            Damit deine Rundreise automatisch zusammengestellt werden kann musst du mehr als einen Stopp zu deiner Reise hinzugefügt haben.
            Ist dies der Fall findest du am linken unteren Rand des Reiseverlaufs einem Button mit dem du deine Route automatisch erstellen lassen kannst.
            Bitte beachte das danach die Reihenfolge all deiner einzelnen Sopps verändert ist und auch die einzelnen Daten nicht mehr die selben sind.
            Des weiteren werden Tagesausflüge nicht berücksichtigt.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<script>
export default {
  name: 'faqs',
  meta: {
    title: 'FAQs',
    meta: {
      robot: { name: 'robot', content: 'noIndex' }

    }
  }
}
</script>
