export interface PostWithUser {
  id: string;
  title: string;
  content: string;
  createdDate: Date;
  approved: boolean;
  userId: string;
  username: string;
  profileImage: string;
}
