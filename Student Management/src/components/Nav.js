import React from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import useStyles from "./NavStyle";
import { useHistory } from "react-router-dom";



function NavBar() {
    const history = useHistory()
    function logout(){
     
    
        localStorage.removeItem("teacherInfo")
        history.push('/')
    }
    function student(){
      history.push('/dash')
  }
  function assignment(){
    history.push('/dash/assignment')
}
    const user = JSON.parse(localStorage.getItem('studentInfo'))
    const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
         
          className={classes.heading}
          variant="h4"
          align="center"
        >
          Student Management System
        </Typography>

      </div>
      <Toolbar className={classes.toolbar}>

          
          <div className={classes.profile}>
          <Button  color="secondary"className={classes.logout} onClick={()=>student()}>Students</Button>
          <Button  color="secondary" className={classes.logout} onClick={()=>assignment()}>Assignments</Button>
            <Button color="secondary" className={classes.logout} onClick={()=>logout()}>Logout</Button>
          </div>
          
         
         
    
      </Toolbar>
    </AppBar>
    
  );
  
}



export default NavBar;