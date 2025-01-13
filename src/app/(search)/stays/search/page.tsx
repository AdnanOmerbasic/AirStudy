import { searchRentals } from "@/lib/db/queries/get-search-results";
import Link from "next/link";

interface searchParamsProps {
  location?: string;
  dateFrom?: string;
  dateTo?: string;
}
export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<searchParamsProps>;
}) {
  const params: searchParamsProps = await searchParams;
  const rentals = await searchRentals(
    params.location || "",
    params.dateFrom || "",
    params.dateTo || ""
  );

  return (
    <div className="min-w-screen min-h-screen p-10">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {rentals.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {rentals.map((rental) => {
            const images = JSON.parse(rental.imageUrl || "[]");
            return (
              <div
                key={rental.id}
              >
                <Link href={`/stays/${encodeURIComponent(rental.title)}`}>
                  <div className="relative w-full h-60">
                    <img
                      src={images[0]}
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
                      {rental.dateFrom} - {rental.dateTo}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No rentals found.</p>
      )}
    </div>
  );
}
