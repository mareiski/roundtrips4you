<template>
    <div class="home">
        <div id="MainImg"></div>
        <div id="MainImgOverlay">
        </div>
        <div id="MainImgPlacholder">
            <h1 class="main-qoute">Die gr&ouml;te Sehensw&uuml;rdigkeit, die es gibt, ist die Welt - sieh sie dir an.</h1>
            <span class="quote-author">Kurt Tucholsky</span>
            <input placeholder="Finde jetzt dein Traumziel..." class="main-search-bar" type="search" />
        </div>
        <div class="box-seperator">
            <h2>Entdecke dein Traumziel mit einer Rundreise die zu dir passt!</h2>
        </div>
        <div class="box-seperator-placholder"></div>
        <div class="card-container">
            <div class="card-wrap left">
                <a class="card">
                    <div id="VietnamImg"></div>
                    <h3>Vietnam</h3>
                    <span>Erlebe einzigartige Landschaften</span>
                </a>
            </div>
            <div class="card-wrap">
                <a class="card">
                    <div id="USAImg"></div>
                    <h3>USA</h3>
                    <span>Erlebe die Weltmetropole in den USA</span>
                </a>
            </div>
            <div class="card-wrap right">
                <a href="roundtripdetails.html" class="card">
                    <div id="ItalyImg"></div>
                    <h3>Italien</h3>
                    <span>Erlebe la dolce Vita in Venedig</span>
                </a>
            </div>
        </div>
        <div class="section-img"></div>
        <div class="section-img-placeholder">
            <h2>Begebe dich jetzt auf die Suche nach der besten Rundreise f&uuml;r dein Traumland und entdecke neue Orte!</h2>
            <button>Zu den Rundreisen</button>
        </div>
    </div>
</template>
<style lang="less">
@import '../../styles/home.less';
</style>
<script>
    export default {
        name: 'Home',
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
