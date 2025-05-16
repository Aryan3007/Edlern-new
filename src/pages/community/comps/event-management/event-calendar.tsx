"use client"

import { useState, useEffect } from "react"
import { Calendar, List, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EventOccurrence, EventsResponse } from "./event-types"
import { CalendarView } from "./calendar-view"
import { ListView } from "./list-view"
import { AddEventDialog } from "./add-event-dialog"
import { EventDetailsDialog } from "./event-details-dialog"
import { SERVER_URL } from "@/config/config"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

interface EventCalendarProps {
  userRole: "creator" | "member"
  communityId?: number
}

export function EventCalendar({ userRole, communityId }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [view, setView] = useState<"calendar" | "list">("calendar")
  const [events, setEvents] = useState<EventOccurrence[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [isAddEventOpen, setIsAddEventOpen] = useState<boolean>(false)
  const [selectedEvent, setSelectedEvent] = useState<EventOccurrence | null>(null)
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState<boolean>(false)
  const isAdmin = userRole === "creator"
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  useEffect(() => {
    loadEvents()
  }, [currentDate, currentPage])

  const loadEvents = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`${SERVER_URL}/api/v1/calendar/community/${communityId}/calendar/?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`)
      }

      const data: EventsResponse = await response.json()

      if (data.success) {
        setEvents(data.data.results)
        setTotalPages(data.data.total_pages)
      } else {
        setError("Failed to load events")
      }
    } catch (err) {
      setError("An error occurred while fetching events")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Add months to a date
  const addMonths = (date: Date, months: number): Date => {
    const newDate = new Date(date)
    newDate.setMonth(date.getMonth() + months)
    return newDate
  }

  // Subtract months from a date
  const subMonths = (date: Date, months: number): Date => {
    const newDate = new Date(date)
    newDate.setMonth(date.getMonth() - months)
    return newDate
  }

  // Check if two dates are in the same month
  const isSameMonth = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
  }

  // Format date for display (e.g., "May 2025")
  const formatMonthYear = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  // Format current time (e.g., "12:02AM")
  const formatCurrentTime = (): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date()).replace(/\s/g, '')
  }

  // Get timezone abbreviation (e.g., "IST")
  const getTimezone = (): string => {
    return new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
      .formatToParts(new Date())
      .find((part) => part.type === 'timeZoneName')?.value || 'UTC'
  }

  const handlePreviousMonth = (): void => {
    setCurrentDate(subMonths(currentDate, 1))
    setCurrentPage(1) // Reset to first page when changing months
  }

  const handleNextMonth = (): void => {
    setCurrentDate(addMonths(currentDate, 1))
    setCurrentPage(1) // Reset to first page when changing months
  }

  const handleToday = (): void => {
    setCurrentDate(new Date())
    setCurrentPage(1) // Reset to first page when going to today
  }

  const handleAddEvent = (): void => {
    loadEvents() // Reload events after adding a new one
    setIsAddEventOpen(false)
  }

  const handleEditEvent = (): void => {
    loadEvents() // Reload events after editing
    setSelectedEvent(null)
    setIsEventDetailsOpen(false)
  }

  const handleDeleteEvent = (): void => {
    loadEvents() // Reload events after deleting
    setSelectedEvent(null)
    setIsEventDetailsOpen(false)
  }

  const handleEventClick = (event: EventOccurrence): void => {
    setSelectedEvent(event)
    setIsEventDetailsOpen(true)
  }

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return isSameMonth(eventDate, currentDate)
  })

  return (
    <div className="max-w-6xl mx-auto border rounded-lg shadow-sm bg-background">
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
              <span className="sr-only">Previous month</span>
              &lt;
            </Button>
            <h2 className="text-lg font-medium px-2">{formatMonthYear(currentDate)}</h2>
            <Button variant="ghost" size="icon" onClick={handleNextMonth}>
              <span className="sr-only">Next month</span>
              &gt;
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatCurrentTime()} {getTimezone()} time
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setView("list")}
            className={view === "list" ? "bg-muted" : ""}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setView("calendar")}
            className={view === "calendar" ? "bg-muted" : ""}
          >
            <Calendar className="h-4 w-4" />
            <span className="sr-only">Calendar view</span>
          </Button>
          {isAdmin && (
            <Button size="icon" onClick={() => setIsAddEventOpen(true)}>
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add event</span>
            </Button>
          )}
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="m-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading events...</span>
        </div>
      ) : view === "calendar" ? (
        <CalendarView currentDate={currentDate} events={filteredEvents} onEventClick={handleEventClick} />
      ) : (
        <ListView events={filteredEvents} onEventClick={handleEventClick} />
      )}

      {totalPages > 1 && (
        <div className="flex justify-center p-4 border-t">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

{communityId !== undefined && (
  <AddEventDialog
    open={isAddEventOpen}
    onOpenChange={setIsAddEventOpen}
    onAddEvent={handleAddEvent}
    communityId={communityId}
  />
)}

      {selectedEvent && (
        <EventDetailsDialog
          open={isEventDetailsOpen}
          onOpenChange={setIsEventDetailsOpen}
          event={selectedEvent}
          userRole={userRole}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
    </div>
  )
}