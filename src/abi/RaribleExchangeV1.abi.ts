export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_transferProxy"
            },
            {
                "type": "address",
                "name": "_transferProxyForDeprecated"
            },
            {
                "type": "address",
                "name": "_erc20TransferProxy"
            },
            {
                "type": "address",
                "name": "_state"
            },
            {
                "type": "address",
                "name": "_ordersHolder"
            },
            {
                "type": "address",
                "name": "_beneficiary"
            },
            {
                "type": "address",
                "name": "_buyerFeeSigner"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Buy",
        "inputs": [
            {
                "type": "address",
                "name": "sellToken",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "sellTokenId",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "sellValue",
                "indexed": false
            },
            {
                "type": "address",
                "name": "owner",
                "indexed": false
            },
            {
                "type": "address",
                "name": "buyToken",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "buyTokenId",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "buyValue",
                "indexed": false
            },
            {
                "type": "address",
                "name": "buyer",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "salt",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Cancel",
        "inputs": [
            {
                "type": "address",
                "name": "sellToken",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "sellTokenId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "owner",
                "indexed": false
            },
            {
                "type": "address",
                "name": "buyToken",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "buyTokenId",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "salt",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "type": "address",
                "name": "previousOwner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newOwner",
                "indexed": true
            }
        ]
    },
    {
        "type": "function",
        "name": "beneficiary",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "buyerFeeSigner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "cancel",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "key",
                "components": [
                    {
                        "type": "address",
                        "name": "owner"
                    },
                    {
                        "type": "uint256",
                        "name": "salt"
                    },
                    {
                        "type": "tuple",
                        "name": "sellAsset",
                        "components": [
                            {
                                "type": "address",
                                "name": "token"
                            },
                            {
                                "type": "uint256",
                                "name": "tokenId"
                            },
                            {
                                "type": "uint8",
                                "name": "assetType"
                            }
                        ]
                    },
                    {
                        "type": "tuple",
                        "name": "buyAsset",
                        "components": [
                            {
                                "type": "address",
                                "name": "token"
                            },
                            {
                                "type": "uint256",
                                "name": "tokenId"
                            },
                            {
                                "type": "uint8",
                                "name": "assetType"
                            }
                        ]
                    }
                ]
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "erc20TransferProxy",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "exchange",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "tuple",
                "name": "order",
                "components": [
                    {
                        "type": "tuple",
                        "name": "key",
                        "components": [
                            {
                                "type": "address",
                                "name": "owner"
                            },
                            {
                                "type": "uint256",
                                "name": "salt"
                            },
                            {
                                "type": "tuple",
                                "name": "sellAsset",
                                "components": [
                                    {
                                        "type": "address",
                                        "name": "token"
                                    },
                                    {
                                        "type": "uint256",
                                        "name": "tokenId"
                                    },
                                    {
                                        "type": "uint8",
                                        "name": "assetType"
                                    }
                                ]
                            },
                            {
                                "type": "tuple",
                                "name": "buyAsset",
                                "components": [
                                    {
                                        "type": "address",
                                        "name": "token"
                                    },
                                    {
                                        "type": "uint256",
                                        "name": "tokenId"
                                    },
                                    {
                                        "type": "uint8",
                                        "name": "assetType"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "uint256",
                        "name": "selling"
                    },
                    {
                        "type": "uint256",
                        "name": "buying"
                    },
                    {
                        "type": "uint256",
                        "name": "sellerFee"
                    }
                ]
            },
            {
                "type": "tuple",
                "name": "sig",
                "components": [
                    {
                        "type": "uint8",
                        "name": "v"
                    },
                    {
                        "type": "bytes32",
                        "name": "r"
                    },
                    {
                        "type": "bytes32",
                        "name": "s"
                    }
                ]
            },
            {
                "type": "uint256",
                "name": "buyerFee"
            },
            {
                "type": "tuple",
                "name": "buyerFeeSig",
                "components": [
                    {
                        "type": "uint8",
                        "name": "v"
                    },
                    {
                        "type": "bytes32",
                        "name": "r"
                    },
                    {
                        "type": "bytes32",
                        "name": "s"
                    }
                ]
            },
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "address",
                "name": "buyer"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "isOwner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "ordersHolder",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "owner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "prepareBuyerFeeMessage",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "order",
                "components": [
                    {
                        "type": "tuple",
                        "name": "key",
                        "components": [
                            {
                                "type": "address",
                                "name": "owner"
                            },
                            {
                                "type": "uint256",
                                "name": "salt"
                            },
                            {
                                "type": "tuple",
                                "name": "sellAsset",
                                "components": [
                                    {
                                        "type": "address",
                                        "name": "token"
                                    },
                                    {
                                        "type": "uint256",
                                        "name": "tokenId"
                                    },
                                    {
                                        "type": "uint8",
                                        "name": "assetType"
                                    }
                                ]
                            },
                            {
                                "type": "tuple",
                                "name": "buyAsset",
                                "components": [
                                    {
                                        "type": "address",
                                        "name": "token"
                                    },
                                    {
                                        "type": "uint256",
                                        "name": "tokenId"
                                    },
                                    {
                                        "type": "uint8",
                                        "name": "assetType"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "uint256",
                        "name": "selling"
                    },
                    {
                        "type": "uint256",
                        "name": "buying"
                    },
                    {
                        "type": "uint256",
                        "name": "sellerFee"
                    }
                ]
            },
            {
                "type": "uint256",
                "name": "fee"
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "prepareMessage",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "order",
                "components": [
                    {
                        "type": "tuple",
                        "name": "key",
                        "components": [
                            {
                                "type": "address",
                                "name": "owner"
                            },
                            {
                                "type": "uint256",
                                "name": "salt"
                            },
                            {
                                "type": "tuple",
                                "name": "sellAsset",
                                "components": [
                                    {
                                        "type": "address",
                                        "name": "token"
                                    },
                                    {
                                        "type": "uint256",
                                        "name": "tokenId"
                                    },
                                    {
                                        "type": "uint8",
                                        "name": "assetType"
                                    }
                                ]
                            },
                            {
                                "type": "tuple",
                                "name": "buyAsset",
                                "components": [
                                    {
                                        "type": "address",
                                        "name": "token"
                                    },
                                    {
                                        "type": "uint256",
                                        "name": "tokenId"
                                    },
                                    {
                                        "type": "uint8",
                                        "name": "assetType"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "uint256",
                        "name": "selling"
                    },
                    {
                        "type": "uint256",
                        "name": "buying"
                    },
                    {
                        "type": "uint256",
                        "name": "sellerFee"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setBeneficiary",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "newBeneficiary"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setBuyerFeeSigner",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "newBuyerFeeSigner"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "state",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "newOwner"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "transferProxy",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "transferProxyForDeprecated",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    }
]
