"use client";
import { Button } from "../ui/Button/button";
import { useState } from "react";
import { deleteUser } from "@/actions/delete-user";
import Link from "next/link";

interface TableHeader {
  header: string;
}

interface TableBody {
  id: string;
  fullName: string | null;
  email: string;
  isAdmin?: string;
}

interface TabelProps {
  headers: TableHeader[];
  body: TableBody[];
  createAdmin?: boolean;
}

export const TabelUser = ({
  headers,
  body,
  createAdmin = false,
}: TabelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("asc");

  const handleSort = () => {
    setSort(sort === "asc" ? "desc" : "asc");
    body.sort((a, b) => {
      const sorting = sort === "asc" ? 1 : -1;
      return a.id.localeCompare(b.id) * sorting;
    });
  };

  const filteredBody = body.filter(
    (body) =>
      body.id.toString().includes(searchTerm) ||
      body.fullName!.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      body.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div className="p-14 flex flex-col pl-0 xl:px-56">
      <div className="mb-4 w-full max-w-md pb-4">
        <h2 className="font-semibold">Search</h2>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by id, name or mail"
            className="rounded-md border-outlineGray px-10 py-2 focus:outline-0.5 border-2"
          />
          {createAdmin && (
            <Link href="/admin-dashboard/create-admin">
              <Button size="sm" variant="green" className=" whitespace-nowrap">
                Create Admin
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="max-w-[1000px] w-full ">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th
                  className="border-b border-black text-center pb-2 cursor-pointer"
                  key={i}
                  onClick={() => handleSort()}
                >
                  {header.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body && body.length > 0 ? (
              filteredBody.map((data) => (
                <tr
                  className="hover:bg-gray-50 transition-colors text-center"
                  key={data.id}
                >
                  <td className="border-b border-outlineGray p-4 text-gray-700">
                    {data.id}
                  </td>
                  <td className="border-b border-outlineGray p-4 text-gray-700 whitespace-nowrap">
                    {data.fullName}
                  </td>
                  <td className="border-b border-outlineGray p-4 text-gray-700 whitespace-nowrap">
                    {data.email}
                  </td>
                  <td className="border-b border-outlineGray p-4 text-gray-700 whitespace-nowrap">
                    {data.isAdmin}
                  </td>
                  <td className="border-b border-outlineGray flex p-4 items-center justify-center">
                    <form action={deleteUser.bind(null, data.id)}>
                      <Button variant="danger" size="sm" type="submit">
                        Delete
                      </Button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Error: No users found </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
