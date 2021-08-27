import { FormikHelpers, Formik, Form } from "formik"
import React from "react"
import { LoginSchema } from "../../../schemas/login.schema"
import ValidationMessage from "../../validation-message/index"

interface ILoginData {
  email: string,
  password: string
}

interface IProps {
  login(data: ILoginData): void
}

const LoginForm: React.FC<IProps> = ({login}) => {
  const handleLogin = (values: ILoginData, formikHelpers: FormikHelpers<any>) => {
    console.log(values)
    login(values)
  }

  return (
    <div>
      <Formik initialValues={{
        email: "",
        password: ""
      }}
              onSubmit={handleLogin}
              validationSchema={LoginSchema}
      >
        {
          ({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  name={"email"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <ValidationMessage name={"email"} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  name={"password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password" className="form-control" id="exampleInputPassword1" />
                <ValidationMessage name={"password"} />
              </div>
              <div className={"mb-3"}>
                <div className={"me-3"}>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <a href="#">Forgot password</a>
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default LoginForm