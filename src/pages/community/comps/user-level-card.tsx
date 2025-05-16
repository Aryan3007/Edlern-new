import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, Lock } from "lucide-react"

export function UserLevelCard() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="flex md:col-span-2 flex-col items-center justify-center">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-sky-700">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User profile" />
                <AvatarFallback className="text-2xl">AT</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-sky-700/40 backdrop-blur-2xl  text-sky-700 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold border-4 border-white">
                1
              </div>
            </div>
            <h2 className="mt-4 text-xl font-bold">Aryan Tyagi</h2>
            <div className="text-sm text-gray-500">Level 1</div>
            <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
              <span>5 points to level up</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                      <HelpCircle className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      Earn points by engaging with the community. Post, comment, and like to level up!
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
                <div className="bg-amber-100 rounded-full w-8 h-8 flex items-center justify-center text-amber-800 font-bold">
                  1
                </div>
                <div className="flex-1">
                  <div className="font-medium text-amber-800 ">Level 1</div>
                  <div className="text-xs text-gray-500">81% of members</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-500">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Level 2</div>
                  <div className="text-xs text-gray-500">
                    Unlock <span className="text-sky-700 font-medium">Post to feed</span> 8% of members
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-500">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Level 3</div>
                  <div className="text-xs text-gray-500">
                    Unlock <span className="text-sky-700 font-medium">Chat with members</span> 5% of members
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-500">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Level 4</div>
                  <div className="text-xs text-gray-500">1% of members</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-500">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Level 5</div>
                  <div className="text-xs text-gray-500">1% of members</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-500">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Level 6</div>
                  <div className="text-xs text-gray-500">1% of members</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-500">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Level 7</div>
                  <div className="text-xs text-gray-500">1% of members</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-500">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Level 8</div>
                  <div className="text-xs text-gray-500">1% of members</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-500">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Level 9</div>
                  <div className="text-xs text-gray-500">1% of members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
