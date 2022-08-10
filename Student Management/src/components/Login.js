import React, { useState } from "react";
import { validEmail,validPassword } from './regex/regex';

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";


const initialValue = {
  email: "",
  password: "",
};
const initialIsValidValue = {
   
    isemail: '',
    ispassword: '',
}




const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%"
   
  },
  label:{
    color:'#015f92',
    fontWeight:'bolder',
   
  },
  button:{
    backgroundColor:'#015f92'
  }
});
export const TeacherLogin = () => {
  
 
  
  const [user, setUser] = useState(initialValue);
  const { email, password } = user;

  console.log(user)
  

  const [isValid, setIsValid] = useState(initialIsValidValue);
  const {  isemail,ispassword } = isValid;
  const classes = useStyles();
  const validationMessageCSS = {color:'red',marginBottom:'20px'}
 
 
  const history = useHistory();

  const onChangeSetState = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
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


  const signin=async()=>{
  

    try {
      
      
     if(validateDetailsFlag){  
     
      

      if((email=="teacher@gmail.com") && (password=="teacher@123")){
          localStorage.setItem('teacherInfo',JSON.stringify({email,password}))
          const Student =JSON.parse(localStorage.getItem('students'))
          if (!Student){
            localStorage.setItem('students',JSON.stringify([]))
          }
          history.push('/dash')
      }
      else{
        const data =JSON.parse(localStorage.getItem('students'))
        
        if(data && validateDetailsFlag){
       
         flag=0
         for(var i=0;i<data.length;i++){
          if(user?.email==data[i]?.email){
            var name=data[i].name;
            var adress = data[i].adress;
            var mobile = data[i].mobile
            var sid = data[i].id
            flag=1
           
          }
            else{
              flag=0
            }
          }
         
          if(flag=1){
           
            localStorage.setItem('studentInfo',JSON.stringify({name,adress,mobile,email,sid,password}))
            const assignment =JSON.parse(localStorage.getItem('assignment'))
            if (!assignment){
              localStorage.setItem('assignment',JSON.stringify([]))
            }
           
            history.push('/home')
        
          }
        
        }
      }
     
     }
    } catch (error) {
      console.log(error)
   
    }
  
}

  // Common onClick().

  return (
    <>
   
    
    <FormGroup className={classes.container}>
      <Typography variant="h4" align="center" className={classes.label}>SignIn</Typography>
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          onChange={(e) => onChangeSetState(e)}
          required
          name="email"
          value={email}
          id="txtEmailId"
          onBlur={(e) => onValidate(e,validEmail)}
          inputProps={{ maxLength: 50 }}
        />
        <div style={validationMessageCSS}>{isemail}</div>
      </FormControl>

      <FormControl>
        
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          type="password"
          onChange={(e) => onChangeSetState(e)}
          required
          name="password"
          value={password}
          id="txtPassword"
          inputProps={{ maxLength: 12 }}
          onBlur={(e) => onValidate(e,validPassword)}
        />
        <div style={validationMessageCSS}>{ispassword}</div>
      </FormControl>
      <br />
      <FormControl>
        <Button
          variant="contained"
          className={classes.button}
          color="secondary"
          disabled={email.length === 0 || password.length === 0}
          onClick={()=>signin()}
        >
          SignIn 
        </Button>
      </FormControl>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     
    


    </FormGroup>
    </>
  );
};