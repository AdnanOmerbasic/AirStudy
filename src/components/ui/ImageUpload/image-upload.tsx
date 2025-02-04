"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  name: string;
  isInvalid: boolean;
  errMsg: string;
}
export const ImageUpload = ({ name, isInvalid, errMsg }: ImageUploadProps) => {
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
            </div>
          ))}
          {isInvalid && <p className="text-sm text-red-500">{errMsg}</p>}
        </div>
      </div>
    </div>
  );
};
