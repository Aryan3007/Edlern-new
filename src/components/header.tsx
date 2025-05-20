"use client"

import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router-dom"
import SearchTrigger from "./SearchTrigger"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/store/authSlice"
import { persistor, RootState } from "@/store/store"

const categories = [
  { id: "entrepreneurship", name: "Entrepreneurship" },
  { id: "productivity", name: "Productivity" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "business", name: "Business" },
  { id: "creativity", name: "Creativity" },
  { id: "technology", name: "Technology" },
]

export default function Header() {
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/category/${categoryId}`)
  }
    const handleLogout = () => {
      dispatch(logout())
      persistor.purge() // clear persisted state (optional but clean)
      navigate("/login") // redirect to login
    }

  return (
    <header className="sticky top-0 z-50 w-full border-b text-black bg-white">
      <div className="container flex  max-w-7xl mx-auto h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center justify-center gap-2">
          <Link to="/" className="font-bold text-2xl">
            {/* <span className='text-sky-500'>ed</span>Lern */}
            <img src="/logo.png" className='w-24' alt="" />

          </Link>
          <nav className="flex md:gap-6 ml-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center gap-1 mr-2 text-sm font-medium">
                Interest
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Link to="/discover" className="text-sm font-medium">
              Discover
            </Link> */}
            <Link to="/experts" className="text-sm font-medium">
              Experts
            </Link>
          </nav>
        </div>
        <div className="flex items-center justify-center gap-4">
        
          <SearchTrigger />

     
          <nav className=" hidden md:flex items-center gap-4">
            {/* <Link to="#" className="text-sm font-medium hidden md:block">
              List on Discover
            </Link> */}
            {
              isAuthenticated ? (
                <button onClick={handleLogout} className="text-sm text-red-600  hover:text-red-500 duration-150 font-medium">
              Sign Out
            </button>
              ) : (
                <Link to="/login" className="text-sm  hover:text-sky-500 duration-150 font-medium">
                Login
              </Link>
              )
            }
           
          </nav>
        </div>
      </div>
    </header>
  )
}
