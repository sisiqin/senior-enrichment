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
            dispatch(postNewCampus(""));
        }
    };
}

const mapStateToProps = (state) =>{
    return {
        newCampus: state.newCampus
    };
}

const NewCampusEntry = (props) => {
    return (
        <div className="new-campus-container">
        <h3>  Now let's create a new campus!  </h3>                     
            <form onSubmit={props.handleSubmit} className="create-new-campus">
                <label>Name</label>
                <input name="name" type="text"
                    placeholder="Campus Name"
                    onChange={props.handleChange}
                    value={props.newCampus} />              
                    <button className="add-btn"> o </button>
            </form>
        </div>
    )
}







export default connect(mapStateToProps, mapDispatchToProps)(NewCampusEntry);