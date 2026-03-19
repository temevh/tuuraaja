export type SelectedTime = {
  slot: number;
  date: Date;
};

export type User = {
  token: string;
  selectedTimes: SelectedTime[];
  name: string;
  posts: Post[];
};

export type Post = {};
