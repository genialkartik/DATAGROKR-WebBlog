import React, { useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import NotiCard from './card'
import HeaderBar from '../includes/header'

function Notify(props) {
  const [redirectUrl, setRedirect] = useState(null)
  let type = new URLSearchParams(props.location.search).get('type')
  console.log(type)

  return (
    <>{(redirectUrl) ?
      <Redirect to={redirectUrl} /> :
      <>
        <div><HeaderBar></HeaderBar>
          {(() => {
            switch (type) {
              case "comments": return <NotiCard react={type} />
              case "likes": return <NotiCard react={type} />
              case "impressions": return <NotiCard react={type} />
              default: return <p>Nothing is Here</p>;
            }
          })()}
        </div>
      </>}
    </>
  )
}

export default withRouter(Notify)

