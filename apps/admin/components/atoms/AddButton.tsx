'use client'
import { Button } from '@workspace/ui/components/button'
 
export default function AddButton({pending}: {pending: boolean}) {


  return (
    <Button type="submit" disabled={pending}>{pending ? 'Creating...' : 'Create'}</Button>
  )
}