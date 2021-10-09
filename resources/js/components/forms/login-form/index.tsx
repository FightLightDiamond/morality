import { FormikHelpers, Formik, Form } from "formik"
import React from "react"
import { LoginSchema } from "../../../schemas/login.schema"
import ValidationMessage from "../../validation-message/index"
import { useLoginMutation } from "../../../services/auth.service"
import { loginSuccess } from "../../../stores/auth/authSlice"
import { connect, useDispatch, useSelector } from "react-redux"
interface ILoginData {
  email: string,
  password: string,
  token_name: string
}

interface IProps {
  // login(data: ILoginData): void
}

const LoginForm: React.FC<IProps> = () => {
  const dispatch = useDispatch();

  const [
    login, // This is the mutation trigger
    {
      isError,
      isLoading,
      isSuccess,
      isUninitialized,
      status
    }
  ] = useLoginMutation()

  const handleLogin = async (values: ILoginData, formikHelpers: FormikHelpers<any>) => {
    console.log("login data", values)
    const res = await login(values).unwrap()

    if(isSuccess) {
      dispatch(loginSuccess(res))
    }
  }

  return (
    <div>
      <Formik initialValues={{
        email: "pPYwFPVNAq@gmail.com",
        password: "password",
        token_name: "user"
      }}
              onSubmit={handleLogin}
              validationSchema={LoginSchema}
      >
        {
          ({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              {status}
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