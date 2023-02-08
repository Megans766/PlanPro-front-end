import * as tokenService from './tokenService'

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/goalLists`

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const show = async (goalId) => {
  try {
    const res = await fetch(`${BASE_URL}/${goalId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const createStep = async (taskId, stepData) => {
  try {
    const res = await fetch(`${BASE_URL}/${taskId}/steps`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stepData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const createGoal = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const deleteGoal = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const updateGoal = async (goalId, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/${goalId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export { 
  index,
  show,
  createStep,
  createGoal,
  deleteGoal,
  updateGoal
}