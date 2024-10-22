import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { AuthorTypes } from '../data/types/types'
import { validateIndianPhoneNumber } from '../data/actions/otp-action'

interface Step1Props {
  formData: AuthorTypes
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSelectChange: (name: string, value: string) => void
  handleSendOtp: () => void
  phoneError: string
  otpVerified: boolean
  showOtpError: boolean
}

export default function Step1({
  formData,
  handleInputChange,
  handleSelectChange,
  handleSendOtp,
  phoneError,
  otpVerified,
  showOtpError
}: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName" className="text-lg font-semibold text-indigo-900">Full Name</Label>
          <Input id="fullName" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="age" className="text-lg font-semibold text-indigo-900">Age</Label>
          <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} className="mt-1" />
        </div>
      </div>
      <div>
        <Label className="text-lg font-semibold text-indigo-900">Gender</Label>
        <RadioGroup name="gender" value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)} className="mt-2 flex space-x-4">
          <div className="flex items-center">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="ml-2">Male</Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="ml-2">Female</Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="ml-2">Other</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contactDetails" className="text-lg font-semibold text-indigo-900">Contact Number</Label>
          <div className="flex flex-col space-y-2 mt-1">
            <Input 
              id="contactDetails" 
              name="contactDetails" 
              required 
              value={formData.contactDetails} 
              onChange={handleInputChange}
              placeholder="Enter 10-digit Indian phone number"
            />
            {phoneError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{phoneError}</AlertDescription>
              </Alert>
            )}
            <Button 
              type="button" 
              onClick={handleSendOtp} 
              disabled={otpVerified || !validateIndianPhoneNumber(formData.contactDetails)} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {otpVerified ? 'Verified' : 'Send OTP'}
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="email" className="text-lg font-semibold text-indigo-900">Email</Label>
          <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="mt-1" />
        </div>
      </div>
      <div>
        <Label htmlFor="socialMediaLinks" className="text-lg font-semibold text-indigo-900">Social Media Links (e.g., LinkedIn)</Label>
        <Input id="socialMediaLinks" name="socialMediaLinks" value={formData.socialMediaLinks} onChange={handleInputChange} className="mt-1" />
      </div>
      {showOtpError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Please verify your contact number before proceeding.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}