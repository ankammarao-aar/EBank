import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {
  MainContainer,
  LoginCard,
  Image,
  Form,
  Heading,
  IdCard,
  Label,
  Input,
  Button,
  Para,
} from './styledComponents'

class LoginForm extends Component {
  state = {userId: '', userPin: '', showError: false, errorMsg: ''}

  onChangeUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  onChangeUserPin = event => {
    this.setState({
      userPin: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 5})
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showError: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, userPin} = this.state
    const userDetails = {user_id: userId, pin: userPin}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, userPin, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <MainContainer>
        <LoginCard>
          <Image
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />

          <Form onSubmit={this.onSubmitForm}>
            <Heading>Welcome Back!</Heading>
            <IdCard>
              <Label htmlFor="id">User ID</Label>
              <Input
                id="id"
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={this.onChangeUserId}
              />
            </IdCard>

            <IdCard>
              <Label htmlFor="pin">PIN</Label>
              <Input
                id="pin"
                type="password"
                placeholder="Enter PIN"
                value={userPin}
                onChange={this.onChangeUserPin}
              />
            </IdCard>
            <Button type="submit">Login</Button>
            {showError && <Para>{errorMsg}</Para>}
          </Form>
        </LoginCard>
      </MainContainer>
    )
  }
}

export default LoginForm
