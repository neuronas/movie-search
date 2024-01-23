
'use client'
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';

export function SearchBar({triggerSearch} : {triggerSearch: (param: string) => void}) {
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

  const hableChange = useCallback(
    debounce((param) => {
      triggerSearch(param)
      // console.log("parammmmm " + param)
    }, 500)
  , [])

  return(
    <form onChange={handleSubmit(({searchText}) => hableChange(searchText))} onSubmit={(e) => {((e.preventDefault()))}}>
      <label>
        Seach
        <Input className='w-full' {...register('searchText')} />
      </label>
      {errors.searchText?.message && <p className="font-bold text-red-600">{errors.searchText?.message as string}</p>}
    </form>
  )
}