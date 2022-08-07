import { ErrorUnexpectedResult } from '@rperez89/connect-core'
import { QueryResult } from '@rperez89/connect-thegraph'
import Token from '../../models/Token'
import { TokenData } from '../../types'

export function parseToken(result: QueryResult): Token {
  const token = result.data.miniMeTokens[0]

  if (!token) {
    throw new ErrorUnexpectedResult('Unable to parse token.')
  }

  return new Token(token as TokenData)
}
