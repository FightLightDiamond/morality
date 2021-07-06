import React, {useState} from "react"
import Layout from "../../../components/common/layout";
import {Inertia} from "@inertiajs/inertia"

interface Props {
  bookmark: any
}

const BookmarkViewPage: React.FC<Props> = ({bookmark}) => {
  const handleSave = (event: React.MouseEvent) => {
    event.preventDefault();
    Inertia.post('/bookmarks/make-active', {id: bookmark.id})
  }

  return (
    <Layout title={'Bookmark'}>
      <div className={'row'}>
        <h1>view</h1>
        <div className={'col-md-12'}>
          {
            bookmark.title && (
              <div className={'card'}>
                <div className={'card-header'}>
                  {bookmark.title}
                </div>
                <div className={'card-body'}>
                  <p>{bookmark.url}</p>
                  <p>{bookmark.desciption}</p>
                  <div className={'mb-3'}>
                    <img width={'100%'} src={bookmark.image_url} alt={bookmark.title}/>
                  </div>

                  <button className={'btn btn-primary'} onClick={handleSave}>Save</button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  )
}

export default BookmarkViewPage
