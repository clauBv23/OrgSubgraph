
#!/bin/bash

include .env


ifeq ($(rpc), m)
    RPC_URL := $(MUMBAI_RPC_URL)
else
    # Default to SEPOLIA_RPC_URL if no input provided
    RPC_URL := $(SEPOLIA_RPC_URL)
endif

deploy:
	forge script script/OrgsManager.s.sol --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY)  -vvvvv --verify --broadcast

test-deploy:
	forge script script/OrgsManager.s.sol --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY)  -vvvvv --verify

# keeping this because --verify not working for mumbay
deploy-mumbay:
	forge script script/OrgsManager.s.sol --rpc-url $(MUMBAI_RPC_URL) --private-key $(PRIVATE_KEY)  -vvvvv --broadcast

test-deploy-mumbay:
	forge script script/OrgsManager.s.sol --rpc-url $(MUMBAI_RPC_URL) --private-key $(PRIVATE_KEY) -vvvvv

gen-abi:
	forge build --silent && jq '.abi' ./out/OrgsManager.sol/OrgsManager.json > ./orgSubgraph/abis/OrgManager.json 

test-populate:
	forge script script/PopulateOrgsManager.s.sol --sig "run(address)" $(add) --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY)  -vvvvvvv

populate:
	forge script script/PopulateOrgsManager.s.sol --sig "run(address)" $(add) --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY)  -vvvvvvv --broadcast

test-leave:
	forge script script/PopulateOrgsManager.s.sol --sig "leave(address)" $(add) --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY)  -vvvvvvv

leave:
	forge script script/PopulateOrgsManager.s.sol --sig "leave(address)" $(add) --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY)  -vvvvvvv --broadcast