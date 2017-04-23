// import React from 'react'
// import ReactDOM from 'react-dom'
// import { connect } from 'react-redux'
// import { Row, Col, Input, Button } from 'bootstrap'
// import CalloutForm from 'client/containers/CalloutForm'
// //
// // import {
// //   saveCampaign,
// //   addCampaignPhoto,
// //   deleteCampaignPhoto
// //  } from 'client/actions/campaign'
//
// import { ColumnProps } from 'client/constants/Layout'
//
// const colProps = ColumnProps.General
//
// const CampaignEditable = React.createClass({
//
//   render() {
//
//     let {campaign: {amount, name, description}, loading} = this.props;
//
//     if (loading) return <span/>
//     let formColProps = {
//       xs: 12,
//       md: 12,
//       sm: 12,
//       lg: 12,
//       className: 'text-center'
//     }
//
//     return (
//       <div className="campaign-editable">
//
//       <CalloutForm
//         saveButtonText='Save'
//         colProps={formColProps}
//         initialValues={{amount, name, description}}
//         showDescription
//         onSubmit={this._onSubmit}
//         submitting={false}
//         />
//
//       </div>
//     )
//   },
//
//   _onSubmit(fields) {
//
//     let {amount, name, description} = fields
//
//     this.props.saveCallout({amount, name, description});
//
//   }
// });
//
// const mapStateToProps = state => {
//
//   if (!state.campaign) {
//     return {
//       loading: true
//     }
//   }
//
//   let {campaign} = state
//
//   return {
//     campaign
//   };
//
// }
//
//
// export default connect(mapStateToProps, {
//   saveCallout: () => {}
// })(CampaignEditable)
