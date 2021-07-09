import React, {SyntheticEvent, useState} from "react"
import Layout from "../../../components/common/layout";
import { Inertia } from "@inertiajs/inertia"
import Loader from "../../../components/common/loader";
import {OptionTypeBase, ValueType, ActionMeta} from "react-select"
import AsyncCreatableSelect from "react-select/async-creatable";

interface Props {
  bookmarks: Array<any>
}

interface ISelectOption extends OptionTypeBase {}

interface IState {
  link: string,
  title: string,
  showLoader: boolean,
  inputValue: string,
  tags: ValueType<ISelectOption, true>
}

const defaultOptions: ValueType<ISelectOption, true> = [
  {label: "code", value: 'code'},
  {label: "morality", value: 'morality'},
  {label: "git", value: 'git'},
  {label: "navigate", value: 'navigate'},
]

const BookmarkAddPage: React.FC<Props> = () => {

  const [state, setState] = useState<IState>({
    link: "",
    title: "Some hardcoded title",
    showLoader: false,
    inputValue: '',
    tags: defaultOptions
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

  const handleTagChange = () => {

  }

  const createOption = (label: string) => ({
    label,
    value: label,
  });

  // const handleKeyDown = (event: SyntheticEvent<HTMLElement>) => {
  //   const { inputValue, tags } = state;
  //   if (!inputValue) return;
  //   switch (event.key) {
  //     case 'Enter':
  //     case 'Tab':
  //       console.group('Value Added');
  //       console.log(tags);
  //       console.groupEnd();
  //       setState({
  //         ...state,
  //         inputValue: '',
  //         tags: [...tags, createOption(inputValue)],
  //       });
  //       event.preventDefault();
  //   }
  // };

  return (
    <Layout title={'Bookmark'}>
      <div>
        {
          state.showLoader ? <Loader/>
            : <form onSubmit={handleSubmit}>
              <div className={'form-group'}>
                <label htmlFor="">Link</label>
                <input type="text" className={'form-control'} name={'link'}
                       placeholder={'Enter your link here'}
                       onChange={handleChange} />
              </div>
              <div>
                <p>Tag: {JSON.stringify(state.tags)}</p>
                <AsyncCreatableSelect
                  // value={state.tags}
                  getOptionLabel={e => e.label}
                  getOptionValue={e => e.value}
                  defaultOptions={defaultOptions}
                  loadOptions={value => {
                    return fetch(`/api/tags?tag=${value}`)
                      .then(response => response.json())
                      .then(data => {
                        return data.map((tag: {name: string}) => {
                          return {label: tag.name, value: tag.name}
                        })
                      })
                  }}
                  onChange={(
                    value: ValueType<ISelectOption, true>,
                    action: ActionMeta<OptionTypeBase>
                  ) => {
                    setState({...state, tags: value})
                  }}
                  // onKeyDown={handleKeyDown}
                  isMulti={true}
                />
              </div>
            </form>
        }
      </div>
    </Layout>
  )
}

export default BookmarkAddPage
