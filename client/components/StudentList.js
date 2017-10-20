import React from 'react';
import {connect} from 'react-redux';
import { NavLink} from 'react-router-dom';
import NewStudentEntry from './NewStudentEntry';
import SingleStudent from './SingleStudent';
import {deleteStudent} from '../store'



const mapDispatchToProps = (dispatch, ownProps) => {
   return {
       handleDelete(evt){
           dispatch(deleteStudent(evt.target.value));
       }
   }
}

const mapStateToProps = (state) =>{
    return {
        allStudents: state.students,
        allCampuses: state.campuses
    };
}


const StudentList = (props) => {
    if(props.allStudents){
        
        return (
            <div>
            <ul>
            { props.allStudents.map( student => {
                const rightCampus = props.allCampuses.filter( campus => campus.id === student.campusId)
                    return (<li key={student.id}>
                        <NavLink to={`/students/${student.id}`}>
                        <span>{student.name}</span>
                        </NavLink>
                        <span> &emsp; </span> 
                        <span>{student.email}</span>
                        <span> &emsp; </span> 
                        <span>campus: {rightCampus[0].name}</span>
                        <button value= {student.id} onClick={props.handleDelete}> x </button>                        
                    </li>)
                })
                
            }
            </ul>
                <SingleStudent />
                <NewStudentEntry />
            </div>
        )

    }else{
        return <div> </div>
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
