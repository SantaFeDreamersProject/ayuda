import React from 'react'
import { connect } from 'react-redux'
import {Grid} from 'bootstrap'
import Header from 'client/components/Header'
import LandingPage from 'client/containers/pages/Landing'
import LoadingIndicator from 'client/components/LoadingIndicator'

const App = ({children, loading}) => (
  <Grid fluid>
    <Header />
    <div className="content">
      {loading ? <LoadingIndicator/> : null}
      {children || <LandingPage />}
    </div>
  </Grid>
)

//export default App

const mapStateToProps = (state) => {
  return {loading: state.loading}
}

export default connect(mapStateToProps, {})(App)
