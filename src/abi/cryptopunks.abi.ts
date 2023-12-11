export const ABI_JSON = [
    {
        "type": "function",
        "name": "name",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "punksOfferedForSale",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "isForSale"
            },
            {
                "type": "uint256",
                "name": "punkIndex"
            },
            {
                "type": "address",
                "name": "seller"
            },
            {
                "type": "uint256",
                "name": "minValue"
            },
            {
                "type": "address",
                "name": "onlySellTo"
            }
        ]
    },
    {
        "type": "function",
        "name": "enterBidForPunk",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "totalSupply",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "acceptBidForPunk",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex"
            },
            {
                "type": "uint256",
                "name": "minPrice"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "decimals",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "setInitialOwners",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "addresses"
            },
            {
                "type": "uint256[]",
                "name": "indices"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "withdraw",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "imageHash",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "nextPunkIndexToAssign",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "punkIndexToAddress",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "standard",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "punkBids",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "hasBid"
            },
            {
                "type": "uint256",
                "name": "punkIndex"
            },
            {
                "type": "address",
                "name": "bidder"
            },
            {
                "type": "uint256",
                "name": "value"
            }
        ]
    },
    {
        "type": "function",
        "name": "balanceOf",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "allInitialOwnersAssigned",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "allPunksAssigned",
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
        "name": "buyPunk",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "transferPunk",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "punkIndex"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "symbol",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "withdrawBidForPunk",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setInitialOwner",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "punkIndex"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "offerPunkForSaleToAddress",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex"
            },
            {
                "type": "uint256",
                "name": "minSalePriceInWei"
            },
            {
                "type": "address",
                "name": "toAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "punksRemainingToAssign",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "offerPunkForSale",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex"
            },
            {
                "type": "uint256",
                "name": "minSalePriceInWei"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "getPunk",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "pendingWithdrawals",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "punkNoLongerForSale",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex"
            }
        ],
        "outputs": []
    },
    {
        "type": "constructor",
        "stateMutability": "payable",
        "payable": true,
        "inputs": []
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Assign",
        "inputs": [
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "punkIndex",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Transfer",
        "inputs": [
            {
                "type": "address",
                "name": "from",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "value",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "PunkTransfer",
        "inputs": [
            {
                "type": "address",
                "name": "from",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "punkIndex",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "PunkOffered",
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "minValue",
                "indexed": false
            },
            {
                "type": "address",
                "name": "toAddress",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "PunkBidEntered",
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "value",
                "indexed": false
            },
            {
                "type": "address",
                "name": "fromAddress",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "PunkBidWithdrawn",
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "value",
                "indexed": false
            },
            {
                "type": "address",
                "name": "fromAddress",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "PunkBought",
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "value",
                "indexed": false
            },
            {
                "type": "address",
                "name": "fromAddress",
                "indexed": true
            },
            {
                "type": "address",
                "name": "toAddress",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "PunkNoLongerForSale",
        "inputs": [
            {
                "type": "uint256",
                "name": "punkIndex",
                "indexed": true
            }
        ]
    }
]
