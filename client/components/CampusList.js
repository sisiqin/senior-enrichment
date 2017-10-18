import React from 'react';
import {connect} from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import CampusStudents from './CampusStudents';
import NewCampusEntry from './NewCampusEntry';
import store , { postCampus, postNewCampus, fetchACampus } from '../store'



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleChange(evt){
            dispatch(postNewCampus(evt.target.value))
        },
        handleSubmit(evt){
            evt.preventDefault();
            const newCampusName = evt.target.name.value;
            dispatch(postCampus(newCampusName));
        }
    }
};

const mapStateToProps = (state, ownProps) =>{
    return {campuses: state.campuses,
            newCampus: state.newCampus,
            ownProps: ownProps};
}

const CampusList = (props) => {
    
    if(props.campuses){
    return (
        <div>
            <form onSubmit={props.handleSubmit} className="create-new-campus">
                <label>name</label>
                <input name="name" type="name" className="new-campus-name"
                    onChange={props.handleChange}
                    value={props.newCampus} />
                <button> create a new campus </button>
            </form>
        <ul>
        {
            props.campuses.map(campus => {
                return(
                    <li key={campus.id}>
                        <NavLink to={`/campuses/${campus.id}`} activeClaaName="active">
                        <span> {campus.name} </span>
                        </NavLink>
                    </li>
                )
            })
        }
        </ul>
            <CampusStudents />
            <NewCampusEntry />
        </div>
    )}
     else {
        return <div></div>
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusList));
