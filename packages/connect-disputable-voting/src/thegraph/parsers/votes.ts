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
    actionId,
    challengeId,
    challenger,
    challengeEndDate,
    disputeId,
    setting,
    startDate,
    totalPower,
    snapshotBlock,
    yeas,
    nays,
    pausedAt,
    pauseDuration,
    quietEndingExtensionDuration,
    quietEndingSnapshotSupport,
    script,
    settledAt,
    disputedAt,
    executedAt,
    isAccepted,
    settlementOffer,
    collateralRequirement,
    submitterArbitratorFee,
    challengerArbitratorFee,
  } = vote

  const voteData: VoteData = {
    id,
    votingId: voting.id,
    voteId,
    creator,
    originalCreator,
    context,
    status,
    actionId,
    challengeId,
    challenger,
    challengeEndDate,
    disputeId,
    startDate,
    totalPower,
    snapshotBlock,
    yeas,
    nays,
    pausedAt,
    pauseDuration,
    quietEndingExtensionDuration,
    quietEndingSnapshotSupport,
    script,
    settledAt,
    disputedAt,
    executedAt,
    isAccepted,
    tokenId: voting.token.id,
    tokenSymbol: voting.token.symbol,
    tokenDecimals: voting.token.decimals,
    settlementOffer,
    collateralRequirementId: collateralRequirement.id,
    collateralTokenId: collateralRequirement.token.id,
    collateralTokenSymbol: collateralRequirement.token.symbol,
    collateralTokenDecimals: collateralRequirement.token.decimals,
    submitterArbitratorFeeId: submitterArbitratorFee ? submitterArbitratorFee.id : null,
    challengerArbitratorFeeId: challengerArbitratorFee ? challengerArbitratorFee.id : null,
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
