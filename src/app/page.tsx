import { SearchForm } from "@/components/Forms/search-for-rental-form";
import { GetFeaturedRentals } from "@/lib/db/queries/get-all-featured-rentals";
import Link from "next/link";

export default async function Home() {
  const featuredRentals = await GetFeaturedRentals();
  return (
    <div className="w-full min-h-screen pt-24">
      <div className="flex justify-center items-center mb-10">
        <SearchForm />
      </div>
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Featured Rentals</h1>
        {featuredRentals.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredRentals.map((rental) => {
              const images = JSON.parse(rental.imageUrl || "[]");

              return (
                <div key={rental.id}>
                  <Link href={`/stays/${encodeURIComponent(rental.title)}`}>
                    <div className="relative w-full h-60">
                      <img
                        src={images[0] || "/placeholder.jpg"}
                        alt={rental.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-white p-4">
                      <h3 className="text-lg font-semibold mb-1">
                        {rental.title}
                      </h3>
                      <p className="text-sm text-gray-900 font-medium">
                        {rental.country}, {rental.city}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {rental.startDate} - {rental.endDate}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No featured rentals found.</p>
        )}
      </div>
    </div>
  );
}
