"use client"
import { X } from 'lucide-react'
import React from 'react'
import {useRouter} from "next/navigation"

export const CloseButton = () => {

    const router = useRouter()

  return (
<button type="button"  className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 z-10" 
  onClick={() => {router.push('/menu')}}
  aria-label="Close modal">
          <X className="h-6 w-6" />
        </button>  )
}
