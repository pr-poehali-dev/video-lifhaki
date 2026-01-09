import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
  index: number;
  likedVideos: number[];
  favoriteVideos: number[];
  watchedVideos: number[];
  onVideoClick: (video: Video) => void;
  onLike: (videoId: number, e: React.MouseEvent) => void;
  onFavorite: (videoId: number, e: React.MouseEvent) => void;
  onShare: (video: Video, e: React.MouseEvent) => void;
  getVideoLikes: (videoId: number, baseLikes: number) => number;
  getVideoViews: (videoId: number, baseViews: number) => number;
  formatNumber: (num: number) => string;
}

export default function VideoCard({
  video,
  index,
  likedVideos,
  favoriteVideos,
  watchedVideos,
  onVideoClick,
  onLike,
  onFavorite,
  onShare,
  getVideoLikes,
  getVideoViews,
  formatNumber
}: VideoCardProps) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onVideoClick(video)}
    >
      <div className="relative">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        {watchedVideos.includes(video.id) && (
          <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Icon name="Eye" size={12} />
            Просмотрено
          </div>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
          onClick={(e) => onShare(video, e)}
        >
          <Icon name="Share2" size={16} />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {video.category}
          </Badge>
        </div>
        <h3 className="font-semibold text-base mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Icon name="Eye" size={14} />
            {formatNumber(getVideoViews(video.id, video.views))}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={likedVideos.includes(video.id) ? "default" : "ghost"}
            className="flex-1 h-8"
            onClick={(e) => onLike(video.id, e)}
          >
            <Icon 
              name="ThumbsUp" 
              size={14} 
              className={likedVideos.includes(video.id) ? "fill-current" : ""}
            />
            <span className="ml-1">{formatNumber(getVideoLikes(video.id, video.likes))}</span>
          </Button>
          <Button
            size="icon"
            variant={favoriteVideos.includes(video.id) ? "default" : "ghost"}
            className="h-8 w-8"
            onClick={(e) => onFavorite(video.id, e)}
          >
            <Icon 
              name="Star" 
              size={14}
              className={favoriteVideos.includes(video.id) ? "fill-current" : ""}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}