'use client'

import React, { useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { BookOpen, Feather, Send, ChevronLeft, ChevronRight, Upload, User } from 'lucide-react'
import { Register_Author_Action } from '@/data/actions/register_author_action'

interface FormData {
  fullName: string;
  age: string;
  gender: string;
  contactDetails: string;
  email: string;
  socialMediaLinks: string;
  previousWork: string;
  previousWorkLink: string;
  bio: string;
  education: string;
  domain: string;
  otherDomain: string;
  currentOrganization: string;
  profilePicture: File | null;
}

export default function AuthorRegistration() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
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
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData(prev => ({ ...prev, profilePicture: file }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleNextStep = () => {
    if (step < 4) setStep(prev => prev + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(prev => prev - 1)
  }

  const handleSendOtp = () => {
    // Placeholder for OTP sending logic
    console.log('Sending OTP to', formData.contactDetails)
    setOtpSent(true)
    setShowOtpDialog(true)
  }

  const handleVerifyOtp = () => {
    // Placeholder for OTP verification logic
    console.log('Verifying OTP', otp)
    setOtpVerified(true)
    setShowOtpDialog(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (otpVerified) {
      // Placeholder for form submission logic
      console.log('Form submitted', formData)
    const res =  await  Register_Author_Action(formData)

    } else {
      alert('Please verify your contact number before submitting.')
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
                  <RadioGroup name="gender" value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)} className="mt-2  flex space-x-4">
                    <div className="flex items-center">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="ml-2 font-">Male</Label>
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
                    <div className="flex space-x-2 mt-1">
                      <Input id="contactDetails" name="contactDetails" required value={formData.contactDetails} onChange={handleInputChange} />
                      <Button type="button" onClick={handleSendOtp} disabled={otpVerified} className="bg-indigo-600 hover:bg-indigo-700 text-white">
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
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="previousWork" className="text-lg font-semibold text-indigo-900">Previous Work (Optional)</Label>
                    <Input id="previousWork" name="previousWork" value={formData.previousWork} onChange={handleInputChange} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="previousWorkLink" className="text-lg font-semibold text-indigo-900">Link to Previous Work (Optional)</Label>
                    <Input id="previousWorkLink" name="previousWorkLink" value={formData.previousWorkLink} onChange={handleInputChange} className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio" className="text-lg font-semibold text-indigo-900">Bio (Tell us about yourself)</Label>
                  <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} className="mt-1" rows={4} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="education" className="text-lg font-semibold text-indigo-900">Educational Qualification</Label>
                    <Input id="education" name="education" value={formData.education} onChange={handleInputChange} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="domain" className="text-lg font-semibold text-indigo-900">Domain of Expertise</Label>
                    <Select name="domain" value={formData.domain} onValueChange={(value) => handleSelectChange('domain', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fiction">Fiction</SelectItem>
                        <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                        <SelectItem value="poetry">Poetry</SelectItem>
                        <SelectItem value="journalism">Journalism</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {formData.domain === 'other' && (
                  <div>
                    <Label htmlFor="otherDomain" className="text-lg font-semibold text-indigo-900">Please specify your domain</Label>
                    <Input id="otherDomain" name="otherDomain" value={formData.otherDomain} onChange={handleInputChange} className="mt-1" />
                  </div>
                )}
                <div>
                  <Label htmlFor="currentOrganization" className="text-lg font-semibold text-indigo-900">Current Organization (if any)</Label>
                  <Input id="currentOrganization" name="currentOrganization" value={formData.currentOrganization} onChange={handleInputChange} className="mt-1" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="profilePicture" className="text-lg font-semibold text-indigo-900">Profile Picture (Optional)</Label>
                  <div className="mt-1 flex items-center space-x-4">
                    <Input id="profilePicture" name="profilePicture" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    <Button type="button" onClick={() => document.getElementById('profilePicture')?.click()} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      <Upload className="mr-2 h-4 w-4" /> Upload Image
                    </Button>
                    {previewUrl ? (
                      <img src={previewUrl} alt="Profile Preview" className="w-24 h-24 object-cover rounded-full" />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-indigo-200 flex items-center justify-center">
                        <User className="h-12 w-12 text-indigo-500" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-indigo-900">Review Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Full Name:</p>
                    <p>{formData.fullName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Age:</p>
                    <p>{formData.age}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Gender:</p>
                    <p>{formData.gender}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Contact Number:</p>
                    <p>{formData.contactDetails}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p>{formData.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Social Media Links:</p>
                    <p>{formData.socialMediaLinks || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Previous Work:</p>
                    <p>{formData.previousWork || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Link to Previous Work:</p>
                    <p>{formData.previousWorkLink || 'N/A'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold">Bio:</p>
                    <p>{formData.bio}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Educational Qualification:</p>
                    <p>{formData.education}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Domain of Expertise:</p>
                    <p>{formData.domain === 'other' ? formData.otherDomain : formData.domain}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Current Organization:</p>
                    <p>{formData.currentOrganization || 'N/A'}</p>
                  
                  </div>
                  <div>
                    <p className="font-semibold">Profile Picture:</p>
                    {previewUrl ? (
                      <img src={previewUrl} alt="Profile Preview" className="w-24 h-24 object-cover mt-3 ml-1 rounded-full" />
                    ) : (
                      <p>No image uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center ">
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
              <Button type="submit" disabled={!otpVerified} className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white">
                <Send className="mr-2 h-4 w-4" /> Submit
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
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