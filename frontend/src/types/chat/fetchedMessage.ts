export interface FetchedMessage {
  id: string;
  text: string;
  chatId: string;
  senderId: string;
  createdAt?: Date;
}
