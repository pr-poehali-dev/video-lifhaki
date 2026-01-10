import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Video } from '@/types/video';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LeaderboardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videos: Video[];
  getVideoViews: (videoId: number, baseViews: number) => number;
  getVideoLikes: (videoId: number, baseLikes: number) => number;
  formatNumber: (num: number) => string;
  onVideoClick: (video: Video) => void;
}

export default function LeaderboardDialog({
  open,
  onOpenChange,
  videos,
  getVideoViews,
  getVideoLikes,
  formatNumber,
  onVideoClick
}: LeaderboardDialogProps) {
  const topByViews = [...videos]
    .map(video => ({
      ...video,
      totalViews: getVideoViews(video.id, video.views)
    }))
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 10);

  const topByLikes = [...videos]
    .map(video => ({
      ...video,
      totalLikes: getVideoLikes(video.id, video.likes)
    }))
    .sort((a, b) => b.totalLikes - a.totalLikes)
    .slice(0, 10);

  const getMedalIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  const getMedalColor = (index: number) => {
    if (index === 0) return 'from-yellow-400 to-yellow-600';
    if (index === 1) return 'from-gray-300 to-gray-500';
    if (index === 2) return 'from-orange-400 to-orange-600';
    return 'from-muted to-muted';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="BarChart3" className="text-primary" size={24} />
            Топ лайфхаков
          </DialogTitle>
          <DialogDescription>
            Самые популярные видео по просмотрам и лайкам
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="views" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="views" className="flex items-center gap-2">
              <Icon name="Eye" size={16} />
              По просмотрам
            </TabsTrigger>
            <TabsTrigger value="likes" className="flex items-center gap-2">
              <Icon name="ThumbsUp" size={16} />
              По лайкам
            </TabsTrigger>
          </TabsList>

          <TabsContent value="views">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {topByViews.map((video, index) => (
                  <Card
                    key={video.id}
                    className={`cursor-pointer transition-all hover:shadow-lg bg-gradient-to-r ${getMedalColor(index)} ${index < 3 ? 'border-2' : ''}`}
                    onClick={() => {
                      onVideoClick(video);
                      onOpenChange(false);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`text-3xl font-bold ${index < 3 ? 'text-4xl' : 'text-foreground/50'} min-w-[3rem] text-center`}>
                          {getMedalIcon(index)}
                        </div>
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground line-clamp-2 mb-1">
                            {video.title}
                          </h4>
                          <div className="flex items-center gap-3 text-sm">
                            <Badge variant="secondary">{video.category}</Badge>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Icon name="Eye" size={14} />
                              {formatNumber(video.totalViews)}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Icon name="Clock" size={14} />
                              {video.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="likes">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {topByLikes.map((video, index) => (
                  <Card
                    key={video.id}
                    className={`cursor-pointer transition-all hover:shadow-lg bg-gradient-to-r ${getMedalColor(index)} ${index < 3 ? 'border-2' : ''}`}
                    onClick={() => {
                      onVideoClick(video);
                      onOpenChange(false);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`text-3xl font-bold ${index < 3 ? 'text-4xl' : 'text-foreground/50'} min-w-[3rem] text-center`}>
                          {getMedalIcon(index)}
                        </div>
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground line-clamp-2 mb-1">
                            {video.title}
                          </h4>
                          <div className="flex items-center gap-3 text-sm">
                            <Badge variant="secondary">{video.category}</Badge>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Icon name="ThumbsUp" size={14} />
                              {formatNumber(video.totalLikes)}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Icon name="Clock" size={14} />
                              {video.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
