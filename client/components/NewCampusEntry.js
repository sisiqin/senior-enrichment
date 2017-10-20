import React from 'react';
import {connect} from 'react-redux';
import store , { postCampus, postNewCampus  } from '../store'


const mapDispatchToProps = (dispatch) => {
    return {
        handleChange(evt){
            dispatch(postNewCampus(evt.target.value))
        },
        handleSubmit(evt){
            evt.preventDefault();
            const newCampusName = evt.target.name.value;
            dispatch(postCampus(newCampusName));
        }
    };
}

const mapStateToProps = (state) =>{
    return {
        newCampus: state.newCampu
    };
}

const NewCampusEntry = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit} className="create-new-campus">
                <label>name</label>
                <input name="name" type="name" className="new-campus-name"
                    onChange={props.handleChange}
                    value={props.newCampus} />
                <button> create a new campus </button>
            </form>
        </div>
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(NewCampusEntry);