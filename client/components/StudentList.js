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
            <div className="std-list-container">
            <ul>
            { props.allStudents.map( student => {
                const rightCampus = props.allCampuses.filter( campus => campus.id === student.campusId)
                    return (
                        <li key={student.id} className="campus-std-list campus-list">
                        <img src="https://cdn1.iconfinder.com/data/icons/education-1-15/151/1-512.png" />
                        <NavLink to={`/students/${student.id}`}>
                        <p>{student.name}</p>
                        </NavLink>                   
                        <p>{student.email}</p>                        
                        <p>campus: {rightCampus[0].name}</p>
                        <button className="remove-btn" value= {student.id} onClick={props.handleDelete}> x </button>                        
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
