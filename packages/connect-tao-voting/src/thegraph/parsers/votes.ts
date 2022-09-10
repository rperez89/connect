import { QueryResult } from '@rperez89/connect-thegraph'

import Vote from '../../models/Vote'
import { VoteData } from '../../types'

function buildVote(vote: any, connector: any, provider: any): Vote {
  const {
    id,
    voting,
    voteId,
    creator,
    originalCreator,
    context,
    status,
    setting,
    startDate,
    totalPower,
    snapshotBlock,
    yeas,
    nays,
    quietEndingExtensionDuration,
    quietEndingSnapshotSupport,
    script,
    executedAt,
    isAccepted,
  } = vote

  const voteData: VoteData = {
    id,
    votingId: voting.id,
    voteId,
    creator,
    originalCreator,
    context,
    status,
    startDate,
    totalPower,
    snapshotBlock,
    yeas,
    nays,
    quietEndingExtensionDuration,
    quietEndingSnapshotSupport,
    script,
    executedAt,
    isAccepted,
    tokenId: voting.token.id,
    tokenSymbol: voting.token.symbol,
    tokenDecimals: voting.token.decimals,
    settingId: setting.id,
    duration: setting.voteTime,
    minimumAcceptanceQuorumPct: setting.minimumAcceptanceQuorumPct,
    supportRequiredPct: setting.supportRequiredPct,
    delegatedVotingPeriod: setting.delegatedVotingPeriod,
    quietEndingExtension: setting.quietEndingExtension,
    quietEndingPeriod: setting.quietEndingPeriod,
    executionDelay: setting.executionDelay
  }

  return new Vote(voteData, connector, provider)
}

export function parseVote(result: QueryResult, connector: any, provider: any): Vote {
  const vote = result.data.vote

  if (!vote) {
    throw new Error('Unable to parse vote.')
  }

  return buildVote(vote, connector, provider)
}

export function parseVotes(result: QueryResult, connector: any, provider: any): Vote[] {
  const votes = result.data.votes

  if (!votes) {
    throw new Error('Unable to parse votes.')
  }

  return votes.map((vote: any) => buildVote(vote, connector, provider))
}
