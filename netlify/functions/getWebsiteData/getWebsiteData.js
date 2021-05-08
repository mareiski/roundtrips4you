// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios')

exports.handler = async (event) => {
  let url = event.queryStringParameters.url || 'https://www.booking.com/hotel/fr/elyseesunion.de.html'
  console.log(url)
  console.log(axios)
  axios.get(url)
    .then(page => {
      console.log(page)
      return {
        statusCode: 200,
        body: JSON.stringify({ message: page }),
        'headers': {
          'Access-Control-Allow-Origin': '*'
        }
      }
    })
    .catch(error => {
      console.log(error)
      return { statusCode: 500, body: error }
    })
}
