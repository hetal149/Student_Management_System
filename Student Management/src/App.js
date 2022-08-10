
import { BrowserRouter, Redirect, Route, Router, Routes, Switch } from 'react-router-dom';
import './App.css';
import Assignment from './components/AddAssignment';
import { TeacherLogin } from './components/Login';
import AddStudent from './components/AddStudent';
import TeacherAssign from './components/dash/TeacherAssign';

function App() {
  const user= JSON.parse(localStorage.getItem("studentInfo"))
  const teacher= JSON.parse(localStorage.getItem("teacherInfo"))
  return (

    <BrowserRouter>
  
  <Switch>
    
 <Route
  exact
  path="/"
  render={() => (user ? <Redirect to="/home" /> : <TeacherLogin />)}
/>;
<Route
  exact
  path="/"
  render={() => (teacher ? <Redirect to="/dash" /> : <TeacherLogin />)}
/>; 
  <Route path={"/dash/assignment"} component={TeacherAssign}></Route>
      <Route path={"/dash"} component={AddStudent}></Route>
      <Route path={"/"} component={TeacherLogin} exact={true} ></Route>
      
      <Route path={"/home"} component={Assignment}></Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
