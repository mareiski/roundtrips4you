module.exports = {
    pages: {
        'index': {
            entry: './src/pages/home/main.js',
            template: 'public/index.html',
            title: 'Home',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        'roundtrips': {
            entry: './src/pages/roundtrips/main.js',
            template: 'public/index.html',
            title: 'Rundreisen',
            chunks: ['chunk-vendors', 'chunk-common', 'roundtrips'],

        },
        'roundtripdetails': {
            entry: './src/pages/roundtripdetails/main.js',
            template: 'public/index.html',
            title: 'Rundreisen',
            chunks: ['chunk-vendors', 'chunk-common', 'roundtripdetails'],
        },
        'about': {
            entry: './src/pages/about/main.js',
            template: 'public/index.html',
            title: 'Über',
            chunks: ['chunk-vendors', 'chunk-common', 'about']
        }
    }
}