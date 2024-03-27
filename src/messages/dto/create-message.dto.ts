export class CreateMessageDto {
  readonly text: string;
  readonly sender: string;
  readonly receiver: string;
  readonly timestamp: string;
  readonly chatId: string;
}
