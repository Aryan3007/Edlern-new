"use client"

import { useState, useEffect } from "react"
import type { EventOccurrence } from "./event-types"

interface CalendarViewProps {
  currentDate: Date
  events: EventOccurrence[]
  onEventClick: (event: EventOccurrence) => void
}

export function CalendarView({ currentDate, events, onEventClick }: CalendarViewProps) {
  const [calendarDays, setCalendarDays] = useState<Date[]>([])

  // Custom date utility functions to replace date-fns
  const startOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  const endOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
  }

  const isSameMonth = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
  }

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const isToday = (date: Date): boolean => {
    const today = new Date()
    return isSameDay(date, today)
  }

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const formatDate = (date: Date, formatStr: string): string => {
    if (formatStr === "d") {
      return date.getDate().toString()
    }
    if (formatStr === "ha") {
      let hours = date.getHours()
      const ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      return `${hours}${ampm}`
    }
    return date.toLocaleDateString()
  }

  const parseISO = (dateString: string): Date => {
    return new Date(dateString)
  }

  const eachDayOfInterval = ({ start, end }: { start: Date; end: Date }): Date[] => {
    const days: Date[] = []
    const current = new Date(start)
    
    while (current <= end) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  useEffect(() => {
    try {
      const monthStart = startOfMonth(currentDate)
      const monthEnd = endOfMonth(currentDate)
      const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

      // Get the day of week for the first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      let startDay = monthStart.getDay()
      // Adjust to make Monday = 0, Sunday = 6
      startDay = startDay === 0 ? 6 : startDay - 1

      // Add days from previous month to start on Monday
      const daysFromPrevMonth = Array.from(
        { length: startDay }, 
        (_, i) => addDays(monthStart, -(startDay - i))
      )

      // Add days from next month to complete the grid
      const totalDaysToShow = 42 // 6 weeks
      const daysFromNextMonth = Array.from(
        { length: totalDaysToShow - daysFromPrevMonth.length - daysInMonth.length },
        (_, i) => addDays(monthEnd, i + 1)
      )

      setCalendarDays([...daysFromPrevMonth, ...daysInMonth, ...daysFromNextMonth])
    } catch (error) {
      console.error("Error generating calendar days:", error)
      setCalendarDays([])
    }
  }, [currentDate])

  const getDayEvents = (day: Date) => {
    return events.filter((event) => {
      try {
        const eventDate = parseISO(event.date)
        return isSameDay(eventDate, day)
      } catch (error) {
        console.error("Error parsing event date:", error)
        return false
      }
    })
  }

  // Safely format event time
  const safeFormatTime = (timeString: string) => {
    try {
      const eventTime = parseISO(timeString)
      return formatDate(eventTime, "ha")
    } catch (error) {
      console.error("Error formatting event time:", error)
      return "???"
    }
  }

  return (
    <div className="grid grid-cols-7 border-b">
      {/* Days of week header */}
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
        <div key={day} className="p-2 text-center font-medium border-b">
          {day}
        </div>
      ))}

      {/* Calendar days */}
      {calendarDays.map((day, index) => {
        const dayEvents = getDayEvents(day)
        const isCurrentMonth = isSameMonth(day, currentDate)

        return (
          <div
            key={index}
            className={`min-h-[100px] p-1 border-r border-b relative ${!isCurrentMonth ? "bg-muted/20" : ""}`}
          >
            <div
              className={`text-right p-1 ${
                isToday(day)
                  ? "bg-sky-600 text-white rounded-full w-7 h-7 flex items-center justify-center ml-auto"
                  : !isCurrentMonth
                    ? "text-muted-foreground"
                    : ""
              }`}
            >
              {formatDate(day, "d")}
            </div>
            <div className="mt-1">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="text-xs p-1 mb-1 truncate rounded bg-primary/10 text-primary cursor-pointer hover:bg-primary/20"
                >
                  {safeFormatTime(event.time)} - {event.title}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}