import type { IChat } from "./interfaces/IChat";

export function toShortTimeString(date: Date): string {
  return date?.toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric'});
}


export function getLastChat(chats: IChat[]): IChat {
  return chats.sort((a: IChat, b: IChat) => {
    return a.sent.getTime() - b.sent.getTime();
  })[chats.length - 1];
}
