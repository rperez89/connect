import { QueryResult } from '@rperez89/connect-thegraph'

import ArbitratorFee from '../../models/ArbitratorFee'

export function parseArbitratorFee(
  result: QueryResult,
  connector: any
): ArbitratorFee | null {
  const arbitratorFee = result.data.arbitratorFee

  if (!arbitratorFee) {
    return null
  }

  return new ArbitratorFee(
    {
      id: arbitratorFee.id,
      voteId: arbitratorFee.vote.id,
      tokenId: arbitratorFee.token.id,
      tokenSymbol: arbitratorFee.token.symbol,
      tokenDecimals: arbitratorFee.token.decimals,
      amount: arbitratorFee.amount
    },
    connector
  )
}
