const writer = require('./lib/writer')

const path = './file/file3.xlsx'
const fileName = "test.json"

function call(path) {

    return writer.writeJson(path, fileName)
}

call(path)

