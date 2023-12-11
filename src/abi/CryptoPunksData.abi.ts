export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": []
    },
    {
        "type": "function",
        "name": "addAsset",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint8",
                "name": "index"
            },
            {
                "type": "bytes",
                "name": "encoding"
            },
            {
                "type": "string",
                "name": "name"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "addComposites",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint64",
                "name": "key1"
            },
            {
                "type": "uint32",
                "name": "value1"
            },
            {
                "type": "uint64",
                "name": "key2"
            },
            {
                "type": "uint32",
                "name": "value2"
            },
            {
                "type": "uint64",
                "name": "key3"
            },
            {
                "type": "uint32",
                "name": "value3"
            },
            {
                "type": "uint64",
                "name": "key4"
            },
            {
                "type": "uint32",
                "name": "value4"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "addPunks",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint8",
                "name": "index"
            },
            {
                "type": "bytes",
                "name": "_punks"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "punkAttributes",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint16",
                "name": "index"
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": "text"
            }
        ]
    },
    {
        "type": "function",
        "name": "punkImage",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint16",
                "name": "index"
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
        "name": "punkImageSvg",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint16",
                "name": "index"
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": "svg"
            }
        ]
    },
    {
        "type": "function",
        "name": "sealContract",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setPalette",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bytes",
                "name": "_palette"
            }
        ],
        "outputs": []
    }
]
