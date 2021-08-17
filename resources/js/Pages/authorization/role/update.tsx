import React, { ChangeEvent, useEffect, useState } from "react"
import Layout from "../../../components/common/layout"
import { Inertia } from "@inertiajs/inertia"

import { ActionMeta, OptionTypeBase, ValueType } from "react-select"
import AsyncCreatableSelect from "react-select/async-creatable"
import IRole from "../../../contracts/IRole"

interface Props {
  role: IRole
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

const CreateRolePage: React.FC<Props> = ({role}) => {
  const [state, setState] = useState<IState>({
    name: '',
    permissions: defaultPermission
  })

  useEffect(() => {
    const roleTags = role.permissions.map(({ name: label }) => {
      return { label, value: label }
    })
    setState({ ...state, name: role.name, permissions: roleTags })
  }, [])

  const handleSave = (event: React.MouseEvent) => {
    event.preventDefault()
    const form = new FormData()

    form.append("name", state.name)
    state.permissions.forEach((tag, key) => {
      form.append(`permissions[]`, tag.value)
    })

    Inertia.put(`/api/roles/${role.id}`, form)
  }

  const handleName = (e:ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, name: e.target.value })
  }

  return (
    <Layout title={"Role"}>
      <div className={"row"}>
        <div className={"col-md-12"}>
          <div className={"card"}>
            <div className={"card-header"}>
              Update
            </div>
            <div className={"card-body"}>
              <p>{state.name}</p>
              <p>{JSON.stringify(state)}</p>
              <div className="mb-3">
                <p>Name:</p>
                <input value={state.name}
                  onChange={handleName} type="text" className={'form-control'}/>
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
