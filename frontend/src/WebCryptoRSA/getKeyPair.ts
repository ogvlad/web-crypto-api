import { IRSAKeyPair } from "../types/IWebCryptoRSA"
import { generateKeyPair } from "./generateKeyPair"
import { exportPrivateKey } from "./exportPrivateKey"
import { exportPublicKey, exportPublicKeyXml } from "./exportPublicKey"

export async function getKeyPair(passphrase: string, iterations: number): Promise<IRSAKeyPair> {
  
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
    publicKeyXml: await exportPublicKeyXml(keyPair),
    // publickKeyPem: await spkiToPem(keyPair.publicKey),
  }
}
