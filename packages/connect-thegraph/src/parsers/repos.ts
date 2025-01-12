import {
  ErrorNotFound,
  ErrorUnexpectedResult,
  Organization,
  Repo,
  RepoData,
} from '@rperez89/connect-core'
import { QueryResult } from '../types'

export async function parseRepo(
  result: QueryResult,
  organization: Organization
): Promise<Repo> {
  const repo = result?.data?.app?.repo

  if (repo === null) {
    throw new ErrorNotFound('No repo found.')
  }

  if (!repo) {
    throw new ErrorUnexpectedResult('Unable to parse repo.')
  }

  const data: RepoData = {
    address: repo?.address,
    artifact: repo?.lastVersion?.artifact,
    contentUri: repo?.lastVersion?.contentUri,
    lastVersion: repo?.lastVersion?.semanticVersion?.replace(/,/g, '.'),
    manifest: repo?.lastVersion?.manifest,
    name: repo?.name,
    registry: repo?.registry?.name,
    registryAddress: repo?.registry?.address,
  }

  return Repo.create(data, organization)
}
