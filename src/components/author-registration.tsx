'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { BookOpen, Feather, Send, ChevronLeft, ChevronRight } from 'lucide-react'
import { Register_Author_Action } from '@/data/actions/register_author_action'
import { AuthorTypes } from '../data/types/types'
import { validateIndianPhoneNumber, generateOtp, sendOtp, verifyOtp } from '../data/actions/otp-action'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

export default function AuthorRegistration() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<AuthorTypes>({
    fullName: '',
    age: 0,
    gender: '',
    contactDetails: '',
    email: '',
    socialMediaLinks: '',
    previousWork: '',
    previousWorkLink: '',
    bio: '',
    education: '',
    domain: '',
    otherDomain: '',
    currentOrganization: '',
    profilePicture: null
  })
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [showOtpError, setShowOtpError] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'contactDetails') {
      setPhoneError('')
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData(prev => ({ ...prev, profilePicture: file }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleNextStep = () => {
    if (step === 1 && !otpVerified) {
      setShowOtpError(true)
      return
    }
    setShowOtpError(false)
    if (step < 4) setStep(prev => prev + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(prev => prev - 1)
  }

  const handleSendOtp = () => {
    const phoneNumber = formData.contactDetails
    if (!validateIndianPhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit Indian phone number')
      return
    }
    setPhoneError('')
    const newOtp = generateOtp()
    setGeneratedOtp(newOtp)
    sendOtp(phoneNumber, newOtp)
    setOtpSent(true)
    setShowOtpDialog(true)
  }

  const handleVerifyOtp = () => {
    if (verifyOtp(otp, generatedOtp)) {
      setOtpVerified(true)
      setShowOtpDialog(false)
      alert('OTP verified successfully!')
    } else {
      alert('Invalid OTP. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!otpVerified) {
      setShowOtpError(true)
      return
    }

    setIsSubmitting(true)
    try {
      const response = await Register_Author_Action(formData)
      if (response.success) {
        console.log('Author registered successfully:', response.data)
        alert("Registration Successful! Welcome to our author community!")
        // Handle success (e.g., redirect to dashboard)
      } else {
        console.error('Failed to register author:', response.error)
        alert(response.error || "An error occurred during registration.")
      }
    } catch (error) {
      console.error('Error during author registration:', error)
      alert("An unexpected error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <header className="text-center">
          <h1 className="text-5xl font-bold mb-2 flex items-center justify-center text-indigo-900 font-serif">
            <BookOpen className="mr-2" /> Join Our Author Community
          </h1>
          <p className="text-xl text-indigo-700 font-sans">Share your stories, inspire the world</p>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="bg-indigo-50 rounded-lg p-6 shadow-inner">
            {step === 1 && (
              <Step1
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                handleSendOtp={handleSendOtp}
                phoneError={phoneError}
                otpVerified={otpVerified}
                validateIndianPhoneNumber={validateIndianPhoneNumber}
                showOtpError={showOtpError}
              />
            )}
            {step === 2 && (
              <Step2
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
              />
            )}
            {step === 3 && (
              <Step3
                previewUrl={previewUrl}
                handleFileChange={handleFileChange}
              />
            )}
            {step === 4 && (
              <Step4 formData={formData} previewUrl={previewUrl} />
            )}
          </div>

          <div className="flex justify-between items-center">
            {step > 1 && (
              <Button type="button" onClick={handlePrevStep} variant="outline" className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
            {step < 4 ? (
              <Button type="button" onClick={handleNextStep} className="ml-auto flex items-center bg-indigo-600 hover:bg-indigo-700 text-white">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={!otpVerified || isSubmitting} className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white">
                {isSubmitting ? 'Submitting...' : <><Send className="mr-2 h-4 w-4" /> Submit</>}
              </Button>
            )}
          </div>
        </form>

        <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify Your Contact Number</DialogTitle>
              <DialogDescription>
                Please enter the OTP sent to your contact number.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
              />
              <Button onClick={handleVerifyOtp} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Verify OTP
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <footer className="text-center text-sm text-indigo-700">
          <p>Join our community of talented authors and let your words inspire the world.</p>
          <p className="mt-2 flex items-center justify-center">
            <Feather className="mr-1" /> Crafted with love by <a href="https://onlyEducation.in" target="_blank" rel="noopener noreferrer" className="text-orange-500 ml-1">OnlyEducation.in</a>
          </p>
        </footer>
      </div>
    </div>
  )
}