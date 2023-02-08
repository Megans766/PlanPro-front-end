import StepList from "../StepList/StepList";
import NewStep from "../../pages/NewStep/NewStep";
import styles from './TaskCard.module.css'

const TaskCard = (props) => {

  const { task } = props
  return (
    <main className={styles.container}>
      <article>
        <h3>{task.taskName}</h3>
        <button onClick={() => props.handleDeleteTask(task._id)}>
          Delete Task
        </button>
        {!task.isComplete &&
          <button onClick={() => props.handleUpdateTask(task._id)}>
            Mark Complete
          </button>
        }
        <p>This Task is: {task.isComplete ? 'Complete' : 'Incomplete'}</p>
        <p>Description: {task.note}</p>
        <p>Complete By: {task.date} {task.time}</p>
        <StepList steps={task.steps} />
        <NewStep task={task} handleAddStep={props.handleAddStep} />
      </article>
    </main>
  )
}

export default TaskCard