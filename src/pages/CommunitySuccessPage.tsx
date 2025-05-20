"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function CommunitySuccessPage() {
  const navigate = useNavigate()
  const communityId = window.location.pathname.split("/").pop() || "default-community-id"


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-lg p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>

        <motion.h1
          className="text-2xl font-bold text-slate-800 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Community Created Successfully!
        </motion.h1>

        <motion.p
          className="text-slate-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Your community has been created and is now ready for members to join. You can start customizing your community
          space and inviting members.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Button
            onClick={() => navigate(`/${communityId}/community/feed`)}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-md w-full transition-colors"
          >
            Enter Your Community
          </Button>
        </motion.div>

     
      </motion.div>
    </div>
  )
}
