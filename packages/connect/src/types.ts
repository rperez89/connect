import { Networkish } from '@rperez89/connect-types'
import { IpfsResolver } from '@rperez89/connect-core'
import {
  ConnectorJsonConfig,
  IOrganizationConnector,
} from '@rperez89/connect-core'
import { ConnectorEthereumConfig } from '@rperez89/connect-ethereum'
import { ConnectorTheGraphConfig } from '@rperez89/connect-thegraph'

export type IpfsResolverDeclarationObject = {
  urlTemplate?: string
  cache?: number
}

export type IpfsResolverDeclaration =
  | IpfsResolver
  | IpfsResolverDeclarationObject
  | string

export type ConnectOptions = {
  actAs?: string
  ethereum?: object
  ipfs?: IpfsResolverDeclaration
  network?: Networkish
  verbose?: boolean
}

export type ConnectorDeclaration =
  | IOrganizationConnector
  | ['ethereum', ConnectorEthereumConfig | undefined]
  | ['json', ConnectorJsonConfig | undefined]
  | ['thegraph', ConnectorTheGraphConfig | undefined]
  | [string, any]
  | string
