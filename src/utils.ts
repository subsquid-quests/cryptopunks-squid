import {FindOptionsRelations} from 'typeorm'

export function isObject(value: any): value is object {
    return value && typeof value === 'object' && !Array.isArray(value)
}

export function bigintToHex(value: bigint): string {
    return '0x' + value.toString(16).toLowerCase()
}

export function uint256ToHex(id: bigint) {
    return '0x' + bigintToHex(id).toLowerCase().slice(2).padStart(64, '0')
}

export function uint8ArrayToHex(array: Uint8Array): string {
    const buffer = Buffer.from(array)
    return `0x${buffer.toString('hex')}`.toLowerCase()
}

export function hexToByteArray(hexString: string) {
    if (hexString.startsWith('0x')) {
        hexString = hexString.slice(2) // remove prefix
    }
    return Buffer.from(hexString, 'hex')
}

type Primitive = string | number | boolean | symbol | bigint
export type ObjectProps<T> = {
    [K in keyof T]: T[K] extends
        | Uint8Array
        | Primitive
        | (infer R)[]
        | null
        | undefined
        ? never
        : K
}[keyof T]
export type NonNullableProps<T> = {
    [K in keyof T]: null | undefined extends T[K] ? never : K
}[keyof T]
export type ArrayProps<T> = {
    [K in keyof T]: T[K] extends (infer R)[] ? K : never
}[keyof T]
export type NullableProps<T> = Exclude<keyof T, NonNullableProps<T>>
export type NullableObjectProps<T> = Extract<NullableProps<T>, ObjectProps<T>>
export type SoftNullableProps<T> =
    | NullableProps<T>
    | NullableObjectProps<T>
    | ArrayProps<T>
export type NotSoftNullableProps<T> = Exclude<keyof T, SoftNullableProps<T>>
export type RequiredProps<T> = Pick<T, NotSoftNullableProps<T>>
export type OptionalProps<T> = Partial<Pick<T, SoftNullableProps<T>>>
export type PropsToInstantiate<T> = RequiredProps<T> & OptionalProps<T>

/**
 * merge two relations
 * objects are prioritized over booleans
 */
export function mergeRelations<T>(
    a: FindOptionsRelations<T>,
    b: FindOptionsRelations<T>,
): FindOptionsRelations<T> {
    const result: FindOptionsRelations<T> = {...a}
    for (const key in b) {
        if (b.hasOwnProperty(key)) {
            const typedKey = key as keyof FindOptionsRelations<T>
            const aValue = a[typedKey]
            const bValue = b[typedKey]
            if (isObject(bValue)) {
                ;(result as any)[typedKey] = isObject(aValue)
                    ? mergeRelations(aValue, bValue)
                    : bValue
            } else {
                result[typedKey] = isObject(aValue) ? aValue : bValue
            }
        }
    }

    return result
}
/**
 * Instantiate Entity with required props
 * So there would be less checks for null/undefined
 * @param ClassType - Entity class
 * @param props - props
 * @returns - new instance of Entity
 */
export function instantiate<T>(
    ClassType: new (props?: PropsToInstantiate<T>) => T,
    props: PropsToInstantiate<T>,
): T {
    return new ClassType(props)
}

export function callOnce<T extends (...args: any[]) => any>(fn: T): T {
    let called = false
    let result: any

    return ((...args: any[]) => {
        if (!called) {
            result = fn(...args)
            called = true
        }
        return result
    }) as T
}

export function* chunkArray<T>(
    array: T[],
    chunkSize: number,
): IterableIterator<T[]> {
    for (let i = 0; i < array.length; i += chunkSize) {
        yield array.slice(i, i + chunkSize)
    }
}

export async function sleepAsync(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
