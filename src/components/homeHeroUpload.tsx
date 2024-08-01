'use client'

import { uploadPhoto } from '@/actions/upload';
import HeroImg from '../../public/heroo.jpg';
import { Camera } from "lucide-react";
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { getBase64 } from '@/lib/utils';

const initialActionState = {
  message: '',
  status: 0
};

export default function HomeHeroUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [actionState, action] = useFormState(uploadPhoto, initialActionState);
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const base64Strings: string[] = [];
      for (const file of Array.from(files)) {
        const base64String = await getBase64(file)
        base64Strings.push(base64String);
      }
      action(base64Strings);
    }
  };

  if (actionState.status === 201) {
    toast.success(actionState.message);
  } else if (actionState.status === 400) {
    toast.error(actionState.message);
  }

  return (
    <section className="relative w-full overflow-hidden h-screen flex items-center justify-center">
      <Image 
        src={HeroImg} 
        alt="Forever & Always" 
        className="h-screen w-full" 
        style={{ objectFit: 'cover' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-40 " />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
        <h1 className="text-4xl font-bold text-center text-white">Maris & Emmanuel</h1>
        <p className="text-2xl font-semibold italic text-white mt-4">Forever & Always &apos;24</p>
        <button 
          className="p-4 bg-gradient-to-r from-[#ef2b7c] to-[#98fb98] text-white rounded-lg shadow-xl mt-8 inline-flex items-center gap-x-4"
          onClick={handleButtonClick}
        >
          <Camera size={24} />
          Upload Photo
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </section>
  )
}