import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  BridgingFinalized as BridgingFinalizedEvent,
  BridgingInitiated as BridgingInitiatedEvent,
} from "../generated/ERC20Bridge/ERC20Bridge"
import { ERC20 } from "../generated/ERC20Bridge/ERC20"
import {
  Deposit,
  Token,
  User,
  Withdraw,
} from "../generated/schema"

function getOrCreateUser(address: Address): User {
  let user = User.load(address.toHexString());
  if (!user) {
    user = new User(address.toHexString());
    user.save();
  }
  return user;
}

function getOrCreateToken(address: Address): Token {
  let token = Token.load(address.toHexString());
  if (token != null) {
    return token;
  }

  token = new Token(address.toHexString());
  // fetch data doing one time contract calls
  let tokenInstance = ERC20.bind(address);
  let tryName = tokenInstance.try_name();
  if (!tryName.reverted) {
    token.name = tryName.value;
  }
  let trySymbol = tokenInstance.try_symbol();
  if (!trySymbol.reverted) {
    token.symbol = trySymbol.value;
  }
  let tryDecimals = tokenInstance.try_decimals();
  if (!tryDecimals.reverted) {
    token.decimals = tryDecimals.value;
  }

  token.totalDepositAmount = BigInt.fromI32(0);
  token.totalWithdrawAmount = BigInt.fromI32(0);
  token.save();

  return token;
}

export function handleBridgingInitiated(event: BridgingInitiatedEvent): void {
  let depositId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let deposit = new Deposit(depositId);

  let l1Token = getOrCreateToken(event.params.token);

  deposit.sender = getOrCreateUser(event.params.sender).id;
  deposit.receiver =  getOrCreateUser(event.params.recipient).id;
  deposit.l1Token = l1Token.id;
  deposit.tokenAmount = event.params.amount;

  l1Token.totalDepositAmount = l1Token.totalDepositAmount.plus(event.params.amount);
  l1Token.save();
 
  deposit.blockTimestamp = event.block.timestamp;
  deposit.transactionHash = event.transaction.hash.toHexString();
  deposit.blockNumber = event.block.number;
  deposit.save();
}

export function handleBridgingFinalized(event: BridgingFinalizedEvent): void {
  let withdrawId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let withdraw = new Withdraw(withdrawId);

  let l1Token = getOrCreateToken(event.params.nativeToken);

  withdraw.withdrawer = getOrCreateUser(event.params.recipient).id;
  withdraw.l1Token = l1Token.id;
  withdraw.tokenAmount = event.params.amount;

  l1Token.totalWithdrawAmount = l1Token.totalWithdrawAmount.plus(event.params.amount);
  l1Token.save();

  withdraw.blockTimestamp = event.block.timestamp;
  withdraw.transactionHash = event.transaction.hash.toHexString();
  withdraw.blockNumber = event.block.number;
  withdraw.save();
}

