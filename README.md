# LineaBridge Bridge Subgraph
Index ERC20 in & out transactions on the [Linea Bridge](https://bridge.linea.build/)

ERC20Bridge
- Contract used to bridge ERC20 tokens. This contract can store any token.
- [Proxy](https://etherscan.io/address/0x051F1D88f0aF5763fB888eC4378b4D8B29ea3319)
- [Implementation](https://etherscan.io/address/0x6ccfd65b0b14f67259c77ca6267104e058ddb292#code)

## Run & Deploy
```
yarn global add @graphprotocol/graph-cli

yarn
yarn codegen
yarn test
yarn build

graph auth --studio <deploy_key>
graph deploy --studio lineabridge
```
