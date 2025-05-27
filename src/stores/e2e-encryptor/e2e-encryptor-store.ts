import {E2EEncryptorEncryptedValue} from "@/types/e2e-encryptor.types"

import {get as getKeyVal, keys, set as setKeyVal} from "idb-keyval"

export class E2EEncryptorStore {
	static idbKey = "e2e-encryptor-keys"

	// Keys
	static generateKeyPair = async (): Promise<CryptoKeyPair> => {
		const keyPair = await crypto.subtle.generateKey({name: "ECDH", namedCurve: "P-256"}, true, [
			"deriveKey",
			"deriveBits",
		])

		return keyPair
	}

	static exportKey = async (key: CryptoKey): Promise<string> => {
		const exported = await crypto.subtle.exportKey("raw", key)
		return btoa(String.fromCharCode(...new Uint8Array(exported))) // Base64
	}

	static importKey = async (base64Key: string): Promise<CryptoKey> => {
		const binary = atob(base64Key)
		const buffer = Uint8Array.from(binary, (c) => c.charCodeAt(0)).buffer
		return await crypto.subtle.importKey(
			"raw",
			buffer,
			{name: "ECDH", namedCurve: "P-256"},
			true,
			[],
		)
	}

	static deriveKey = async (keyPair: CryptoKeyPair): Promise<CryptoKey> => {
		return await crypto.subtle.deriveKey(
			{
				name: "ECDH",
				public: keyPair.publicKey,
			},
			keyPair.privateKey,
			{
				name: "AES-GCM",
				length: 256,
			},
			true,
			["encrypt", "decrypt"],
		)
	}

	static encrypt = async (
		value: string,
		keyPair: CryptoKeyPair,
	): Promise<E2EEncryptorEncryptedValue> => {
		const derivedKey = await E2EEncryptorStore.deriveKey(keyPair)
		const iv = crypto.getRandomValues(new Uint8Array(12)) // Init vector for AES-GCM
		const encodedValue = new TextEncoder().encode(value)
		const ciphertext = await crypto.subtle.encrypt(
			{
				name: "AES-GCM",
				iv,
			},
			derivedKey,
			encodedValue,
		)

		return {
			iv: iv,
			ciphertext: ciphertext,
		}
	}

	static decrypt = async (
		encrypted: E2EEncryptorEncryptedValue,
		keyPair: CryptoKeyPair,
	): Promise<string> => {
		const derivedKey = await E2EEncryptorStore.deriveKey(keyPair)
		const decrypted = await crypto.subtle.decrypt(
			{
				name: "AES-GCM",
				iv: encrypted.iv,
			},
			derivedKey,
			encrypted.ciphertext,
		)
		return new TextDecoder().decode(decrypted)
	}

	static getKeys = async () => {
		const key = await getKeyVal(E2EEncryptorStore.idbKey)
		return key as CryptoKeyPair
	}

	static setKeys = async (keys: {privateKey: CryptoKey; publicKey: CryptoKey}) => {
		await setKeyVal(E2EEncryptorStore.idbKey, keys)
	}
}
