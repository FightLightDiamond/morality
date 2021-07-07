import React from "react"
import Layout from "../../components/common/layout"

const HomePage = () => {
  return (
    <Layout title={"Welcome to home page!"}>
      <div>
        <a href="/login">Login here</a>
        <a href="/register">Register here</a>
      </div>
    </Layout>
  )
}

export default HomePage