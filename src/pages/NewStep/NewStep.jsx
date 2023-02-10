import React, { useState } from "react";
import styles from './NewStep.module.css'

const NewStep = (props) => {
  const [step, setStep] = useState({
    title: ""
  });

  const handleChange = (event) => {
    setStep({ ...step, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleAddStep(props.task._id, step)
    setStep({ title: '' })
  };

  return (
    <main className={styles.container}>
      <div>
        <section>
          <form onSubmit={handleSubmit}>
            <h4>Add a new Step</h4>
            <label>Step:</label>
            <input
              type="text"
              name="title"
              value={step.title}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default NewStep;









