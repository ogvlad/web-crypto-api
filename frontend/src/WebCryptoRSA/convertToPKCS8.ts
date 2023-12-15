export function convertToPKCS8(privateKey: any) {
  return window.crypto.subtle.exportKey("pkcs8", privateKey)
}
