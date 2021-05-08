// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import { get } from 'axios'
const handler = async (event) => {
  let url = event.queryStringParameters.url || 'https://www.booking.com/hotel/fr/elyseesunion.de.html'
  console.log(url)
  get(url)
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
      return { statusCode: 500, body: error }
    })
}

export default { handler }
