// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios')

exports.handler = async (event) => {
  let url = event.queryStringParameters.url || 'https://www.booking.com/hotel/fr/elyseesunion.de.html'
  console.log(url)
  await axios.get(url)
    .then(page => {
      console.log(page.data)
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: page.data })
      }
    })
    .catch(error => {
      console.log(error)
      return { statusCode: 500, body: error }
    })
}
