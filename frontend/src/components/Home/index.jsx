import {useState,useRef} from "react"
import AnalysisReport from "../AnalysisReport"
import "./index.css"

const apiStatusConstants = {
    success: "SUCCESS",
    inProgress: "IN_PROGRESS",
    failure: "FAILURE",
    initial: "INITIAL"
}

const Home = () => {
    const [fileInput,setFileInput] = useState(null)
    const [apiStatus,setApiStatus] = useState(apiStatusConstants.initial)
    const [data,setData] = useState({})
    const [submissionErrMsg,setSubmissionErrMsg] = useState("")
    const [isFormSubmitted,setFormIsSubmitted] = useState(false)
    const [responseErrMsg,setResponseErrMsg] = useState("")

    const fileRef = useRef(null)

    const onSetFileInput = event =>{
        setFileInput(event.target.files[0])
    }

    const onSubmitForm = async event =>{
        event.preventDefault()
        
        if(!fileInput || !fileInput.name.toLowerCase().endsWith(".pdf")){
            setSubmissionErrMsg("Please provide a PDF file")
            return
        }
        
        const formData = new FormData()
        formData.append("file",fileInput)
        setFileInput(null)
        fileRef.current.value = ""
        
        setSubmissionErrMsg("")
        setFormIsSubmitted(true)
        setApiStatus(apiStatusConstants.inProgress)
        
        const apiUrl = import.meta.env.VITE_API_URL + "/upload"
        const options = {
            method: "POST",
            body: formData
        }
        const response = await fetch(apiUrl,options)
        
        if(response.ok){
            const data = await response.json()
            setApiStatus(apiStatusConstants.success)
            setData(data)
        }else{
            const data = await response.json()
            setApiStatus(apiStatusConstants.failure)
            setResponseErrMsg(data.message)
        }
    }

    const analyseAnother = () => {
        setFormIsSubmitted(false)
    }

    const renderForm = () => (
        <div className="input-form-container">
    <form onSubmit={onSubmitForm} className="upload-form">

        <label htmlFor="resume" className="upload-box">
            <div className="upload-icon">📄</div>

            <h3>Upload Your Resume</h3>

            <p>
                PDF files only
            </p>

            <span className="browse-btn">
                Choose File
            </span>

            <input
                id="resume"
                type="file"
                ref={fileRef}
                onChange={onSetFileInput}
                accept=".pdf"
                hidden
            />
            
        </label>
        {fileInput && (
    <p className="selected-file">
        📄 {fileInput.name}
    </p>
)}

        <button
            className="analyse-btn"
            type="submit"
        >
            🚀 Analyze Resume
        </button>

        {submissionErrMsg && (
            <p className="submission-err-msg">
                {submissionErrMsg}
            </p>
        )}

    </form>
</div>
        
    )

    const renderAnalysisReport = () => {
        return <AnalysisReport data={data} analyseAnother={analyseAnother}/>
    }

    const renderLoader = () => (
         <div className="loading-container">
        <div className="loader"></div>

        <h2>Analyzing Resume...</h2>

        <p>
            AI is reviewing your resume against ATS standards.
            This may take a few seconds.
        </p>
    </div>
    )

    const renderFailure = () =>{
        return (
            <div className="error-container">

    <div className="error-icon">
        ⚠️
    </div>

    <h2 className="error-heading">
        Something Went Wrong
    </h2>

    <p className="error-message">
        {responseErrMsg}
    </p>

    <button
        type="button"
        className="back-btn"
        onClick={analyseAnother}
    >
        ← Back to Upload
    </button>

</div>
        )
    }

    const renderContent = () => {
        switch(apiStatus){
            case apiStatusConstants.success:
                return renderAnalysisReport()
            case apiStatusConstants.inProgress:
                return renderLoader()
            case apiStatusConstants.failure:
                return renderFailure()
            default:
                return null
        }
    }

    return(
        <div className="bg-container">
  <div className="background-blur"></div>

  <div className="content-container">
    <div className="hero">
      <div className="logo">
        📄
      </div>

      <h1 className="heading">
        ATS Resume Analyzer
      </h1>

      <p className="line">
        No Login • No Registration • Upload Your Resume & Get Instant AI Feedback ⭐
      </p>
    </div>

    <div className="card">
      {isFormSubmitted ? renderContent() : renderForm()}
    </div>

    <div className="features">
      <div className="feature">
        ⚡ Instant Analysis
      </div>

      <div className="feature">
        🤖 AI Powered
      </div>

      <div className="feature">
        🔒 Secure & Private
      </div>
    </div>
  </div>
</div>
    )
}

export default Home