import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

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
        // resultPage = (api.authToken) ? (
        //     (authType === api.authType) ? (<Component {...props} />)
        //         : (authType.includes(api.authType)) ? (<Component {...props} />)
        //         : (<Redirect
        //             to={{pathname: '/', state: {referer: props.location}}}
        //         />)
        //
        // ) : (
        //     <Redirect
        //         to={{pathname: '/login', state: {referer: props.location}}}
        //     />
        // )

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
