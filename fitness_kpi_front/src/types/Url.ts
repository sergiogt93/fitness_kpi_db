export interface Url {
  id: number;
  orginal_url: string;
  short_url: string;
  user_id: number;
  clicks: number;
  created_at: Date | null;
  update_at: Date | null;
}

export interface UrlPost {
  url: string;
}