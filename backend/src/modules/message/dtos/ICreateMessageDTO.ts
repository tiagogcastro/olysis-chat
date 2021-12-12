export interface ICreateMessageDTO {
  message: string 
  receive_user_id: string;
  answered_message_id: string | null;
  sent_user_id: string;
}