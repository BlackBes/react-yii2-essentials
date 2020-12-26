import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

/**
 * Modified version of PrivateRoute
 * Allows to access routes by user with one or multiple auth types and valid auth token
 * Redirects to /login on fail
 */
function AuthTypeRoute({component: Component, api, authType, ...rest}) {
  //ToDo: Add "No access" page
  return (
    <Route
      {...rest}
      render={(props) => {
          let resultPage = '';
          if(api.authToken) {
            if(authType === api.authType) {
              resultPage =  <Component {...props} />;
            }
            else if(authType.includes(api.authType)) {
              resultPage =  <Component {...props} />;
            }
            else
            {
              resultPage = <Redirect to={{pathname: '/', state: {referer: props.location}}}/>
            }
          }
          else
          {
            resultPage = <Redirect to={{pathname: '/login', state: {referer: props.location}}}/>
          }
          return resultPage;
        }
      }
    />
  )
}

const mapStateToProps = (state) => ({
  api: state.api
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AuthTypeRoute)
