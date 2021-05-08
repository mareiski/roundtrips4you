// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import axios from 'axios'
const handler = async (event) => {
  try {
    axios.get('https://www.booking.com/hotel/fr/elyseesunion.de.html')
      .then(page => {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: `Hello ${page}` })
          // // more keys you can return:
          // headers: { "headerName": "headerValue", ... },
          // isBase64Encoded: true,
        }
      })
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
