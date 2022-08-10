import React from "react";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import useStyles from "./NavStyle";
import { useHistory } from "react-router-dom";



function NavBarStd() {
    const history = useHistory()
    function logout(){
     
        history.push('/')
        localStorage.removeItem("studentInfo")
    
  

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
         
            <Button variant="contained" className={classes.logout} onClick={()=>logout()}>Logout</Button>
          </div>
          
         
         
    
      </Toolbar>
    </AppBar>
    
  );
  
}



export default NavBarStd;