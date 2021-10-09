import * as Yup from 'yup'

const MIN_PASSWORD = 6

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('This field is required')
    .email('Should be a valid email'),
  password: Yup.string()
    .required('This field is required')
    .min(MIN_PASSWORD, `Should be at least ${MIN_PASSWORD} characters`)
})