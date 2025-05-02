
import { toast } from '@workspace/ui/lib/sonner';
import {
  useForm
} from "@workspace/ui/lib/react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Button
} from "@workspace/ui/components/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"
import {
  Input
} from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@workspace/ui/components/select"
import { useMenuStore } from '@/store/useMenuStore';

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  price: z.number().min(1),
  image: z.string().min(1).optional(),
  categoryId: z.string().min(1)
});

export function CreateMenuItemForm() {
  
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      image: '',
      categoryId: ''
    }
  })

  const { categories, menuItems } = useMenuStore();
  const addMenuItem = useMenuStore((state) => state.addMenuItem);

  async function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      const categoryId = Number(values.categoryId);
      const payload = {
        ...values,
        categoryId,
        createdAt: new Date(),
        updatedAt: new Date(),

      };
      const response = await fetch('/api/menu/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create menu item');
      }

      const menuItem = await response.json();
      addMenuItem(menuItem);
      form.reset();
      toast.success("Menu item created successfully.");
     
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:space-y-8 space-y-4 max-w-3xl mx-auto md:py-10 overflow-y-auto pb-4">
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="Garlic Bread"
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>This is the name for the product or item.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input 
                placeholder="Toasted Bread with Garlic"
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>This is the description for the product or item.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input 
                  placeholder="$10"
                  type="number"
                  {...field}
                    onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>This is the price for the product or item.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input 
                placeholder="https://placehold.co/600x400"
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>This is the Image URL for the product or item.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} >
                <FormControl>
                  <SelectTrigger  className="w-full">
                    <SelectValue placeholder="Appetizer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent >
                    {categories.map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
                <FormDescription>This is the category for the product or item.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
  )
}