import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators as AccountActions } from '../../modules/accounts/actions'
import { ActionCreators as AuthenticationActions } from '../../modules/authentication/actions'

// components
import CreateAccountForm from './components/CreateAccountForm'

const defaultAccountInfo = {
  username: '',
  password: '',
  confirm: ''
}

const mapDispatchToProps = (dispatch) => {
  return {
    accountActions: bindActionCreators(AccountActions, dispatch),
    authActions: bindActionCreators(AuthenticationActions, dispatch)
  }
}

function CreateAccountPage (props) {
  const [accountInfo, setAccountInfo] = useState(defaultAccountInfo)
  const history = useHistory()

  const save = (data) => {
    props.accountActions.createAccount(data, () => {
      props.authActions.loginUser(accountInfo.username, accountInfo.password, false, function () {
        history.replace('/home')
      })
    })
  }

  return (
    <div className="container">
      <h1>Create account</h1>
      <CreateAccountForm
        values={accountInfo}
        onChange={setAccountInfo}
        onCancel={history.goBack}
        onSave={save}
      />

    </div>
  )
}

const mapStateToProps = (state) => {
  const props = {
  }
  return props
}

const ConnectedCreateAccountPage = connect(mapStateToProps, mapDispatchToProps)(CreateAccountPage)

export default ConnectedCreateAccountPage
