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

    const getList = (title, list, icon) => (
    <div className="report-card">
        <div className="card-title">
            <span className="card-icon">{icon}</span>
            <h3>{title}</h3>
        </div>

        {list.length > 0 ? (
            <ul className="report-list">
                {list.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        ) : (
            <p className="empty-text">No issues found.</p>
        )}
    </div>
)

    return (
    <div className="analysis-report-container">

        <h1 className="analysis-result-heading">
            📊 Resume Analysis Report
        </h1>

        <div className="score-card">
            <h2>ATS Score</h2>

            <div
                className="score"
                style={{ color: scoreColor() }}
            >
                {overallScore}
                <span>/100</span>
            </div>

            <div className="progress-bar">
                <div
                    className="progress"
                    style={{
                        width: `${overallScore}%`,
                        backgroundColor: scoreColor()
                    }}
                ></div>
            </div>
        </div>

        <div className="report-grid">

            {getList("Missing Keywords", missingKeywords, "🔍")}

            {getList("Strengths", strengths, "✅")}

            {getList("Suggestions", suggestions, "💡")}

            {getList("Weaknesses", weaknesses, "⚠️")}

        </div>

        <button
            className="analyse-again-btn"
            type="button"
            onClick={onClickAnalyseAnother}
        >
            🔄 Analyze Another Resume
        </button>

    </div>
)
}

export default AnalysisReport