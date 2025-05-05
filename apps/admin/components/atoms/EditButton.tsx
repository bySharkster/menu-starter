'use client'
import { Button } from '@workspace/ui/components/button'
import { useFormStatus } from 'react-dom'
 
export default function EditButton() {

  const status = useFormStatus()

  return (
    <Button type="submit" disabled={status.pending}>{status.pending ? 'Updating...' : 'Update'}</Button>
  )
}