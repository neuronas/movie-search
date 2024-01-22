
'use client'
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod';

export function SearchBar() {
  const searchSchema = z.object({
    searchText: z.string()
      .min(1, { message: 'el texto debe tener un caracter como minimo' })
      .max(10, { message: 'el texto no debe superar los 10 caracteres'})
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });
    
  return(
    <form onSubmit={handleSubmit((data) => console.log("CHANGE", data))} className='w-full'>
      <label>
        Seach
        <Input className='w-full' {...register('searchText')} />
      </label>
      {errors.searchText?.message && <p className="font-bold text-red-600">{errors.searchText?.message as string}</p>}
    </form>
  )
}