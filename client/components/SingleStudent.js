import React from 'react';
import {connect} from 'react-redux';
import store from '../store';
import { updateStudent, postNewStudentName, postNewStudentEmail } from '../store'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeNameField(evt){
            dispatch(postNewStudentName(evt.target.value))
        },
        changeEmailField(evt){
            dispatch(postNewStudentEmail(evt.target.value))
        },
        handleSubmit(evt){
            evt.preventDefault();
            const name = evt.target.name.value;
            const email = evt.target.email.value;
            const campusId = evt.target.campus.value;
            const studentId = ownProps.match.params.studentId;
            dispatch(updateStudent(studentId, name, email, campusId))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        allStudents: state.students,
        allCampuses: state.campuses,
        newStudentName: state.newStudentName,
        newStudentEmail: state.newStudentEmail,
        updatedStudent: state.updatedStudent
    }
}

const SingleStudent = (props) => {
    if(props.allStudents && props.match && props.allStudents.length > 0) {
        const studentId = Number(props.match.params.studentId);
        const getStudent = () =>{
            if(props.updatedStudent.length === 0){
                return props.allStudents.filter(student => student.id === studentId)[0]
            } else{
                return props.updatedStudent
            }
        } 
        let thisStudent = getStudent();
        const rightCampus = props.allCampuses.filter( campus => campus.id === thisStudent.campusId)[0]
        return (
            <div className="single-std-container"> 
            <img src="https://cdn1.iconfinder.com/data/icons/education-1-15/151/1-512.png" />
            <form onSubmit={props.handleSubmit} className="create-new-campus">
                
                    <p className="single-std-p">My name is {thisStudent.name} </p>
                    <input name="name" type="name" className="new-campus-name"
                        onChange={props.changeNameField}
                        value={props.newStudentName || thisStudent.name} />
                    <button className="btn btn-info"> Change name </button>
                    
                    
                    <p className="single-std-p">My email is  {thisStudent.email}</p>
                    <input name="email" type="email" className="new-campus-name"
                        onChange={props.changeEmailField}
                        value={props.newStudentEmail || thisStudent.email} />
                    <button className="btn btn-info"> Change Email </button>
                
                    
                    <p className="single-std-p">I am in {rightCampus.name}</p>
                    <select name="campus" className="form-control">
                        {props.allCampuses.map(campus => {
                            return <option key={campus.id} value={campus.id}> {campus.name} </option>
                        })}
                   </select>
                   <button className="btn btn-info"> Change Campus </button>
               
            </form> 
            </div>
        )
    } else{
        return <div> </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);