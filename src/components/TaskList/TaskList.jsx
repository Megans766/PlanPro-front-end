import { useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import styles from './TaskList.module.css'

const TaskList = (props) => {

  const [visible, setVisible] = useState(false)
  const handleToggle = () => {
    setVisible(!visible)
  }

  return (
    <main className={styles.container}>
      <div>
        <header>
          <h2>Task List
            <div>
              <button onClick={handleToggle}>
                Show
              </button>
            </div>
          </h2>
        </header>
        {visible &&
          props.tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              handleDeleteTask={props.handleDeleteTask}
              handleUpdateTask={props.handleUpdateTask}
              handleAddStep={props.handleAddStep}
            />
          ))
        }
      </div>
    </main>
  )
}

export default TaskList