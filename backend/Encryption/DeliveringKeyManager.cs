using System;
using System.Security.Cryptography;
using System.Text;

namespace SandboxAPI.Encryption
{
    public sealed class DeliveringKeyManager
    {
        const int RsaKeySize = 2048;
        const string TextToEncrypt = "A quick brown fox jumps over the lazy dog";

        public static DeliveringKeyModel GetEncryptedKey_Binary(Request request)
        {
            var publicKey = Convert.FromBase64String(request.publicKeyBase64);
            var data = Encoding.UTF8.GetBytes(TextToEncrypt);

            using RSACryptoServiceProvider provider = new RSACryptoServiceProvider(RsaKeySize);
            provider.ImportSubjectPublicKeyInfo(publicKey, out _);

            //COMMENTS FROM SCD(RUPP): 
            //SHA-1 is the default hash for RSA in .NET 
            //for OAEP, SHA-1 padding must be specified explicitely
            //using bool fOAEP does not work 
           //byte[] encryptedBytes = provider.Encrypt(data, true);
			byte[] encryptedBytes = provider.Encrypt(data, RSAEncryptionPadding.OaepSHA1);
			

			string encryptedText = Convert.ToBase64String(encryptedBytes);
            return new DeliveringKeyModel
            {
                EncryptedMessage = encryptedText,
                Mode = $"Binary Key - {DateTime.Now.ToLongTimeString()}"
            };
        }

        public static DeliveringKeyModel GetEncryptedKey_XML(Request request)
        {
            var data = Encoding.UTF8.GetBytes(TextToEncrypt);

            //modif
            


            using RSACryptoServiceProvider provider = new RSACryptoServiceProvider(RsaKeySize);
            provider.FromXmlString(request.publicKeyXml);
            var encryptedBytes = provider.Encrypt(data, RSAEncryptionPadding.OaepSHA1);
            string encryptedText = Convert.ToBase64String(encryptedBytes);

            return new DeliveringKeyModel
            {
                EncryptedMessage = encryptedText,
                Mode = $"XML Key - {DateTime.Now.ToLongTimeString()}"
            };
        }

        public static DeliveringKeyModel GetEncryptedKey_Hardcoded(string publicKeyBase64)
        {
            return GetEncryptedKey_Binary(new Request
            {
                publicKeyBase64 = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi/55D48kl2NpNOVGLtI5I4pekPRLnjreMYW3Ktqecv28jN7Iw7DOLdOFKKgTuWlLESOR4E6lEG5Q0aNuAvC6GrwHRYpFdQQWdgkPHO0gzOBin0LVP7baMA90fKv3xgC3OOgAHvX59XiylEJb94lYTLqAYVROr9AHEKm2JKnjopu2JUKDG6pTOQP/7V2cZf+QrKbvne8FEt2ZNy4h0ddOpCZZQaaQRfpOZnWaDtVqQ6HNbhnkyKk0tqaz1Bd+Y/taFE8j1W/IE19Llma8pP4ty+RNqtJJnEcaeiUIvtlVTRVWVvUZJv4FLCggxBY5/kFHI2vbgqHMng5LlVkROz+AxQIDAQAB"

            });
        }
    }
}
