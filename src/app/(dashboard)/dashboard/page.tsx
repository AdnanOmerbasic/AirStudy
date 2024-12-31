import { Tabel } from "@/components/RentalTabel/tabel";
import { GetUserRentals } from "@/lib/db/queries/get-user-rentals";
import { auth } from "../../../../auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return (
      <>
        <div className="flex justify-center items-center py-10">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-lg">You must be logged in to view this page.</p>
        </div>
      </>
    );
  }

  const rentalProperties = await GetUserRentals();

  const rentalData = rentalProperties!.map((property) => ({
    id: property.rental_properties.id,
    title: property.rental_properties.title,
    description: property.rental_properties.description!,
    price: `€${property.rental_properties.price} EUR/month`,
    availability: `${property.availability!.startDate} to ${
      property.availability!.endDate
    }`,
  }));

  const headers = [
    { header: "Id" },
    { header: "Title" },
    { header: "Description" },
    { header: "Availability" },
    { header: "Price" },
    { header: "Actions" },
  ];

  return (
    <div>
      <div className="flex justify-center items-center pt-12">
        <h1 className="font-medium text-xl pl-10 break-words">
          Welcome back to your dashboard -{" "}
          <strong>{session?.user?.email}</strong>
        </h1>
      </div>
      <Tabel headers={headers} body={rentalData} />
    </div>
  );
}
