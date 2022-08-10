import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from "react";
import { validEmail,validPassword,validName,validMobile } from './regex/regex';
import {
    FormGroup,
    FormControl,
    InputLabel,
    Input,
   
    Typography,
    makeStyles,
  } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { StudentContext } from './Provider/studentProvider';
import EnhancedTable from './dash/TeacherDash';
import NavBar from './Nav';
import { Form } from 'react-bootstrap';

export default function AddStudent() {
  const user1 = JSON.parse(localStorage.getItem('teacherInfo'))
  useEffect(() => {
    if(!user1) {
      history.push('/')
    }
  }, [])
  const [show, setShow] = useState(false);
  const initialValue = {
    email: "",
    password: "",
    name:"",
    mobile:"",
    adress:"",
    dob:"",
    Class:""
  };
  const initialIsValidValue = {
   
    isemail: '',
    ispassword: '',
    isname:"",
    ismobile:"",
    isadress:"",
    isdob:"",
    isClass:""
}
  const [user, setUser] = useState(initialValue);
  const { email, password,name,mobile,adress,dob,Class } = user;
  const {addStudents} =useContext(StudentContext)
  console.log(user)
  
  const history = useHistory();
  const [isValid, setIsValid] = useState(initialIsValidValue);
  const { isname,ismobile,isadress,isdob,isClass, isemail,ispassword } = isValid;

  const validationMessageCSS = {color:'red',marginBottom:'20px'}

 
 
  

  
  const onValidate = (e,regEx) => {
    const RegExObj=new RegExp(regEx);
    const isValidKey='is'+e.target.name;
    
   
    if(RegExObj.test(e.target.value))
    {
        setIsValid({...isValid,[isValidKey]:''});
        setUser({...user, [e.target.name]: e.target.value});
    }
    else if(e.target.value===""){
        setIsValid({...isValid,[isValidKey]:'This Field is required'})
    }
    else{
        setIsValid({...isValid,[isValidKey]:'Please Enter valid the details..!!'});
      
    }
}
 var flag=true;
const validateDetailsFlag = Object.values(isValid).every(value => {
    if (value!==null && value!==''&&email.length===0 || password.length===0 || isemail.length!==0 || ispassword.length!==0) {
        flag=false;
    }
    return flag;
});

 
 
  const onChangeSetState = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const resetform =(e) =>{
    setUser({ email: "",
    password: "",
    name:"",
    mobile:"",
    adress:"",
    dob:"",
    Class:""
   
  })}


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const add=()=>{
        try {
      
      
            if(validateDetailsFlag){  
              
             addStudents(email,password, Class, name,mobile,adress,dob)
             handleClose();
             resetform();
            }
            } catch (error) {
              alert("error")
           
            }
    }
  return (
    <>
  <NavBar/>

      <Modal show={show} onHide={handleClose} backdrop="static"  keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={add }>
           <FormGroup>
     
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          onChange={(e) => onChangeSetState(e)}
          required
          name="email"
          value={email}
          id="txtEmailId"
          pattern="^[a-zA-Z0-9@]"
          onBlur={(e) => onValidate(e,validEmail)}
          inputProps={{ maxLength: 50 }}
          isRequired
        />
         <div style={validationMessageCSS}>{isemail}</div>
      </FormControl>
      <FormControl>
        
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          type="text"
          onChange={(e) => onChangeSetState(e)}
          required
          name="name"
          pattern="^[a-zA-Z0-9@]"
          onBlur={(e) => onValidate(e,validName)}
          value={name}
          
          inputProps={{ maxLength: 12 }}
          isRequired
        />
         <div style={validationMessageCSS}>{isname}</div>
      </FormControl>
      <FormControl>
        
        <InputLabel htmlFor="mobile">Mobile</InputLabel>
        <Input
          type="mobile"
          onChange={(e) => onChangeSetState(e)}
          required
          name="mobile"
          pattern="^[0-9]"
          value={mobile}
          onBlur={(e) => onValidate(e,validMobile)}
          inputProps={{ maxLength: 10 }}
          isRequired
        />
         <div style={validationMessageCSS}>{ismobile}</div>
      </FormControl>
      <FormControl>
        
        <InputLabel htmlFor="adress">Adress</InputLabel>
        <Input
          type="text"
          onChange={(e) => onChangeSetState(e)}
          required
          name="adress"
          pattern="^[a-zA-Z0-9]"
          value={adress}
          id="txtPassword"
     
          inputProps={{ maxLength: 120 }}
          isRequired
        />
        <div style={validationMessageCSS}>{isadress}</div>
      </FormControl>
      <FormControl>
        
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          type="password"
          onChange={(e) => onChangeSetState(e)}
          required
          name="password"
          pattern="^[a-zA-Z0-9]"
          value={password}
          onBlur={(e) => onValidate(e,validPassword)}
          inputProps={{ maxLength: 8 }}
          isRequired
        />
         <div style={validationMessageCSS}>{ispassword}</div>
      </FormControl>
      <FormControl>
        
        <InputLabel htmlFor="class">Class</InputLabel>
        <Input
          type="text"
          onChange={(e) => onChangeSetState(e)}
          required
          name="Class"
          pattern="^[a-zA-Z]"
          value={Class}
         
          inputProps={{ maxLength: 12 }}
          isRequired
        />
         <div style={validationMessageCSS}>{isClass}</div>
      </FormControl>
      <FormControl>
        
        <InputLabel htmlFor="dob">DOB</InputLabel>
        <Input
          type="date"
          onChange={(e) => onChangeSetState(e)}
          required
          name="dob"
    
          value={dob}
         
          inputProps={{ maxLength: 12 }}
          isRequired
        />
         <div style={validationMessageCSS}>{isdob}</div>
      </FormControl>
      <br />
      <FormControl>
        <Button
          variant="contained"

          color="secondary"
          disabled={password.length===0||email.length === 0 || name.length === 0||adress.length===0||Class.length === 0 || dob.length === 0}
          type="submit"
        >
        Add
        </Button>
      </FormControl>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     
    


      
    </FormGroup>
    </Form></Modal.Body>
       
      </Modal>
      <EnhancedTable handleFunction={handleShow}/>
    </>
  );
}

