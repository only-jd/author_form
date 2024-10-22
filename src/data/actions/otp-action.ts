export const validateIndianPhoneNumber = (phone: string) => {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone)
}

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const sendOtp = (phoneNumber: string, otp: string) => {
  console.log(`Sending OTP ${otp} to ${phoneNumber}`)
  // In a real implementation, you would call an SMS service API here
}

export const verifyOtp = (enteredOtp: string, generatedOtp: string) => {
  return enteredOtp === generatedOtp
}