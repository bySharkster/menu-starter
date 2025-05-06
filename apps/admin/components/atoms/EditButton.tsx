'use client'
import { Button } from '@workspace/ui/components/button'
 
export default function EditButton({pending}: {pending:boolean}) {


  return (
    <Button type="submit" disabled={pending}>{pending ? 'Updating...' : 'Update'}</Button>
  )
}