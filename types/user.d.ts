type Image = {
  url: string;
};

type User = {
  display_name: string;
  images?: Array<Image>;
  followers: { total: number };
};
