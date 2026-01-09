export interface Video {
  id: number;
  title: string;
  category: string;
  youtubeId: string;
  duration: string;
  views: number;
  likes: number;
  description: string;
}

export interface Comment {
  id: string;
  videoId: number;
  author: string;
  text: string;
  timestamp: number;
}
