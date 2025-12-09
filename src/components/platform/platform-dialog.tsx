"use client";
import { mutationRegisterPlatform } from "@/hooks/queries/platform/mutation-register-platform";
import { mutationUpdatePlatform } from "@/hooks/queries/platform/mutation-update-platform";
import {
  RegisterPlatformFormData,
  registerPlatformSchema,
} from "@/lib/validations/platform";
import { IPlatform } from "@/types/platform";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface IPlatformDialogProps {
  platform?: IPlatform;
  trigger?: ReactNode;
}
export function PlatformDialog({ platform, trigger }: IPlatformDialogProps) {
  const [open, setOpen] = useState(false);
  const registerPlatformMutation = mutationRegisterPlatform();
  const updatePlatformMutation = mutationUpdatePlatform();
  const isEditing = !!platform;
  const isLoading =
    registerPlatformMutation.isPending || updatePlatformMutation.isPending;
  const {
    register,
    handleSubmit,
    setValue,
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
        : { name: "", url: "" }
    );
  }, [open, reset, platform]);

  const onSubmit: SubmitHandler<RegisterPlatformFormData> = (data) => {
    const mutation = isEditing
      ? updatePlatformMutation
      : registerPlatformMutation;
    const payload = isEditing && platform ? { id: platform.id, ...data } : data;
    mutation.mutate(payload as any, { onSuccess: () => setOpen(false) });
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
            <Label htmlFor="url">URL</Label>
            <Input
              required
              {...register("url")}
              placeholder="Ex: https://candidatus.com"
            />
            {errors.url && <p className="text-red-500">{errors.url.message}</p>}
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
