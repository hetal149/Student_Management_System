import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';  

export const StudentContext = createContext()

const StudentContextProvider = (props) => {

    const [Students, setStudents] = useState([
        { id:uuidv4(), email: "",
        password: "",
        name:"",
        mobile:"",
        adress:"",
        dob:"",
        Class:""},
    ])

    useEffect(() => {
        setStudents(JSON.parse(localStorage.getItem('students')))
    }, [])

    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(Students));
    })



    // const sortedAssignments = Assignments.sort((a, b) => (a.name < b.name ? -1 : 1));



    const addStudents = (email, password, Class, name,mobile,adress,dob) => {
        setStudents([...Students, {id:uuidv4(), email, password, Class, name,mobile,adress,dob}])
    }

    // const deleteAssignments = (id) => {
    //     setAssignments(Assignments.filter(Assignment => Assignment.id !== id))
    // }

    // const updateAssignments = (id, updatedAssignment) => {
    //     setAssignments(Assignments.map((Assignment) => Assignment.id === id ? updatedAssignment : Assignment))
    // }

    return (
        <StudentContext.Provider value={{  addStudents }}>
            {props.children}
        </StudentContext.Provider>
    )
}

export default StudentContextProvider;