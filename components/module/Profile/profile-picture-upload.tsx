"use client";

import Image from "next/image";
import { useRef } from "react";

interface ProfilePictureUploadProps {
  profilePicture: string;
  onPictureChange: (url: string) => void;
}

export function ProfilePictureUpload({
  profilePicture,
  onPictureChange,
}: ProfilePictureUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPictureChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={handleClick}
        className="flex flex-col items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
      >
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          <Image
            src="https://i.ibb.co/mVjzdhHW/Rectangle-23852.png"
            alt="Profile picture"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <p className="text-sm text-gray-600 text-center">
          Tap to change profile picture
        </p>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload profile picture"
      />
    </div>
  );
}
