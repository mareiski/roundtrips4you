const jsonfile = require('jsonfile')

const file = 'key'
let contentToWrite = process.argv[2]

jsonfile.writeFile(file, contentToWrite, function (err) {
    if (err) console.error(err)
})
