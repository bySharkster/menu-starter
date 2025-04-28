'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/button'

const SigninButton = () => {
  return (
    <Button
      className={cn(
        'btn',
        'btn-medium lg:btn-large btn-outline my-4 inline-flex w-fit items-center justify-center gap-2 whitespace-nowrap normal-case'
      )}
      onClick={() => signIn('google', { callbackUrl: '/' })}
    >
      <div className='relative h-4 w-4 md:h-6 md:w-6'>
        <Image
          src='/images/google.png'
          fill
          className='object-contain'
          alt='Google logo'
        />
      </div>
      <span className='normal-case text-inherit'> Sign in with Google</span>
    </Button>
  )
}

export default SigninButton
