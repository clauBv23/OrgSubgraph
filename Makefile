
#!/bin/bash

include .env

deploy:
	forge script script/OrgsManager.s.sol --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY)  -vvvvv --verify --broadcast
# ifeq ($(rpc), s)
#     RPC_URL := $(SEPOLIA_RPC_URL)
ifeq ($(rpc), m)
    RPC_URL := $(MUMBAI_RPC_URL)
else
    # Default to SEPOLIA_RPC_URL if no input provided
    RPC_URL := $(SEPOLIA_RPC_URL)
endif

test-deploy:
	forge script script/OrgsManager.s.sol --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY)  -vvvvv --verify
# ifeq ($(rpc), s)
#     RPC_URL := $(SEPOLIA_RPC_URL)
ifeq ($(rpc), m)
    RPC_URL := $(MUMBAI_RPC_URL)
else
    # Default to SEPOLIA_RPC_URL if no input provided
    RPC_URL := $(SEPOLIA_RPC_URL)
endif


# keeping this because --verify not working for mumbay
deploy-mumbay:
	forge script script/OrgsManager.s.sol --rpc-url $(MUMBAI_RPC_URL) --private-key $(PRIVATE_KEY)  -vvvvv --broadcast

test-deploy-mumbay:
	forge script script/OrgsManager.s.sol --rpc-url $(MUMBAI_RPC_URL) --private-key $(PRIVATE_KEY) -vvvvv

gen-abi:
	forge build --silent && jq '.abi' ./out/OrgsManager.sol/OrgsManager.json > ./orgSubgraph/abis/OrgManager.json 