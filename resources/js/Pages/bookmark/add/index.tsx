import React, { useState } from "react"
import Layout from "../../../components/common/layout";
import { Inertia } from "@inertiajs/inertia"

interface Props {
  bookmarks: Array<any>
}

const BookmarkAddPage: React.FC<Props> = () => {

  const [state, setState] = useState({
    link: "",
    title: "Some hardcoded title"
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, [event.currentTarget.name]:event.currentTarget.value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    Inertia.post("/bookmarks/preview", state, {
      onStart: () => {
        console.log('Start ...')
      },
      onFinish: () => {
        console.log('onFinish ...')
      }
    })
  }

  return (
    <Layout title={'Bookmark'}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={'form-group'}>
            <label htmlFor="">Link</label>
            <input type="text" className={'form-control'} name={'link'} onChange={handleChange} />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default BookmarkAddPage
