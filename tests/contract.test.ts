import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { InToken, OutToken, User } from "../generated/schema"
import { handleBridgingFinalized, handleBridgingInitiated } from "../src/ERC20Bridge"
import { createBridgingFinalizedEvent, createBridgingInitiatedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

test("BridgingFinalized created and stored", () => {
  let nativeToken = Address.fromString(
    "0x0000000000000000000000000000000000000002"
  )
  let bridgedToken = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  )
  let amount = BigInt.fromI32(1234)
  let recipient = Address.fromString(
    "0x5100000000000000000000000000000000000000"
  )
  let newBridgingFinalizedEvent = createBridgingFinalizedEvent(
    nativeToken,
    bridgedToken,
    amount,
    recipient
  )
  handleBridgingFinalized(newBridgingFinalizedEvent)
  let eventId = newBridgingFinalizedEvent.transaction.hash.toString()

  assert.entityCount("OutToken", 1)
  assert.entityCount("User", 1)

  assert.fieldEquals(
    "OutToken",
    eventId,
    "address",
    nativeToken.toHexString(),
  )
  assert.fieldEquals(
    "OutToken",
    eventId,
    "recipient",
    recipient.toHexString(),
  )
  assert.fieldEquals(
    "OutToken",
    eventId,
    "amount",
    amount.toString(),
  )
  assert.fieldEquals(
    "OutToken",
    eventId,
    "blockNumber",
    newBridgingFinalizedEvent.block.number.toString(),
  )
  assert.fieldEquals(
    "OutToken",
    eventId,
    "blockTimestamp",
    newBridgingFinalizedEvent.block.timestamp.toString(),
  )

  // More assert options:
  // https://thegraph.com/docs/en/developer/matchstick/#asserts
})
