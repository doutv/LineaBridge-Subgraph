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
import { log } from "matchstick-as/assembly/log";


// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

function createMockErc20(address: Address, name: string, symbol: string, decimals: u8): Address {
  // create mock functions for ERC20 contract
  createMockedFunction(address, 'name', 'name():(string)')
    .returns([ethereum.Value.fromString(name)])
  createMockedFunction(address, 'symbol', 'symbol():(string)')
    .returns([ethereum.Value.fromString(symbol)])
  createMockedFunction(address, 'decimals', 'decimals():(uint8)')
    .returns([ethereum.Value.fromI32(decimals)])

  return address
}

test("BridgingFinalized created and stored", () => {
  let tokenName = "Tether USD"
  let tokenSymbol = "USDT"
  let tokenDecimals = 6
  let nativeToken = createMockErc20(
    Address.fromString("0xdac17f958d2ee523a2206206994597c13d831ec7"),
    tokenName,
    tokenSymbol,
    tokenDecimals as u8,
  )

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
  let withdrawId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();

  // Withdraw
  assert.fieldEquals(
    "Withdraw",
    withdrawId,
    "l1Token",
    nativeToken.toHexString(),
  )
  assert.fieldEquals(
    "Withdraw",
    withdrawId,
    "withdrawer",
    recipient.toHexString(),
  )
  assert.fieldEquals(
    "Withdraw",
    withdrawId,
    "tokenAmount",
    amount.toString(),
  )

  assert.fieldEquals(
    "Withdraw",
    withdrawId,
    "blockNumber",
    event.block.number.toString(),
  )
  assert.fieldEquals(
    "Withdraw",
    withdrawId,
    "blockTimestamp",
    event.block.timestamp.toString(),
  )
  assert.fieldEquals(
    "Withdraw",
    withdrawId,
    "transactionHash",
    event.transaction.hash.toHexString(),
  )

  // User
  let user = User.load(recipient.toHexString())!
  assert.i32Equals(1, user.transactionCount);
  assert.stringEquals(
    withdrawId,
    user.withdraw[0],
  )

  // Token
  let token = Token.load(nativeToken.toHexString())!
  assert.stringEquals(tokenName, token.name!)
  assert.stringEquals(tokenSymbol, token.symbol!)
  assert.i32Equals(tokenDecimals, token.decimals!)
  assert.bigIntEquals(BigInt.fromI32(0), token.totalDepositAmount)
  assert.bigIntEquals(amount, token.totalWithdrawAmount)
  
  // More assert options:
  // https://thegraph.com/docs/en/developer/matchstick/#asserts
})

test("BridgingInitiated created and stored", () => {
  let tokenName = "DAI Stablecoin"
  let tokenSymbol = "DAI"
  let tokenDecimals = 18
  let token = createMockErc20(
    Address.fromString("0x6b175474e89094c44da98b954eedeac495271d0f"),
    tokenName,
    tokenSymbol,
    tokenDecimals as u8,
  )
  let amount = BigInt.fromI32(1234)
  let sender = Address.fromString(
    "0x9900000000000000000000000000000000000000"
  )
  let recipient = Address.fromString(
    "0x5500000000000000000000000000000000000000"
  )
  let event = createBridgingInitiatedEvent(
    sender,
    recipient,
    token,
    amount
  )
  handleBridgingInitiated(event)
  let eventId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();

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

  // User
  let user = User.load(sender.toHexString())!
  assert.i32Equals(1, user.transactionCount);
  assert.stringEquals(
    eventId,
    user.sendDeposit[0],
  )
  let receiver = User.load(recipient.toHexString())!
  assert.i32Equals(0, receiver.transactionCount);
  assert.stringEquals(
    eventId,
    receiver.receiveDeposit[0],
  )

  // Token
  let tokenEntity = Token.load(token.toHexString())!
  assert.stringEquals(tokenName, tokenEntity.name!)
  assert.stringEquals(tokenSymbol, tokenEntity.symbol!)
  assert.i32Equals(tokenDecimals, tokenEntity.decimals!)
  
  // More assert options:
  // https://thegraph.com/docs/en/developer/matchstick/#asserts
})