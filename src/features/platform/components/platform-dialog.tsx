"use client";
import { useMutationRegisterPlatform } from "../hooks/use-mutation-register-platform";
import {
  RegisterPlatformFormData,
  registerPlatformSchema,
} from "@/lib/validations/platform";
import { IPlatform, UpdatePlatformPayload } from "../types/platform";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { FormField } from "@/components/shared/form-fields/form-field";
import { useMutationUpdatePlatform } from "../hooks/use-mutation-update-platform";

interface IPlatformDialogProps {
  platform?: IPlatform;
  trigger?: ReactNode;
}
export function PlatformDialog({ platform, trigger }: IPlatformDialogProps) {
  const [open, setOpen] = useState(false);
  const registerPlatformMutation = useMutationRegisterPlatform();
  const updatePlatformMutation = useMutationUpdatePlatform();
  const isEditing = !!platform;
  const isLoading =
    registerPlatformMutation.isPending || updatePlatformMutation.isPending;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterPlatformFormData>({
    resolver: zodResolver(registerPlatformSchema),
    defaultValues: {
      name: platform?.name ?? "",
      url: platform?.url ?? "",
    },
  });

  useEffect(() => {
    reset(
      open && platform
        ? { name: platform.name, url: platform.url }
        : { name: "", url: "" },
    );
  }, [open, reset, platform]);

  const onSubmit: SubmitHandler<RegisterPlatformFormData> = (data) => {
    const mutation = isEditing
      ? updatePlatformMutation
      : registerPlatformMutation;
    const payload = isEditing && platform ? { id: platform.id, ...data } : data;
    mutation.mutate(payload as UpdatePlatformPayload, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="cursor-pointer">
            Adicionar nova plataforma
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {platform ? "Editar plataforma" : "Adicionar nova plataforma"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os campos abaixo para editar a plataforma."
              : "Preencha os campos abaixo para adicionar uma nova plataforma."}
          </DialogDescription>
        </DialogHeader>
        <Form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-3">
            <FormField
              label="Nome"
              name="name"
              register={register}
              errors={errors}
              placeholder="Ex: Candidatus"
              required
            />
          </div>
          <div className="grid gap-3">
            <FormField
              label="URL"
              name="url"
              register={register}
              errors={errors}
              placeholder="Ex: https://candidatus.com"
              required
            />
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
