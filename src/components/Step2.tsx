import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuthorTypes } from './types'

interface Step2Props {
  formData: AuthorTypes
  handleInputChange:  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSelectChange: (name: string, value: string) => void
}

export default function Step2({ formData, handleInputChange, handleSelectChange }: Step2Props) {
  return (
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
  )
}