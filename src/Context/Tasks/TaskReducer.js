//Types
import {
    TASKS_PROJECT,
    ADD_NEW_TASK,
    VALIDATE_TASK_FORM,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK
} from '../../types/index'



export default(state, action) => {
    switch(action.type){

        case TASKS_PROJECT:
            return{
                ...state,
                projectTasks: action.payload
            }

        case ADD_NEW_TASK:
            return{
                ...state,
                projectTasks: [ ...state.projectTasks, action.payload],
                errorForm: false
            }
        
        case VALIDATE_TASK_FORM:
            return{
                ...state,
                errorForm : true
            }

        case DELETE_TASK:
            return{
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            }
        case UPDATE_TASK:
            return{
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id? action.payload :task)
            }

        case CURRENT_TASK:
            return{
                ...state,
                selectedTask: action.payload
            }

        case CLEAN_TASK: {
            return{
                ...state,
                selectedTask: null
            }
        }

        default:
            return state
    }
}