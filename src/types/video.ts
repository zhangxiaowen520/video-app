export interface Video {
  id: number;
  longUrl: string | null;
  picture: string;
  publishDate: string | null;
  reduce: string | null;
  shortUrl: string;
  status: number;
  tags: string;
  title: string;
  totalWatch: number | null;
}
