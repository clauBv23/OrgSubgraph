## Subgraph project

This project provides a step-by-step guide for setting up and working with subgraphs. It consists of three main parts:

Project Root: There is a foundry project containing the contracts used in the tutorial. You'll find Solidity smart contracts that will be indexed by the subgraph, and a couple of scripts for deploying and populating the contracts.

OrgSubgraph: Here, you'll find the subgraph project. This section covers the setup, configuration, and deployment of the subgraph to index data from the Solidity contracts.

JsQueries: Finally, this section includes JavaScript queries that interact with the deployed subgraph. You'll learn how to query data from the subgraph using JavaScript.


### Foundry 
  It is a simple foundry project with all the common foundry functionalities: 

  
**Foundry is a blazingly fast, portable, and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat, and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions, and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

[Documentation](https://book.getfoundry.sh/)

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

### Other
It also has a Makefile with a couple of commands to call scripts 

```shell
$ make deploy
```

```shell
$ make populate
```

```shell
$ make gen-abi
```
 __Note: A `.env` file should be configured to run properly the scripts__

### Subgraph  

 It is a simple subgraph project just run `graph codegen && graph build` to generate and build and after that deploy to you preferred subgraph platform [Alchemy Subgraph](https://docs.alchemy.com/reference/subgraphs-quickstart), [The Graph Studio](https://thegraph.com/docs/en/deploying/subgraph-studio/), or other. 


  ### Javascript Query

  It simply shows how to query the deployed graph via js query. 
  There a couple of queries defined in `src/queries/queries.js` and two scripts to sun the queries via `node-fetch` and `graphclient`
