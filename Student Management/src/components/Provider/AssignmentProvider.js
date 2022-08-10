import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';  

export const AssignmentContext = createContext()

const AssignmentContextProvider = (props) => {
    const user = JSON.parse(localStorage.getItem('students'))
    const [Assignments, setAssignments] = useState([
        { id:uuidv4(), aname: "",
        Class: "",
        description:"",
        file:"",
        resolved: false
       },
    ])

    useEffect(() => {
        setAssignments(JSON.parse(localStorage.getItem('assignment')))
        
    }, [])

    useEffect(() => {
        localStorage.setItem('assignment', JSON.stringify(Assignments));
    })
    const student = JSON.parse(localStorage.getItem('studentInfo'))
    const semail=student?.email
    const addAssignments = (aname, description, Class, file,s_id,email,name,mobile,adress) => {
        setAssignments([...Assignments, {id:uuidv4(),aname, description, Class, file,s_id,email,name,mobile,adress,resolved: false,semail,aprooved:false}])
    }

    const deleteAssignments = (resolved,id) => {
        setAssignments(Assignments.map((Assignment) => Assignment.id === id ? resolved : Assignment))
    }
    const aproovedAssignment= (aprooved,id) => {
        setAssignments(Assignments.map((Assignment) => Assignment.id === id ? aprooved : Assignment))
    }

    const updateAssignments = ( id,updatedAssignment) => {
        console.log("j")
        setAssignments(Assignments.map((Assignment) => Assignment.id === id ? updatedAssignment : Assignment))
    }

    return (
        <AssignmentContext.Provider value={{  aproovedAssignment,addAssignments,updateAssignments,deleteAssignments }}>
            {props.children}
        </AssignmentContext.Provider>
    )
}



export default AssignmentContextProvider;