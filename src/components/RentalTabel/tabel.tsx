"use client";
import { deleteRental } from "@/actions/delete-rental";
import { Button } from "../ui/Button/button";
import { useState } from "react";
import Link from "next/link";

interface TableHeader {
  header: string;
}

interface TableBody {
  id: number;
  title: string;
  description: string;
  price: string;
  availability: string;
}

interface TabelProps {
  headers: TableHeader[];
  body: TableBody[];
}

export const Tabel = ({ headers, body }: TabelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("asc");

  const handleSort = () => {
    setSort(sort === "asc" ? "desc" : "asc");
    body.sort((a, b) => (sort === "asc" ? b.id - a.id : a.id - b.id));
  };

  const filteredBody = body.filter(
    (body) =>
      body.id.toString().includes(searchTerm) ||
      body.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div className="p-14 flex flex-col px-10">
      <div className="mb-4 w-full max-w-md">
        <h2 className="font-semibold">Search</h2>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by id or name"
          className="rounded-md border-outlineGray px-10 py-2 focus:outline-0.5 border-2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[1300px] w-full">
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
                  <td className="border-b border-outlineGray p-4 text-gray-700">
                    {data.title}
                  </td>
                  <td className="border-b border-outlineGray truncate max-w-32 p-4 text-gray-700">
                    {data.description}
                  </td>
                  <td className="border-b border-outlineGray p-4 text-gray-700">
                    {data.availability}
                  </td>
                  <td className="border-b border-outlineGray p-4 text-gray-700">
                    {data.price}
                  </td>
                  <td className="border-b border-outlineGray flex p-4 items-center justify-center">
                    <Button size="sm" variant="green">
                      <Link href={`edit/rental/${data.id}`}>Update</Link>
                    </Button>
                    <div className="w-px h-6 bg-outlineGray mx-2"></div>{" "}
                    <form action={deleteRental.bind(null, data.id)}>
                      <Button variant="danger" size="sm" type="submit">
                        Delete
                      </Button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Error: No rental found </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
