import  {TOKEN_STORAGE_KEY, USER_STORAGE_KEY} from "../../../../const/key.const"
import { Component } from "react"
import cookies from 'next-cookies';


export function ProtectedRoute(WrapperComponent: any) {
  return class extends Component {
    static async getInitialProps(ctx: any) {
      const token = cookies(ctx)[TOKEN_STORAGE_KEY];
      // const role = cookies(ctx)[USER_ROLE_KEY];
      if (!token) {
        // const route = '/login?dest=' + ctx.asPath;
        const route = '/login';
        if (ctx.res) {
          ctx.res.writeHead(302, { Location: route });
          ctx.res.end();
        }
      }
      // AuthService.checkIfAdminRoute(ctx, role);
      const initialProps = {
        token,
        // role,
        userName: cookies(ctx)[USER_STORAGE_KEY],
        query: ctx.query,
        asPath: ctx.asPath,
      };

      if (WrapperComponent.getInitialProps) {
        return WrapperComponent.getInitialProps(initialProps);
      }

      return initialProps;
    }
    // render() {
    //   const { ...propsWithoutAuth } = this.props
    //   // return (<WrapperComponent {...propsWithoutAuth} />)
    // }
  };
}