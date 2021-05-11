// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios')

exports.handler = async (event) => {
  let response = null

  await axios.get(event.queryStringParameters.url)
    .then(page => {
      response = page.data
    })
    .catch(error => {
      return {
        statusCode: 500,
        body: error,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    })

  return {
    statusCode: response ? 200 : 500,
    body: JSON.stringify({ raw: response || null })
  }
}
