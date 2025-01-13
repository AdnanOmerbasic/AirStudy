import { notFound } from "next/navigation";
import { getRentalByTitle } from "@/lib/db/queries/get-rentals-by-title";

export default async function RentalPage({
  params,
}: {
  params: Promise<{ rentalTitle: string }>;
}) {
  const { rentalTitle } = await params;
  const decodedTitle = decodeURIComponent(rentalTitle);

  const rental = await getRentalByTitle(decodedTitle);
  if (!rental) {
    return notFound();
  }

  const images = rental.imageUrl ? JSON.parse(rental.imageUrl) : [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full h-80 md:col-span-2">
          <img
            src={images[0] || "/placeholder.jpg"}
            alt={rental.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{rental.title}</h1>
          <p className="text-gray-700 text-sm">{rental.description}</p>
          <div className="text-gray-600 text-sm">
            <p>
              <strong>Location:</strong> {rental.city}, {rental.country}
            </p>
            <p>
              <strong>Availability:</strong> {rental.startDate} -{" "}
              {rental.endDate}
            </p>
          </div>
        </div>
      </div>
      {images.length > 1 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.slice(1).map((url: string, i: number) => (
            <img
              key={i}
              src={url}
              alt={`${rental.title} image ${i + 1}`}
              className="w-full h-40 object-cover rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );
}
