export async function generateAESSecret() {
  try {
    const aesKey = await crypto.subtle.generateKey(
      {
        name: "AES-CBC",
        length: 256, // AES-256
      },
      true, // Key can be used for both encryption and decryption
      ["encrypt", "decrypt"] // Key usages
    )
    const iv = crypto.getRandomValues(new Uint8Array(12)) // 12 bytes for AES-CBC
    
    // @ts-ignore
    const aesKeyBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(await crypto.subtle.exportKey("raw", aesKey))))
    
    // @ts-ignore
    const ivBase64 = btoa(String.fromCharCode.apply(null, iv))
    
    return {
      key: aesKeyBase64,
      iv: ivBase64
    }
  } catch (error) {
    console.error("Error generating AES key:", error)
    throw error
  }
}
