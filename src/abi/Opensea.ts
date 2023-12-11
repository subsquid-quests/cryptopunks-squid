import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './Opensea.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    OrderApprovedPartOne: new LogEvent<([hash: string, exchange: string, maker: string, taker: string, makerRelayerFee: bigint, takerRelayerFee: bigint, makerProtocolFee: bigint, takerProtocolFee: bigint, feeRecipient: string, feeMethod: number, side: number, saleKind: number, target: string] & {hash: string, exchange: string, maker: string, taker: string, makerRelayerFee: bigint, takerRelayerFee: bigint, makerProtocolFee: bigint, takerProtocolFee: bigint, feeRecipient: string, feeMethod: number, side: number, saleKind: number, target: string})>(
        abi, '0x90c7f9f5b58c15f0f635bfb99f55d3d78fdbef3559e7d8abf5c81052a5276622'
    ),
    OrderApprovedPartTwo: new LogEvent<([hash: string, howToCall: number, calldata: string, replacementPattern: string, staticTarget: string, staticExtradata: string, paymentToken: string, basePrice: bigint, extra: bigint, listingTime: bigint, expirationTime: bigint, salt: bigint, orderbookInclusionDesired: boolean] & {hash: string, howToCall: number, calldata: string, replacementPattern: string, staticTarget: string, staticExtradata: string, paymentToken: string, basePrice: bigint, extra: bigint, listingTime: bigint, expirationTime: bigint, salt: bigint, orderbookInclusionDesired: boolean})>(
        abi, '0xe55393c778364e440d958b39ac1debd99dcfae3775a8a04d1e79124adf6a2d08'
    ),
    OrderCancelled: new LogEvent<([hash: string] & {hash: string})>(
        abi, '0x5152abf959f6564662358c2e52b702259b78bac5ee7842a0f01937e670efcc7d'
    ),
    OrdersMatched: new LogEvent<([buyHash: string, sellHash: string, maker: string, taker: string, price: bigint, metadata: string] & {buyHash: string, sellHash: string, maker: string, taker: string, price: bigint, metadata: string})>(
        abi, '0xc4109843e0b7d514e4c093114b863f8e7d8d9a458c372cd51bfe526b588006c9'
    ),
    OwnershipRenounced: new LogEvent<([previousOwner: string] & {previousOwner: string})>(
        abi, '0xf8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c64820'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
}

export const functions = {
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    tokenTransferProxy: new Func<[], {}, string>(
        abi, '0x0eefdbad'
    ),
    staticCall: new Func<[target: string, calldata: string, extradata: string], {target: string, calldata: string, extradata: string}, boolean>(
        abi, '0x10796a47'
    ),
    changeMinimumMakerProtocolFee: new Func<[newMinimumMakerProtocolFee: bigint], {newMinimumMakerProtocolFee: bigint}, []>(
        abi, '0x14350c24'
    ),
    changeMinimumTakerProtocolFee: new Func<[newMinimumTakerProtocolFee: bigint], {newMinimumTakerProtocolFee: bigint}, []>(
        abi, '0x1a6b13e2'
    ),
    guardedArrayReplace: new Func<[array: string, desired: string, mask: string], {array: string, desired: string, mask: string}, string>(
        abi, '0x239e83df'
    ),
    minimumTakerProtocolFee: new Func<[], {}, bigint>(
        abi, '0x28a8ee68'
    ),
    codename: new Func<[], {}, string>(
        abi, '0x31e63199'
    ),
    testCopyAddress: new Func<[addr: string], {addr: string}, string>(
        abi, '0x3464af6a'
    ),
    testCopy: new Func<[arrToCopy: string], {arrToCopy: string}, string>(
        abi, '0x3e1e292a'
    ),
    calculateCurrentPrice_: new Func<[addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string], {addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string}, bigint>(
        abi, '0x3f67ee0d'
    ),
    changeProtocolFeeRecipient: new Func<[newProtocolFeeRecipient: string], {newProtocolFeeRecipient: string}, []>(
        abi, '0x514f0330'
    ),
    version: new Func<[], {}, string>(
        abi, '0x54fd4d50'
    ),
    orderCalldataCanMatch: new Func<[buyCalldata: string, buyReplacementPattern: string, sellCalldata: string, sellReplacementPattern: string], {buyCalldata: string, buyReplacementPattern: string, sellCalldata: string, sellReplacementPattern: string}, boolean>(
        abi, '0x562b2ebc'
    ),
    validateOrder_: new Func<[addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string, v: number, r: string, s: string], {addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string, v: number, r: string, s: string}, boolean>(
        abi, '0x60bef33a'
    ),
    calculateFinalPrice: new Func<[side: number, saleKind: number, basePrice: bigint, extra: bigint, listingTime: bigint, expirationTime: bigint], {side: number, saleKind: number, basePrice: bigint, extra: bigint, listingTime: bigint, expirationTime: bigint}, bigint>(
        abi, '0x63d36c0b'
    ),
    protocolFeeRecipient: new Func<[], {}, string>(
        abi, '0x64df049e'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    hashOrder_: new Func<[addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string], {addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string}, string>(
        abi, '0x71d02b38'
    ),
    ordersCanMatch_: new Func<[addrs: Array<string>, uints: Array<bigint>, feeMethodsSidesKindsHowToCalls: Array<number>, calldataBuy: string, calldataSell: string, replacementPatternBuy: string, replacementPatternSell: string, staticExtradataBuy: string, staticExtradataSell: string], {addrs: Array<string>, uints: Array<bigint>, feeMethodsSidesKindsHowToCalls: Array<number>, calldataBuy: string, calldataSell: string, replacementPatternBuy: string, replacementPatternSell: string, staticExtradataBuy: string, staticExtradataSell: string}, boolean>(
        abi, '0x72593b4c'
    ),
    approveOrder_: new Func<[addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string, orderbookInclusionDesired: boolean], {addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string, orderbookInclusionDesired: boolean}, []>(
        abi, '0x79666868'
    ),
    registry: new Func<[], {}, string>(
        abi, '0x7b103999'
    ),
    minimumMakerProtocolFee: new Func<[], {}, bigint>(
        abi, '0x7ccefc52'
    ),
    hashToSign_: new Func<[addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string], {addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string}, string>(
        abi, '0x7d766981'
    ),
    cancelledOrFinalized: new Func<[_: string], {}, boolean>(
        abi, '0x8076f005'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    exchangeToken: new Func<[], {}, string>(
        abi, '0xa25eb5d9'
    ),
    cancelOrder_: new Func<[addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string, v: number, r: string, s: string], {addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string, v: number, r: string, s: string}, []>(
        abi, '0xa8a41c70'
    ),
    atomicMatch_: new Func<[addrs: Array<string>, uints: Array<bigint>, feeMethodsSidesKindsHowToCalls: Array<number>, calldataBuy: string, calldataSell: string, replacementPatternBuy: string, replacementPatternSell: string, staticExtradataBuy: string, staticExtradataSell: string, vs: Array<number>, rssMetadata: Array<string>], {addrs: Array<string>, uints: Array<bigint>, feeMethodsSidesKindsHowToCalls: Array<number>, calldataBuy: string, calldataSell: string, replacementPatternBuy: string, replacementPatternSell: string, staticExtradataBuy: string, staticExtradataSell: string, vs: Array<number>, rssMetadata: Array<string>}, []>(
        abi, '0xab834bab'
    ),
    validateOrderParameters_: new Func<[addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string], {addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string}, boolean>(
        abi, '0xca595b9a'
    ),
    INVERSE_BASIS_POINT: new Func<[], {}, bigint>(
        abi, '0xcae6047f'
    ),
    calculateMatchPrice_: new Func<[addrs: Array<string>, uints: Array<bigint>, feeMethodsSidesKindsHowToCalls: Array<number>, calldataBuy: string, calldataSell: string, replacementPatternBuy: string, replacementPatternSell: string, staticExtradataBuy: string, staticExtradataSell: string], {addrs: Array<string>, uints: Array<bigint>, feeMethodsSidesKindsHowToCalls: Array<number>, calldataBuy: string, calldataSell: string, replacementPatternBuy: string, replacementPatternSell: string, staticExtradataBuy: string, staticExtradataSell: string}, bigint>(
        abi, '0xd537e131'
    ),
    approvedOrders: new Func<[_: string], {}, boolean>(
        abi, '0xe57d4adb'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
}

export class Contract extends ContractBase {

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    tokenTransferProxy(): Promise<string> {
        return this.eth_call(functions.tokenTransferProxy, [])
    }

    staticCall(target: string, calldata: string, extradata: string): Promise<boolean> {
        return this.eth_call(functions.staticCall, [target, calldata, extradata])
    }

    guardedArrayReplace(array: string, desired: string, mask: string): Promise<string> {
        return this.eth_call(functions.guardedArrayReplace, [array, desired, mask])
    }

    minimumTakerProtocolFee(): Promise<bigint> {
        return this.eth_call(functions.minimumTakerProtocolFee, [])
    }

    codename(): Promise<string> {
        return this.eth_call(functions.codename, [])
    }

    testCopyAddress(addr: string): Promise<string> {
        return this.eth_call(functions.testCopyAddress, [addr])
    }

    testCopy(arrToCopy: string): Promise<string> {
        return this.eth_call(functions.testCopy, [arrToCopy])
    }

    calculateCurrentPrice_(addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string): Promise<bigint> {
        return this.eth_call(functions.calculateCurrentPrice_, [addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata])
    }

    version(): Promise<string> {
        return this.eth_call(functions.version, [])
    }

    orderCalldataCanMatch(buyCalldata: string, buyReplacementPattern: string, sellCalldata: string, sellReplacementPattern: string): Promise<boolean> {
        return this.eth_call(functions.orderCalldataCanMatch, [buyCalldata, buyReplacementPattern, sellCalldata, sellReplacementPattern])
    }

    validateOrder_(addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string, v: number, r: string, s: string): Promise<boolean> {
        return this.eth_call(functions.validateOrder_, [addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata, v, r, s])
    }

    calculateFinalPrice(side: number, saleKind: number, basePrice: bigint, extra: bigint, listingTime: bigint, expirationTime: bigint): Promise<bigint> {
        return this.eth_call(functions.calculateFinalPrice, [side, saleKind, basePrice, extra, listingTime, expirationTime])
    }

    protocolFeeRecipient(): Promise<string> {
        return this.eth_call(functions.protocolFeeRecipient, [])
    }

    hashOrder_(addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string): Promise<string> {
        return this.eth_call(functions.hashOrder_, [addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata])
    }

    ordersCanMatch_(addrs: Array<string>, uints: Array<bigint>, feeMethodsSidesKindsHowToCalls: Array<number>, calldataBuy: string, calldataSell: string, replacementPatternBuy: string, replacementPatternSell: string, staticExtradataBuy: string, staticExtradataSell: string): Promise<boolean> {
        return this.eth_call(functions.ordersCanMatch_, [addrs, uints, feeMethodsSidesKindsHowToCalls, calldataBuy, calldataSell, replacementPatternBuy, replacementPatternSell, staticExtradataBuy, staticExtradataSell])
    }

    registry(): Promise<string> {
        return this.eth_call(functions.registry, [])
    }

    minimumMakerProtocolFee(): Promise<bigint> {
        return this.eth_call(functions.minimumMakerProtocolFee, [])
    }

    hashToSign_(addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string): Promise<string> {
        return this.eth_call(functions.hashToSign_, [addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata])
    }

    cancelledOrFinalized(arg0: string): Promise<boolean> {
        return this.eth_call(functions.cancelledOrFinalized, [arg0])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    exchangeToken(): Promise<string> {
        return this.eth_call(functions.exchangeToken, [])
    }

    validateOrderParameters_(addrs: Array<string>, uints: Array<bigint>, feeMethod: number, side: number, saleKind: number, howToCall: number, calldata: string, replacementPattern: string, staticExtradata: string): Promise<boolean> {
        return this.eth_call(functions.validateOrderParameters_, [addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata])
    }

    INVERSE_BASIS_POINT(): Promise<bigint> {
        return this.eth_call(functions.INVERSE_BASIS_POINT, [])
    }

    calculateMatchPrice_(addrs: Array<string>, uints: Array<bigint>, feeMethodsSidesKindsHowToCalls: Array<number>, calldataBuy: string, calldataSell: string, replacementPatternBuy: string, replacementPatternSell: string, staticExtradataBuy: string, staticExtradataSell: string): Promise<bigint> {
        return this.eth_call(functions.calculateMatchPrice_, [addrs, uints, feeMethodsSidesKindsHowToCalls, calldataBuy, calldataSell, replacementPatternBuy, replacementPatternSell, staticExtradataBuy, staticExtradataSell])
    }

    approvedOrders(arg0: string): Promise<boolean> {
        return this.eth_call(functions.approvedOrders, [arg0])
    }
}
