"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import {
  EVENT_LOCATION_CHOICES,
  EVENT_ACCESS_CHOICES,
  FREQUENCY_CHOICES,
  DAYS_OF_WEEK,
  TIMEZONES,
} from "./event-types"
import { SERVER_URL } from "@/config/config"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

interface AddEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddEvent: () => void
  communityId: number
}

export function AddEventDialog({ open, onOpenChange, onAddEvent, communityId }: AddEventDialogProps) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  const [title, setTitle] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [time, setTime] = useState("10:00")
  const [durationMinutes, setDurationMinutes] = useState("30")
  const [timezone, setTimezone] = useState("Asia/Kolkata")
  const [location, setLocation] = useState("zoom")
  const [locationDetails, setLocationDetails] = useState("")
  const [description, setDescription] = useState("")
  const [eventAccessType, setEventAccessType] = useState("all")
  const [memberLevel, setMemberLevel] = useState<string | null>(null)
  const [sendReminderEmail, setSendReminderEmail] = useState(false)

  // Recurring event fields
  const [isRecurring, setIsRecurring] = useState(false)
  const [frequency, setFrequency] = useState("daily")
  const [interval, setInterval] = useState("1")
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([])
  const [endCondition, setEndCondition] = useState("never")
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [occurrences, setOccurrences] = useState("5")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)


  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      resetForm()
    }
  }, [open])

  const resetForm = () => {
    setTitle("")
    setDate(new Date())
    setTime("10:00")
    setDurationMinutes("30")
    setTimezone("Asia/Kolkata")
    setLocation("zoom")
    setLocationDetails("")
    setDescription("")
    setEventAccessType("all")
    setMemberLevel(null)
    setSendReminderEmail(false)

    // Reset recurring event fields
    setIsRecurring(false)
    setFrequency("daily")
    setInterval("1")
    setDaysOfWeek([])
    setEndCondition("never")
    setEndDate(null)
    setOccurrences("5")

    setError(null)
  }

  const handleDayOfWeekChange = (day: string) => {
    setDaysOfWeek((current) => (current.includes(day) ? current.filter((d) => d !== day) : [...current, day]))
  }

  // Format date to YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Format date for display (e.g., "Jan 1, 2025")
  const formatDisplayDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Format time for display (e.g., "10:00 AM")
  const formatDisplayTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number)
    const date = new Date()
    date.setHours(hours, minutes)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Format date as YYYY-MM-DD
      const formattedDate = formatDate(date)

      // Prepare event data
      const eventData = {
        title,
        date: formattedDate,
        time,
        duration_minutes: Number.parseInt(durationMinutes),
        timezone,
        location,
        link: locationDetails,
        description,
        event_access_type: eventAccessType,
        member_level: memberLevel ? Number.parseInt(memberLevel) : null,
        send_reminder_email: sendReminderEmail,
        community: communityId,
      }

      // Add recurring event data if applicable
      if (isRecurring) {
        Object.assign(eventData, {
          is_recurring: true,
          frequency,
          interval: Number.parseInt(interval),
          days_of_week: frequency === "weekly" ? daysOfWeek : null,
          end_condition: endCondition,
          end_date: endDate ? formatDate(endDate) : null,
          occurrences: endCondition === "after_occurrences" ? Number.parseInt(occurrences) : null,
        })
      }

      // Create the event
      const response = await fetch(`${SERVER_URL}/api/v1/calendar/community/${communityId}/events/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,

        },
        body: JSON.stringify(eventData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Failed to create event: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        onAddEvent()
      } else {
        setError("Failed to create event")
      }
    } catch (err) {
      console.error("Error creating event:", err)
      setError("An error occurred while creating the event")
    } finally {
      setIsSubmitting(false)
    }
  }

  const eventTypes = ["coffee hour", "Q&A", "co-working session", "happy hour"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add event</DialogTitle>
        </DialogHeader>

        {error && <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Need ideas? Try one of these fun formats:{" "}
            {eventTypes.map((type, index) => (
              <span key={type}>
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => setTitle(type)}>
                  {type}
                </Button>
                {index < eventTypes.length - 1 && index !== eventTypes.length - 2 && ", "}
                {index === eventTypes.length - 2 && ", or "}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={30}
              required
            />
            <div className="text-xs text-muted-foreground text-right">{title.length} / 30</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <div className="flex border rounded-lg py-1.5 bg-accent/50 items-center space-x-2">
      <input
        type="date"
        value={endDate ? formatDate(endDate) : ""}
        onChange={(e) => {
          const date = new Date(e.target.value);
          if (!isNaN(date.getTime())) {
            setEndDate(date);
          }
        }}
        className={`ml-2 ${endCondition !== "on_date" ? "opacity-50 text-white" : ""}`}
      />
    </div>

            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 * 4 }).map((_, i) => {
                    const hour = Math.floor(i / 4)
                    const minute = (i % 4) * 15
                    const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
                    const displayTime = formatDisplayTime(timeString)
                    return (
                      <SelectItem key={i} value={timeString}>
                        {displayTime}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Duration</Label>
              <Select value={durationMinutes} onValueChange={setDurationMinutes}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="180">3 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="recurring"
              checked={isRecurring}
              onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
            />
            <Label htmlFor="recurring">Recurring event</Label>
          </div>

          {isRecurring && (
            <div className="space-y-4 border rounded-md p-4 bg-muted/20">
              <div className="flex items-center gap-4">
                <Label className="w-24">Repeat every</Label>
                <Select value={interval} onValueChange={setInterval}>
                  <SelectTrigger>
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCY_CHOICES.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {frequency === "weekly" && (
                <div className="space-y-2">
                  <Label>Repeat on</Label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <div key={day.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`day-${day.value}`}
                          checked={daysOfWeek.includes(day.value)}
                          onCheckedChange={() => handleDayOfWeekChange(day.value)}
                        />
                        <Label htmlFor={`day-${day.value}`}>{day.label}</Label>
                      </div>
                    ))}
                  </div>
                  {daysOfWeek.length === 0 && frequency === "weekly" && (
                    <p className="text-sm text-destructive">Please select which day(s) your event will repeat on</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label>End</Label>
                <RadioGroup value={endCondition} onValueChange={setEndCondition}>
                  <div className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value="never" id="never" />
                    <Label htmlFor="never">Never</Label>
                  </div>

                  <div className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value="on_date" id="on_date" />
                    <Label htmlFor="on_date">On</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("ml-2", endCondition !== "on_date" && "opacity-50 pointer-events-none")}
                          disabled={endCondition !== "on_date"}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? formatDisplayDate(endDate) : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
<Input
  type="date"
  value={endDate ? formatDate(endDate) : ""}
  onChange={(e) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setEndDate(newDate);
    }
  }}
  className={cn(
    "ml-2 w-48",
    endCondition !== "on_date" && "opacity-50 pointer-events-none"
  )}
  disabled={endCondition !== "on_date"}
  min={formatDate(new Date())} // Prevent past dates
/>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value="after_occurrences" id="after_occurrences" />
                    <Label htmlFor="after_occurrences">After</Label>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={occurrences}
                      onChange={(e) => setOccurrences(e.target.value)}
                      className={cn(
                        "w-20 ml-2",
                        endCondition !== "after_occurrences" && "opacity-50 pointer-events-none",
                      )}
                      disabled={endCondition !== "after_occurrences"}
                    />
                    <span className="text-sm">occurrences</span>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Location</Label>
            <div className="grid grid-cols-3 gap-2">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_LOCATION_CHOICES.map((loc) => (
                    <SelectItem key={loc.value} value={loc.value}>
                      {loc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                className="col-span-2"
                placeholder={
                  location === "zoom"
                    ? "Zoom link"
                    : location === "google_meet"
                      ? "Google Meet link"
                      : location === "address"
                        ? "Address"
                        : "Link"
                }
                value={locationDetails}
                onChange={(e) => setLocationDetails(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
              maxLength={300}
            />
            <div className="text-xs text-muted-foreground text-right">{description.length} / 300</div>
          </div>

          <div className="space-y-2">
            <Label>Who can attend this event</Label>
            <Select value={eventAccessType} onValueChange={setEventAccessType}>
              <SelectTrigger>
                <SelectValue placeholder="Select who can attend" />
              </SelectTrigger>
              <SelectContent>
                {EVENT_ACCESS_CHOICES.map((access) => (
                  <SelectItem key={access.value} value={access.value}>
                    {access.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {eventAccessType === "level" && (
              <div className="mt-2">
                <Label>Member Level</Label>
                <Select value={memberLevel || ""} onValueChange={setMemberLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select member level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Level 1</SelectItem>
                    <SelectItem value="2">Level 2</SelectItem>
                    <SelectItem value="3">Level 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="reminder"
              checked={sendReminderEmail}
              onCheckedChange={(checked) => setSendReminderEmail(checked as boolean)}
            />
            <Label htmlFor="reminder">Remind members by email 1 day before</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}