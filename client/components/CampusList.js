import React from 'react';
import {connect} from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import CampusStudents from './CampusStudents';
import NewCampusEntry from './NewCampusEntry';
import store , {  deleteCampus  } from '../store'



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleDelete(evt){
            dispatch(deleteCampus(evt.target.value));
        }
    }
};

const mapStateToProps = (state, ownProps) =>{
    return {campuses: state.campuses,
            ownProps: ownProps};
}

const CampusList = (props) => {
    if(props.campuses){
        const keepDefault = () => { campus.id === 1 ? true : false }
    return (
        <div>
        <ul>
        {
            props.campuses.map(campus => {
                return(
                    <li key={campus.id} className="campus-std-list campus-list">
                        <NavLink to={`/campuses/${campus.id}`} >
                            <p> {campus.name}
                            </p>
                            </NavLink>
                            <img src="http://www.orgsync.com/assets/what-is-orgsync/overview/icon-structure-ec2fbc6ec461f1fe4d52f88e4d25226d.png" />
                            <p> <button className="remove-btn" value={campus.id} onClick={props.handleDelete} disabled={ campus.id === 1 }> x </button>  </p>                        
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
