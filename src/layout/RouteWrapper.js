import React from 'react'
import { Route } from 'react-router-dom'

const RouteWrapper = ({
  title,
  component: Component, 
  layout: Layout, 
  ...rest
}) => {
  return (
    <Route {...rest} render={(props) =>
      <Layout {...props} title={title}>
        <Component {...props} />
      </Layout>
    } />
  )
}

export default RouteWrapper
