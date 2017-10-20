import React from 'react';
import {connect} from 'react-redux';
import store , {  changeCampus, updateACampus, changeStudent, deleteStudent } from '../store'



const mapDispatchToProps = (dispatch, ownProps) => {
    if(ownProps.match){
        const campusId = ownProps.match.params.campusId;  
        return {
            handleDelete(evt){
                dispatch(deleteStudent(evt.target.value));
            },
            handleSelect (evt){
            const studentId = evt.target.value;
            dispatch(changeStudent(studentId, campusId));
            },
            inputChangeName(evt){
                dispatch(updateACampus(evt.target.value))
            },
            formNameChange(evt){
                evt.preventDefault();
                const newName = evt.target.changeCampusName.value;
                dispatch(changeCampus(newName, campusId));
            }
        }
    } else{
        return {}
    }
};



const mapStateToProps = (state) =>{
    return{ students : state.students, 
            allCampuses: state.campuses,
            selectedStudent: state.selectedStudent,
            newName: state.campusChangeName,
            updatedCampus: state.updatedCampus } 
}


const CampusStudents = (props) => {
    if(props.match && props.allCampuses && props.allCampuses.length > 0 ) {
        const campusId =  Number(props.match.params.campusId)
        const allStudents = props.students;
        const filteredStudents = allStudents.filter(student => student.campusId === campusId);
        const thisCampus = () =>{
            if(props.updatedCampus.length === 0){
             const currentCampus = props.allCampuses.filter(campus => campus.id === campusId)
             return currentCampus[0].name
            } else{
                return props.updatedCampus.name
            }
        }
        
        return (
            <div>
            <span>This is Campus : {thisCampus()}</span>
            <form onSubmit={props.formNameChange}>
                <label> Change Campus Name </label>
                <input name="changeCampusName" onChange={props.inputChangeName}
                        value={props.newName}/>
                        <button> Do it! </button>
            </form>
                <ul className='filteredStudents'>
                    {
                        filteredStudents.map(student => {
                            return (
                            <li key={student.id}>
                                <span>{student.name}</span>
                                <span> &emsp; </span>                        
                                <span>{student.email} </span>
                                <span> &emsp; </span>
                                <button value= {student.id} onClick={props.handleDelete}> x </button>
                            </li>
                            )
                        })
                    }
                    <div> &emsp; </div>
                    <span> Add New Students </span>
                
                    <select onChange={props.handleSelect}> 
                    {
                        allStudents.map( student => {
                            return (
                                <option key={student.id} value={student.id}> {student.name} </option>
                        )})
                    }
                    </select>
                </ul>
            </div>
        )
    } else{
        return <div></div>
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CampusStudents);