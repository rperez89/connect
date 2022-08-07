import { ReactNode } from 'react'
import {
  ConnectOptions,
  ConnectorDeclaration,
  Organization,
} from '@rperez89/connect'
import { SubscriptionResult } from '@rperez89/connect-types'

export type ConnectProps = {
  children: ReactNode
  connector: ConnectorDeclaration
  location: string
  options?: ConnectOptions
}
export type LoadingStatus = {
  error: Error | null
  loading: boolean
  retry: () => void
}
export type ContextValue = {
  org: Organization | null
  orgStatus: LoadingStatus
}

export type UseConnectResult<T> = [T | undefined, LoadingStatus]

export type UseConnectCallback<T> = (
  organization: Organization
) => T | Promise<T> | SubscriptionResult<T> | undefined
