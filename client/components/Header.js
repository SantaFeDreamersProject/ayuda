import React from 'react'
import {
  Navbar,
  Nav,
  NavItem,
  MenuItem,
  DropdownButton,
  Grid
} from 'bootstrap'

import { logout } from 'client/actions/session'
import { connect } from 'react-redux'

// import {
//   startSharingCampaign
// } from 'client/actions/campaign'

let Header = React.createClass({

  render() {
    let settingsNode = null;

    let{
      logout,
      authenticated
    } = this.props

    if (authenticated) {

      let cog = (<span className="fa fa-2x fa-gear"/>)

      settingsNode = (
        <DropdownButton title={cog} className="nav-menu-dropdown">
          <MenuItem eventKey="1">Settings</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={2} href="#" onClick={() => logout()}>Logout</MenuItem>
        </DropdownButton>

      )
    }

    let shareNode = null;

    return (

      <header>
        <Grid>
          <div className="pull-left">
            {settingsNode}
          </div>
        </Grid>
      </header>

    )
  }

});

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

export default connect(mapStateToProps, {
  logout
})(Header)
