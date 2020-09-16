import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function PrivateRoute({ component: Component, api, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        api.authToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { referer: props.location } }}
          />
        )
      }
    />
  )
}

const mapStateToProps = (state) => ({
  api: state.api
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
