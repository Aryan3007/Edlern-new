export interface EventOccurrence {
  id: number
  created_at: string
  updated_at: string
  title: string
  slug: string
  event_image: string | null
  default_image: string
  date: string
  time: string
  duration_minutes: number
  timezone: string
  location: string
  link: string
  description: string
  event_access_type: string
  member_level: number | null
  send_reminder_email: boolean
  event: number
  community: number
  organizer: string
  course: number | null
  is_recurring?: boolean
  frequency?: string
  interval?: number
  days_of_week?: string[] | null
  bymonthday?: number | null
  end_condition?: string
  end_date?: string | null
  occurrences?: number
}

export interface Event {
  id: number
  created_at: string
  updated_at: string
  title: string
  slug: string
  event_image: string | null
  default_image: string
  date: string
  time: string
  duration_minutes: number
  is_recurring?: boolean
  frequency?: string
  interval?: number
  days_of_week?: string[] | null
  bymonthday?: number | null
  end_condition?: string
  end_date?: string | null
  occurrences?: number
  timezone: string
  location: string
  link: string
  description: string
  event_access_type: string
  member_level: number | null
  send_reminder_email: boolean
  community: number
  organizer: string
  course: number | null
  event_occurence?: EventOccurrence[]
}

export interface EventsResponse {
  message: string
  success: boolean
  data: {
    next: string | null
    previous: string | null
    count: number
    limit: number
    current_page: number
    total_pages: number
    results: EventOccurrence[]
  }
}

export interface EventCreateResponse {
  message: string
  success: boolean
  data: Event
}

export const EVENT_LOCATION_CHOICES = [
  { value: "zoom", label: "Zoom" },
  { value: "google_meet", label: "Google Meet" },
  { value: "address", label: "Address" },
  { value: "link", label: "Link" },
]

export const EVENT_ACCESS_CHOICES = [
  { value: "all", label: "All Members" },
  { value: "level", label: "Members at a Level" },
  { value: "course", label: "Members in a Course" },
]

export const FREQUENCY_CHOICES = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
]

export const END_CONDITION_CHOICES = [
  { value: "never", label: "Never" },
  { value: "on_date", label: "On Date" },
  { value: "after_occurrences", label: "After Occurrences" },
]

export const DAYS_OF_WEEK = [
  { value: "MO", label: "Mon" },
  { value: "TU", label: "Tue" },
  { value: "WE", label: "Wed" },
  { value: "TH", label: "Thu" },
  { value: "FR", label: "Fri" },
  { value: "SA", label: "Sat" },
  { value: "SU", label: "Sun" },
]

export const TIMEZONES = [
  { value: "Asia/Kolkata", label: "(GMT +05:30) Asia/Calcutta" },
  { value: "America/New_York", label: "(GMT -04:00) Eastern Time" },
  { value: "America/Chicago", label: "(GMT -05:00) Central Time" },
  { value: "America/Denver", label: "(GMT -06:00) Mountain Time" },
  { value: "America/Los_Angeles", label: "(GMT -07:00) Pacific Time" },
]
