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
import { ICity, UpdateCityPayload } from "../types/city";
import { Form } from "@/components/ui/form";
import { IState } from "@/features/state/types/state";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RegisterCityFormData,
  registerCitySchema,
} from "@/lib/validations/city";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllStates } from "@/features/state/hooks/use-get-all-states";
import { useMutationRegisterCity } from "../hooks/use-mutation-register-city";
import { useMutationUpdateCity } from "../hooks/use-mutation-update-city";
import { FormField } from "@/components/shared/form-fields/form-field";
import { FormSelectField } from "@/components/shared/form-fields/form-select-field";

interface CityDialogProps {
  city?: ICity;
  trigger?: ReactNode;
}
export function CityDialog({ city, trigger }: CityDialogProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading: isLoadingStates } = useGetAllStates();
  const registerCityMutation = useMutationRegisterCity();
  const updateCityMutation = useMutationUpdateCity();
  const isEditing = !!city;
  const isLoading =
    registerCityMutation.isPending || updateCityMutation.isPending;
  const {
    register,
    handleSubmit,
    reset,
    control,
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
        : { name: "", stateId: 0 },
    );
  }, [open, reset, city]);

  const onSubmit: SubmitHandler<RegisterCityFormData> = (data) => {
    const mutation = isEditing ? updateCityMutation : registerCityMutation;
    const payload = isEditing && city ? { id: city.id, ...data } : data;
    mutation.mutate(payload as UpdateCityPayload, {
      onSuccess: () => setOpen(false),
    });
  };

  const stateOptions =
    data?.states.map((state: IState) => ({
      label: state.name,
      value: state.id,
    })) || [];

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
          <FormField
            label="Nome"
            name="name"
            register={register}
            errors={errors}
            placeholder="Ex: São José do Rio Preto"
            required
          />
          <FormSelectField
            label="Estado"
            name="stateId"
            control={control}
            errors={errors}
            options={stateOptions}
            placeholder="Selecione um estado"
            disabled={isLoadingStates}
          />
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
