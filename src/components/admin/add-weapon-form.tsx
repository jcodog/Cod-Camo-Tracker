"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COD_TITLES, WEAPON_CATEGORIES } from "@/constants/weapons";

const weaponSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  codTitle: z.string().min(1, "COD title is required"),
  sortOrder: z.number().int().min(0, "Sort order is cannot be negative"),
});

type WeaponFormValues = z.infer<typeof weaponSchema>;

export function AddWeaponForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const form = useForm<WeaponFormValues>({
    resolver: zodResolver(weaponSchema),
    defaultValues: {
      name: "",
      category: WEAPON_CATEGORIES[0]?.value ?? "",
      codTitle: COD_TITLES[0]?.value ?? "",
      sortOrder: 0,
    },
  });

  const handleSubmit = async (values: WeaponFormValues) => {
    setPending(true);
    try {
      const res = await client.weapon.create.$post(values);
      await res.json();
      toast.success("Weapon created.");
      form.reset({ name: "", category: "", codTitle: "", sortOrder: 0 });
      router.refresh();
    } catch (err) {
      let message = "Failed to create weapon.";
      if (err instanceof Error && err.message) {
        try {
          const parsed = JSON.parse(err.message);
          if (parsed?.message) {
            message = parsed.message;
          } else {
            message = err.message;
          }
        } catch {
          message = err.message;
        }
      }
      if (message.toLowerCase().includes("already exists")) {
        message = "Weapon with this name and COD title already exists.";
      }
      toast.error(message);
    } finally {
      setPending(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="M15 MOD 0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {WEAPON_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="codTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>COD Title</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      {COD_TITLES.map((title) => (
                        <SelectItem key={title.value} value={title.value}>
                          {title.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sortOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    {...field}
                    onChange={(e) => {
                      const next = e.target.valueAsNumber;
                      field.onChange(Number.isNaN(next) ? undefined : next);
                    }}
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="submit" variant="secondary" disabled={pending}>
            {pending ? "Saving…" : "Create weapon"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
