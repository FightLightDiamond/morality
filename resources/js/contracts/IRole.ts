import IPermission from "./IPermission"

interface IRole {
  id: number | 0
  name: string | ''
  guard_name: string | 'web'
  permissions: Array<IPermission> | []
  created_at: string | null
  updated_at: string | null
}

export default IRole