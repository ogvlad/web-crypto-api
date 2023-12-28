export async function decryptWithAES(encryptedData, aesKeyBase64, ivBase64) {
  
  // Decode the AES key and IV from Base64 to binary data
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
    ["decrypt"]
  )
  
  const encryptedBytes = new Uint8Array(Array.from(atob(encryptedData), (c) => c.charCodeAt(0)));
  
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv,
    },
    aesKey,
    encryptedBytes
  )
  
  // Convert the decrypted ArrayBuffer to a text string (or other data format)
  const decryptedText = new TextDecoder().decode(decryptedData)
  
  return decryptedText
}
