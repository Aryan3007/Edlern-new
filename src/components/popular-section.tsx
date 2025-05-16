import { Link } from "react-router-dom"


export default function PopularSection() {
  return (
    <section className="w-full text-black py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Popular</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PopularCard
  image= "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
   category="Entrepreneurship"
            title="The Pilot Institute Premium Drone Community"
            author="Greg R."
            price="$199 / year"
          />
          <PopularCard
  image= "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"            category="Productivity"
            title="Second Brain Membership"
            author="Tiago Forte"
            price="$225 / quarter"
          />
          <PopularCard
  image= "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"            category="Lifestyle"
            title="The Running Channel Club"
            author="Steuart B."
            price="From $6 / month"
          />
          <PopularCard
  image= "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"            category="Entrepreneurship"
            title="The Freedom Club"
            author="Austin Lovell"
            price="FREE"
          />
        </div>
      </div>
    </section>
  )
}

function PopularCard({
  image,
  category,
  title,
  author,
  price,
}: {
  image: string
  category: string
  title: string
  author: string
  price: string
}) {
  return (
    <Link to="#" className="group">
      <div className="relative h-60 w-full overflow-hidden rounded-xl border bg-gray-100 mb-4">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div>
        <div className="mb-2">
          <span className="text-xs font-medium text-gray-500">{category}</span>
        </div>
        <h3 className="font-bold text-lg group-hover:text-sky-600">{title}</h3>
        <p className="text-gray-500 text-sm">{author}</p>
        <p className="text-sm mt-1">{price}</p>
      </div>
    </Link>
  )
}
