import React from 'react';
import {connect} from 'react-redux';
import NewStudentEntry from './NewStudentEntry';



const mapDispatchToProps = (dispatch) => {
    return {};
}

const mapStateToProps = (state) =>{
    return {};
}

const StudentList = (props) => {
    return (
        <div>
            <NewStudentEntry />
        </div>
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
