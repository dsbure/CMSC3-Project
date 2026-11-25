export interface IChat {
  chatText: string;
  isSender: boolean;
  sent: Date;
};
export interface IChatData {
  [key: string]: IChat[];
}
