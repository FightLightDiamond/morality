import React, {useState} from "react"
import Layout from "../../components/common/layout"
import {connect} from "react-redux";
import {IAuthState, login} from "../../stores/auth/authSlice";

interface ILoginData {
  email: string,
  password: string
}

interface IProps {
  auth: IAuthState

  login(data: ILoginData): void
}

const HomePage: React.FC<IProps> = ({auth, login}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login({email, password})
  }


  return (
    <Layout title={"Login"}>
      <div>
        {auth.token}
        {
          !auth.token && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password" className="form-control" id="exampleInputPassword1"/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          )
        }
      </div>
    </Layout>
  )
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  }
}

const mapActionToProps = {
  login
}
export default connect(mapStateToProps, mapActionToProps)(HomePage)
