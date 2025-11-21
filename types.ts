export enum AspectRatio {
  Square = "1:1",
  Landscape = "16:9",
  Portrait = "9:16",
  Wide = "4:3",
  Tall = "3:4"
}

export interface GenerateImageParams {
  prompt: string;
  aspectRatio: AspectRatio;
}

export interface GenerationResult {
  imageUrl: string | null;
  textMetadata?: string;
}

export interface AppError {
  message: string;
  details?: string;
}