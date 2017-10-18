import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

//initial State
const initialState = {
    campuses: [],
    newCampus: "",
    students: [],
    selectedStudent: [],
    newStudent: "",
    campusChangeName: ""
}

// action types
const GET_CAMPUSES = "GET_CAMPUSES";
const GET_A_CAMPUS = "GET_A_CAMPUS";
const POST_NEW_CAMPUS = "POST_NEW_CAMPUS";
const UPDATE_A_CAMPUS = "UPDATE_A_CAMPUS";

const GET_STUDENTS = "GET_STUDENTS";
const GET_A_STUDENT = "GET_A_STUDENT";
const POST_NEW_STUDENT = "POST_NEW_STUDENT";
const UPDATE_A_STUDENT = "UPDATE_A_STUDENT";
const DELETE_A_STUDENT = "DELETE_A_STUDENT";


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

export function getStudents (students) { 
    const action = { type: GET_STUDENTS, students };
    return action;
}

export function getAStudent (student) { 
    const action = { type: GET_A_STUDENT, student };
    return action;
}

export function postNewStudent (newStudent) { 
    const action = { type: POST_NEW_STUDENT, newStudent };
    return action;
}

export function updateAStudent (updatedStudent) { 
    const action = { type: UPDATE_A_STUDENT, updatedStudent };
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
            const action = getACampus(updatedCampus);
            dispatch(action);
        })
        .catch(err => console.error('UPDATE campus unsuccessful!!!!!', err))
        
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

export function postStudent(student) {
    return function thunk(dispatch){
        return axios.post('/api/students', student)
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
            console.log("updatedStudent", updatedStudent)
            const action = getAStudent(updatedStudent);
            dispatch(action);
        })
        .catch(err => console.error('UPDATE student unsuccessful!!!!!', err))
        
    }
}

export function deleteStudent(studentId){
    return function thunk(dispatch){
        return axios.delete(`/api/students/${studentId}`)
        .then( () => { 
            const action = deleteAStudent(studentId)
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

        case GET_STUDENTS:
        return Object.assign({}, state, { students: action.students });

        case GET_A_STUDENT:
        return Object.assign({}, state, { students: state.students.concat(action.student) });

        case POST_NEW_STUDENT:
        return Object.assign({}, state, { newStudent: action.newStudent });

        case UPDATE_A_STUDENT:
        return Object.assign({}, state, { students : state.students.map(student => (
            action.updatedStudent.id === student.id ? action.updatedStudent : student))})
        
        case DELETE_A_STUDENT:
        return Object.assign({}, state, { students: state.students.filter( student => student.id !== action.deletedStudentId) })
        
        default:
        return state
    }
}





export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))
