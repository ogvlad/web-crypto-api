export async function getFingerprintAsync(value: any) {
  const sha = await sha256(value)
  const hash = sha.toString()
  return hash[0] + hash[10] + hash[20] + hash[30]
}

async function sha256(message) {
  // Encode the message as an ArrayBuffer
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  
  // Generate the SHA-256 hash
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  
  // Convert the hash result to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("")
  
  return hashHex
}
