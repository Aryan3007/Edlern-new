export interface PollOption {
  id: number
  text: string
  votes: number
}

export interface Poll {
  id: number
  question: string
  options: PollOption[]
  duration: string
  end_date: string
}

export interface Comment {
  id: number
  author: string
  author_id: string
  author_first_name: string
  author_last_name: string
  content: string
  parent: number | null
  replies: Comment[]
  created_at: string
  updated_at?: string
  total_likes: number
  total_comments: number
  profile_picture: string
  is_liked?: boolean
}

export interface Post {
  id: number
  author: string
  author_name: string
  content: string
  topic: string
  is_active: boolean
  content_type: number
  object_id: number
  content_object: string
  attachments: string[]
  youtube_links: string[]
  links: string[]
  poll: any | null
  created_at: string
  is_pinned: boolean
  comments: Comment[]
  total_likes: number
  total_comments: number
  video_file: string | null
  is_liked_by_me: boolean
  community_id?: number
}

export interface ApiResponse {
  message: string
  success: boolean
  data: {
    next: string | null
    previous: string | null
    count: number
    limit: number
    current_page: number
    total_pages: number
    results: Post[]
  }
}
