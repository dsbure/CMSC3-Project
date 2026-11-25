export interface IPost {
  sender: string;
  // TODO: add mediaaaaaargh
  postContent: string;
  created: Date;

  likes: number;
  comments: number; // arraych
};
