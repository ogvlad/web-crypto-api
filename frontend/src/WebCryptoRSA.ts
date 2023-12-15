import { GetTokenFunc } from "./types/GetTokenFunc"
import { IRSAKeyPair, IWebCryptoRSA } from "./types/IWebCryptoRSA"
import { Base64String } from "./types/Base64String"

const ITERATIONS = 100000
const MODULUS_LENGTH = 2048
const PUBLIC_EXPONENT = new Uint8Array([0x01, 0x00, 0x01]) // 65537

export class WebCryptoRSA implements IWebCryptoRSA {
  
  async generateKeyPair(getToken: GetTokenFunc) {
    return await getKeyPair(getToken(), ITERATIONS)
  }
  
  async encrypt(data: string, publicKey: CryptoKey) {
    const dataBuffer = new TextEncoder().encode(data)
    
    const bytes = await crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      dataBuffer
    )
    return toBase64(bytes)
  }
  
  async encrypt2(plainData: string, publicKey: Base64String) {
    const publicKeyCryptoKey = await importPublicKey(publicKey)
    console.debug(publicKeyCryptoKey)
    return await this.encrypt(plainData, publicKeyCryptoKey)
  }
  
  // ENCRYPT: string > bytes > encrypt > bytes > Base64
  // DECRYPT: Base64 > bytes > decrypt > bytes > string
  
  async decrypt(encryptedData: Base64String, privateKey: CryptoKey) {
    const dataBuffer = fromBase64(encryptedData)
    console.debug({dataBuffer})
    const bytes = await crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      privateKey,
      dataBuffer
    )
    return new TextDecoder().decode(bytes)
  }
  
  async decrypt2(encryptedData: Base64String, privateKey: Base64String): Promise<string> {
    const publicKeyCryptoKey = await importPrivateKey(privateKey)
    console.debug("Private Key decoded")
    console.debug({publicKeyCryptoKey})
    return this.decrypt(encryptedData, publicKeyCryptoKey)
  }
}

async function getKeyPair(passphrase: string, iterations: number): Promise<IRSAKeyPair> {
  
  const keyPair = await generateKeyPair()
  
  // const exportedPrivateKey = await convertToPKCS8(keyPair.privateKey)
  
  // const passphraseKey = await createPassphraseKey(passphrase)
  
  // const salt = crypto.getRandomValues(new Uint8Array(16))
  
  // const encryptionKey = await createEncryptionKey(passphraseKey, salt, iterations)
  
  // const encryptedPrivateKey = await encryptPrivateKey(exportedPrivateKey, encryptionKey)
  
  return {
    // salt,
    // privateKey: encryptedPrivateKey,
    privateKey: keyPair.privateKey,
    privateKeyBase64: await exportPrivateKey(keyPair),
    publicKey: keyPair.publicKey,
    publicKeyBase64: await exportPublicKey(keyPair),
    publickKeyPem: await spkiToPem(keyPair.publicKey),
  }
}


function generateKeyPair() {
  return window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: MODULUS_LENGTH,
      publicExponent: PUBLIC_EXPONENT,
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  )
}

function convertToPKCS8(privateKey: any) {
  return window.crypto.subtle.exportKey("pkcs8", privateKey)
}

function createPassphraseKey(passphrase: string) {
  return window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  )
}

function createEncryptionKey(passphraseKey: any, salt: any, iterations: number) {
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

function encryptPrivateKey(privateKey: any, encryptionKey: any) {
  return window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv: window.crypto.getRandomValues(new Uint8Array(12)),
    },
    encryptionKey,
    privateKey
  )
}

async function exportPrivateKey(keyPair: any) {
  const exportedKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey)
  return toBase64(exportedKey)
}

async function exportPublicKey(keyPair: any) {
  const exportedKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey)
  return toBase64(exportedKey)
}

function toBase64(buffer: ArrayBuffer): Base64String {
  let binary = ""
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  
  return window.btoa(binary)
}

function fromBase64(base64: Base64String): Uint8Array {
  console.debug({base64})
  const binaryString = atob(base64)
  console.debug({binaryString})
  const byteArray = new Uint8Array(binaryString.length)
  console.debug({byteArray})
  
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i)
  }
  console.debug({byteArray})
  
  return byteArray
}

// Helper function to convert SPKI to PEM
async function spkiToPem(publicKey: any) {
  const base64Spki = toBase64(publicKey)
  const pemHeader = "-----BEGIN PUBLIC KEY-----\n"
  const pemFooter = "-----END PUBLIC KEY-----\n"
  const pemChunks: string[] = []
  let index = 0
  
  while (index < base64Spki.length) {
    pemChunks.push(base64Spki.slice(index, index + 64))
    index += 64
  }
  
  return pemHeader + pemChunks.join("\n") + "\n" + pemFooter
}


function importPublicKey(publicKeyText: Base64String): Promise<CryptoKey> {
  // Decode the Base64-encoded public key string to get the raw key data
  const buffer = fromBase64(publicKeyText)
  
  // Import the public key as a CryptoKey
  return window.crypto.subtle.importKey(
    "spki",
    buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  )
}

function importPrivateKey(privateKeyText: Base64String): Promise<CryptoKey> {
  const buffer = fromBase64(privateKeyText)
  
  return window.crypto.subtle.importKey(
    "pkcs8",
    buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  )
}