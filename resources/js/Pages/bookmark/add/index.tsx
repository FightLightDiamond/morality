import React, { useState } from "react"
import Layout from "../../../components/common/layout";
import { Inertia } from "@inertiajs/inertia"
import Loader from "../../../components/common/loader";

interface Props {
  bookmarks: Array<any>
}

const BookmarkAddPage: React.FC<Props> = () => {

  const [state, setState] = useState({
    link: "",
    title: "Some hardcoded title",
    showLoader: false
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, [event.currentTarget.name]:event.currentTarget.value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    Inertia.post("/bookmarks/preview", state, {
      onStart: () => {
        setState({...state, showLoader: true})
      },
      onFinish: () => {
        setState({...state, showLoader: false})
      }
    })
  }


  return (
    <Layout title={'Bookmark'}>
      <div>
        {
          state.showLoader ? <Loader/>
            : <form onSubmit={handleSubmit}>
              <div className={'form-group'}>
                <label htmlFor="">Link</label>
                <input type="text" className={'form-control'} name={'link'} onChange={handleChange} />
              </div>
            </form>
        }
      </div>
    </Layout>
  )
}

export default BookmarkAddPage
