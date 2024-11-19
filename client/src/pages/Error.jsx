import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
   <>
   <section id="error-page">
    <div className="content">
        <h2 className="header">404</h2>
        <h4>Sorry!Page not found</h4>
        <p>Opps! It seems like page you're trying to access doesn't exist. If you believe there's an issue,feel free to report it ,and we will look into it</p>
        <div className="btns">
            <NavLink to="/">Return Home</NavLink>
            <NavLink to="/contact">Report Problem</NavLink>
            
        </div>
    </div>
   </section>
   </>
  )
}

export default Error