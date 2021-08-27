import {ErrorMessage} from "formik"
import React from "react"

interface Props {
  name: string
}

const ValidationMessage: React.FC<Props> = ({name}) => {
  return (
    <div className={'validation-error'}>
      <ErrorMessage name={name}/>
    </div>
  )
}

export default ValidationMessage