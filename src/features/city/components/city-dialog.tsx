"use client";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICity } from "../types/city";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IState } from "@/features/state/types/state";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RegisterCityFormData,
  registerCitySchema,
} from "@/lib/validations/city";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllStates } from "@/features/state/hooks/get-all-states";
import { mutationRegisterCity } from "../hooks/mutation-register-city";
import { mutationUpdateCity } from "../hooks/mutation-update-city";

interface CityDialogProps {
  city?: ICity;
  trigger?: ReactNode;
}
export function CityDialog({ city, trigger }: CityDialogProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading: isLoadingStates } = getAllStates();
  const registerCityMutation = mutationRegisterCity();
  const updateCityMutation = mutationUpdateCity();
  const isEditing = !!city;
  const isLoading =
    registerCityMutation.isPending || updateCityMutation.isPending;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegisterCityFormData>({
    resolver: zodResolver(registerCitySchema),
    defaultValues: {
      name: city?.name ?? "",
      stateId: city?.stateId ?? 0,
    },
  });

  useEffect(() => {
    reset(
      open && city
        ? { name: city.name, stateId: city.stateId }
        : { name: "", stateId: 0 }
    );
  }, [open, reset, city]);

  const onSubmit: SubmitHandler<RegisterCityFormData> = (data) => {
    const mutation = isEditing ? updateCityMutation : registerCityMutation;
    const payload = isEditing && city ? { id: city.id, ...data } : data;
    mutation.mutate(payload as any, { onSuccess: () => setOpen(false) });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="cursor-pointer">
            Adicionar nova cidade
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {city ? "Editar cidade" : "Adicionar nova cidade"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os campos abaixo para editar a cidade."
              : "Preencha os campos abaixo para adicionar uma nova cidade."}
          </DialogDescription>
        </DialogHeader>
        <Form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input
              required
              {...register("name")}
              placeholder="Ex: São José do Rio Preto"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="state">Estado</Label>
            {isLoadingStates ? (
              <Skeleton className="w-full h-9" />
            ) : (
              <Select
                onValueChange={(value) => setValue("stateId", Number(value))}
                defaultValue={city?.stateId?.toString() ?? undefined}
                disabled={isLoadingStates}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  {data?.states.map((state: IState) => (
                    <SelectItem key={state.id} value={state.id.toString()}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {errors.stateId && (
              <p className="text-red-500">{errors.stateId.message}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="cursor-pointer"
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isLoading}
            >
              {isLoading
                ? "Salvando..."
                : isEditing
                ? "Salvar alterações"
                : "Adicionar"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
