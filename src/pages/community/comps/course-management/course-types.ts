export interface RootState {
    auth: {
      accessToken: string | null
    }
  }
  
  export interface Course {
    id: number
    title: string
    description: string
    course_type: string
    course_access_type: string
    unlock_level: number
    course_status: string
    is_published: boolean
    release_date: string | null
    created_at: string
    updated_at: string
    community: number
    creator: string
    is_active: boolean
    is_deleted: boolean
    instructor?: string
    students?: number
    rating?: number
    reviews?: number
    lessons?: number
    progress?: number
    image?: string
    modules: Module[]
  }
  
  export interface Module {
    id: number
    title: string
    order: number
    course: number
    lessons?: Lesson[]
    created_at: string
    updated_at: string
    is_deleted: boolean
    is_active: boolean
  }
  
  export interface Lesson {
    id: number
    title: string
    content: string
    video_url: string
    order: number
    release_date: string
    is_active: boolean
    is_deleted: boolean
    module: number
    resources?: Resource[]
    created_at: string
    updated_at: string
  }
  
  export interface Resource {
    id: number
    name: string
    type: string
    file: string | null
    link?: string | null
    lesson: number
    created_at: string
    updated_at: string
    is_active: boolean
    is_deleted: boolean
  }
  