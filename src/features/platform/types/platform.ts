import { RegisterPlatformFormData } from "@/lib/validations/platform";

export interface IPlatform {
  id: number;
  name: string;
  url: string;
}

export interface IResponseAllPlatforms {
  platforms: IPlatform[];
}

export interface UpdatePlatformPayload extends RegisterPlatformFormData {
  id: number;
}
