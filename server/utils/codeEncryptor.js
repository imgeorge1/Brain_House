import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.CODE_SECRET || "your-super-secret-key";

// Expires in 10 minutes
export const encryptCode = (email, code) => {
  const expiresAt = Date.now() + 10 * 60 * 1000;

  const payload = JSON.stringify({ email, code, expiresAt });

  return CryptoJS.AES.encrypt(payload, SECRET_KEY).toString();
};

export const decryptCode = (token) => {
  const bytes = CryptoJS.AES.decrypt(token, SECRET_KEY);
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decrypted;
};
