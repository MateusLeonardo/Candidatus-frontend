export interface IPlatform {
  id: number;
  name: string;
  url: string;
}

export interface IResponseAllPlatforms {
  platforms: IPlatform[];
}

