"use client"

import { useState } from "react"
import { Calendar, Edit2, Trash2, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { EventOccurrence } from "./event-types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AddEventDialog } from "./add-event-dialog"

interface EventDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: EventOccurrence
  userRole: "creator" | "member"
  onEditEvent: () => void
  onDeleteEvent: () => void
}

export function EventDetailsDialog({
  open,
  onOpenChange,
  event,
  userRole,
  onEditEvent,
  onDeleteEvent,
}: EventDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isAdmin = userRole === "creator"

  const API_BASE_URL = "/api/v1"

  // Custom date formatting functions to replace date-fns
  const parseISO = (dateString: string): Date => {
    try {
      return new Date(dateString)
    } catch (error) {
      console.error("Error parsing date:", error)
      return new Date() // Fallback to current date on error
    }
  }

  const formatDate = (date: Date, formatStr: string): string => {
    try {
      if (!date || isNaN(date.getTime())) {
        console.error("Invalid date provided to formatDate:", date)
        return "Invalid date"
      }

      // Format EEEE, MMMM d'th'
      if (formatStr === "EEEE, MMMM d'th'") {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ]

        const dayOfWeek = days[date.getDay()]
        const month = months[date.getMonth()]
        const day = date.getDate()

        let daySuffix = "th"
        if (day === 1 || day === 21 || day === 31) daySuffix = "st"
        else if (day === 2 || day === 22) daySuffix = "nd"
        else if (day === 3 || day === 23) daySuffix = "rd"

        return `${dayOfWeek}, ${month} ${day}${daySuffix}`
      }

      // Format h:mm a
      if (formatStr === "h:mm a" || formatStr === " h:mm a") {
        let hours = date.getHours()
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const ampm = hours >= 12 ? 'PM' : 'AM'

        hours = hours % 12
        hours = hours || 12 // Convert 0 to 12 for 12 AM

        return `${formatStr.startsWith(" ") ? " " : ""}${hours}:${minutes} ${ampm}`
      }

      // Default fallback
      return date.toLocaleString()
    } catch (error) {
      console.error("Error formatting date:", error, "with format:", formatStr)
      return "Date error"
    }
  }

  // Safe function to combine date and time
  const combineDateAndTime = (dateStr: string, timeStr: string): Date => {
    try {
      const result = new Date(`${dateStr}T${timeStr}`)
      if (isNaN(result.getTime())) {
        throw new Error("Invalid date result")
      }
      return result
    } catch (error) {
      console.error("Error combining date and time:", error, dateStr, timeStr)
      return new Date() // Fallback to current date on error
    }
  }

  // Safe function to add minutes to a date
  const addMinutes = (date: Date, minutes: number): Date => {
    try {
      if (!date || isNaN(date.getTime())) {
        throw new Error("Invalid date provided")
      }
      const result = new Date(date.getTime() + minutes * 60000)
      return result
    } catch (error) {
      console.error("Error adding minutes to date:", error)
      return new Date() // Fallback to current date on error
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleEditComplete = () => {
    onEditEvent()
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true)
      return
    }

    try {
      setIsDeleting(true)
      setError(null)

      const response = await fetch(`${API_BASE_URL}/calendar/community/${event.community}/events/${event.event}/`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Failed to delete event: ${response.status}`)
      }

      onDeleteEvent()
      setIsConfirmingDelete(false)
    } catch (err) {
      console.error("Error deleting event:", err)
      setError("Failed to delete event")
    } finally {
      setIsDeleting(false)
    }
  }

  if (isEditing) {
    return (
      <AddEventDialog
        open={true}
        onOpenChange={(open) => {
          if (!open) setIsEditing(false)
        }}
        onAddEvent={handleEditComplete}
        communityId={event.community}
        eventToEdit={event}
      />
    )
  }

  // Safely format event date and times
  const renderEventDateTime = () => {
    try {
      const eventDate = parseISO(event.date)
      const eventTime = parseISO(event.time)
      const formattedDate = formatDate(eventDate, "EEEE, MMMM d'th'")
      const formattedStartTime = formatDate(eventTime, "h:mm a")

      // Calculate end time by adding duration
      const combinedDateTime = combineDateAndTime(event.date, event.time)
      const endTime = addMinutes(combinedDateTime, event.duration_minutes)
      const formattedEndTime = formatDate(endTime, " h:mm a")

      return (
        <>
          <div>
            {formattedDate} @ {formattedStartTime} -{formattedEndTime}
          </div>
          <div className="text-sm text-muted-foreground">{event.timezone.replace("_", " ")} time</div>
        </>
      )
    } catch (error) {
      console.error("Error rendering event date/time:", error)
      return (
        <div className="text-yellow-600">
          Event time information unavailable
        </div>
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{event.title}</span>
            {isAdmin && (
              <Button variant="ghost" size="icon" onClick={handleEdit}>
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
            <div>
              {renderEventDateTime()}
            </div>
          </div>

          {event.location && (
            <div className="flex items-start gap-2">
              <div className="h-5 w-5 flex items-center justify-center text-muted-foreground">
                <span className="text-lg">📍</span>
              </div>
              <div>
                <div>
                  {event.location === "zoom"
                    ? "Zoom"
                    : event.location === "google_meet"
                      ? "Google Meet"
                      : event.location === "address"
                        ? "Address"
                        : "Link"}
                </div>
                {event.link && (
                  <div className="text-sm text-primary">
                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                      {event.link}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {event.description && (
            <div className="pt-2">
              <p>{event.description}</p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {isAdmin && (
              <Button
                variant={isConfirmingDelete ? "destructive" : "outline"}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : isConfirmingDelete ? (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Confirm Delete
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </>
                )}
              </Button>
            )}

            <Button className={isAdmin ? "" : "ml-auto"}>Add to Calendar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}