'use client';

import { uploadPhoto } from "@/actions/upload";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const initialActionState = {
  message: '',
  status: 0
};

export default function UploadPictureOnLoad(){
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [actionState, action] = useFormState(uploadPhoto, initialActionState);

  if (actionState.status === 201) {
    toast.success(actionState.message);
  } else if (actionState.status === 400) {
    toast.error(actionState.message);
  }

  useEffect(() => {
    const promptCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setIsCameraReady(true)
        window.history.pushState({ camera: true }, '');
      } catch(error) {
        console.error('Error accessing camera', error)
        toast.error('Error accessing camera')
      }
    }

    const handleBackButton = (event: PopStateEvent) => {
      if (event.state && event.state.camera) {
        stopCamera();
      }
    }
  
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        stopCamera();
      }
    };

    promptCamera();

    window.addEventListener('popstate', handleBackButton);
    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      window.removeEventListener('popstate', handleBackButton);
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [])

  const takeAndUploadPicture = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      
      try {
        action([imageDataUrl])
        stopCamera()
      } catch (error) {
        console.error('Error uploading image', error);
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraReady(false);
    }
    window.history.back();
  };

  return (
    <div>
      {isCameraReady && (
        <div className="fixed top-0 left-0 w-screen h-screen z-[9999]">
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', display: stream ? 'block': 'none', objectFit: 'cover' }} />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center">
            <button
              className="rounded-[50%] border-4 border-[#ef2b7c] cursor-pointer w-16 h-16 bg-white" 
              onClick={takeAndUploadPicture}
            />
          </div>
       </div>
      )}
    </div>
  )
}