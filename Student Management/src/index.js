import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import AssignmentContextProvider from './components/Provider/AssignmentProvider';
import StudentContextProvider from  './components/Provider/studentProvider';

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    
  
      <StudentContextProvider>
      <AssignmentContextProvider>
        <App />
        </AssignmentContextProvider>
        </StudentContextProvider> 

   
   

  </React.StrictMode>
,document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
