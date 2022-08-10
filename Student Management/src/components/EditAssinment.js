import {  FormGroup, FormControl } from "react-bootstrap"
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useContext, useState } from 'react';
import { AssignmentContext } from "./Provider/AssignmentProvider";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { Button } from "@material-ui/core";
import { Form } from 'react-bootstrap';
import { validClass, validName } from "./regex/regex";

const EditAssignment = ({ theAssignment,setShow}) => {

    const id = theAssignment.id;
    console.log("q",theAssignment.id)
    const [aname, setAname] = useState(theAssignment.aname);
    const [description, setDescription] = useState(theAssignment.description);
    const [Class, setClass] = useState(theAssignment.Class);
    const [file, setFile] = useState(theAssignment.file);


    const { updateAssignments } = useContext(AssignmentContext);

    const [updatedAssignment,setupdatedAssignment] = useState({ id, aname, description, Class, file })
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const handleSubmit = (e) => {
      
        updateAssignments(id, updatedAssignment)
        
    }

    const [pdfError, setPdfError]=useState('');
const handleClose = () => {setShow(false)}

    // handle file onChange event
    const allowedFiles = ['application/pdf'];
    const handleFile = (e) =>{
      let selectedFile = e.target.files[0];
      // console.log(selectedFile.type);
      if(selectedFile){
        if(selectedFile&&allowedFiles.includes(selectedFile.type)){
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend=(e)=>{
            setPdfError('');
            setFile(e.target.result);
          }
        }
        else{
          setPdfError('Not a valid pdf: Please select only PDF');
          setFile('');
        
        }
      }
      else{
        console.log('please select a PDF');
        
      }
    }
    const initialIsValidValue = {
      isAname: "",
      isdescription: "",
      isClass: "",
      isfile: "",
    };
    const [isValid, setIsValid] = useState(initialIsValidValue);
  const { isAname, isClass, isdescription, isfile } = isValid;
  const validationMessageCSS = { color: "red", marginBottom: "20px" };

  const onValidate = (e, regEx) => {
    const RegExObj = new RegExp(regEx);
    const isValidKey = "is" + e.target.name;
   
    if (RegExObj.test(e.target.value)) {
      setIsValid({ ...isValid, [isValidKey]: "" });
      setupdatedAssignment({ ...updatedAssignment, [e.target.name]: e.target.value });
     
    } else if (e.target.value === "") {
 
      setIsValid({ ...isValid, [isValidKey]: "This Field is required" });

    } else {
      setIsValid({
        ...isValid,
        [isValidKey]: "Please Enter valid the details..!!",
      });
    }
  };
    return (

        <Form onSubmit={handleSubmit} >
            <FormGroup>
                <FormControl
                    type="text"
                    placeholder="Name *"
                    name="aname"
                    value={aname}
                    onBlur={(e) => onValidate(e, validName)}
                    onChange={(e) => setAname(e.target.value)}
                    required
                />
                 <div style={validationMessageCSS}>{isAname}</div>
            </FormGroup>
            <FormGroup>
                <FormControl
                    as="textarea"
                    placeholder="Description *"
                    name="description"
                    value={description}
                    onBlur={(e) => onValidate(e, validName)}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                 <div style={validationMessageCSS}>{isdescription}</div>
            </FormGroup>
            <FormGroup>
                <FormControl
                    type="text"
                    placeholder="class section"
                    rows={3}
                    name="Class"
                    value={Class}
                    onBlur={(e) => onValidate(e, validClass)}
                    onChange={(e) => setClass(e.target.value)}
                />
                <div style={validationMessageCSS}>{isClass}</div>
            </FormGroup>
            <FormGroup>
               
                      <input type='file' className="form-control"
        onChange={handleFile}
        onBlur={(e) => onValidate(e, )}></input>
                  <div style={validationMessageCSS}>{isfile}</div>
        {pdfError&&<span className='text-danger'>{pdfError}</span>}

        </FormGroup>
        <FormGroup>
        {file&&(
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
            <Viewer fileUrl={file}
            plugins={[defaultLayoutPluginInstance]}></Viewer>
          </Worker>
        )}

        {!file&&<>No file is selected yet</>}

            </FormGroup>
            <Button color="primary" type ="submit" onClick={()=>handleClose()} disabled={aname?.length===0||Class?.length===0||description?.length===0||file?.length===0}>
                Edit 

            </Button>
           
       
                    <Button color="secondary"  onClick={()=>handleClose()}>
                        Close 
                    </Button>
        
        </Form>

    )
}

export default EditAssignment;