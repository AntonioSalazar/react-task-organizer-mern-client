import React, { useReducer }from 'react';

//context
import ProjectContext from './projectContext';
//reducer
import projectReducer from './projectReducer';
//Types
import { FORM_NEW_PROJECT, GET_PROJECTS_SIDEBAR } from '../../types/index';


const ProjectState = props => {
    const projects = [
        {id: 1, name : 'Intranet'},
        {id: 2, name : 'Deployment'},
        {id: 3, name : 'Production'}
    ]
    const initialState = {
        newProjectForm : false,
        projects : []
    }

    //Dispatch
    const [state, dispatch] = useReducer(projectReducer, initialState)

    //CRUD functions


    //function that will show the new project form
    const showNewProjectForm = () => {
        dispatch({
            type: FORM_NEW_PROJECT
        })
    }

    //get the projects
    const getProjectsSideBar = () => {
        dispatch({
            type: GET_PROJECTS_SIDEBAR,
            payload: projects
        })
    }


    return(
        <ProjectContext.Provider
            value={{
                newProjectForm: state.newProjectForm,
                projects: state.projects,
                showNewProjectForm,
                getProjectsSideBar
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState;