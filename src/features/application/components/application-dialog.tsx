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
import { IApplication } from "../types/application";
import {
  RegisterApplicationFormData,
  registerApplicationSchema,
} from "@/lib/validations/application";
import { WorkMode, WorkModeLabels } from "@/enums/work-mode";
import {
  ApplicationStatus,
  ApplicationStatusLabel,
} from "@/enums/application-status";
import { mutationRegisterApplication } from "../hooks/mutation-register-application";
import { mutationUpdateApplication } from "../hooks/mutation-update-application";
import { getAllPlatforms } from "@/features/platform/hooks/get-all-platforms";
import { getAllCompanies } from "@/features/company/hooks/get-all-companies";
import { FormField } from "@/components/shared/form-fields/form-field";
import { FormTextareaField } from "@/components/shared/form-fields/form-textarea-field";
import { FormCurrencyField } from "@/components/shared/form-fields/form-currency-field";
import { FormSelectField } from "@/components/shared/form-fields/form-select-field";
import { FormDateField } from "@/components/shared/form-fields/form-date-field";
import { FormSelectsRow } from "@/components/shared/form-fields/form-selects-row";

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

  // Preparar opções para os selects
  const platformOptions =
    platforms.data?.platforms.map((platform) => ({
      value: platform.id,
      label: platform.name,
    })) || [];

  const companyOptions =
    companies.data?.companies.map((company) => ({
      value: company.id,
      label: company.name,
    })) || [];

  const workModeOptions = Object.values(WorkMode)
    .filter((mode) => typeof mode === "number")
    .map((mode) => ({
      value: mode,
      label: WorkModeLabels[mode],
    }));

  const statusOptions = Object.values(ApplicationStatus)
    .filter((status) => typeof status === "number")
    .map((status) => ({
      value: status,
      label: ApplicationStatusLabel[status],
    }));

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
          <div className="space-y-4">
            <FormField
              label="Nome"
              name="title"
              register={register}
              errors={errors}
              placeholder="Ex: Desenvolvedor Junior"
              required
            />
            <FormTextareaField
              label="Descrição"
              name="description"
              register={register}
              errors={errors}
              placeholder="Ex: Desenvolvedor Junior com experiência em React e Node.js."
              required
            />
            <FormCurrencyField
              label="Salário"
              name="salary"
              control={control}
              errors={errors}
              placeholder="Ex: R$ 1000,00"
            />
            <FormSelectsRow>
              <FormSelectField
                label="Plataforma"
                name="platformId"
                control={control}
                errors={errors}
                options={platformOptions}
                placeholder="Selecione uma plataforma"
                disabled={platforms.isLoading}
              />
              <FormSelectField
                label="Modo de trabalho"
                name="workMode"
                control={control}
                errors={errors}
                options={workModeOptions}
                placeholder="Selecione um modo de trabalho"
              />
              <FormSelectField
                label="Status"
                name="status"
                control={control}
                errors={errors}
                options={statusOptions}
                placeholder="Selecione um status"
              />
              <FormSelectField
                label="Empresa"
                name="companyId"
                control={control}
                errors={errors}
                options={companyOptions}
                placeholder="Selecione uma empresa"
                disabled={companies.isLoading}
              />
            </FormSelectsRow>
            <FormField
              label="URL"
              name="url"
              register={register}
              errors={errors}
              placeholder="Ex: https://gupy.com.br"
              required
            />
            <FormDateField
              label="Data de aplicação"
              name="applicationDate"
              control={control}
              errors={errors}
            />
          </div>
          <DialogFooter className="mt-6">
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
