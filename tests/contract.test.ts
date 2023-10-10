import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  createMockedFunction
} from "matchstick-as/assembly/index"
import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Token, Deposit, User } from "../generated/schema"
import { handleBridgingFinalized, handleBridgingInitiated } from "../src/ERC20Bridge"
import { createBridgingFinalizedEvent, createBridgingInitiatedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

function createMockErc20(address: Address): Address {
  // create mock function for ERC20 contract
  // name
  // symbol
  // decimals
  createMockedFunction(address, 'name', 'name():(string)')
    .returns([ethereum.Value.fromString('USDT stable coin')])
  createMockedFunction(address, 'symbol', 'symbol():(string)')
    .returns([ethereum.Value.fromString('USDT')])
  createMockedFunction(address, 'decimals', 'decimals():(uint8)')
    .returns([ethereum.Value.fromI32(18)])

  return address
}

test("BridgingFinalized created and stored", () => {
  let nativeToken = createMockErc20(Address.fromString("0xf000000000000000000000000000000000000000"))

  let bridgedToken = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  )
  let amount = BigInt.fromI32(1234)
  let recipient = Address.fromString(
    "0x5100000000000000000000000000000000000000"
  )
  let event = createBridgingFinalizedEvent(
    nativeToken,
    bridgedToken,
    amount,
    recipient
  )
  handleBridgingFinalized(event)
  let eventId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();

  // assert.entityCount("Withdraw", 1)
  // assert.entityCount("User", 1)
  // assert.entityCount("Token", 1)

  assert.fieldEquals(
    "Withdraw",
    eventId,
    "l1Token",
    nativeToken.toHexString(),
  )
  assert.fieldEquals(
    "Withdraw",
    eventId,
    "withdrawer",
    recipient.toHexString(),
  )
  assert.fieldEquals(
    "Withdraw",
    eventId,
    "tokenAmount",
    amount.toString(),
  )

  assert.fieldEquals(
    "Withdraw",
    eventId,
    "blockNumber",
    event.block.number.toString(),
  )
  assert.fieldEquals(
    "Withdraw",
    eventId,
    "blockTimestamp",
    event.block.timestamp.toString(),
  )
  assert.fieldEquals(
    "Withdraw",
    eventId,
    "transactionHash",
    event.transaction.hash.toHexString(),
  )

  // More assert options:
  // https://thegraph.com/docs/en/developer/matchstick/#asserts
})

test("BridgingInitiated created and stored", () => {
  let token = createMockErc20(Address.fromString("0xff00000000000000000000000000000000000000"))

  let amount = BigInt.fromI32(1234)
  let sender = Address.fromString(
    "0x9000000000000000000000000000000000000000"
  )
  let recipient = Address.fromString(
    "0x5000000000000000000000000000000000000000"
  )
  let event = createBridgingInitiatedEvent(
    sender,
    recipient,
    token,
    amount
  )
  handleBridgingInitiated(event)
  let eventId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();

  // assert.entityCount("Deposit", 1)
  // assert.entityCount("User", 2)
  // assert.entityCount("Token", 1)

  assert.fieldEquals(
    "Deposit",
    eventId,
    "l1Token",
    token.toHexString(),
  )
  assert.fieldEquals(
    "Deposit",
    eventId,
    "sender",
    sender.toHexString(),
  )
  assert.fieldEquals(
    "Deposit",
    eventId,
    "receiver",
    recipient.toHexString(),
  )
  assert.fieldEquals(
    "Deposit",
    eventId,
    "tokenAmount",
    amount.toString(),
  )

  assert.fieldEquals(
    "Deposit",
    eventId,
    "blockNumber",
    event.block.number.toString(),
  )
  assert.fieldEquals(
    "Deposit",
    eventId,
    "blockTimestamp",
    event.block.timestamp.toString(),
  )
  assert.fieldEquals(
    "Deposit",
    eventId,
    "transactionHash",
    event.transaction.hash.toHexString(),
  )

  // More assert options:
  // https://thegraph.com/docs/en/developer/matchstick/#asserts
})