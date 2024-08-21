import React from 'react'
import { Link } from 'react-router-dom'
import Tickets from './support/Tickets'

const HomePageTickets = () => {
  return (
    <div className="homepage-tickets mt-14 p-5 md:px-8">
        <div className="container m-auto 2xl:px-8">
        <div className="homeTickets-head flex justify-between">
                <h2 className='text-2xl md:text-3xl font-bold text-dark-text'>Recent Tickets</h2><Link to="/tickets"><span className='underline text-blue-700 font-bold'>View All</span></Link>
            </div>
             <div className="homeTickets-body">
           <Tickets limit="3"/>
            </div>
        </div>
          </div>
  )
}

export default HomePageTickets