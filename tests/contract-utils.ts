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
} from "../generated/ERC20Bridge/ERC20Bridge"

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
