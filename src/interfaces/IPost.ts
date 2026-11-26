export interface IPost {
  sender: string;
  // TODO: add mediaaaaaargh
  postContent: string;
  postMedia?: string[];
  created: Date;

  likes: number;
  comments: number; // arraych
};
