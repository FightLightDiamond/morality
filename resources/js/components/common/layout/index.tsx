import React from "react"
import Menu from "../nav"

interface Props {
  title?: string
}

const Layout: React.FC<Props> = (props) => {

  const { title, children } = props

  return (
    <React.Fragment>
      <div className={'mb-3'}>
        <Menu />
      </div>

      <div className="container">
        {
          title && <div className={"row"}>
            <div className={"col-sm-12"}>
              <h1>
                {title}
              </h1>
            </div>
          </div>
        }
        {children}
      </div>
    </React.Fragment>
  )
}

export default Layout