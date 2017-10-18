import React from 'react';
import {connect} from 'react-redux';



const mapDispatchToProps = (dispatch) => {
    return {};
}

const mapStateToProps = (state) =>{
    return {};
}

const NewCampusEntry = (props) => {
    return (
        <div>
            <h1> WOW! Everything below campus list is completely connected!</h1>
        </div>
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(NewCampusEntry);