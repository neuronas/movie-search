'use client'
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';
import { useSearchStore } from "@/lib/store";

export function SearchBar() {
  const { pattern, setPattern } = useSearchStore((state) => state);

  const searchSchema = z.object({
    searchText: z.string()
      .min(1, { message: 'el texto debe tener un caracter como minimo' })
      .max(10, { message: 'el texto no debe superar los 10 caracteres'})
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm({
    resolver: zodResolver(searchSchema),
  });

  const hableChange = useCallback(
    debounce((string) => {
      setPattern(string)
    }, 500)
  , [])

  useEffect(() => {
    const currValue = getValues("searchText")
    if (pattern && ! currValue) {
      setValue("searchText", pattern);
    }
  }, [pattern]);

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