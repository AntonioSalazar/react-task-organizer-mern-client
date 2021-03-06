import React, { Fragment, useContext } from 'react';

//dependencies
import { CSSTransition, TransitionGroup } from 'react-transition-group';

//import context
import ProjectContext from '../../Context/Projects/projectContext';
import TaskContext from '../../Context/Tasks/TaskContext';

//Components 
import EachNewTask from './EachNewTask';

const ListNewTasks = () => {

    //obtain the state of the projects
    const projectsContext = useContext(ProjectContext);

    const { selectedProject, deleteCurrentProject } = projectsContext;
   
    //Get the tasks for each project
    const taskContext = useContext(TaskContext)
    const { projectTasks } = taskContext  

    //if there is no selected project
    if(!selectedProject) return <h2 className='listNewTasks__no-project' >Select a project</h2>

    //array destructuring
    const [currentProject] = selectedProject


    return ( 
        <Fragment >
            <h2 className='listNewTasks__title'>Project: {currentProject.name}</h2>
            <ul className='listNewTasks__tasks'>
                {
                    projectTasks.length === 0
                    ? (<li><p>There are no tasks</p></li>)

                    :

                    <TransitionGroup>
                        {
                            projectTasks.map(task => (
                                <CSSTransition
                                    key={task.name}
                                    timeout={200}
                                    classNames='task'
                                >
                                    <EachNewTask
                                        className='listNewTasks__tasks'
                                        task={task}
                                    />
                                </CSSTransition>
                            ))  
                        }                      
                    </TransitionGroup>
                    
                }

                <button 
                    type='button' 
                    className='listNewTasks__deleteProject' 
                    onClick={() => deleteCurrentProject(currentProject._id)}
                >Delete Project &times;</button>

            </ul>
        </Fragment>
     );
}
 
export default ListNewTasks;