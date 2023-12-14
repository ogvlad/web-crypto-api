import { IAESSecret, IWebCryptoAES } from "./types/IWebCryptoAES"

export class WebCryptoAES implements IWebCryptoAES {
  async generate(): Promise<IAESSecret> {
    const secret = await generateAESSecret()
    return { key: secret.key, iv: secret.iv }
  }
  
  async encrypt(data: string, secret: IAESSecret): Promise<string> {
    return await encryptWithBase64AESKeyAndIV(data, secret.key, secret.iv)
  }
  
  async decrypt(encryptedData: string, secret: IAESSecret): Promise<string> {
    return await decryptWithAES(encryptedData, secret.key, secret.iv)
  }
}

async function generateAESSecret() {
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

async function encryptWithBase64AESKeyAndIV(plainText, aesKeyBase64, ivBase64) {
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

async function decryptWithAES(encryptedData, aesKeyBase64, ivBase64) {
  
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
