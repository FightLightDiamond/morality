import React, { useEffect, useState } from "react"
import Layout from "../../../components/common/layout"
import { Inertia } from "@inertiajs/inertia"
import route from "ziggy-js"
import { InertiaLink } from "@inertiajs/inertia-react"

import { ActionMeta, OptionTypeBase, ValueType } from "react-select"
import AsyncCreatableSelect from "react-select/async-creatable"
import IRole from "../../../contracts/IRole"
import IPermission from "../../../contracts/IPermission"

interface Props {
  role: IRole
}

interface ISelectOption extends OptionTypeBase {
}

const defaultTags: ValueType<ISelectOption, true> = [
  { label: "Amitav", value: "Amitav" },
  { label: "x", value: "x" },
  { label: "y", value: "y" }
]

interface IState {
  tags: ValueType<ISelectOption, true>
}

const CreateRolePage: React.FC<Props> = () => {
  const [state, setState] = useState<IState>({
    tags: defaultTags
  })

  const [role, setRole] = useState<IRole>({
    id: 0,
    name: '',
    guard_name: '',
    permissions: [],
    created_at: '',
    updated_at: '',
  })

  useEffect(() => {
    const roleTags = role.permissions.map(({ name: label }) => {
      return { label, value: label }
    })
    setState({ tags: roleTags })
  }, [])

  const handleSave = (event: React.MouseEvent) => {
    event.preventDefault()
    const form = new FormData()

    form.append("id", role.id.toString())
    state.tags.forEach((tag, key) => {
      form.append(`tags[]`, tag.value)
    })

    Inertia.post("/roles", form)
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
              <p>{role.name}</p>
              <div className="mb-3">
                <p>Name:</p>
                <input type="text" className={'form-control'}/>
              </div>
              <div className="mb-3">
                <div>
                  <p>Permission:</p>
                  <AsyncCreatableSelect
                    value={state.tags}
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    defaultOptions={defaultTags}
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
                    ) => setState({ ...state, tags: value })}
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
