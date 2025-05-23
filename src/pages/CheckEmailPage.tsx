"use client"

import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function CheckEmailPage() {
  const navigate = useNavigate()

  const handleRedirectToLogin = () => {
    navigate("/login")
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md flex items-center justify-center min-h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Check Your Email</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <Mail className="h-12 w-12 text-sky-600" />
          <p className="text-gray-600">
            We've sent a verification email to your registered email address. Please check your inbox (and spam/junk folder) for a link to verify your email.
          </p>
          <Button onClick={handleRedirectToLogin} className="bg-sky-600 hover:bg-sky-700">
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}