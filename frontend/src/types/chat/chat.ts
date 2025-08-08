import type { UserPreview } from './userPreview';

export interface Chat {
  id: string;
  user: UserPreview;
  createdAt: Date;
}
