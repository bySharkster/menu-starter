export const dynamic = 'force-static'

import Image from 'next/image'
import SigninButton from './(components)/SigninButton'
import { cn } from '@workspace/ui/lib/utils'

const SignInPage = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center gap-4 md:flex-row md:gap-16 min-h-dvh'>
      {/* IMG */}
      <div className='relative h-[28rem] w-full flex-1'>
        <Image
          src='/images/hero.png'
          alt='sign in'
          fill
          className='object-contain'
        />
      </div>

      <div className='flex w-full flex-col items-start gap-y-2 md:w-1/3 md:gap-y-4'>
        <h1 className='font-semibold'>Welcome</h1>
        <h2 className={cn('h2', 'lg:text-3xl')}>
          Log into your account
        </h2>

        <SigninButton />

        <h4 className='mt-4 text-gray-500 md:mt-16'>
          Have a problem?{' '}
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_MAIL_CONTACT}`}
            target='_blank'
            rel='noreferrer'
            className='underline underline-offset-4 dark:decoration-light dark:decoration-1 dark:underline-offset-4'
          >
            Contact us
          </a>
        </h4>
      </div>
    </section>
  )
}

export default SignInPage
