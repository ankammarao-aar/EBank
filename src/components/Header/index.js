import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {HeaderContainer, HeaderLogo, Logout} from './styledComponents'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderLogo
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
      </Link>
      <Logout type="button" onClick={onClickLogout}>
        Logout
      </Logout>
    </HeaderContainer>
  )
}

export default withRouter(Header)
