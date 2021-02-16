var createFile = require('create-file')
let contentToWrite = process.argv[2]

createFile('FirebaseKeyProd', contentToWrite, function (err) {
    if (err) console.log(err)
    else console.log('succesfully wrote file')
})
