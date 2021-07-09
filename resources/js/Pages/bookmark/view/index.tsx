import React, {useEffect, useState} from "react"
import Layout from "../../../components/common/layout";
import { Inertia } from "@inertiajs/inertia"
import route from "ziggy-js"
import { InertiaLink } from "@inertiajs/inertia-react"

import { ActionMeta, OptionTypeBase, ValueType } from "react-select"
import AsyncCreatableSelect from "react-select/async-creatable"
import IBookmark from "../../../contracts/IBookmark"

interface Props {
  bookmark: IBookmark
}

interface ISelectOption extends OptionTypeBase {}

const defaultTags: ValueType<ISelectOption, true> = [
  { label: "Amitav", value: "Amitav" },
  { label: "x", value: "x" },
  { label: "y", value: "y" },
]
interface IState {
  tags: ValueType<ISelectOption, true>
}

const BookmarkViewPage: React.FC<Props> = ({bookmark}) => {
  const [state, setState] = useState<IState>({
    tags: defaultTags
  })

  useEffect(() => {
    const bookmarkTags = bookmark.tags.map(({ name: label }) => {
      return { label, value: label }
    })
    setState({ tags: bookmarkTags })
  }, [])

  const handleSave = (event: React.MouseEvent) => {
    event.preventDefault();
    const form = new FormData();

    form.append('id', bookmark.id.toString())
    state.tags.forEach((tag, key) => {
      form.append(`tags[]`, tag.value)
    })

    if (!bookmark.is_active) {
      Inertia.post("/bookmarks/make-active", form)
    } else {
      Inertia.post(route("bookmark.update"), form)
    }
  }

  return (
    <Layout title={'Bookmark'}>
      <div className={'row'}>
        <div className={'col-md-12'}>
          {
            bookmark.title && (
              <div className={'card'}>
                <div className={'card-header'}>
                  {bookmark.title}
                </div>
                <div className={'card-body'}>
                  <p><InertiaLink href={bookmark.url}>{bookmark.url}</InertiaLink></p>
                  <p>{bookmark.description}</p>
                  <div className={'mb-3'}>
                    <img width={'100%'} src={bookmark.image_url} alt={bookmark.title}/>
                  </div>

                  <div className="mb-3">
                    <div>
                      <p>Tags:</p>
                      <AsyncCreatableSelect
                        value={state.tags}
                        getOptionLabel={({ label }) => label}
                        getOptionValue={({ value }) => value}
                        defaultOptions={defaultTags}
                        loadOptions={value => {
                          return fetch(`/api/tags?tag=${value}`)
                            .then(response => response.json())
                            .then((data: Array<{ name: string }>) => {
                              return data.map(({ name }) => {
                                return { label: name, value: name }
                              })
                            })
                        }}
                        onChange={(
                          value: ValueType<ISelectOption, true>,
                          action: ActionMeta<OptionTypeBase>
                        ) => setState({ ...state, tags: value })}
                        isMulti
                      />
                    </div>
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
