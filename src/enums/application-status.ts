export enum ApplicationStatus {
  Pending = 1,
  InReview = 2,
  Cancelled = 3,
  Approved = 4,
  Rejected = 5,
}

export const ApplicationStatusLabel: Record<ApplicationStatus, string> = {
  [ApplicationStatus.Pending]: "Pendente",
  [ApplicationStatus.InReview]: "Em revisão",
  [ApplicationStatus.Cancelled]: "Cancelada",
  [ApplicationStatus.Approved]: "Aprovada",
  [ApplicationStatus.Rejected]: "Rejeitada",
};
