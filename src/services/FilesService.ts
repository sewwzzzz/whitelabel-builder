import { BaseService } from "./BaseService";

export interface FileData {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

class FilesService extends BaseService<FileData> {
  constructor() {
    super('/files');
  }
}

export const filesService = new FilesService();