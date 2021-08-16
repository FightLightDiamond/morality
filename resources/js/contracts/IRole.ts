import IPermission from "./IPermission"

interface IRole {
  id: number | 0
  name?: string
  guard_name?: string
  permissions: Array<IPermission> | []
  created_at?: string
  updated_at?: string
}

export default IRole