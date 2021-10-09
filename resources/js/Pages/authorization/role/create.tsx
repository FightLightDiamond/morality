import React, { ChangeEvent, useState } from "react"
import Layout from "../../../components/common/layout"
import { Inertia } from "@inertiajs/inertia"

import { ActionMeta, OptionTypeBase, ValueType } from "react-select"
import AsyncCreatableSelect from "react-select/async-creatable"

interface Props {

}

interface ISelectOption extends OptionTypeBase {
}

const defaultPermission: ValueType<ISelectOption, true> = [
  { label: "Amitav", value: "Amitav" },
]

interface IState {
  name: string
  permissions: ValueType<ISelectOption, true>
}

const CreateRolePage: React.FC<Props> = () => {
  const [state, setState] = useState<IState>({
    name: '',
    permissions: defaultPermission
  })

  const handleSave = (event: React.MouseEvent) => {
    event.preventDefault()
    const form = new FormData()

    form.append("name", state.name)
    // form.append("id", role.id.toString())
    state.permissions.forEach((tag, key) => {
      form.append(`permissions[]`, tag.value)
    })

    Inertia.post("/api/roles", form)
  }

  return (
    <Layout title={"Role"}>
      <div className={"row"}>
        <div className={"col-md-12"}>
          <div className={"card"}>
            <div className={"card-header"}>
              Create
            </div>
            <div className={"card-body"}>
              <p>{state.name}</p>
              <p>{JSON.stringify(state)}</p>
              <div className="mb-3">
                <p>Name:</p>
                <input onChange={(e:ChangeEvent<HTMLInputElement>) => {
                  setState({ ...state, name: e.target.value })
                } } type="text" className={'form-control'}/>
              </div>
              <div className="mb-3">
                <div>
                  <p>Permission:</p>
                  <AsyncCreatableSelect
                    value={state.permissions}
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    defaultOptions={defaultPermission}
                    loadOptions={value => {
                      return fetch(`/api/permission-list?name=${value}`)
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
                    ) => setState({ ...state, permissions: value })}
                    isMulti
                  />
                </div>
              </div>

              <button className={"btn btn-primary"} onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateRolePage
