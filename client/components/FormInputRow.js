import React from 'react'
import { Row, Col, FormControl} from 'bootstrap'

const colProps = {
  xs: 10,
  xsOffset: 1,
  md: 6,
  mdOffset: 3,
  sm: 8,
  smOffset: 2,
  lg: 4,
  lgOffset: 4,
  className: 'text-center'
}

// export default ({label, fieldState }) => {
//   return (
//     <div>
//       <Row>
//         <Col {...colProps} className="text-left">
//           <label>{label}</label>
//         </Col>
//       </Row>
//       <Row>
//         <Col {...colProps} className="text-center">
//           <FormControl type="text" {...fieldState}/>
//           {fieldState.touched && fieldState.error && <div>{fieldState.error}</div>}
//         </Col>
//       </Row>
//     </div>
//   )
// }


export default ({ input, label, type, meta: { touched, error } }) => (
 <div>
   <Row>
     <Col {...colProps} className="text-left">

     <label>{label}</label>
     </Col>
   </Row>
   <Row>
     <Col {...colProps} className="text-center">
       <input className="form-control" {...input} placeholder={label} type={type}/>
       {touched && ((error && <span>{error}</span>))}
     </Col>
   </Row>
 </div>
)
