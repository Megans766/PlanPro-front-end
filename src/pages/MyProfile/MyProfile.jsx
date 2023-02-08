import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import * as goalService from '../../services/goalService'
import * as profileService from '../../services/profileService'
import styles from './MyProfile.module.css'

const MyProfile = (props) => {
  const [profile, setProfile] = useState(null)

  const [title, setTitle] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.getProfile()
      console.log('profile data', profileData);
      setProfile(profileData)
    }
    fetchProfile()
  }, [])

  const handleAddGoalList = async (e) => {
    e.preventDefault()
    const formData={title:title}
    const newGoalList = await goalService.createGoal(formData)
    setProfile({...profile,goals:[...profile.goals,newGoalList]})
    setTitle('')
  }

  const handleChange = ({ target }) => {
    setTitle(target.value)
  }

  const handleDeleteGoal = async (goalId) => {
    const deletedGoal = await goalService.deleteGoal(goalId)
    setProfile({
      ...profile, goals: profile.goals.filter((g) => {
        return deletedGoal._id !== g._id
      })
    })
  }

  const handleUpdateGoal = async (goalId) => {
    const formData = {
      isComplete: true
    }
    const updatedGoal = await goalService.updateGoal(goalId, formData)
    console.log("UPDATED GOAL", updatedGoal);
    setProfile({
      ...profile, goals: profile.goals.map((g) => {
        return g._id === updatedGoal._id
          ? updatedGoal
          : g
      })
    })
  }

  if (!profile) return <p>Please Log In or Sign Up!</p>

  return (
    <main className={styles.container}>
      <section>
        <img src={profile.photo} alt="" />
        <h1>Welcome, {profile.name}</h1>
        <form
          onSubmit={handleAddGoalList}
          className={styles.form}
        >
          <h3>
            Create A Goal List
          </h3>
          <input
            name="title"
            type="text"
            value={title}
            onChange={handleChange}
          />
          <button> submit </button>

        </form>
        <ul>
          <h2>
            My Goal Lists
          </h2 >
          {profile.goals.map(goal => (
            <li key={goal._id}>
              <Link to={`/goalLists/${goal._id}`}>
                {goal.title}
              </Link>
              {!profile.goals.isComplete &&
              <button onClick={() => handleUpdateGoal(goal._id)}>
                Mark Complete
              </button>
              }
              <button onClick={() => handleDeleteGoal(goal._id)}>
                Delete Goal
              </button>
            </li>
          ))}

        </ul>
      </section >
    </main >
  )
}

export default MyProfile