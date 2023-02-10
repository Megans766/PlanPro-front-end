import { useState } from "react";
import styles from './NewTask.module.css'

const NewTask = (props) => {
  const [form, setForm] = useState({
    note: '',
    taskName: '',
    date: '',
    time: ''
  })

  const [visible, setVisible] = useState(false)

  const handleToggle = () => {
    setVisible(!visible)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const date = new Date(form.date + 'T' + form.time).toLocaleDateString();
    const time = new Date(form.date + 'T' + form.time).toLocaleTimeString(
        undefined,
        {
          hour: '2-digit',
          minute: '2-digit'
        }
    )
    props.handleAddTask({ ...form, date, time });
    setVisible(false)
    setForm({
      note: '',
      taskName: '',
      date: '',
      time: ''
    })
  }

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  return (
    <main className={styles.container}>
      <div>
        <h2>New Task
          <button onClick={handleToggle}>
            Show
          </button>
        </h2>
        {visible &&
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              name='taskName'
              value={form.taskName}
              onChange={handleChange}
              required
            />
            <label>Description:</label>
            <input
              name='note'
              type='text'
              value={form.note}
              onChange={handleChange}
              required
            />
            <label>Date:</label>
            <input
              type='date'
              name='date'
              value={form.date}
              onChange={handleChange}
            />
            <label>Time:</label>
            <input
              type='time'
              name='time'
              value={form.time}
              onChange={handleChange}
            />
            <button type='submit'>Add Task</button>
          </form>
        }
      </div>
    </main>
  )
}

export default NewTask