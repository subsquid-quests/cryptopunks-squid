import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './CryptoPunksData.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const functions = {
    addAsset: new Func<[index: number, encoding: string, name: string], {index: number, encoding: string, name: string}, []>(
        abi, '0xdae2ae20'
    ),
    addComposites: new Func<[key1: bigint, value1: number, key2: bigint, value2: number, key3: bigint, value3: number, key4: bigint, value4: number], {key1: bigint, value1: number, key2: bigint, value2: number, key3: bigint, value3: number, key4: bigint, value4: number}, []>(
        abi, '0x6f2a6568'
    ),
    addPunks: new Func<[index: number, _punks: string], {index: number, _punks: string}, []>(
        abi, '0x26b97364'
    ),
    punkAttributes: new Func<[index: number], {index: number}, string>(
        abi, '0x76dfe297'
    ),
    punkImage: new Func<[index: number], {index: number}, string>(
        abi, '0x3e5e0a96'
    ),
    punkImageSvg: new Func<[index: number], {index: number}, string>(
        abi, '0x74beb047'
    ),
    sealContract: new Func<[], {}, []>(
        abi, '0x68bd580e'
    ),
    setPalette: new Func<[_palette: string], {_palette: string}, []>(
        abi, '0x844e2cd5'
    ),
}

export class Contract extends ContractBase {

    punkAttributes(index: number): Promise<string> {
        return this.eth_call(functions.punkAttributes, [index])
    }

    punkImage(index: number): Promise<string> {
        return this.eth_call(functions.punkImage, [index])
    }

    punkImageSvg(index: number): Promise<string> {
        return this.eth_call(functions.punkImageSvg, [index])
    }
}
