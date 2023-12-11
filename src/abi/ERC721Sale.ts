import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './ERC721Sale.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Buy: new LogEvent<([token: string, tokenId: bigint, seller: string, buyer: string, price: bigint, nonce: bigint] & {token: string, tokenId: bigint, seller: string, buyer: string, price: bigint, nonce: bigint})>(
        abi, '0x7a212d757c7290587e1c8f7100a01a3d09466d58945058b6f22a179013475a90'
    ),
    Cancel: new LogEvent<([token: string, tokenId: bigint, owner: string, nonce: bigint] & {token: string, tokenId: bigint, owner: string, nonce: bigint})>(
        abi, '0xb8b7c5e8b8890227e1f8844a1b6bf94a9061b5ff6f8c75ae7db63926b22be27a'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
}

export const functions = {
    beneficiary: new Func<[], {}, string>(
        abi, '0x38af3eed'
    ),
    buy: new Func<[token: string, tokenId: bigint, price: bigint, sellerFee: bigint, signature: ([v: number, r: string, s: string] & {v: number, r: string, s: string})], {token: string, tokenId: bigint, price: bigint, sellerFee: bigint, signature: ([v: number, r: string, s: string] & {v: number, r: string, s: string})}, []>(
        abi, '0xa4ddbaa6'
    ),
    buyerFee: new Func<[], {}, bigint>(
        abi, '0x5de6c42f'
    ),
    cancel: new Func<[token: string, tokenId: bigint], {token: string, tokenId: bigint}, []>(
        abi, '0x98590ef9'
    ),
    isOwner: new Func<[], {}, boolean>(
        abi, '0x8f32d59b'
    ),
    nonceHolder: new Func<[], {}, string>(
        abi, '0x41a259a6'
    ),
    onERC721Received: new Func<[_: string, _: string, _: bigint, _: string], {}, string>(
        abi, '0x150b7a02'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    setBeneficiary: new Func<[_beneficiary: string], {_beneficiary: string}, []>(
        abi, '0x1c31f710'
    ),
    setBuyerFee: new Func<[_buyerFee: bigint], {_buyerFee: bigint}, []>(
        abi, '0xfa7da19d'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    transferProxy: new Func<[], {}, string>(
        abi, '0x6e667db3'
    ),
}

export class Contract extends ContractBase {

    beneficiary(): Promise<string> {
        return this.eth_call(functions.beneficiary, [])
    }

    buyerFee(): Promise<bigint> {
        return this.eth_call(functions.buyerFee, [])
    }

    isOwner(): Promise<boolean> {
        return this.eth_call(functions.isOwner, [])
    }

    nonceHolder(): Promise<string> {
        return this.eth_call(functions.nonceHolder, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    transferProxy(): Promise<string> {
        return this.eth_call(functions.transferProxy, [])
    }
}
