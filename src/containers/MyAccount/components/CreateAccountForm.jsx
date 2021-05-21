import React from 'react'
import {Button} from 'reactstrap'

export default function CreateAccountForm (props) {
  const formValues = props.values
  const handleChange = function (event) {
    const newValue = {...formValues}
    newValue[event.target.name] = event.target.value
    props.onChange(newValue)
  }

  return (
    <form>
      <div className="form-group">
        <label>Email (will act as your username)</label>
        <input type="email" required className="form-control" name="username" value={formValues.username} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" required className="form-control" name="password" value={formValues.password} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Confirm password</label>
        <input type="password" required className="form-control" name="confirm" value={formValues.confirm} onChange={handleChange} />
      </div>

      <div className="text-right mb-4">
        <Button type="button" color="primary" className="mr-2" onClick={() => props.onSave(formValues)}>Create</Button>
        <Button type="button" color="secondary" onClick={props.onCancel}>Cancel</Button>
      </div>
    </form>
  )
}

 