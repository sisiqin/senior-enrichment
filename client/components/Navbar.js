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
            <nav>
                <ul className="nav nav-right nav-pills">     
                    <li className="active" role="presentation"> <NavLink to={"/campuses"}> Campuses   </NavLink> </li>
                    <li className="active" role="presentation"> <NavLink to={"/students"}> Students  </NavLink> </li>
                </ul>
            </nav>
        </div>
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Nabar);
