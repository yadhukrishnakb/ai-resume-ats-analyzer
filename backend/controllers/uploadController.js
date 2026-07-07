const parsePDF = require("../utils/pdfParser")
const resumeAnalyser = require("../utils/gemini")

const Resume = require("../models/Resume")

const analyseResume = async (request,response) => {
    try{
        const parsedPDF = await parsePDF(request.file.path)
        const analysedResume = await resumeAnalyser(JSON.stringify(parsedPDF))
        if(!analysedResume.isResume){
            return response.status(400).json({message: "The uploaded PDF is not a resume/CV"})
        }
        /*const resume = new Resume({
            filename: request.file.originalname,
            analysisResult: analysedResume
        })*/
        //const savedResume = await resume.save()
        const analysisReport = {
            filename: request.file.originalname,
            analysisResult: analysedResume,
        }
        return response.status(200).json(analysisReport)
    }catch(err){
        return response.status(500).json({message: "We couldn't analyze your resume at the moment. Please try again later!"})
    }
}

module.exports = {analyseResume}