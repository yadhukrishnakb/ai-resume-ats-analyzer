const {GoogleGenerativeAI} = require("@google/generative-ai")

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAi.getGenerativeModel({
    model: "gemini-3.1-flash-lite"
})

const resumeAnalyser = async (parsedPDF) => {
    try{
        const prompt = `The following text was extracted from a resume.
        ${parsedPDF}
        Analyze this document.
        First, determine whether it is a resume/CV.
        Return ONLY valid JSON.
        Format:
        {
        "isResume": true,
        "overallScore": number,
        "strengths": [],
        "weaknesses": [],
        "missingKeywords": [],
        "suggestions": []
        }
        If the document is NOT a resume, set "isResume" to false and set the remaining fields to null.
        Do not return any text outside the JSON.`;

        const result = await model.generateContent(prompt)
        return JSON.parse(result.response.text())
    }catch(err){
        return "Server Error"
    }
}

module.exports = resumeAnalyser