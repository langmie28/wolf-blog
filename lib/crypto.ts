async function getKey(): Promise<CryptoKey> {
  const raw = process.env.ENCRYPTION_KEY || ''
  const binary = atob(raw)
  const keyBytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    keyBytes[i] = binary.charCodeAt(i)
  }
  return crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['decrypt'])
}

function b64ToBytes(b64: string): Uint8Array<ArrayBuffer> {
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export async function decrypt(encrypted: string): Promise<string> {
  if (!encrypted.startsWith('enc:')) return encrypted
  const [, ivB64, ciphertext, authTagB64] = encrypted.split(':')

  const key = await getKey()
  const iv: BufferSource = b64ToBytes(ivB64)
  const ct = b64ToBytes(ciphertext)
  const tag = b64ToBytes(authTagB64)

  // Web Crypto expects auth tag appended to ciphertext
  const combined = new Uint8Array(ct.length + tag.length)
  combined.set(ct)
  combined.set(tag, ct.length)

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv, tagLength: 128 },
    key,
    combined,
  )

  return new TextDecoder().decode(decrypted)
}
