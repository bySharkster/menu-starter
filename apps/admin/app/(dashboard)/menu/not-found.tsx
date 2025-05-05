import Link from 'next/link'
import { getItems } from '@/app/actions/menuItems'
 
export default async function NotFound() {

  const data = await getItems()
  
  return (
    <div>
      <h2>Not Found: {data.length}</h2>
      <p>Could not find menu item</p>
      <p>
        View <Link href="/menu">all menu items</Link>
      </p>
    </div>
  )
}