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
        "name": "tokenTransferProxy",
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
        "name": "staticCall",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "target"
            },
            {
                "type": "bytes",
                "name": "calldata"
            },
            {
                "type": "bytes",
                "name": "extradata"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "result"
            }
        ]
    },
    {
        "type": "function",
        "name": "changeMinimumMakerProtocolFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "newMinimumMakerProtocolFee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "changeMinimumTakerProtocolFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "newMinimumTakerProtocolFee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "guardedArrayReplace",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "bytes",
                "name": "array"
            },
            {
                "type": "bytes",
                "name": "desired"
            },
            {
                "type": "bytes",
                "name": "mask"
            }
        ],
        "outputs": [
            {
                "type": "bytes",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "minimumTakerProtocolFee",
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
        "name": "codename",
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
        "name": "testCopyAddress",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "addr"
            }
        ],
        "outputs": [
            {
                "type": "bytes",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "testCopy",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "bytes",
                "name": "arrToCopy"
            }
        ],
        "outputs": [
            {
                "type": "bytes",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "calculateCurrentPrice_",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address[7]",
                "name": "addrs"
            },
            {
                "type": "uint256[9]",
                "name": "uints"
            },
            {
                "type": "uint8",
                "name": "feeMethod"
            },
            {
                "type": "uint8",
                "name": "side"
            },
            {
                "type": "uint8",
                "name": "saleKind"
            },
            {
                "type": "uint8",
                "name": "howToCall"
            },
            {
                "type": "bytes",
                "name": "calldata"
            },
            {
                "type": "bytes",
                "name": "replacementPattern"
            },
            {
                "type": "bytes",
                "name": "staticExtradata"
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
        "name": "changeProtocolFeeRecipient",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "newProtocolFeeRecipient"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "version",
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
        "name": "orderCalldataCanMatch",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "bytes",
                "name": "buyCalldata"
            },
            {
                "type": "bytes",
                "name": "buyReplacementPattern"
            },
            {
                "type": "bytes",
                "name": "sellCalldata"
            },
            {
                "type": "bytes",
                "name": "sellReplacementPattern"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "validateOrder_",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address[7]",
                "name": "addrs"
            },
            {
                "type": "uint256[9]",
                "name": "uints"
            },
            {
                "type": "uint8",
                "name": "feeMethod"
            },
            {
                "type": "uint8",
                "name": "side"
            },
            {
                "type": "uint8",
                "name": "saleKind"
            },
            {
                "type": "uint8",
                "name": "howToCall"
            },
            {
                "type": "bytes",
                "name": "calldata"
            },
            {
                "type": "bytes",
                "name": "replacementPattern"
            },
            {
                "type": "bytes",
                "name": "staticExtradata"
            },
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
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "calculateFinalPrice",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint8",
                "name": "side"
            },
            {
                "type": "uint8",
                "name": "saleKind"
            },
            {
                "type": "uint256",
                "name": "basePrice"
            },
            {
                "type": "uint256",
                "name": "extra"
            },
            {
                "type": "uint256",
                "name": "listingTime"
            },
            {
                "type": "uint256",
                "name": "expirationTime"
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
        "name": "protocolFeeRecipient",
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
        "name": "renounceOwnership",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "hashOrder_",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "address[7]",
                "name": "addrs"
            },
            {
                "type": "uint256[9]",
                "name": "uints"
            },
            {
                "type": "uint8",
                "name": "feeMethod"
            },
            {
                "type": "uint8",
                "name": "side"
            },
            {
                "type": "uint8",
                "name": "saleKind"
            },
            {
                "type": "uint8",
                "name": "howToCall"
            },
            {
                "type": "bytes",
                "name": "calldata"
            },
            {
                "type": "bytes",
                "name": "replacementPattern"
            },
            {
                "type": "bytes",
                "name": "staticExtradata"
            }
        ],
        "outputs": [
            {
                "type": "bytes32",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "ordersCanMatch_",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address[14]",
                "name": "addrs"
            },
            {
                "type": "uint256[18]",
                "name": "uints"
            },
            {
                "type": "uint8[8]",
                "name": "feeMethodsSidesKindsHowToCalls"
            },
            {
                "type": "bytes",
                "name": "calldataBuy"
            },
            {
                "type": "bytes",
                "name": "calldataSell"
            },
            {
                "type": "bytes",
                "name": "replacementPatternBuy"
            },
            {
                "type": "bytes",
                "name": "replacementPatternSell"
            },
            {
                "type": "bytes",
                "name": "staticExtradataBuy"
            },
            {
                "type": "bytes",
                "name": "staticExtradataSell"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "approveOrder_",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[7]",
                "name": "addrs"
            },
            {
                "type": "uint256[9]",
                "name": "uints"
            },
            {
                "type": "uint8",
                "name": "feeMethod"
            },
            {
                "type": "uint8",
                "name": "side"
            },
            {
                "type": "uint8",
                "name": "saleKind"
            },
            {
                "type": "uint8",
                "name": "howToCall"
            },
            {
                "type": "bytes",
                "name": "calldata"
            },
            {
                "type": "bytes",
                "name": "replacementPattern"
            },
            {
                "type": "bytes",
                "name": "staticExtradata"
            },
            {
                "type": "bool",
                "name": "orderbookInclusionDesired"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "registry",
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
        "name": "minimumMakerProtocolFee",
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
        "name": "hashToSign_",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "address[7]",
                "name": "addrs"
            },
            {
                "type": "uint256[9]",
                "name": "uints"
            },
            {
                "type": "uint8",
                "name": "feeMethod"
            },
            {
                "type": "uint8",
                "name": "side"
            },
            {
                "type": "uint8",
                "name": "saleKind"
            },
            {
                "type": "uint8",
                "name": "howToCall"
            },
            {
                "type": "bytes",
                "name": "calldata"
            },
            {
                "type": "bytes",
                "name": "replacementPattern"
            },
            {
                "type": "bytes",
                "name": "staticExtradata"
            }
        ],
        "outputs": [
            {
                "type": "bytes32",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "cancelledOrFinalized",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "bool",
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
        "name": "exchangeToken",
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
        "name": "cancelOrder_",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[7]",
                "name": "addrs"
            },
            {
                "type": "uint256[9]",
                "name": "uints"
            },
            {
                "type": "uint8",
                "name": "feeMethod"
            },
            {
                "type": "uint8",
                "name": "side"
            },
            {
                "type": "uint8",
                "name": "saleKind"
            },
            {
                "type": "uint8",
                "name": "howToCall"
            },
            {
                "type": "bytes",
                "name": "calldata"
            },
            {
                "type": "bytes",
                "name": "replacementPattern"
            },
            {
                "type": "bytes",
                "name": "staticExtradata"
            },
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
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "atomicMatch_",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address[14]",
                "name": "addrs"
            },
            {
                "type": "uint256[18]",
                "name": "uints"
            },
            {
                "type": "uint8[8]",
                "name": "feeMethodsSidesKindsHowToCalls"
            },
            {
                "type": "bytes",
                "name": "calldataBuy"
            },
            {
                "type": "bytes",
                "name": "calldataSell"
            },
            {
                "type": "bytes",
                "name": "replacementPatternBuy"
            },
            {
                "type": "bytes",
                "name": "replacementPatternSell"
            },
            {
                "type": "bytes",
                "name": "staticExtradataBuy"
            },
            {
                "type": "bytes",
                "name": "staticExtradataSell"
            },
            {
                "type": "uint8[2]",
                "name": "vs"
            },
            {
                "type": "bytes32[5]",
                "name": "rssMetadata"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "validateOrderParameters_",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address[7]",
                "name": "addrs"
            },
            {
                "type": "uint256[9]",
                "name": "uints"
            },
            {
                "type": "uint8",
                "name": "feeMethod"
            },
            {
                "type": "uint8",
                "name": "side"
            },
            {
                "type": "uint8",
                "name": "saleKind"
            },
            {
                "type": "uint8",
                "name": "howToCall"
            },
            {
                "type": "bytes",
                "name": "calldata"
            },
            {
                "type": "bytes",
                "name": "replacementPattern"
            },
            {
                "type": "bytes",
                "name": "staticExtradata"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "INVERSE_BASIS_POINT",
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
        "name": "calculateMatchPrice_",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address[14]",
                "name": "addrs"
            },
            {
                "type": "uint256[18]",
                "name": "uints"
            },
            {
                "type": "uint8[8]",
                "name": "feeMethodsSidesKindsHowToCalls"
            },
            {
                "type": "bytes",
                "name": "calldataBuy"
            },
            {
                "type": "bytes",
                "name": "calldataSell"
            },
            {
                "type": "bytes",
                "name": "replacementPatternBuy"
            },
            {
                "type": "bytes",
                "name": "replacementPatternSell"
            },
            {
                "type": "bytes",
                "name": "staticExtradataBuy"
            },
            {
                "type": "bytes",
                "name": "staticExtradataSell"
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
        "name": "approvedOrders",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "bool",
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
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "registryAddress"
            },
            {
                "type": "address",
                "name": "tokenTransferProxyAddress"
            },
            {
                "type": "address",
                "name": "tokenAddress"
            },
            {
                "type": "address",
                "name": "protocolFeeAddress"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OrderApprovedPartOne",
        "inputs": [
            {
                "type": "bytes32",
                "name": "hash",
                "indexed": true
            },
            {
                "type": "address",
                "name": "exchange",
                "indexed": false
            },
            {
                "type": "address",
                "name": "maker",
                "indexed": true
            },
            {
                "type": "address",
                "name": "taker",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "makerRelayerFee",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "takerRelayerFee",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "makerProtocolFee",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "takerProtocolFee",
                "indexed": false
            },
            {
                "type": "address",
                "name": "feeRecipient",
                "indexed": true
            },
            {
                "type": "uint8",
                "name": "feeMethod",
                "indexed": false
            },
            {
                "type": "uint8",
                "name": "side",
                "indexed": false
            },
            {
                "type": "uint8",
                "name": "saleKind",
                "indexed": false
            },
            {
                "type": "address",
                "name": "target",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OrderApprovedPartTwo",
        "inputs": [
            {
                "type": "bytes32",
                "name": "hash",
                "indexed": true
            },
            {
                "type": "uint8",
                "name": "howToCall",
                "indexed": false
            },
            {
                "type": "bytes",
                "name": "calldata",
                "indexed": false
            },
            {
                "type": "bytes",
                "name": "replacementPattern",
                "indexed": false
            },
            {
                "type": "address",
                "name": "staticTarget",
                "indexed": false
            },
            {
                "type": "bytes",
                "name": "staticExtradata",
                "indexed": false
            },
            {
                "type": "address",
                "name": "paymentToken",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "basePrice",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "extra",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "listingTime",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "expirationTime",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "salt",
                "indexed": false
            },
            {
                "type": "bool",
                "name": "orderbookInclusionDesired",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OrderCancelled",
        "inputs": [
            {
                "type": "bytes32",
                "name": "hash",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OrdersMatched",
        "inputs": [
            {
                "type": "bytes32",
                "name": "buyHash",
                "indexed": false
            },
            {
                "type": "bytes32",
                "name": "sellHash",
                "indexed": false
            },
            {
                "type": "address",
                "name": "maker",
                "indexed": true
            },
            {
                "type": "address",
                "name": "taker",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": false
            },
            {
                "type": "bytes32",
                "name": "metadata",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OwnershipRenounced",
        "inputs": [
            {
                "type": "address",
                "name": "previousOwner",
                "indexed": true
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
    }
]
