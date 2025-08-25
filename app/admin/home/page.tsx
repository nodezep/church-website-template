"use client"

import HomeEditor from "@/components/admin/home-editor"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AdminHomePage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Home Page Content Management</h1>
          <p className="text-gray-600">Edit the main sections of your website</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => router.push("/admin")}
        >
          Back to Admin Dashboard
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <HomeEditor />
      </div>
    </div>
  )
}