import "./index.css"
const AnalysisReport = ({data,analyseAnother}) => {
    const {analysisResult} = data
    const {missingKeywords,overallScore,strengths,suggestions,weaknesses} = analysisResult
    
    const scoreColor = () =>{
        if(overallScore >= 70){
            return "yellowgreen"
        }
        else if(overallScore >= 50){
            return "orange"
        }else{
            return "red"
        }
    }

    const onClickAnalyseAnother = () => {
        analyseAnother()
    }

    const getList = (list) => (
        <ul className="list">
            {list.map(each => <li key={each}>{each}</li>)}
        </ul>
    )
    return(
        <div className="analysis-report-container">
            <h1 className="analysis-result-heading">Analysis Result</h1>
            <p className="title">Overall Score: <span style={{color: scoreColor(),fontWeight:"bold"}}>{overallScore}</span>/100</p>
            <p className="title">Missing Keywords:</p>
            {getList(missingKeywords)}
            <p className="title">Strengths: </p>
            {getList(strengths)}
            <p className="title">Suggestions: </p>
            {getList(suggestions)}
            <p className="title">Weaknesses: </p>
            {getList(weaknesses)}
            <div className="button-container">
                <button type="button"  onClick={onClickAnalyseAnother}>Analyse Another</button>
            </div>
        </div>
    )
}

export default AnalysisReport