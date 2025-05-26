"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Lock, Globe, Sparkles, CreditCard, HelpCircle, MoreHorizontal, Settings, Save, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "general", label: "General" },
  { id: "payouts", label: "Payouts" },
  { id: "pricing", label: "Pricing" },
  { id: "billing", label: "Billing" },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [groupName, setGroupName] = useState("test")
  const [groupDescription, setGroupDescription] = useState("")
  const [privacy, setPrivacy] = useState("private")
  const [freeTrialEnabled, setFreeTrialEnabled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSaveGeneral = () => {
    console.log("Saving general settings...")
  }

  const handleSavePayouts = () => {
    console.log("Saving payout settings...")
  }

  const handleSavePricing = () => {
    console.log("Saving pricing settings...")
  }

  const handleSaveBilling = () => {
    console.log("Saving billing settings...")
  }

  const SidebarContent = () => (
    <nav className="space-y-1 p-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id)
            setSidebarOpen(false)
          }}
          className={cn(
            "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            activeTab === tab.id ? "bg-sky-600 text-white" : "text-foreground hover:bg-muted",
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-8">
            {/* Icon and Cover Upload */}
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="space-y-2">
                <Label className="text-lg font-medium">Icon</Label>
                <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                  <div className="text-center">
                    <Button variant="link" className="text-sky-600 p-0 h-auto">
                      Upload
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recommended:
                  <br />
                  128x128
                </p>
                <Button variant="outline" className="w-full">
                  CHANGE
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Cover</Label>
                <div className="w-full lg:w-64 h-32 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                  <div className="text-center">
                    <Button variant="link" className="text-sky-600 p-0 h-auto">
                      Upload
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recommended:
                  <br />
                  1084x576
                </p>
                <Button variant="outline" className="w-full lg:w-64">
                  CHANGE
                </Button>
              </div>
            </div>

            {/* Group Name */}
            <div className="space-y-2">
              <Label htmlFor="groupName" className="text-sm font-medium">
                Group name
              </Label>
              <Input
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full max-w-2xl"
              />
              <div className="text-right text-sm text-muted-foreground">{groupName.length} / 30</div>
            </div>

            {/* Group Description */}
            <div className="space-y-2">
              <Textarea
                placeholder="Group description"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="min-h-[100px] w-full max-w-2xl resize-none"
              />
              <div className="text-right text-sm text-muted-foreground">{groupDescription.length} / 150</div>
            </div>

            {/* Custom URL */}
            <Card className="bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800 w-full max-w-2xl">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-sky-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Stand out with a custom URL</h3>
                      <p className="text-sky-600 text-sm break-all">skool.com/test-7338</p>
                    </div>
                  </div>
                  <Button className="bg-sky-600 hover:bg-sky-700 text-white whitespace-nowrap">CHANGE URL</Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <div className="space-y-4 w-full max-w-2xl">
              <RadioGroup value={privacy} onValueChange={setPrivacy} className="space-y-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="private" id="private" className="mt-1" />
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <Label htmlFor="private" className="font-medium">
                      Private
                    </Label>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Only members can see who's in the group and what they post. Content is hidden from search engines.
                </p>

                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="public" id="public" className="mt-1" />
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <Label htmlFor="public" className="font-medium">
                      Public
                    </Label>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Anyone can see who's in the group and what they post. Content is discoverable by search engines.
                </p>
              </RadioGroup>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSaveGeneral} className="bg-sky-600 hover:bg-sky-700 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        )

      case "payouts":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Payouts</h2>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <Card className="bg-muted">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold">$0.00</div>
                  <div className="text-sm text-muted-foreground mt-1">Account balance</div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <div className="font-medium">Next payout will be $0 in 2 days</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>$0 is pending</span>
                  <HelpCircle className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="text-muted-foreground">No payouts yet</div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSavePayouts} className="bg-sky-600 hover:bg-sky-700 text-white">
                <Save className="h-4 w-4 mr-2" />
                Update Payouts
              </Button>
            </div>
          </div>
        )

      case "pricing":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Pricing</h2>
              <p className="text-muted-foreground">
                Make money by charging for access to your community.{" "}
                <Button variant="link" className="p-0 h-auto text-sky-600">
                  Learn more.
                </Button>
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="w-6 h-6 border-2 border-muted-foreground rounded"></div>
                    <span className="font-medium">Free</span>
                    <span className="text-sky-600">2 members</span>
                    <Badge className="bg-green-600 hover:bg-green-700">Current price</Badge>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <Button className="bg-sky-600 hover:bg-sky-700 text-white">ADD PRICE</Button>
                  <div className="flex items-center gap-3">
                    <Switch checked={freeTrialEnabled} onCheckedChange={setFreeTrialEnabled} />
                    <span className="text-sm">Give members a 7-day free trial</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSavePricing} className="bg-sky-600 hover:bg-sky-700 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Pricing
              </Button>
            </div>
          </div>
        )

      case "billing":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold">Billing</h2>

            <div className="space-y-2">
              <p>Payment method — DISCOVER ending in 6242.</p>
              <p>Your 14-day free trial ends on May 26th, 2025.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Update payment method
              </Button>
              <Button variant="outline">Manage subscription</Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Automatic affiliate earnings</h3>
              <p className="text-muted-foreground">
                If somebody creates a group from your group, we'll automatically pay you 40% every month. This way Skool
                becomes an income stream, not a cost. Earnings will go to this admin:
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <span className="font-medium">Aryan Tyagi</span>
                <Button variant="link" className="text-sky-600 p-0 h-auto">
                  (Change)
                </Button>
                <Button variant="link" className="text-muted-foreground p-0 h-auto">
                  View referrals
                </Button>
              </div>
            </div>

            <Separator />

            <Button variant="link" className="text-destructive p-0 h-auto">
              Delete group
            </Button>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSaveBilling} className="bg-sky-600 hover:bg-sky-700 text-white">
                <Save className="h-4 w-4 mr-2" />
                Update Billing
              </Button>
            </div>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Content for {activeTab} tab</p>
          </div>
        )
    }
  }

  return (
    <div className="h-[calc(100vh-88px)] max-w-7xl mx-auto flex flex-col bg-background">
      {/* Fixed Header */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="bg-muted/30 h-full">
                <SidebarContent />
              </div>
            </SheetContent>
          </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Desktop Sidebar - Fixed */}
        <Card className="hidden lg:block w-64 min-w-64 border-r bg-muted/30">
          <SidebarContent />
        </Card>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <Card className="p-4 lg:p-8 max-w-4xl">{renderTabContent()}</Card>
        </div>
      </div>
    </div>
  )
}
