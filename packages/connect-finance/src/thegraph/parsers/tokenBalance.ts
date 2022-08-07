import { ErrorUnexpectedResult } from '@rperez89/connect-core'
import { QueryResult } from '@rperez89/connect-thegraph'
import TokenBalance from '../../models/TokenBalance'

export function parseTokenBalance(result: QueryResult): TokenBalance {
  const tokenBalance = result.data.tokenBalances[0]

  if (!tokenBalance) {
    throw new ErrorUnexpectedResult('Unable to parse TokenBalance.')
  }

  return new TokenBalance(tokenBalance)
}
