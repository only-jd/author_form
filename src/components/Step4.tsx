import React from 'react'
import { AuthorTypes } from './types'

interface Step4Props {
  formData: AuthorTypes
  previewUrl: string | null
}

export default function Step4({ formData, previewUrl }: Step4Props) {
  return (
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
  )
}