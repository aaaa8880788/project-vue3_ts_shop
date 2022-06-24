import { useStore } from '@/store'

function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  const result = permissions.some((item) => item === verifyPermission)
  return result
}
export { usePermission }
