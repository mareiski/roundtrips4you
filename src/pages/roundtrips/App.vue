<template>
    <div class="roundtrips">
        <h2>Alle Rundreisen auf einen Blick</h2>
        <div id="CardBackgroundImg"></div>
        <div id="CardBackgroundImgPlaceholder">
            <div class="country-card-container" v-for="country in countries" :key="country">
                <div class="country-card" :style="{ backgroundImage: 'url('+ require('@/assets/' + country.imageUrl) +')' }">
                    <h2 class="country-title">{{country.title}}</h2>
                    <a class="button" v-bind:href="country.link">Zu den Rundreisen</a>
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
                countries: [
                    {
                        title: 'Italien', 
                        imageUrl: 'venice.jpg',
                        link: 'roundtripdetails.html'
                    },
                    {
                        title: 'Vietnam',
                        imageUrl: 'vietnam.jpg',
                        link: 'roundtripdetails.html'
                    },
                    {
                        title: 'USA',
                        imageUrl: 'goldenGate.jpg',
                        link: 'roundtripdetails.html'
                    },
                    {
                        title: 'Italien',
                        imageUrl: 'venice.jpg',
                        link: 'roundtripdetails.html'
                    },
                    {
                        title: 'Vietnam',
                        imageUrl: 'vietnam.jpg',
                        link: 'roundtripdetails.html'
                    },
                    {
                        title: 'USA',
                        imageUrl: 'goldenGate.jpg',
                        link: 'roundtripdetails.html'
                    }
                ]
            }
        },
        name: 'roundtrips'
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
