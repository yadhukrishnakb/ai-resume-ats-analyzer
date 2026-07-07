const {PDFParse} = require("pdf-parse")
const fs = require("fs")

const parsePDF = async (filePath) => {
    try{
        const dataBuffer = fs.readFileSync(filePath)
        const parser = new PDFParse({
            data:dataBuffer
        })
        return await parser.getText()
    }catch(err){
        console.log(err.message)
    }
}

module.exports = parsePDF