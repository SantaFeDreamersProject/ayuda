import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'bootstrap'
import LandingPage from 'client/containers/pages/Landing'
import LoadingIndicator from 'client/components/LoadingIndicator'
import ErrorAlert from 'client/containers/ErrorAlert'

const App = ({children, loading}) => (
  <Grid fluid>
    <div className="content">
      {loading ? <LoadingIndicator/> : null}
      <ErrorAlert />
      {children || <LandingPage />}
    </div>
  </Grid>
)

//export default App

const mapStateToProps = (state) => {
  return {loading: state.loading}
}

export default connect(mapStateToProps, {})(App)
