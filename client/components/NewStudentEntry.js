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
            // dispatch(postNewStudentName(""));
            // dispatch(postNewStudentEmail(""));
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
        <div className="new-std-container">
            <h3>  Now let's add a new KID!  </h3>         
            <form onSubmit={props.handleSubmit} className="add-new-student">
            <label>Name</label>
            <input name="name" type="name" className="new-campus-name"
                placeholder="name"
                onChange={props.changeNameField}
                value={props.newStudentName} />
                                      
                
            <label> Email </label>
            <input name="email" type="email" className="new-campus-name"
                onChange={props.changeEmailField}
                placeholder="email"
                value={props.newStudentEmail} />
                                      
                
            <label> Campus </label>
            <select name="campus" className="custom-select">
            <option defaultValue="campus">Campus...</option>
            
            {   
                props.campuses.map( campus => {
                  return  <option key={campus.id} value={campus.id}> {campus.name} </option>
                })
            }
            </select>
            <button className="add-btn"> o </button>
        </form>

        </div>
    )
} else{
    return <div> </div> 
}
}



export default connect(mapStateToProps, mapDispatchToProps)(NewStudentEntry);