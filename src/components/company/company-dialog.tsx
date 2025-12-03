"use client";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ICity } from "@/types/city";
import { Form } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IState } from "@/types/state";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RegisterCityFormData,
  registerCitySchema,
} from "@/lib/validations/city";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "../ui/skeleton";
import { ICompany } from "@/types/company";
import {
  RegisterCompanyFormData,
  registerCompanySchema,
} from "@/lib/validations/company";
import { getAllCities } from "@/hooks/queries/city/get-all-cities";
import { mutationRegisterCompany } from "@/hooks/queries/company/mutation-register-company";
import { mutationUpdateCompany } from "@/hooks/queries/company/mutation-update-company";

interface ICompanyDialogProps {
  company?: ICompany;
  trigger?: ReactNode;
}
export function CompanyDialog({ company, trigger }: ICompanyDialogProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading: isLoadingCities } = getAllCities();
  const registerCompanyMutation = mutationRegisterCompany();
  const updateCompanyMutation = mutationUpdateCompany();
  const isEditing = !!company;
  const isLoading =
    registerCompanyMutation.isPending || updateCompanyMutation.isPending;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
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
        : { name: "", cityId: 0 }
    );
  }, [open, reset, company]);

  const onSubmit: SubmitHandler<RegisterCompanyFormData> = (data) => {
    const mutation = isEditing
      ? updateCompanyMutation
      : registerCompanyMutation;
    const payload = isEditing && company ? { id: company.id, ...data } : data;
    mutation.mutate(payload as any, { onSuccess: () => setOpen(false) });
  };

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
          <div className="grid gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input
              required
              {...register("name")}
              placeholder="Ex: Candidatus"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="cityId">Cidade</Label>
            {isLoadingCities ? (
              <Skeleton className="w-full h-9" />
            ) : (
              <Select
                onValueChange={(value) => setValue("cityId", Number(value))}
                defaultValue={company?.cityId?.toString() ?? undefined}
                disabled={isLoadingCities}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a cidade" />
                </SelectTrigger>
                <SelectContent>
                  {data?.cities.map((city: ICity) => (
                    <SelectItem key={city.id} value={city.id.toString()}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {errors.cityId && (
              <p className="text-red-500">{errors.cityId.message}</p>
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
