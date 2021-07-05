import React from "react";
import Layout from "../../../components/common/layout";

interface Props {
  bookmarks: Array<any>
}

const BookmarkListPage: React.FC<Props> = ({bookmarks}) => {
  return (
    <Layout title={'Bookmark'}>
      <div>
        <ul className={"list-group"}>
          {
            bookmarks.length > 0 && bookmarks.map((bookmark, index) => {
              return (
                <li className={'list-group-item'} key={index}>
                  <p>Title: {bookmark.title}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
    </Layout>
  )
}

export default BookmarkListPage
