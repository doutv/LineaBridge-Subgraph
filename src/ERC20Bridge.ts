import {
  BridgingFinalized as BridgingFinalizedEvent,
  BridgingInitiated as BridgingInitiatedEvent,
} from "../generated/ERC20Bridge/ERC20Bridge"
import {
  InToken,
  OutToken,
  User,
} from "../generated/schema"

export function handleBridgingInitiated(event: BridgingInitiatedEvent): void {
  let inToken = new InToken(event.transaction.hash.toString());

  inToken.sender = event.params.sender.toHexString();
  inToken.recipient = event.params.recipient.toHexString();
  inToken.address = event.params.token.toHexString();
  inToken.amount = event.params.amount;

  inToken.blockNumber = event.block.number;
  inToken.blockTimestamp = event.block.timestamp;
  inToken.transactionHash = event.transaction.hash;

  inToken.save();

  let recipient = User.load(event.params.recipient.toHexString());
  if (!recipient) {
    recipient = new User(event.params.recipient.toHexString());
    recipient.save()
  }

  let sender = User.load(event.params.sender.toHexString());
  if (!sender) {
    sender = new User(event.params.sender.toHexString());
    sender.save()
  }
}

export function handleBridgingFinalized(event: BridgingFinalizedEvent): void {
  let outToken = new OutToken(event.transaction.hash.toString());

  outToken.recipient = event.params.recipient.toHexString();
  outToken.address = event.params.nativeToken.toHexString();
  outToken.amount = event.params.amount;

  outToken.blockNumber = event.block.number;
  outToken.blockTimestamp = event.block.timestamp;
  outToken.transactionHash = event.transaction.hash;

  outToken.save();

  let recipient = User.load(event.params.recipient.toHexString());
  if (!recipient) {
    recipient = new User(event.params.recipient.toHexString());
    recipient.save()
  }
}

