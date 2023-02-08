import { useState, useEffect } from "react";
import * as goalService from "../../services/goalService"
import { useParams } from "react-router-dom";


const NewStep = () => {
  const { taskId } = useParams()
  console.log("TASKID", taskId);
  const [step, setStep] = useState({
    title: ''
  })

  useEffect(() => {
    const fetchStep = async () => {
      const stepData = await goalService.create()
      setStep(stepData)
    }
    fetchStep()
  }, [])

  const handleAddStep = async (data) => {
    const newStep = await goalService.create(data)
    setStep([newStep, ...step])
  }

  const handleChange = (evt) => {
    setStep({...step, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    handleAddStep(step)
  }

  return (
    <section>
      <h4>Add a new Step</h4>
      <form onSubmit={handleSubmit}>
        <label>Step</label>
        <input 
          type='text' 
          name='Step-input' 
          value={step.title} 
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </section>
  )
}

export default NewStep