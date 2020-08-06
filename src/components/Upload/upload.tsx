import React,{useRef, useState} from 'react'
import '../../styles/index.scss'
import axios from 'axios'
import Button from '../Button/button'

interface UploadProps{
    action:string;
    beforeUpload?:(file:File)=>boolean | Promise<File>;
}

const Upload:React.FC<UploadProps>=(props)=>{

    const {
        action,
        beforeUpload,
    }=props

    const fileInput=useRef<HTMLInputElement>(null)
    const [percent,setPercent]=useState(0)
    const [show,setShow]=useState(false)

    const handleClick=()=>{
        if(fileInput.current){
            fileInput.current.click()
        }
    }


    const post=(file:File)=>{
        const formData=new FormData()
        formData.append(file.name,file)
        axios.post(action,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
            onUploadProgress:(e)=>{
                const percentage=Math.round((e.loaded*100)/e.total) || 0
                setPercent(percentage)
            }
        }).then(resp=>{
            console.log(resp)
            setShow(false)
        }).catch(err=>{
            console.log(err)
        })
    }

    const uploadFiles=(files:FileList)=>{
        setShow(true)
        let postFiles=Array.from(files)
        postFiles.forEach(file=>{
            if(!beforeUpload){
                post(file)
            }else{
                const result=beforeUpload(file)
                if(result && result instanceof Promise){
                    result.then(processedFile=>{
                        post(processedFile)
                    })
                }else if(result!==false){
                    post(file)
                }
            }
        })
    }



    const handleFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const files=e.target.files
        if(!files){
            return 
        }
        uploadFiles(files)
        if(fileInput.current){
            fileInput.current.value=''
        }
    }

    return (
        <div className="upload-component">
            <Button
            onClick={handleClick}
            >Upload File</Button>
            <input 
            type="file" 
            className="file-input"
            style={{display:'none'}}
            ref={fileInput}
            onChange={handleFileChange}/>

            {show && <div className="progress-bar" >
                <div className="progress-bar-outer">
                    <div className="progress-bar-inner" style={{width:`${percent}%`}}>
                        <span className="inner-text">{`${percent}%`}</span>
                    </div>
                </div>
            </div>}
        </div>
    )
}



export default Upload