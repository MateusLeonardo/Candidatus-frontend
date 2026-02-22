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
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICompany, UpdateCompanyPayload } from "../types/company";
import {
  RegisterCompanyFormData,
  registerCompanySchema,
} from "@/lib/validations/company";
import { useGetAllCities } from "@/features/city/hooks/use-get-all-cities";
import { useMutationUpdateCompany } from "../hooks/use-mutation-update-company";
import { FormField } from "@/components/shared/form-fields/form-field";
import { FormSelectField } from "@/components/shared/form-fields/form-select-field";
import { useMutationRegisterCompany } from "../hooks/use-mutation-register-company";

interface ICompanyDialogProps {
  company?: ICompany;
  trigger?: ReactNode;
}
export function CompanyDialog({ company, trigger }: ICompanyDialogProps) {
  const [open, setOpen] = useState(false);
  const { data } = useGetAllCities();
  const registerCompanyMutation = useMutationRegisterCompany();
  const updateCompanyMutation = useMutationUpdateCompany();
  const isEditing = !!company;
  const isLoading =
    registerCompanyMutation.isPending || updateCompanyMutation.isPending;
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RegisterCompanyFormData>({
    resolver: zodResolver(registerCompanySchema),
    defaultValues: {
      name: company?.name ?? "",
      cityId: company?.cityId ?? 0,
    },
  });

  useEffect(() => {
    reset(
      open && company
        ? { name: company.name, cityId: company.cityId }
        : { name: "", cityId: 0 },
    );
  }, [open, reset, company]);

  const onSubmit: SubmitHandler<RegisterCompanyFormData> = (data) => {
    const mutation = isEditing
      ? updateCompanyMutation
      : registerCompanyMutation;
    const payload = isEditing && company ? { id: company.id, ...data } : data;
    mutation.mutate(payload as UpdateCompanyPayload, {
      onSuccess: () => setOpen(false),
    });
  };

  const cityOptions =
    data?.cities.map((city) => ({
      label: city.name,
      value: city.id,
    })) || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="cursor-pointer">
            Adicionar nova empresa
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {company ? "Editar empresa" : "Adicionar nova empresa"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os campos abaixo para editar a empresa."
              : "Preencha os campos abaixo para adicionar uma nova empresa."}
          </DialogDescription>
        </DialogHeader>
        <Form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            name="name"
            label="Nome"
            register={register}
            errors={errors}
            placeholder="Ex: Candidatus"
            required
          />
          <FormSelectField
            name="cityId"
            label="Cidade"
            options={cityOptions}
            errors={errors}
            control={control}
            placeholder="Selecione uma cidade"
            required
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
