"use client";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RegisterStateFormData,
  registerStateSchema,
} from "@/lib/validations/state";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type ReactNode } from "react";
import { IState } from "@/types/state";
import { mutationRegisterState } from "@/hooks/queries/state/mutation-register-state";
import { mutationUpdateState } from "@/hooks/queries/state/mutation-update-state";

interface StateDialogProps {
  state?: IState;
  trigger?: ReactNode;
}

const DEFAULT_VALUES: RegisterStateFormData = {
  name: "",
  uf: "",
};

export function StateDialog({ state, trigger }: StateDialogProps) {
  const registerStateMutation = mutationRegisterState();
  const updateStateMutation = mutationUpdateState();
  const [open, setOpen] = useState(false);
  const isEditing = !!state;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterStateFormData>({
    resolver: zodResolver(registerStateSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const isLoading =
    registerStateMutation.isPending || updateStateMutation.isPending;

  useEffect(() => {
    reset(open && state ? { name: state.name, uf: state.uf } : DEFAULT_VALUES);
  }, [open, reset, state]);

  const onSubmit: SubmitHandler<RegisterStateFormData> = (data) => {
    const mutation = isEditing ? updateStateMutation : registerStateMutation;
    const payload = isEditing && state ? { id: state.id, ...data } : data;
    mutation.mutate(payload as any, { onSuccess: () => setOpen(false) });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="cursor-pointer">
            Adicionar novo estado
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar estado" : "Adicionar novo estado"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os campos abaixo para editar o estado."
              : "Preencha os campos abaixo para adicionar um novo estado."}
          </DialogDescription>
        </DialogHeader>
        <Form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input
              required
              id="name"
              placeholder="Ex: São Paulo"
              {...register("name")}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="uf">Sigla</Label>
            <Input
              required
              id="uf"
              placeholder="Ex: SP"
              {...register("uf")}
              disabled={isLoading}
            />
            {errors.uf && <p className="text-red-500">{errors.uf.message}</p>}
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
