import React from 'react';
import {connect} from 'react-redux';
import CampusList from './CampusList';
import StudentList from './StudentList';
import { NavLink } from 'react-router-dom';




const mapDispatchToProps = (dispatch) => {
    return {};
}

const mapStateToProps = (state) =>{
    return {};
}

const Nabar = (props) => {
    return (
        <div>
            <NavLink to={"/campuses"}> Campuses </NavLink>
            <span> &emsp; </span>
            <NavLink to={"/students"}> Students </NavLink>
        </div>
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Nabar);
