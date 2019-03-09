const fs = require('fs')
const Reader = require('./reader')


let Writer = {}


Writer.writeJson = function (filePath, fileName) {

    let data = Reader.readFile(filePath)
    elements = [], utterance = [], response = [];

    if (data instanceof Array) {
        for(let i = 0; i < data.length; i++){
            
            data[i].forEach((element, index) => {
                if (element.toLowerCase().includes("utterance")) {
                    utterance[index] += 1;
                }

                if (element.toLowerCase().includes("response")) {
                    response[index] += 1;  
                }
               
            })
 

            elements.push({
                intent: data[i][0],
                utterance:  data[i].slice(1, utterance.length) ,
                response: data[i].slice(utterance.length)
            })
        }

        // console.log(checkElement(elements))
        fileCreator(fileName, checkElement(elements), "json")

    }

    else {
        console.error("something went wrong") 
    }
}

function checkElement(data) {

    for(let i = 0; i < data.length; i++) {
        if (data[i].utterance) {
            let utterance = data[i].utterance

            for (let j = 0; j < utterance.length; j++){
                
                if (utterance[j] === undefined || !utterance[j] === true) {
                    data[i].utterance.splice(j, j)
                }
            }
        }

        if (data[i].response) {
            let response = data[i].response
            for (let j = 0; j < response.length; j++){
                if (response[j] === undefined || !response === true) {
                    data[i].response.splice(j, j)
                }
            }
        }
    }

    return data.filter((ele, index, data) => {
        if (ele.intent === undefined) console.log("called")
        return (ele.intent !== undefined && ele.intent !== "Intent")
    }); 
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
