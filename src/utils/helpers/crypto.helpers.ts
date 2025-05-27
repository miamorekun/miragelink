// import { openDB, IDBPDatabase } from "idb";

interface KeyPair {
	publicKey: CryptoKey
	privateKey: CryptoKey
}

interface EncryptedMessage {
	iv: Uint8Array
	ciphertext: ArrayBuffer
}

// Generating a ECDH key pair
export async function generateKeyPair(): Promise<KeyPair> {
	const keyPair = await crypto.subtle.generateKey(
		{
			name: "ECDH",
			namedCurve: "P-256", // Elliptic curve
		},
		true, // extractable
		["deriveKey", "deriveBits"],
	)
	return keyPair
}

// Public key export (base64)
export async function exportPublicKey(publicKey: CryptoKey): Promise<string> {
	const exported = await crypto.subtle.exportKey("raw", publicKey)
	return btoa(String.fromCharCode(...new Uint8Array(exported))) // Base64
}

// Other user's public key import (base64)
export async function importPublicKey(base64Key: string): Promise<CryptoKey> {
	const binary = atob(base64Key)
	const buffer = Uint8Array.from(binary, (c) => c.charCodeAt(0)).buffer
	return await crypto.subtle.importKey("raw", buffer, {name: "ECDH", namedCurve: "P-256"}, true, [])
}

// Deriving a shared secret
async function deriveSharedSecret(privateKey: CryptoKey, publicKey: CryptoKey): Promise<CryptoKey> {
	return await crypto.subtle.deriveKey(
		{
			name: "ECDH",
			public: publicKey,
		},
		privateKey,
		{
			name: "AES-GCM",
			length: 256,
		},
		true,
		["encrypt", "decrypt"],
	)
}

// Message encryption
export async function encryptMessage(
	message: string,
	privateKey: CryptoKey,
	recipientPublicKey: CryptoKey,
): Promise<EncryptedMessage> {
	const sharedSecret = await deriveSharedSecret(privateKey, recipientPublicKey)
	const iv = crypto.getRandomValues(new Uint8Array(12)) // Init vector for AES-GCM
	const encodedMessage = new TextEncoder().encode(message)
	const ciphertext = await crypto.subtle.encrypt(
		{
			name: "AES-GCM",
			iv,
		},
		sharedSecret,
		encodedMessage,
	)
	return {iv, ciphertext}
}

// Message decryption
export async function decryptMessage(
	encrypted: EncryptedMessage,
	privateKey: CryptoKey,
	senderPublicKey: CryptoKey,
): Promise<string> {
	const sharedSecret = await deriveSharedSecret(privateKey, senderPublicKey)
	const decrypted = await crypto.subtle.decrypt(
		{
			name: "AES-GCM",
			iv: encrypted.iv,
		},
		sharedSecret,
		encrypted.ciphertext,
	)
	return new TextDecoder().decode(decrypted)
}
