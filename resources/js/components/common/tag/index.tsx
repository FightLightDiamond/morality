import React, {useState} from "react"
import {OptionTypeBase, ValueType, ActionMeta} from "react-select"
import AsyncCreatableSelect from "react-select/async-creatable";

interface Props {
  bookmarks: Array<any>
}

interface ISelectOption extends OptionTypeBase {
}

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
    setState({...state, [event.currentTarget.name]: event.currentTarget.value})
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
    <div>
      <p>Tag: {JSON.stringify(state.tags)}</p>
      <AsyncCreatableSelect
        // value={state.tags}
        getOptionLabel={({label}) => label}
        getOptionValue={({value}) => value}
        defaultOptions={defaultOptions}
        loadOptions={value => {
          return fetch(`/api/tags?tag=${value}`)
            .then(response => response.json())
            .then((data: Array<{ name: string }>) => {
              return data.map(({name}) => {
                return {label: name, value: name}
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
  )
}

export default BookmarkAddPage
