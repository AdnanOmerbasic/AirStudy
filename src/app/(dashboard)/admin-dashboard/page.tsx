import { Tabs } from "@/components/ui/Tabs/tabs";
import { Tabel } from "@/components/RentalTabel/tabel";
import { TabelUser } from "@/components/UserTabel/user-table";
import { auth } from "../../../../auth";
import { GetAllRentals } from "@/lib/db/queries/get-all-rentals";
import { GetAllAdmins } from "@/lib/db/queries/get-all-admins";
import { GetAllUsers } from "@/lib/db/queries/get-all-users";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user.isAdmin) {
    return (
      <>
        <div className="flex justify-center items-center py-10">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-lg">You must be logged in to view this page.</p>
        </div>
      </>
    );
  }

  const getAllRentals = await GetAllRentals();
  const getAllAdmins = await GetAllAdmins();
  const getAllUsers = await GetAllUsers();

  const adminData = getAllAdmins!.map((user) => ({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    isAdmin: user.isAdmin ? "Admin" : "User",
  }));

  const userData = getAllUsers!.map((user) => ({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    isAdmin: user.isAdmin ? "Admin" : "User",
  }));

  const rentalData = getAllRentals!.map((property) => ({
    id: property.rental_properties.id,
    title: property.rental_properties.title,
    description: property.rental_properties.description!,
    price: `€${property.rental_properties.price} EUR/day`,
    availability: `${property.availability!.startDate} to ${
      property.availability!.endDate
    }`,
    isFeatured: !!property.rental_properties.isFeatured,
  }));

  const rentalHeaders = [
    { header: "Id" },
    { header: "Title" },
    { header: "Description" },
    { header: "Availability" },
    { header: "Price" },
    { header: "Is Featured" },
    { header: "Actions" },
  ];

  const userHeaders = [
    { header: "Id" },
    { header: "Full name" },
    { header: "E-mail" },
    { header: "Role" },
    { header: "Actions" },
  ];

  const TabsHeaders = ["All Rentals", "All Admins", "All Users"];

  return (
    <div>
      <Tabs
        header={TabsHeaders}
        body={[
          <Tabel
            key="rentals"
            session={session}
            headers={rentalHeaders}
            body={rentalData}
          />,
          <TabelUser
            key="admins"
            headers={userHeaders}
            body={adminData}
            createAdmin
          />,
          <TabelUser key="users" headers={userHeaders} body={userData} />,
        ]}
      />
    </div>
  );
}
