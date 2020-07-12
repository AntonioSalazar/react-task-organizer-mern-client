import React, { useContext } from 'react';

//dependencies

//Context
import TaskContext from '../../Context/Tasks/TaskContext';
import ProjectContext from '../../Context/Projects/projectContext';

const EachNewTask = ({task}) => {

    //Obtain functions from the Task Context
    const taskContext = useContext(TaskContext)
    const { deleteTask, getTasks, changeTaskState } = taskContext

    //obtain the state if there is an active project
    const projectsContext = useContext(ProjectContext);
    const { selectedProject } = projectsContext;

    //extract the project
    console.log(selectedProject);
    const [ currentProject ] = selectedProject

    //function that gets executed when a user click on the delete button of a task
    const deleteSelectedTask = id => {
        deleteTask(id);
        getTasks(currentProject.id)
    }

    //function that modifies the state of a task
    const changeState = task => {
        if(task.state){
            task.state = false
        } else {
            task.state = true
        }
        changeTaskState(task)
    }

    return ( 
        <li className='listNewTasks__tasks-li'>
            <p>{task.name}</p>
            <div className='listNewTasks__tasks-state'>
                {task.state
                ?
                    (
                        <button
                            type='button'
                            className='listNewTasks__tasks-state-complete'
                            onClick={() => changeState(task)}
                        >
                            Complete
                        </button>
                    )
                :  

                (
                    <button
                        type='button'
                        className='listNewTasks__tasks-state-incomplete'
                        onClick={() => changeState(task)}
                    >
                        Incomplete
                    </button>
                )
                }
                
            </div>

            <div
                className='listNewTasks__tasks-edit'
            >
                <button
                    type='button'
                    className='listNewTasks__tasks-edit-edit'
                >Edit</button>
                <button
                    type='button'
                    className='listNewTasks__tasks-edit-delete'
                    onClick={()=>deleteSelectedTask(task.id)}
                >Delete</button>
            </div>
        </li>
     );
}
 
export default EachNewTask;