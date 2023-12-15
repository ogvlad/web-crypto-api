export function encryptPrivateKey(privateKey: any, encryptionKey: any) {
  return window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv: window.crypto.getRandomValues(new Uint8Array(12)),
    },
    encryptionKey,
    privateKey
  )
}
