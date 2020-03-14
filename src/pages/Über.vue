<template>
  <div class="about q-px-lg q-pb-md">
    <h3 style="padding-top:10px;">Hallo, schön dass du hergefunden hast !</h3>
    <q-img
      alt="Island"
      style="max-height:450px; margin-bottom: 20px;"
      src="https://images.unsplash.com/photo-1528837516156-0a7225a43641?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80"
    ></q-img>
    <span>Wir sind ein kleines Startup aus Ingolstadt, welches sich auf die Reisenvermittlung & Erstellung spezialisiert hat.</span>
    <br><br>
    <span>Wir möchten aber nicht, dass du irgendeine Rundreise buchst, weil sie dir vorgeschlagen wurde.</span>
    <br>
    <span>Deshalb kannst du über roundrips4you die perfekte Rundreise finden, die zu dir passt.</span>
    <br><br>
    <span>Solltest du einmal nicht das Richtige finden, kannst du ganz einfach deine Individuelle Reise zusammenstellen. <br>
      Damit hilft du auch anderen Nutzern, ihre eigene Traumreise zu finden !
    </span>
    <br><br>
    <span>Du hast ein Problem oder möchtest uns dein Feedback geben ? <br>
      Dann Kontaktiere uns jetzt unter <a href="mailto:hello@roundtrips4you.de">hello@roundtrips4you.de</a>.
    </span>
    <br><br>
    <span>Wir freuen uns über alle Vorschläge !</span>
  </div>
</template>
<script>
import(/* webpackPrefetch: true */ '../css/about.less')
export default {
  meta: {
    title: 'Über uns',
    meta: {
      robot: { name: 'robot', content: 'noIndex' }

    }
  }
}
</script>
