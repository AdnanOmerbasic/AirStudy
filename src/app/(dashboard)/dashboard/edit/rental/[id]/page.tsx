import UpdateRentalForm from "@/components/Forms/update-rental-form";
import { getRentalById } from "@/lib/db/queries/get-rental-by-id";
import { notFound } from "next/navigation";
import { auth } from "../../../../../../../auth";

export default async function UpdateRentalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const getById = await getRentalById(Number(id), Number(session?.user.id));

  if (!getById) {
    return notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Update Rental</h1>
      <UpdateRentalForm id={JSON.stringify(getById)} />
    </div>
  );
}
