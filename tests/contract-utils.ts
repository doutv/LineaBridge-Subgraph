import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/Contract/Contract"

export function createBridgingFinalizedEvent(
  nativeToken: Address,
  bridgedToken: Address,
  amount: BigInt,
  recipient: Address
): BridgingFinalized {
  let bridgingFinalizedEvent = changetype<BridgingFinalized>(newMockEvent())

  bridgingFinalizedEvent.parameters = new Array()

  bridgingFinalizedEvent.parameters.push(
    new ethereum.EventParam(
      "nativeToken",
      ethereum.Value.fromAddress(nativeToken)
    )
  )
  bridgingFinalizedEvent.parameters.push(
    new ethereum.EventParam(
      "bridgedToken",
      ethereum.Value.fromAddress(bridgedToken)
    )
  )
  bridgingFinalizedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  bridgingFinalizedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )

  return bridgingFinalizedEvent
}

export function createBridgingInitiatedEvent(
  sender: Address,
  recipient: Address,
  token: Address,
  amount: BigInt
): BridgingInitiated {
  let bridgingInitiatedEvent = changetype<BridgingInitiated>(newMockEvent())

  bridgingInitiatedEvent.parameters = new Array()

  bridgingInitiatedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  bridgingInitiatedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  bridgingInitiatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  bridgingInitiatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return bridgingInitiatedEvent
}

export function createCustomContractSetEvent(
  nativeToken: Address,
  customContract: Address,
  setBy: Address
): CustomContractSet {
  let customContractSetEvent = changetype<CustomContractSet>(newMockEvent())

  customContractSetEvent.parameters = new Array()

  customContractSetEvent.parameters.push(
    new ethereum.EventParam(
      "nativeToken",
      ethereum.Value.fromAddress(nativeToken)
    )
  )
  customContractSetEvent.parameters.push(
    new ethereum.EventParam(
      "customContract",
      ethereum.Value.fromAddress(customContract)
    )
  )
  customContractSetEvent.parameters.push(
    new ethereum.EventParam("setBy", ethereum.Value.fromAddress(setBy))
  )

  return customContractSetEvent
}

export function createDeploymentConfirmedEvent(
  tokens: Array<Address>,
  confirmedBy: Address
): DeploymentConfirmed {
  let deploymentConfirmedEvent = changetype<DeploymentConfirmed>(newMockEvent())

  deploymentConfirmedEvent.parameters = new Array()

  deploymentConfirmedEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromAddressArray(tokens))
  )
  deploymentConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "confirmedBy",
      ethereum.Value.fromAddress(confirmedBy)
    )
  )

  return deploymentConfirmedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createMessageServiceUpdatedEvent(
  newMessageService: Address,
  oldMessageService: Address,
  setBy: Address
): MessageServiceUpdated {
  let messageServiceUpdatedEvent = changetype<MessageServiceUpdated>(
    newMockEvent()
  )

  messageServiceUpdatedEvent.parameters = new Array()

  messageServiceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newMessageService",
      ethereum.Value.fromAddress(newMessageService)
    )
  )
  messageServiceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldMessageService",
      ethereum.Value.fromAddress(oldMessageService)
    )
  )
  messageServiceUpdatedEvent.parameters.push(
    new ethereum.EventParam("setBy", ethereum.Value.fromAddress(setBy))
  )

  return messageServiceUpdatedEvent
}

export function createNewTokenEvent(token: Address): NewToken {
  let newTokenEvent = changetype<NewToken>(newMockEvent())

  newTokenEvent.parameters = new Array()

  newTokenEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return newTokenEvent
}

export function createNewTokenDeployedEvent(
  bridgedToken: Address,
  nativeToken: Address
): NewTokenDeployed {
  let newTokenDeployedEvent = changetype<NewTokenDeployed>(newMockEvent())

  newTokenDeployedEvent.parameters = new Array()

  newTokenDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "bridgedToken",
      ethereum.Value.fromAddress(bridgedToken)
    )
  )
  newTokenDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "nativeToken",
      ethereum.Value.fromAddress(nativeToken)
    )
  )

  return newTokenDeployedEvent
}

export function createOwnershipTransferStartedEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferStarted {
  let ownershipTransferStartedEvent = changetype<OwnershipTransferStarted>(
    newMockEvent()
  )

  ownershipTransferStartedEvent.parameters = new Array()

  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferStartedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createRemoteTokenBridgeSetEvent(
  remoteTokenBridge: Address,
  setBy: Address
): RemoteTokenBridgeSet {
  let remoteTokenBridgeSetEvent = changetype<RemoteTokenBridgeSet>(
    newMockEvent()
  )

  remoteTokenBridgeSetEvent.parameters = new Array()

  remoteTokenBridgeSetEvent.parameters.push(
    new ethereum.EventParam(
      "remoteTokenBridge",
      ethereum.Value.fromAddress(remoteTokenBridge)
    )
  )
  remoteTokenBridgeSetEvent.parameters.push(
    new ethereum.EventParam("setBy", ethereum.Value.fromAddress(setBy))
  )

  return remoteTokenBridgeSetEvent
}

export function createTokenDeployedEvent(token: Address): TokenDeployed {
  let tokenDeployedEvent = changetype<TokenDeployed>(newMockEvent())

  tokenDeployedEvent.parameters = new Array()

  tokenDeployedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return tokenDeployedEvent
}

export function createTokenReservedEvent(token: Address): TokenReserved {
  let tokenReservedEvent = changetype<TokenReserved>(newMockEvent())

  tokenReservedEvent.parameters = new Array()

  tokenReservedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return tokenReservedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
