"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export const ImageUpload = ({ name }: { name: string }) => {
  const [images, setImages] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setImages((p) => [...p, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl h-60 relative cursor-pointer">
        <div
          {...getRootProps()}
          className={clsx(
            "w-full max-w-3xl h-60 border-2 border-dashed shadow-lg",
            isDragActive
              ? "bg-blue-200 border-blue-600"
              : "bg-white border-outlineGray border-dashed border-2"
          )}
        >
          <input
            {...getInputProps()}
            hidden
            name={name}
            type="file"
            required
            multiple
            accept="image/*"
          />
          <div className="flex justify-center items-center h-full">
            {isDragActive
              ? "Drop your images"
              : "Drag, drop or click to upload your images"}
          </div>
        </div>
        <div className="flex flex-wrap gap-5 mt-5">
          {images.map((img, index) => (
            <div key={index} className="relative hover:scale-105">
              <Link
                href={URL.createObjectURL(img)}
                target="_blank"
                className="z-40"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt="Uploaded rental image"
                  className="w-28 h-28 object-cover rounded-lg"
                />
              </Link>
              <span
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-md cursor-pointer z-50"
                onClick={() =>
                  setImages((imgs) => imgs.filter((_, i) => i !== index))
                }
              >
                x
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
