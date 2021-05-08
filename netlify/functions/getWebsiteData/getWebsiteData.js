// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios')

exports.handler = async (event) => {
  let url = event.queryStringParameters.url || 'https://www.booking.com/hotel/fr/elyseesunion.de.html'

  let response = null

  await axios.get(url)
    .then(page => {
      console.log(page.data)
      response = page.data
    })
    .catch(error => {
      console.log(error)
      return { statusCode: 500, body: error }
    })

  console.log(response)
  return {
    statusCode: response ? 200 : 500,
    body: response || 'failed'
  }
}
