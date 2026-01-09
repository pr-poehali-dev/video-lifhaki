import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Video, Comment } from '@/types/video';

interface CommentsDialogProps {
  video: Video | null;
  videoComments: Comment[];
  commentText: string;
  userName: string;
  onCommentTextChange: (text: string) => void;
  onUserNameChange: (name: string) => void;
  onAddComment: () => void;
  onClose: () => void;
  getInitials: (name: string) => string;
  formatTimeAgo: (timestamp: number) => string;
}

export default function CommentsDialog({
  video,
  videoComments,
  commentText,
  userName,
  onCommentTextChange,
  onUserNameChange,
  onAddComment,
  onClose,
  getInitials,
  formatTimeAgo
}: CommentsDialogProps) {
  if (!video) return null;

  return (
    <Dialog open={!!video} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          <DialogDescription>
            Комментарии к видео
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(userName || 'Гость')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  placeholder="Ваше имя"
                  value={userName}
                  onChange={(e) => onUserNameChange(e.target.value)}
                  className="mb-2"
                />
                <Textarea
                  placeholder="Добавьте комментарий..."
                  value={commentText}
                  onChange={(e) => onCommentTextChange(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={onAddComment}
                disabled={!commentText.trim()}
              >
                <Icon name="Send" size={16} className="mr-2" />
                Отправить
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {videoComments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="MessageCircle" size={48} className="mx-auto mb-2 opacity-30" />
                <p>Пока нет комментариев. Будьте первым!</p>
              </div>
            ) : (
              videoComments.map((comment) => (
                <div key={comment.id} className="flex gap-3 animate-fade-in">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-secondary">
                      {getInitials(comment.author)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-foreground">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{formatTimeAgo(comment.timestamp)}</span>
                    </div>
                    <p className="text-sm text-foreground">{comment.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}