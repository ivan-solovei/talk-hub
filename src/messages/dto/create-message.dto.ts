export class CreateMessageDto {
  readonly text: string;
  readonly sender: string;
  readonly senderName: string;
  readonly receiver: string;
  readonly receiverName: string;
  readonly timestamp: string;
  readonly chatId: string;
}
