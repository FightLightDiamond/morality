import React from "react";
import Layout from "../../../components/common/layout";
import { InertiaLink } from "@inertiajs/inertia-react"
import route from "ziggy-js"
import BookmarkItem from "../item"
import IBookmark from "../../../contracts/IBookmark"

interface Props {
  bookmarks: Array<IBookmark>
}

const BookmarkListPage: React.FC<Props> = ({bookmarks}) => {
  return (
    <Layout title={'Bookmark'}>
      <div>
        <ul className={"list-group"}>
          {
            bookmarks.length > 0 && bookmarks.map((bookmark, index) => {
              return (
                <BookmarkItem key={index} bookmark={bookmark}/>
              )
            })
          }
        </ul>
      </div>
    </Layout>
  )
}

export default BookmarkListPage
