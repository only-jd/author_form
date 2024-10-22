import React from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload, User } from 'lucide-react'

interface Step3Props {
  previewUrl: string | null
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Step3({ previewUrl, handleFileChange }: Step3Props) {
  return (
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
  )
}