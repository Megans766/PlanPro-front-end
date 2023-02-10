import { useState, useEffect } from "react"
import * as goalService from "../../services/goalService"
import { useParams } from "react-router-dom"
import TaskList from "../../components/TaskList/TaskList"
import NewTask from "../../components/NewTask/NewTask"
import * as taskService from "../../services/taskService"
import styles from './GoalDetail.module.css'

const GoalDetail = () => {
  const { goalId } = useParams()
  const [goal, setGoal] = useState(null)

  const handleAddTask = async (formData) => {
    formData.goalListId = goalId
    const updatedGoal = await taskService.createTask(formData)
    setGoal(updatedGoal)
  }

  const handleDeleteTask = async (taskId) => {
    const deletedTask = await taskService.deleteTask(taskId)
    setGoal({
      ...goal, tasks: goal.tasks.filter((t) => {
        return deletedTask._id !== t._id
      })
    })
  }

  const handleUpdateTask = async (taskId) => {
    const formData = {
      isComplete: true
    }
    const updatedTask = await taskService.updateTask(taskId, formData)
    setGoal({
      ...goal, tasks: goal.tasks.map((t) => {
        return t._id === updatedTask._id
          ? updatedTask 
          : t
      })
    })
  }

  const handleAddStep = async (taskId, stepData) => {
    const updatedTask =await taskService.createStep(taskId, stepData)
    setGoal({
      ...goal, tasks: goal.tasks.map((t) => {
        return t._id === updatedTask._id
          ? updatedTask 
          : t
      })
    })
  }

  useEffect(() => {
    const fetchGoal = async () => {
      const goalData = await goalService.show(goalId)
      setGoal(goalData)
    }
    fetchGoal()
  }, [goalId])

  if (!goal) return <h1>Loading</h1>

  return (
    <main className={styles.container}>
      <h1>{goal.title}</h1>
      <section>
        <NewTask handleAddTask={handleAddTask} />
        <TaskList 
          tasks={goal.tasks} 
          handleDeleteTask={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
          handleAddStep={handleAddStep}
          />
      </section>
    </main>
  )
}

export default GoalDetail