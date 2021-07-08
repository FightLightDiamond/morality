import React from "react"
import { InertiaLink } from "@inertiajs/inertia-react"
import route from "ziggy-js"
import IBookmark from "../../../contracts/IBookmark"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"

interface Props {
  bookmark: IBookmark,
}

const BookmarkItem: React.FC<Props> = ({ bookmark }) => {
  return (
    <li className={"list-group-item"}>
      <div className={"row"}>
        {
          bookmark.image_url !== "" && (
            <div className={"col-md-2"}>
              <InertiaLink href={route("bookmark.view", { bookmark: bookmark.id })}>
                <img src={bookmark.image_url} alt={bookmark.title} width={"100%"} />
              </InertiaLink>
            </div>
          )
        }
        <div className={"col-md-8"}>
          <span>
            <InertiaLink href={route("bookmark.view", { bookmark: bookmark.id })}>
            {bookmark.title}</InertiaLink>
          </span>
          <br />
          <span>{bookmark.description}</span>
          <br/>
          <small><FontAwesomeIcon icon={faEye} /> <span className={'pl-1'}>{bookmark.views}</span></small>
        </div>
        <div className={"col-md-2"}>
          <a target={'_blank'} href={route("bookmark.redirect", { bookmark: bookmark.id })}>
            Visit
          </a>
        </div>
      </div>
    </li>
  )
}

export default BookmarkItem
