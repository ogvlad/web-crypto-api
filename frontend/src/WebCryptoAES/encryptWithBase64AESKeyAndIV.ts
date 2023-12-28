export async function encryptWithBase64AESKeyAndIV(plainText, aesKeyBase64, ivBase64) {
  try {
    // Decode the Base64-encoded AES key and IV to binary data
    const aesKeyBytes = new Uint8Array(Array.from(atob(aesKeyBase64), (c) => c.charCodeAt(0)))
    const iv = new Uint8Array(Array.from(atob(ivBase64), (c) => c.charCodeAt(0)))
    
    // Import the AES key from its raw format
    const aesKey = await crypto.subtle.importKey(
      "raw",
      aesKeyBytes,
      {
        name: "AES-CBC",
      },
      false,
      ["encrypt"]
    )
    
    // Encrypt the data using AES-CBC
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: "AES-CBC",
        iv,
      },
      aesKey,
      new TextEncoder().encode(plainText)
    )
    
    // @ts-ignore
    const encryptedBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedData)))
    
    return encryptedBase64
  } catch (error) {
    console.error("Error encrypting with AES:", error)
    throw error
  }
}
