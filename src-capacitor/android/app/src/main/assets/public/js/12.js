(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{7486:function(e,o,t){"use strict";t.r(o);var i=function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("q-dialog",{attrs:{persistent:""},model:{value:e.showCookieDialog,callback:function(o){e.showCookieDialog=o},expression:"showCookieDialog"}},[t("q-card",[t("q-card-section",{staticClass:"row items-center"},[t("q-avatar",{attrs:{icon:"admin_panel_settings",color:"primary","text-color":"white"}}),t("div",{staticStyle:{"max-width":"90%","padding-left":"20px"}},[t("span",[e._v('Wir verwenden Cookies um Dienste, wie den Login bereitzustellen und zu verbessern.\n          Mit einem Klick auf "Akzeptieren" akzeptierst du die Cookies und das wir Analyetools einsetzen um Roundtrips4you zu verbessern.'),t("br"),e._v("Mehr dazu findest du unter Datenschutz."),t("br"),t("a",{staticStyle:{"text-decoration":"underline"},on:{click:function(o){e.showCookieDialog=!1}}},[e._v("Hier")]),e._v(" geht es nur mit den essentiellen Cookies weiter.")])])],1),t("q-card-actions",{attrs:{align:"right"}},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Akzeptieren",color:"primary"},on:{click:function(o){return e.allowCookies()}}})],1)],1)],1)},s=[];function n(){onOptIn()}var a={data(){return{showCookieDialog:!1}},methods:{allowCookies(){this.$q.cookies.set("cookies_allowed",!0,{expires:10});try{cookiesAllowed=!0}catch(e){console.log(e)}n()}},mounted(){let e=this.$q.cookies.get("cookies_allowed");if(e)try{cookiesAllowed=!0,this.allowCookies()}catch(o){console.log(o)}},created(){let e=this.$q.cookies.get("cookies_allowed");e||(this.showCookieDialog=!0)}},l=a,r=(t("7c05"),t("2877")),c=Object(r["a"])(l,i,s,!1,null,null,null);o["default"]=c.exports},"7c05":function(e,o,t){"use strict";var i=t("c9bd"),s=t.n(i);s.a},c9bd:function(e,o,t){}}]);