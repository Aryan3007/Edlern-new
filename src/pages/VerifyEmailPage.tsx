
"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react"

interface APIResponse {
  message: string
  success: boolean
}

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  
  useEffect(() => {
    const verifyEmail = async () => {
      const uid = searchParams.get("uid")
      const token = searchParams.get("token")

      if (!uid || !token) {
        setStatus("error")
        setMessage("Invalid verification link. Please check the link or contact support.")
        return
      }

      setStatus("loading")

      try {
        const response = await fetch(
          `https://edlern.toolsfactory.tech/api/v1/auth/verify-email/${uid}/${token}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const data: APIResponse = await response.json()

        if (!response.ok) {
          throw new Error(data.message || `Error ${response.status}: ${response.statusText}`)
        }

        if (data.success) {
          setStatus("success")
          setMessage(data.message || "Email verified successfully! You can now log in.")
        } else {
          throw new Error(data.message || "Verification failed.")
        }
      } catch (err) {
        setStatus("error")
        setMessage(err instanceof Error ? err.message : "Failed to verify email. Please try again or contact support.")
      }
    }

    verifyEmail()
  }, [searchParams])

  const handleRedirectToLogin = () => {
    navigate("/login")
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md flex items-center justify-center min-h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Email Verification</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="animate-spin inline-block h-8 w-8">
                <RefreshCw className="h-8 w-8 text-sky-600" />
              </div>
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          )}
          {status === "success" && (
            <div className="flex flex-col items-center gap-4 text-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
              <p className="text-gray-600">{message}</p>
              <Button onClick={handleRedirectToLogin} className="bg-sky-600 hover:bg-sky-700">
                Go to Login
              </Button>
            </div>
          )}
          {status === "error" && (
            <div className="flex flex-col items-center gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-red-600" />
              <p className="text-red-600">{message}</p>
              <Button variant="outline" onClick={handleRedirectToLogin}>
                Back to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}