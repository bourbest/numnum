import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'

// components
import LoginForm from './components/LoginForm'

const defaultLoginInfo = {
  username: '',
  password: '',
  keepLoggedIn: false
}

function LoginPage (props) {
  const [loginInfo, setLoginInfo] = useState(defaultLoginInfo)
  const history = useHistory()

  const login = (data) => {
    history.replace('/')
  }

  return (
    <div className="container">
      <h1>Welcome to Numnum !</h1>
      <LoginForm
        values={loginInfo}
        onChange={setLoginInfo}
        onLogin={login}
      />
      <div>
        Not a member ? <Link to="/create-account">Create an account</Link>
      </div>
    </div>
  )
}

export default LoginPage
