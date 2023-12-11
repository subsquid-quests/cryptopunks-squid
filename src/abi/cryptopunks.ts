import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './cryptopunks.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Assign: new LogEvent<([to: string, punkIndex: bigint] & {to: string, punkIndex: bigint})>(
        abi, '0x8a0e37b73a0d9c82e205d4d1a3ff3d0b57ce5f4d7bccf6bac03336dc101cb7ba'
    ),
    Transfer: new LogEvent<([from: string, to: string, value: bigint] & {from: string, to: string, value: bigint})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
    PunkTransfer: new LogEvent<([from: string, to: string, punkIndex: bigint] & {from: string, to: string, punkIndex: bigint})>(
        abi, '0x05af636b70da6819000c49f85b21fa82081c632069bb626f30932034099107d8'
    ),
    PunkOffered: new LogEvent<([punkIndex: bigint, minValue: bigint, toAddress: string] & {punkIndex: bigint, minValue: bigint, toAddress: string})>(
        abi, '0x3c7b682d5da98001a9b8cbda6c647d2c63d698a4184fd1d55e2ce7b66f5d21eb'
    ),
    PunkBidEntered: new LogEvent<([punkIndex: bigint, value: bigint, fromAddress: string] & {punkIndex: bigint, value: bigint, fromAddress: string})>(
        abi, '0x5b859394fabae0c1ba88baffe67e751ab5248d2e879028b8c8d6897b0519f56a'
    ),
    PunkBidWithdrawn: new LogEvent<([punkIndex: bigint, value: bigint, fromAddress: string] & {punkIndex: bigint, value: bigint, fromAddress: string})>(
        abi, '0x6f30e1ee4d81dcc7a8a478577f65d2ed2edb120565960ac45fe7c50551c87932'
    ),
    PunkBought: new LogEvent<([punkIndex: bigint, value: bigint, fromAddress: string, toAddress: string] & {punkIndex: bigint, value: bigint, fromAddress: string, toAddress: string})>(
        abi, '0x58e5d5a525e3b40bc15abaa38b5882678db1ee68befd2f60bafe3a7fd06db9e3'
    ),
    PunkNoLongerForSale: new LogEvent<([punkIndex: bigint] & {punkIndex: bigint})>(
        abi, '0xb0e0a660b4e50f26f0b7ce75c24655fc76cc66e3334a54ff410277229fa10bd4'
    ),
}

export const functions = {
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    punksOfferedForSale: new Func<[_: bigint], {}, ([isForSale: boolean, punkIndex: bigint, seller: string, minValue: bigint, onlySellTo: string] & {isForSale: boolean, punkIndex: bigint, seller: string, minValue: bigint, onlySellTo: string})>(
        abi, '0x088f11f3'
    ),
    enterBidForPunk: new Func<[punkIndex: bigint], {punkIndex: bigint}, []>(
        abi, '0x091dbfd2'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    acceptBidForPunk: new Func<[punkIndex: bigint, minPrice: bigint], {punkIndex: bigint, minPrice: bigint}, []>(
        abi, '0x23165b75'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    setInitialOwners: new Func<[addresses: Array<string>, indices: Array<bigint>], {addresses: Array<string>, indices: Array<bigint>}, []>(
        abi, '0x39c5dde6'
    ),
    withdraw: new Func<[], {}, []>(
        abi, '0x3ccfd60b'
    ),
    imageHash: new Func<[], {}, string>(
        abi, '0x51605d80'
    ),
    nextPunkIndexToAssign: new Func<[], {}, bigint>(
        abi, '0x52f29a25'
    ),
    punkIndexToAddress: new Func<[_: bigint], {}, string>(
        abi, '0x58178168'
    ),
    standard: new Func<[], {}, string>(
        abi, '0x5a3b7e42'
    ),
    punkBids: new Func<[_: bigint], {}, ([hasBid: boolean, punkIndex: bigint, bidder: string, value: bigint] & {hasBid: boolean, punkIndex: bigint, bidder: string, value: bigint})>(
        abi, '0x6e743fa9'
    ),
    balanceOf: new Func<[_: string], {}, bigint>(
        abi, '0x70a08231'
    ),
    allInitialOwnersAssigned: new Func<[], {}, []>(
        abi, '0x7ecedac9'
    ),
    allPunksAssigned: new Func<[], {}, boolean>(
        abi, '0x8126c38a'
    ),
    buyPunk: new Func<[punkIndex: bigint], {punkIndex: bigint}, []>(
        abi, '0x8264fe98'
    ),
    transferPunk: new Func<[to: string, punkIndex: bigint], {to: string, punkIndex: bigint}, []>(
        abi, '0x8b72a2ec'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    withdrawBidForPunk: new Func<[punkIndex: bigint], {punkIndex: bigint}, []>(
        abi, '0x979bc638'
    ),
    setInitialOwner: new Func<[to: string, punkIndex: bigint], {to: string, punkIndex: bigint}, []>(
        abi, '0xa75a9049'
    ),
    offerPunkForSaleToAddress: new Func<[punkIndex: bigint, minSalePriceInWei: bigint, toAddress: string], {punkIndex: bigint, minSalePriceInWei: bigint, toAddress: string}, []>(
        abi, '0xbf31196f'
    ),
    punksRemainingToAssign: new Func<[], {}, bigint>(
        abi, '0xc0d6ce63'
    ),
    offerPunkForSale: new Func<[punkIndex: bigint, minSalePriceInWei: bigint], {punkIndex: bigint, minSalePriceInWei: bigint}, []>(
        abi, '0xc44193c3'
    ),
    getPunk: new Func<[punkIndex: bigint], {punkIndex: bigint}, []>(
        abi, '0xc81d1d5b'
    ),
    pendingWithdrawals: new Func<[_: string], {}, bigint>(
        abi, '0xf3f43703'
    ),
    punkNoLongerForSale: new Func<[punkIndex: bigint], {punkIndex: bigint}, []>(
        abi, '0xf6eeff1e'
    ),
}

export class Contract extends ContractBase {

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    punksOfferedForSale(arg0: bigint): Promise<([isForSale: boolean, punkIndex: bigint, seller: string, minValue: bigint, onlySellTo: string] & {isForSale: boolean, punkIndex: bigint, seller: string, minValue: bigint, onlySellTo: string})> {
        return this.eth_call(functions.punksOfferedForSale, [arg0])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    imageHash(): Promise<string> {
        return this.eth_call(functions.imageHash, [])
    }

    nextPunkIndexToAssign(): Promise<bigint> {
        return this.eth_call(functions.nextPunkIndexToAssign, [])
    }

    punkIndexToAddress(arg0: bigint): Promise<string> {
        return this.eth_call(functions.punkIndexToAddress, [arg0])
    }

    standard(): Promise<string> {
        return this.eth_call(functions.standard, [])
    }

    punkBids(arg0: bigint): Promise<([hasBid: boolean, punkIndex: bigint, bidder: string, value: bigint] & {hasBid: boolean, punkIndex: bigint, bidder: string, value: bigint})> {
        return this.eth_call(functions.punkBids, [arg0])
    }

    balanceOf(arg0: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [arg0])
    }

    allPunksAssigned(): Promise<boolean> {
        return this.eth_call(functions.allPunksAssigned, [])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    punksRemainingToAssign(): Promise<bigint> {
        return this.eth_call(functions.punksRemainingToAssign, [])
    }

    pendingWithdrawals(arg0: string): Promise<bigint> {
        return this.eth_call(functions.pendingWithdrawals, [arg0])
    }
}
