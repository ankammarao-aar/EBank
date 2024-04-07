import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'

import {HomeContainer, Card, Heading, Image} from './styledComponents'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <HomeContainer>
      <Header />
      <Card>
        <Heading>Your Flexibility, Our Excellence</Heading>
        <Image
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </Card>
    </HomeContainer>
  )
}

export default Home
