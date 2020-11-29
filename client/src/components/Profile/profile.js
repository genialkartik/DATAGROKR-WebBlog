import React, { useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import HeaderBar from '../includes/header'
import Blog from '../includes/blog'

function Profile() {
  const [redirectUrl, setRedirect] = useState(null)
  return (
    <>
      {(redirectUrl) ?
        <Redirect to={redirectUrl} /> :
        <>
          <HeaderBar />
          <Blog role='admin' />
        </>
      }
    </>
  )
}

export default withRouter(Profile)
