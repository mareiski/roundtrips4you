<template>
    <div class="roundtrips">
        <h2 class="topic">{{country}}: {{roundtrips.length}} Rundreisen gefunden</h2>
        <div id="CardBackgroundImg"></div>
        <div id="RoundtripCardBackgroundImgPlaceholder">
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
                            <font-awesome-icon class="star" v-for="n in roundtrip.stars" :key="n" icon="star" />
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
                            <img class="advertiser-logo" :src="require('@/assets/' + roundtrip.advertiser + '.png')"/>
                        </div>
                        <div class="card-bottom-row">
                            <a class="button price-button"><span>&euro;</span>{{roundtrip.price}}<span>p.P.</span></a>
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
                country: 'Italien',
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
                        description: 'Entdecke Venedig auf einer der schönsten Routen Italiens.',
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
                        description: 'Entdecke Venedig auf einer der schönsten Routen Italiens.',
                        tags: ['Gruppenreise', 'inklusive Flug', 'kleine Reisegruppe'],
                        advertiser: 'gebeco',
                        price: '330'
                    },
                     {
                        id: '3',
                        title: 'Venedig entdecken',
                        category: 'einblick',
                        imageUrl: 'venice.jpg',
                        stars: 5,
                        location: 'Italien',
                        days: '10',
                        hotels: '5',
                        description: 'Entdecke Venedig auf einer der schönsten Routen Italiens.',
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
