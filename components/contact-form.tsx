"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.from("contact_messages").insert([formData]).select()

      if (error) {
        throw error
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We will get back to you soon.",
        variant: "default",
      })
      setFormData({ name: "", email: "", subject: "", message: "" }) // Clear form
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send message: " + error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Send Us a Message</h2>
      <div>
        <Label htmlFor="name" className="text-lg">
          Your Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-2 p-3 text-base"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-lg">
          Your Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-2 p-3 text-base"
        />
      </div>
      <div>
        <Label htmlFor="subject" className="text-lg">
          Subject
        </Label>
        <Input
          id="subject"
          type="text"
          placeholder="Inquiry about..."
          value={formData.subject}
          onChange={handleChange}
          required
          className="mt-2 p-3 text-base"
        />
      </div>
      <div>
        <Label htmlFor="message" className="text-lg">
          Your Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="mt-2 p-3 text-base"
        />
      </div>
      <Button type="submit" className="w-full py-3 text-lg" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}
