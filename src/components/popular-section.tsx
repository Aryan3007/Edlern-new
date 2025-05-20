import { Link } from "react-router-dom";

interface Community {
  id: number;
  cover_image?: string;
  name: string;
  creator_info?: { first_name: string; last_name: string };
  is_paid?: boolean;
  category: string;
  title: string;
  author: string;
  price: number;
}

interface PopularSectionProps {
  communities: Community[];
}

export default function PopularSection({ communities }: PopularSectionProps) {
  return (
    <section className="w-full text-black py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Popular</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map((community) => (
            <PopularCard
              key={community.id}
              image={community.cover_image || "/placeholder.svg"}
              category={community.category || "General"}
              title={community.name}
              author={`${community.creator_info?.first_name ?? ""} ${community.creator_info?.last_name ?? ""}`}
              price={community.is_paid ? community.price : 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularCard({
  image,
  category,
  title,
  author,
  price,
}: CommunityCardProps) {
  return (
    <Link to="#" className="group">
      <div className="relative h-60 w-full overflow-hidden rounded-xl border bg-gray-100 mb-4">
        <img
          src={image}
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
  );
}

interface CommunityCardProps {
  image: string;
  category: string;
  title: string;
  author: string;
  price: number;
}

