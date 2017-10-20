import React from 'react';
import {connect} from 'react-redux';
import { postStudent, postNewStudentName, postNewStudentEmail } from '../store'



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
            dispatch(postStudent(name, email, campusId));  
        }
    };
}

const mapStateToProps = (state) =>{
    return {
        campuses : state.campuses,
        newStudentName : state.newStudentName,
        newStudentEmail: state.newStudentEmail
    };
}

const NewStudentEntry = (props) => {
    if(props.campuses) {
    return (
        <div>
            <h1> now let's create a new KID!</h1>
            <form onSubmit={props.handleSubmit} className="add-new-student">
            <label>name</label>
            <input name="name" type="name" className="new-campus-name"
                placeholder="name"
                onChange={props.changeNameField}
                value={props.newStudentName} />
            <label> email </label>
            <input name="email" type="email" className="new-campus-name"
                onChange={props.changeEmailField}
                placeholder="email"
                value={props.newStudentEmail} />
            <label> campus </label>
            <select name="campus">
            {   
                props.campuses.map( campus => {
                  return  <option key={campus.id} value={campus.id}> {campus.name} </option>
                })
            }
            </select>
            <button> add a new student </button>
        </form>

        </div>
    )
} else{
    return <div> </div> 
}
}



export default connect(mapStateToProps, mapDispatchToProps)(NewStudentEntry);