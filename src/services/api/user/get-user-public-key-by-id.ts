import {supabaseClient} from "@/utils/supabase"
import {importPublicKey} from "@/utils/helpers/crypto.helpers"

export async function getUserPublicKeyById(userId: string): Promise<CryptoKey> {
	const {data, error} = await supabaseClient
		.from("users") // or 'public_keys' table
		.select("public_key")
		.eq("id", userId)
		.single()
	if (error) throw error
	if (!data?.public_key) throw new Error("Public key not found")
	return importPublicKey(data.public_key) // Convert base64 to CryptoKey
}
