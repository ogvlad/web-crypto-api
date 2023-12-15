export function createEncryptionKey(passphraseKey: any, salt: any, iterations: number) {
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-256"
    },
    passphraseKey,
    { name: "AES-CBC", length: 256 },
    true,
    ["encrypt", "wrapKey", "unwrapKey"]
  )
}
