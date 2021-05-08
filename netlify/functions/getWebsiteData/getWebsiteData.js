// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios')
const handler = async (event) => {
  try {
    axios.get(event.queryStringParameters.name || 'https://www.booking.com/hotel/fr/elyseesunion.de.html')
      .then(page => {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: page })
        }
      })
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
