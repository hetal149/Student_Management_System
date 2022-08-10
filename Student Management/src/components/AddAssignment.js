import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import 'antd/dist/antd.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import {
  validName,
  validClass,
} from "./regex/regex";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,

} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Home from "./dash/StudentDash";
import { AssignmentContext } from "./Provider/AssignmentProvider";
import { useContext } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
export default function Assignment() {
  const history= useHistory()
  const [show, setShow] = useState(false);
  const initialValue = {
    aname: "",
    description: "",
    Class: "",
  
  };
  const[file,setFile]=useState()
  const initialIsValidValue = {
    isAname: "",
    isdescription: "",
    isClass: "",
    isfile: "",
  };
  const [user, setUser] = useState(initialValue);
  const { aname, description, Class } = user;
  const { addAssignments } = useContext(AssignmentContext);

  const [isValid, setIsValid] = useState(initialIsValidValue);
  const { isAname, isClass, isdescription, isfile } = isValid;

  const validationMessageCSS = { color: "red", marginBottom: "20px" };

  const onValidate = (e, regEx) => {
    const RegExObj = new RegExp(regEx);
    const isValidKey = "is" + e.target.name;

    if (RegExObj.test(e.target.value)) {
      setIsValid({ ...isValid, [isValidKey]: "" });
      setUser({ ...user, [e.target.name]: e.target.value });

    } else if (e.target.value === "") {
      setIsValid({ ...isValid, [isValidKey]: "This Field is required" });

    } else {
      setIsValid({
        ...isValid,
        [isValidKey]: "Please Enter valid the details..!!",
      });
    }
  };


  const onChangeSetState = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const resetform = (e) => {
    setUser({
      file: "",
      description: "",
      aname: "",

      Class: "",
    });
  };

  const user1 = JSON.parse(localStorage.getItem('studentInfo'))
  useEffect(() => {
    if(!user1) {
      history.push('/')
    }
  }, [])
 
 
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const student= JSON.parse(localStorage.getItem('studentInfo'))
  const add = () => {
    try {
    console.log("hi")
    const s_id= student?.sid;
    
    const email=student?.email;
    const name =student?.name;
    const mobile =student?.mobile;
    const adress =student?.adress;
      addAssignments(aname, description, Class, file,s_id,email,name,mobile,adress);
      alert("Add successfully");
      handleClose();
      resetform();
    } catch (error) {
      console.log(error)
    }
  };


  //cloudinary

  const [pdfError, setPdfError]=useState('');


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
  return (
    <>
      

      <Modal show={show} onHide={handleClose} backdrop="static"  keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={add}>
          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="aname">Name</InputLabel>
              <Input
                onChange={(e) => onChangeSetState(e)}
                required
                name="aname"
                value={aname}
                onBlur={(e) => onValidate(e, validName)}
                inputProps={{ maxLength: 50 }}
                isRequired
              />
              <div style={validationMessageCSS}>{isAname}</div>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="name">description</InputLabel>
              <Input
                type="text"
                onChange={(e) => onChangeSetState(e)}
                required
                name="description"
                value={description}
                onBlur={(e) => onValidate(e, validName)}
                inputProps={{ maxLength: 50 }}
                isRequired
              />
              <div style={validationMessageCSS}>{isdescription}</div>
            </FormControl>
            
            <FormControl>
              <InputLabel htmlFor="class">Class</InputLabel>
              <Input
                type="text"
                onChange={(e) => onChangeSetState(e)}
                required
                name="Class"
                pattern="^[0-9]"
                value={Class}
                onBlur={(e) => onValidate(e, validClass)}
                inputProps={{ maxLength: 12 }}
                isRequired
              />
              <div style={validationMessageCSS}>{isClass}</div>
            </FormControl>
            <FormControl>
        
                  <input type='file' className="form-control"
        onChange={handleFile}></input>
         <div style={validationMessageCSS}>{isfile}</div>
        {pdfError&&<span className='text-danger'>{pdfError}</span>}

             
            </FormControl>
            <FormControl>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={
                 
                  description?.length === 0 ||
                  aname?.length === 0 ||
                  Class?.length === 0 ||
                  file?.length===0
                }
               
              >
                Add Assignment
              </Button>
            </FormControl>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
      <Home afile={file} handleFunction={handleShow} />
    </>
  );
}
