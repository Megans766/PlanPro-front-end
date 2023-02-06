import { Link } from "react-router-dom"
import styles from './GoalCard.module.css'

import Icon from "../Icon/Icon"
import AuthorInfo from "../AuthorInfo/AuthorInfo"

const GoalCard = ({ goal }) => {
  return (
    <Link to={`/goals/${goal._id}`}>
      <article className={styles.container}>
        <header>
          <span>
            <h1>{goal.title}</h1>
            <Icon category={goal.category} />
          </span>
          <AuthorInfo content={goal} />
        </header>
        <p>{goal.text}</p>
      </article>
    </Link>
  )
}

export default GoalCard