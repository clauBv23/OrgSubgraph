
#!/bin/bash

include .env

deploy:
	forge script script/OrgsManager.s.sol --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY)  -vvvvv --verify --broadcast

test-deploy:
	forge script script/OrgsManager.s.sol --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) -vvvvv --verify