import React, {useState, useEffect, Fragment} from "react"
import {useHistory} from 'react-router-dom'

import {NavBar, Instruction, FieldError} from '../components'

import {getPlan, getEmptyPlan, savePlan} from '../../data/plan-svc'
import {validatePlan} from '../../modules/plan/plan-schema'
import {translate} from '../../locales/translate'

export default function CreatePlanPage (props) {

  const [, setHasPlan] = useState(false)
  const [newPlan, setNewPlan] = useState(getEmptyPlan())
  const [errors, setErrors] = useState(null)
  const history = useHistory()

  const handleChange = function (event) {
    const newValue = {...newPlan}
    if (event.target) {
      newValue[event.target.name] = event.target.value
    } else {
      newValue.startDay = event
    }
    setErrors(validatePlan(newValue))
    setNewPlan(newValue)
  }

  const handleSave = function (event) {
    savePlan(newPlan).then( () => history.replace('/plan-meals/'))
  }

  // initial load of recipes
  useEffect( function() {
    getPlan().then(plan => setHasPlan(plan !== null))
  }, [])

  return (
    <Fragment>
      <NavBar
        onBack={() => history.goBack()}
      />

      <Instruction className="mb-2">
        {translate('createPlan.explain')}
      </Instruction>
       
      <div className="container mt-2">
        <label>{translate('createPlan.startDay')}</label>
        <div className="d-flex justify-content-center mb-2">
        </div>
          <form noValidate>
            <div className="form-group">
              <label>{translate('createPlan.duration')}</label>
              <input type="text" inputMode="numeric" pattern="[0-9]"
                className="form-control" name="duration" value={newPlan.duration}
                onChange={handleChange} min="1"
              />
              <FieldError errors={errors} name="duration" />
            </div>
          </form>
          <div className="d-flex justify-content-end w-100">
            <button type="button" className="btn btn-primary" onClick={handleSave} disabled={errors != null}>
              {translate('common.create')}
            </button>
          </div>
      </div>
    </Fragment>
  )
}
