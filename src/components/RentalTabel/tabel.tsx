"use client";
import { deleteRental } from "@/actions/delete-rental";
import { Button } from "../ui/Button/button";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Session } from "next-auth";
import {
  useFloating,
  useHover,
  useInteractions,
  offset,
  flip,
} from "@floating-ui/react";
import { createPortal } from "react-dom";
import { Modal } from "../Modal/modal";
import { featureRental, removeRentalFeature } from "@/actions";

interface TableHeader {
  header: string;
}

interface TableBody {
  id: number;
  title: string;
  description: string;
  price: string;
  availability: string;
  isFeatured?: boolean;
}

interface TabelProps {
  headers: TableHeader[];
  body: TableBody[];
  session: Session;
}

export const Tabel = ({ headers, body, session }: TabelProps) => {
  const isAdmin = session.user.isAdmin;

  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isSelectedDesc, setSelectedDesc] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("asc");

  const handleModal = (id: number | null) => {
    setSelectedRow(id);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, setIsModalOpen]);

  const { refs, floatingStyles, context } = useFloating({
    open: isToolOpen,
    onOpenChange: setIsToolOpen,
    middleware: [offset(8), flip()],
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

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
    <div className="p-14 flex flex-col px-0 xl:px-10">
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
                  <td
                    ref={refs.setReference}
                    {...getReferenceProps()}
                    className="border-b relative border-outlineGray truncate max-w-32 p-4 text-gray-700"
                    onMouseEnter={() => setSelectedDesc(data.id)}
                    onMouseLeave={() => setSelectedDesc(null)}
                  >
                    {data.description}
                    {isSelectedDesc === data.id &&
                      createPortal(
                        <div
                          ref={refs.setFloating}
                          style={floatingStyles}
                          {...getFloatingProps()}
                          className="absolute bg-gray-800 text-white text-sm p-3 rounded-md shadow-lg max-w-xs whitespace-normal break-words z-50"
                        >
                          {data.description}
                        </div>,
                        document.body
                      )}
                  </td>
                  <td className="border-b border-outlineGray p-4 text-gray-700">
                    {data.availability}
                  </td>
                  <td className="border-b border-outlineGray p-4 text-gray-700">
                    {data.price}
                  </td>
                  {isAdmin && (
                    <td className="border-b border-outlineGray p-4 text-gray-700">
                      {data.isFeatured ? "Yes" : "No"}
                    </td>
                  )}
                  <td className="border-b border-outlineGray flex p-4 items-center justify-center">
                    {isAdmin ? (
                      !data.isFeatured ? (
                        <form action={featureRental.bind(null, data.id)}>
                          <Button size="sm" variant="green" type="submit">
                            Feature Rental
                          </Button>
                        </form>
                      ) : (
                        <form action={removeRentalFeature.bind(null, data.id)}>
                          <Button size="sm" variant="green" type="submit">
                            Remove Feature
                          </Button>
                        </form>
                      )
                    ) : (
                      <Button size="sm" variant="green">
                        <Link href={`dashboard/edit/rental/${data.id}`}>
                          Update
                        </Link>
                      </Button>
                    )}
                    <div className="w-px h-6 bg-outlineGray mx-2"></div>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      type="submit"
                      onClick={() => handleModal(data.id)}
                    >
                      Delete
                    </Button>
                    {isModalOpen && selectedRow === data.id && (
                      <Modal
                        ref={modalRef}
                        action={deleteRental.bind(null, data.id)}
                        onClose={() => handleModal(null)}
                        onDelete={() => setIsModalOpen(!isModalOpen)}
                        input={data.title}
                      />
                    )}
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
