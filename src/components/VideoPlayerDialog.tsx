import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Video {
  id: number;
  title: string;
  category: string;
  youtubeId: string;
  duration: string;
  views: number;
  likes: number;
  description: string;
}

interface VideoPlayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: Video | null;
  likedVideos: number[];
  favoriteVideos: number[];
  onLike: (videoId: number) => void;
  onFavorite: (videoId: number) => void;
  onShare: (video: Video) => void;
  onOpenComments: (video: Video) => void;
  onSimilarVideoClick: (video: Video) => void;
  getSimilarVideos: (video: Video) => Video[];
  formatNumber: (num: number) => string;
}

export default function VideoPlayerDialog({
  open,
  onOpenChange,
  video,
  likedVideos,
  favoriteVideos,
  onLike,
  onFavorite,
  onShare,
  onOpenComments,
  onSimilarVideoClick,
  getSimilarVideos,
  formatNumber
}: VideoPlayerDialogProps) {
  if (!video) return null;

  const similarVideos = getSimilarVideos(video);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          <DialogDescription>
            {video.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(video.id)}
                className={likedVideos.includes(video.id) ? 'text-red-500' : ''}
              >
                <Icon name="Heart" size={20} fill={likedVideos.includes(video.id) ? 'currentColor' : 'none'} />
                <span className="ml-1">{video.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenComments(video)}
              >
                <Icon name="MessageCircle" size={20} />
                <span className="ml-1">Комментарии</span>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFavorite(video.id)}
                className={favoriteVideos.includes(video.id) ? 'text-yellow-500' : ''}
              >
                <Icon name="Star" size={20} fill={favoriteVideos.includes(video.id) ? 'currentColor' : 'none'} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(video)}
              >
                <Icon name="Share2" size={20} />
              </Button>
            </div>
          </div>

          {similarVideos.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3 text-foreground">Похожие видео</h3>
              <div className="grid grid-cols-1 gap-3">
                {similarVideos.map((similarVideo) => (
                  <div
                    key={similarVideo.id}
                    onClick={() => onSimilarVideoClick(similarVideo)}
                    className="flex gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="relative w-32 h-20 flex-shrink-0">
                      <img
                        src={`https://img.youtube.com/vi/${similarVideo.youtubeId}/mqdefault.jpg`}
                        alt={similarVideo.title}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {similarVideo.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2 text-foreground mb-1">
                        {similarVideo.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {similarVideo.category}
                        </Badge>
                        <span>{formatNumber(similarVideo.views / 1000)}K просмотров</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
