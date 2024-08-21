import React from 'react'
import Header from '../components/common/Header'
import HeroSection from '../components/HeroSection'
import HomePageMain from '../components/HomePageMain'
import HomePageTickets from '../components/HomePageTickets'
import { ServiceState } from '../context/serviceContext'

const Home = () => {

  const { login } = ServiceState();

  console.log('login', login)

  return (
    <>
{/* <Header/> */}
<HeroSection/>
<HomePageMain/>

{login && (
  <HomePageTickets/>
)}
    </>
  )
}

export default Home