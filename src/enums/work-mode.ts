export enum WorkMode {
  Remote = 1,
  Hybrid = 2,
  OnSite = 3,
}

export const WorkModeLabels: Record<WorkMode, string> = {
  [WorkMode.Remote]: "Remoto",
  [WorkMode.Hybrid]: "Híbrido",
  [WorkMode.OnSite]: "Presencial",
};
