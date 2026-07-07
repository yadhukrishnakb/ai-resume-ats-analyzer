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
            <form onSubmit={onSubmitForm}>
                <input type="file" ref={fileRef} onChange={onSetFileInput} />
                <button type="submit">Analyse</button>
            </form>
            {submissionErrMsg && <p style={{color: "red",fontSize: "13px",margin: "5px"}}>{submissionErrMsg}</p>}
        </div>
        
    )

    const renderAnalysisReport = () => {
        return <AnalysisReport data={data} analyseAnother={analyseAnother}/>
    }

    const renderLoader = () => (
        <p>Loading....</p>
    )

    const renderFailure = () =>{
        return <>
        <p>{responseErrMsg}</p>
        <button type="button" style={{marginTop: "10px"}} onClick={analyseAnother}>Back</button>
        </>
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
            <div className="content-container">
                <h1 className="heading">ATS Resume Analyzer</h1>
                <p className="line">'No Login. No Registration. Just Upload & Analyze ⭐'</p>
                {isFormSubmitted ? renderContent() : renderForm()}
            </div>
        </div>
    )
}

export default Home