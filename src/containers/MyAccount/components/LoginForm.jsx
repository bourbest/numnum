import React from 'react'
import {Button} from 'reactstrap'

export default function LoginForm (props) {
  const formValues = props.values
  const handleChange = function (event) {
    const newValue = {...formValues}
    newValue[event.target.name] = event.target.value
    props.onChange(newValue)
  }

  return (
    <form>
      <div className="form-group">
        <label>Email</label>
        <input type="email" required className="form-control" name="username" value={formValues.username} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" required className="form-control" name="password" value={formValues.password} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Keep me logged in</label>
        <input type="checkbox" className="form-control" name="keepLoggedIn" value={formValues.keepLoggedIn} onChange={handleChange} />
      </div>

      <div className="text-right mb-4">
        <Button type="button" color="primary" className="mr-2" onClick={() => props.onLogin(formValues)}>Login</Button>
      </div>
    </form>
  )
}
 