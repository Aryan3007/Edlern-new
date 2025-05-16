"use client"

import type { EventOccurrence } from "./event-types"

interface ListViewProps {
  events: EventOccurrence[]
  onEventClick: (event: EventOccurrence) => void
}

export function ListView({ events, onEventClick }: ListViewProps) {
  // Group events by day
  const eventsByDay: Record<string, EventOccurrence[]> = {}

  events.forEach((event) => {
    const date = new Date(event.date)
    const formattedDate = date.toISOString().split('T')[0] // YYYY-MM-DD
    if (!eventsByDay[formattedDate]) {
      eventsByDay[formattedDate] = []
    }
    eventsByDay[formattedDate].push(event)
  })

  // Sort days
  const sortedDays = Object.keys(eventsByDay).sort()

  // Format date for display (e.g., "Wednesday, May 14, 2025")
  const formatDisplayDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  // Format time for display (e.g., "10:00 AM")
  const formatDisplayTime = (dateStr: string, timeStr: string): string => {
    const dateTime = new Date(`${dateStr}T${timeStr}`)
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(dateTime)
  }

  // Calculate end time
  const getEndTime = (dateStr: string, timeStr: string, durationMinutes: number): string => {
    const startDate = new Date(`${dateStr}T${timeStr}`)
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000)
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(endDate)
  }

  return (
    <div className="divide-y">
      {sortedDays.length > 0 ? (
        sortedDays.map((day) => (
          <div key={day} className="p-4">
            <h3 className="font-medium mb-2">{formatDisplayDate(day)}</h3>
            <div className="space-y-2">
              {eventsByDay[day].map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="p-2 rounded border hover:bg-muted cursor-pointer"
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDisplayTime(event.date, event.time)} - 
                    {getEndTime(event.date, event.time, event.duration_minutes)}
                  </div>
                  {event.location && <div className="text-sm">{event.location}</div>}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="p-8 text-center text-muted-foreground">No events scheduled this month</div>
      )}
    </div>
  )
}