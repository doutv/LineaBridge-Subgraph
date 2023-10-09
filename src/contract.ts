import {
  BridgingFinalized as BridgingFinalizedEvent,
  BridgingInitiated as BridgingInitiatedEvent,
  CustomContractSet as CustomContractSetEvent,
  DeploymentConfirmed as DeploymentConfirmedEvent,
  Initialized as InitializedEvent,
  MessageServiceUpdated as MessageServiceUpdatedEvent,
  NewToken as NewTokenEvent,
  NewTokenDeployed as NewTokenDeployedEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  RemoteTokenBridgeSet as RemoteTokenBridgeSetEvent,
  TokenDeployed as TokenDeployedEvent,
  TokenReserved as TokenReservedEvent,
  Unpaused as UnpausedEvent
} from "../generated/Contract/Contract"
import {
  BridgingFinalized,
  BridgingInitiated,
  CustomContractSet,
  DeploymentConfirmed,
  Initialized,
  MessageServiceUpdated,
  NewToken,
  NewTokenDeployed,
  OwnershipTransferStarted,
  OwnershipTransferred,
  Paused,
  RemoteTokenBridgeSet,
  TokenDeployed,
  TokenReserved,
  Unpaused
} from "../generated/schema"

export function handleBridgingFinalized(event: BridgingFinalizedEvent): void {
  let entity = new BridgingFinalized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nativeToken = event.params.nativeToken
  entity.bridgedToken = event.params.bridgedToken
  entity.amount = event.params.amount
  entity.recipient = event.params.recipient

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBridgingInitiated(event: BridgingInitiatedEvent): void {
  let entity = new BridgingInitiated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.recipient = event.params.recipient
  entity.token = event.params.token
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCustomContractSet(event: CustomContractSetEvent): void {
  let entity = new CustomContractSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nativeToken = event.params.nativeToken
  entity.customContract = event.params.customContract
  entity.setBy = event.params.setBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeploymentConfirmed(
  event: DeploymentConfirmedEvent
): void {
  let entity = new DeploymentConfirmed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokens = event.params.tokens
  entity.confirmedBy = event.params.confirmedBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMessageServiceUpdated(
  event: MessageServiceUpdatedEvent
): void {
  let entity = new MessageServiceUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newMessageService = event.params.newMessageService
  entity.oldMessageService = event.params.oldMessageService
  entity.setBy = event.params.setBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewToken(event: NewTokenEvent): void {
  let entity = new NewToken(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewTokenDeployed(event: NewTokenDeployedEvent): void {
  let entity = new NewTokenDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.bridgedToken = event.params.bridgedToken
  entity.nativeToken = event.params.nativeToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRemoteTokenBridgeSet(
  event: RemoteTokenBridgeSetEvent
): void {
  let entity = new RemoteTokenBridgeSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.remoteTokenBridge = event.params.remoteTokenBridge
  entity.setBy = event.params.setBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenDeployed(event: TokenDeployedEvent): void {
  let entity = new TokenDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenReserved(event: TokenReservedEvent): void {
  let entity = new TokenReserved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
