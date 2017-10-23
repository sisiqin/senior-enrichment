import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

//initial State
const initialState = {
    campuses: [],
    newCampus: "",
    students: [],
    updatedCampus: [],
    selectedStudent: [],
    newStudentName: "",
    newStudentEmail: "",
    campusChangeName: "",
    updatedStudent: []


}

// action types
const GET_CAMPUSES = "GET_CAMPUSES";
const GET_A_CAMPUS = "GET_A_CAMPUS";
const POST_NEW_CAMPUS = "POST_NEW_CAMPUS";
const UPDATE_A_CAMPUS = "UPDATE_A_CAMPUS";
const DELETE_A_CAMPUS = "DELETE_A_CAMPUS";
const GET_UPDATED_CAMPUS = "GET_UPDATED_CAMPUS";

const GET_STUDENTS = "GET_STUDENTS";
const GET_A_STUDENT = "GET_A_STUDENT";
const POST_NEW_STUDENT_NAME = "POST_NEW_STUDENT_Name";
const POST_NEW_STUDENT_EMAIL = "POST_NEW_STUDENT_Email";
const UPDATE_A_STUDENT = "UPDATE_A_STUDENT";
const DELETE_A_STUDENT = "DELETE_A_STUDENT";
const GET_UPDATED_STUDENT = "GET_UPDATED_STUDENT";


// ACTION creators

export function getCampuses (campuses) { 
    const action = { type: GET_CAMPUSES, campuses };
    return action;
}

export function getACampus (campus) { 
    const action = { type: GET_A_CAMPUS, campus };
    return action;
}

export function postNewCampus (newCampus) { 
    const action = { type: POST_NEW_CAMPUS, newCampus };
    return action;
}

export function updateACampus (updatedCampus) { 
    const action = { type: UPDATE_A_CAMPUS, updatedCampus };
    return action;
}

export function getUpdatedCampus(updatedCampus){
    const action = {type: GET_UPDATED_CAMPUS, updatedCampus};
    return action;
}

export function deleteACampus (deletedCampusId) {
    const action = {type: DELETE_A_CAMPUS, deletedCampusId };
    return action;
}


export function getStudents (students) { 
    const action = { type: GET_STUDENTS, students };
    return action;
}

export function getAStudent (student) { 
    const action = { type: GET_A_STUDENT, student };
    return action;
}

export function postNewStudentName (newStudentName) { 
    const action = { type: POST_NEW_STUDENT_NAME, newStudentName };
    return action;
}

export function postNewStudentEmail (newStudentEmail) { 
    const action = { type: POST_NEW_STUDENT_EMAIL, newStudentEmail };
    return action;
}

export function updateAStudent (updatedStudent) { 
    const action = { type: UPDATE_A_STUDENT, updatedStudent };
    return action;
}

export function getUpdatedStudent(updatedStudent){
    const action = {type: GET_UPDATED_STUDENT, updatedStudent};
    return action;
}

export function deleteAStudent (deletedStudentId) {
    const action = {type: DELETE_A_STUDENT, deletedStudentId };
    return action;
}

// thunk creators 
export function fetchCampuses() {
    return function thunk (dispatch) {
        return axios.get('/api/campuses')
        .then(res => res.data)
        .then(campuses => {
            const action = getCampuses(campuses);
            dispatch(action);
        })
        .catch(err => console.error('fetch campuses unsuccessful!!!!!', err))
    }
}

export function fetchACampus(campusId) {
    return function thunk (dispatch) {
        return axios.get(`/api/campuses/${campusId}`)
        .then(res => res.data)
        .then(campus => {
            const action = getACampus(campus);
            dispatch(action);
        })
        .catch(err => console.error('fetch ONE SINGLE campus unsuccessful!!!!!', err))
        
    }
}

export function postCampus(campus) {
    return function thunk(dispatch){
        return axios.post('/api/campuses', { name: campus })
        .then(res => res.data)
        .then(newCampus => {
            const action = getACampus(newCampus);
            dispatch(action);
        })
        .catch(err => console.error('POST ONE SINGLE campus unsuccessful!!!!!', err))
        
    }
}


export function changeCampus(name, campusId){
    return function thunk(dispatch){
        return axios.put(`/api/campuses/${campusId}`, {name: name})
        .then(res => res.data)
        .then(updatedCampus => {
            const action = getUpdatedCampus(updatedCampus);
            dispatch(action);
        })
        .catch(err => console.error('UPDATE campus unsuccessful!!!!!', err))
        
    }
}

export function deleteCampus(campusId){
    return function thunk(dispatch){
        return axios.delete(`/api/campuses/${campusId}`)
        .then(res => res.data)
        .then( (campuses) => { 
            const action = getCampuses(campuses)
            dispatch(action)
        })
        .catch(err => console.error('error in delete Campus: ', err))
    }
}

export function fetchStudents() {
    return function thunk (dispatch) {
        return axios.get('/api/students')
        .then(res => res.data)
        .then(students => {
            const action = getStudents(students);
            dispatch(action);
        })
        .catch(err => console.error('fetch students unsuccessful!!!!!', err))
        
    }
}

export function fetchAStudent(studentId) {
    return function thunk (dispatch) {
        return axios.get(`/api/students/${studentId}`)
        .then(res => res.data)
        .then(student => {
            const action = getAStudent(student);
            dispatch(action);
        })
        .catch(err => console.error('fetch ONE SINGLE STUDENT unsuccessful!!!!!', err))
        
    }
}

export function postStudent(name, email, campusId) {
    return function thunk(dispatch){
        return axios.post('/api/students', {name: name, email: email, campusId: campusId})
        .then(res => res.data)
        .then(newStudent => {
            const action =getAStudent(newStudent);
            dispatch(action);
        })
        .catch(err => console.error('POST ONE SINGLE student unsuccessful!!!!!', err))
        
    }
}


export function changeStudent(studentId, campusId){
    return function thunk(dispatch){
        return axios.put(`/api/students/${studentId}`, {campusId : campusId})
        .then(res => res.data)
        .then(updatedStudent => {
            const action = getAStudent(updatedStudent);
            dispatch(action);
        })
        .catch(err => console.error('UPDATE student unsuccessful!!!!!', err))
        
    }
}

export function updateStudent(studentId, name, email, campusId){
    return function thunk(dispatch){
        return axios.put(`/api/students/${studentId}`, {
            name: name,
            email:email,
            campusId : campusId})
        .then(res => res.data)
        .then(updatedStudent => {
            console.log(updatedStudent);
            const action = getUpdatedStudent(updatedStudent);
            dispatch(action);
        })
        .catch(err => console.error('UPDATE student unsuccessful!!!!!', err))
        
    }
}

export function deleteStudent(studentId){
    return function thunk(dispatch){
        return axios.delete(`/api/students/${studentId}`)
        .then(res => res.data)
        .then( (students) => { 
            const action = getStudents(students)
            dispatch(action)
        })
        .catch(err => console.error('error in delete student: ', err))
    }
}

// reducer 
function reducer (state = initialState, action){
    switch(action.type){
        case GET_CAMPUSES: 
        return Object.assign({}, state, { campuses: action.campuses });
        
        case GET_A_CAMPUS:
        return Object.assign({}, state, { campuses: state.campuses.concat(action.campus) });
        
        case POST_NEW_CAMPUS:
        return Object.assign({}, state, { newCampus: action.newCampus });

        case UPDATE_A_CAMPUS:
        return Object.assign({}, state, { campusChangeName:  action.updatedCampus});

        case GET_UPDATED_CAMPUS:
        return Object.assign({}, state, {updatedCampus : action.updatedCampus })

        case DELETE_A_CAMPUS:
        return Object.assign({}, state, { campuses: state.campuses.filter( campus => campus.id !== action.deletedCampusId) })
        
        case GET_STUDENTS:
        return Object.assign({}, state, { students: action.students });

        case GET_A_STUDENT:
        return Object.assign({}, state, { students: state.students.concat(action.student) });

        // case GET_A_STUDENT:
        // return Object.assign({}, state, { students : state.students.map(student => (
        //     action.student.id === student.id ? action.student : student))});

        case POST_NEW_STUDENT_NAME:
        return Object.assign({}, state, { newStudentName: action.newStudentName });

        case POST_NEW_STUDENT_EMAIL:
        return Object.assign({}, state, { newStudentEmail: action.newStudentEmail });
        
        case UPDATE_A_STUDENT:
        return Object.assign({}, state, { students : state.students.map(student => (
            action.updatedStudent.id === student.id ? action.updatedStudent : student))})
        
        case DELETE_A_STUDENT:
        return Object.assign({}, state, { students: state.students.filter( student => student.id !== action.deletedStudentId) })
        
        case GET_UPDATED_STUDENT:
        return Object.assign({}, state, {updatedStudent: action.updatedStudent})


        default:
        return state
    }
}





export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))
