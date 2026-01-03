"use client";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Controller } from "react-hook-form";
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
import { Form } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IApplication } from "@/types/application";
import {
  RegisterApplicationFormData,
  registerApplicationSchema,
} from "@/lib/validations/application";
import { WorkMode, WorkModeLabels } from "@/enums/work-mode";
import {
  ApplicationStatus,
  ApplicationStatusLabel,
} from "@/enums/application-status";
import { mutationRegisterApplication } from "@/hooks/queries/application/mutation-register-application";
import { mutationUpdateApplication } from "@/hooks/queries/application/mutation-update-application";
import { formatCurrency } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getAllPlatforms } from "@/hooks/queries/platform/get-all-platforms";
import { getAllCompanies } from "@/hooks/queries/company/get-all-companies";
import { DatePicker } from "../ui/date-picker";

interface IApplicationDialogProps {
  application?: IApplication;
  trigger?: ReactNode;
}
export function ApplicationDialog({
  application,
  trigger,
}: IApplicationDialogProps) {
  const [open, setOpen] = useState(false);
  const registerApplicationMutation = mutationRegisterApplication();
  const updateApplicationMutation = mutationUpdateApplication();
  const platforms = getAllPlatforms();
  const companies = getAllCompanies();
  const isEditing = !!application;
  const isLoading =
    registerApplicationMutation.isPending ||
    updateApplicationMutation.isPending ||
    platforms.isLoading ||
    companies.isLoading;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<RegisterApplicationFormData>({
    resolver: zodResolver(registerApplicationSchema),
    defaultValues: {
      workMode: application?.workMode || WorkMode.OnSite,
      url: application?.url ?? "",
      applicationDate: application?.applicationDate ?? new Date(),
      status: application?.status ?? ApplicationStatus.Pending,
      platformId: application?.platformId ?? 0,
      companyId: application?.companyId ?? 0,
    },
  });

  useEffect(() => {
    reset(
      open && application
        ? {
            title: application.title,
            description: application.description,
            salary: application.salary,
            workMode: application.workMode,
            url: application.url,
            applicationDate: new Date(application.applicationDate),
            status: application.status,
            platformId: application.platformId,
            companyId: application.companyId,
          }
        : {
            title: "",
            description: "",
            salary: 0,
            workMode: WorkMode.OnSite,
            url: "",
            applicationDate: new Date(),
            status: ApplicationStatus.Pending,
            platformId: 0,
            companyId: 0,
          }
    );
  }, [open, reset, application]);

  const onSubmit: SubmitHandler<RegisterApplicationFormData> = (data) => {
    const mutation = isEditing
      ? updateApplicationMutation
      : registerApplicationMutation;
    const payload =
      isEditing && application ? { id: application.id, ...data } : data;
    mutation.mutate(payload as any, { onSuccess: () => setOpen(false) });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="cursor-pointer">
            {isEditing ? "Editar aplicação" : "Adicionar nova aplicação"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {application ? "Editar aplicação" : "Adicionar nova aplicação"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os campos abaixo para editar a aplicação."
              : "Preencha os campos abaixo para adicionar uma nova aplicação."}
          </DialogDescription>
        </DialogHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input
              required
              {...register("title")}
              placeholder="Ex: Desenvolvedor Junior"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              required
              {...register("description")}
              placeholder="Ex: Desenvolvedor Junior com experiência em React e Node.js."
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="salary">Salário</Label>
            <Controller
              control={control}
              name="salary"
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Ex: R$ 1000,00"
                  value={formatCurrency(field.value ?? 0)}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, "");
                    const currencyValue = Number(numericValue) / 100;
                    field.onChange(currencyValue);
                  }}
                />
              )}
            />
            {errors.salary && (
              <p className="text-red-500">{errors.salary.message}</p>
            )}
          </div>
          <div className="flex gap-3 justify-start">
            <div>
              <Label htmlFor="platformId">Plataforma</Label>
              <Controller
                control={control}
                name="platformId"
                render={({ field }) => (
                  <Select
                    value={field.value ? field.value.toString() : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {platforms.data?.platforms.map((platform) => (
                          <SelectItem
                            key={platform.id}
                            value={platform.id.toString()}
                          >
                            {platform.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.platformId && (
                <p className="text-red-500">{errors.platformId.message}</p>
              )}

              {errors.platformId && (
                <p className="text-red-500">{errors.platformId.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="workMode">Modo de trabalho</Label>
              <Controller
                control={control}
                name="workMode"
                render={({ field }) => (
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um modo de trabalho" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {Object.values(WorkMode)
                          .filter((mode) => typeof mode === "number")
                          .map((mode) => (
                            <SelectItem key={mode} value={mode.toString()}>
                              {WorkModeLabels[mode]}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.workMode && (
                <p className="text-red-500">{errors.workMode.message}</p>
              )}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="url">URL</Label>
            <Input
              required
              {...register("url")}
              placeholder="Ex: https://gupy.com.br"
            />
            {errors.url && <p className="text-red-500">{errors.url.message}</p>}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="applicationDate">Data de aplicação</Label>
            <Controller
              control={control}
              name="applicationDate"
              render={({ field }) => (
                <DatePicker date={field.value} onChange={field.onChange} />
              )}
            />
            {errors.applicationDate && (
              <p className="text-red-500">{errors.applicationDate.message}</p>
            )}
          </div>
          <div className="flex gap-3">
            <div>
              <Label htmlFor="status">Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {Object.values(ApplicationStatus)
                          .filter((mode) => typeof mode === "number")
                          .map((mode) => (
                            <SelectItem key={mode} value={mode.toString()}>
                              {ApplicationStatusLabel[mode]}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-red-500">{errors.status.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="companyId">Empresa</Label>
              <Controller
                control={control}
                name="companyId"
                render={({ field }) => (
                  <Select
                    value={field.value ? field.value.toString() : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.data?.companies.map((company) => (
                          <SelectItem
                            key={company.id}
                            value={company.id.toString()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.companyId && (
                <p className="text-red-500">{errors.companyId.message}</p>
              )}
            </div>
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
