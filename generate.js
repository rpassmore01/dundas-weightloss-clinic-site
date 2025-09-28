import speakeasy from "speakeasy";

const secret = speakeasy.generateSecret({
  name: "Weight Loss Clinic",
});

console.log("Base32 Secret:", secret.base32);
console.log("QR Code URL:", secret.otpauth_url);
