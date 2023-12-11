import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './RaribleExchangeV1.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Buy: new LogEvent<([sellToken: string, sellTokenId: bigint, sellValue: bigint, owner: string, buyToken: string, buyTokenId: bigint, buyValue: bigint, buyer: string, amount: bigint, salt: bigint] & {sellToken: string, sellTokenId: bigint, sellValue: bigint, owner: string, buyToken: string, buyTokenId: bigint, buyValue: bigint, buyer: string, amount: bigint, salt: bigint})>(
        abi, '0xdddcdb07e460849cf04a4445b7af9faf01b7f5c7ba75deaf969ac5ed830312c3'
    ),
    Cancel: new LogEvent<([sellToken: string, sellTokenId: bigint, owner: string, buyToken: string, buyTokenId: bigint, salt: bigint] & {sellToken: string, sellTokenId: bigint, owner: string, buyToken: string, buyTokenId: bigint, salt: bigint})>(
        abi, '0xbfe0e802e586c99960de1a111c80f598b281996d65080d74dbe29986f55b274a'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
}

export const functions = {
    beneficiary: new Func<[], {}, string>(
        abi, '0x38af3eed'
    ),
    buyerFeeSigner: new Func<[], {}, string>(
        abi, '0x4df97bc5'
    ),
    cancel: new Func<[key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})})], {key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})})}, []>(
        abi, '0xca120b1f'
    ),
    erc20TransferProxy: new Func<[], {}, string>(
        abi, '0xfee03e9e'
    ),
    exchange: new Func<[order: ([key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint] & {key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint}), sig: ([v: number, r: string, s: string] & {v: number, r: string, s: string}), buyerFee: bigint, buyerFeeSig: ([v: number, r: string, s: string] & {v: number, r: string, s: string}), amount: bigint, buyer: string], {order: ([key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint] & {key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint}), sig: ([v: number, r: string, s: string] & {v: number, r: string, s: string}), buyerFee: bigint, buyerFeeSig: ([v: number, r: string, s: string] & {v: number, r: string, s: string}), amount: bigint, buyer: string}, []>(
        abi, '0x9cec6392'
    ),
    isOwner: new Func<[], {}, boolean>(
        abi, '0x8f32d59b'
    ),
    ordersHolder: new Func<[], {}, string>(
        abi, '0x9704dc44'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    prepareBuyerFeeMessage: new Func<[order: ([key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint] & {key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint}), fee: bigint], {order: ([key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint] & {key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint}), fee: bigint}, string>(
        abi, '0x1b4c9874'
    ),
    prepareMessage: new Func<[order: ([key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint] & {key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint})], {order: ([key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint] & {key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint})}, string>(
        abi, '0x049944b6'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    setBeneficiary: new Func<[newBeneficiary: string], {newBeneficiary: string}, []>(
        abi, '0x1c31f710'
    ),
    setBuyerFeeSigner: new Func<[newBuyerFeeSigner: string], {newBuyerFeeSigner: string}, []>(
        abi, '0x55d5d326'
    ),
    state: new Func<[], {}, string>(
        abi, '0xc19d93fb'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    transferProxy: new Func<[], {}, string>(
        abi, '0x6e667db3'
    ),
    transferProxyForDeprecated: new Func<[], {}, string>(
        abi, '0x02329e10'
    ),
}

export class Contract extends ContractBase {

    beneficiary(): Promise<string> {
        return this.eth_call(functions.beneficiary, [])
    }

    buyerFeeSigner(): Promise<string> {
        return this.eth_call(functions.buyerFeeSigner, [])
    }

    erc20TransferProxy(): Promise<string> {
        return this.eth_call(functions.erc20TransferProxy, [])
    }

    isOwner(): Promise<boolean> {
        return this.eth_call(functions.isOwner, [])
    }

    ordersHolder(): Promise<string> {
        return this.eth_call(functions.ordersHolder, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    prepareBuyerFeeMessage(order: ([key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint] & {key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint}), fee: bigint): Promise<string> {
        return this.eth_call(functions.prepareBuyerFeeMessage, [order, fee])
    }

    prepareMessage(order: ([key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint] & {key: ([owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})] & {owner: string, salt: bigint, sellAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number}), buyAsset: ([token: string, tokenId: bigint, assetType: number] & {token: string, tokenId: bigint, assetType: number})}), selling: bigint, buying: bigint, sellerFee: bigint})): Promise<string> {
        return this.eth_call(functions.prepareMessage, [order])
    }

    state(): Promise<string> {
        return this.eth_call(functions.state, [])
    }

    transferProxy(): Promise<string> {
        return this.eth_call(functions.transferProxy, [])
    }

    transferProxyForDeprecated(): Promise<string> {
        return this.eth_call(functions.transferProxyForDeprecated, [])
    }
}
