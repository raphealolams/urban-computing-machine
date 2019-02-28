const fs = require('fs')
const Reader = require('./reader')


let Writer = {}


Writer.writeJson = function (filePath, fileName) {

    let data = Reader.readFile(filePath)
    elements = [];
    let utterance = 0, response = 0;

    if (data instanceof Array) {
        for(let i = 0; i < data.length; i++){
            data[i].forEach(element => {
    
                if (element.toLowerCase().includes("utterance")) {
                    utterance += 1;
                }
        
                if (element.toLowerCase().includes("response")) {
                    response += 1;
                }
            })
            
            elements.push({
                intent: data[i][0],
                utterance: [data[i].slice(1, utterance+1).join(",")],
                response: [data[i].slice(utterance+1).join(',')]
            })
            
        }
        fileCreator(fileName, elements, "json")
    }

    else {
        console.error("something went wrong") 
    }
}

function fileCreator(fileName, data, filetype) {

    let fileData = filetype === "json" ? JSON.stringify(data) : data

    fs.writeFile(fileName, fileData, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(`${fileName} was saved in the current directory!`);
    });
}


module.exports = Writer
