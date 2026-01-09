import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: Video | null;
  copySuccess: boolean;
  onShareToVK: () => void;
  onShareToTelegram: () => void;
  onShareToWhatsApp: () => void;
  onCopyToClipboard: () => void;
  getShareUrl: (video: Video) => string;
}

export default function ShareDialog({
  open,
  onOpenChange,
  video,
  copySuccess,
  onShareToVK,
  onShareToTelegram,
  onShareToWhatsApp,
  onCopyToClipboard,
  getShareUrl
}: ShareDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Поделиться видео</DialogTitle>
          <DialogDescription>
            {video?.title}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 pt-4">
          <Button 
            onClick={onShareToVK} 
            className="w-full justify-start gap-3 h-12"
            variant="outline"
          >
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              VK
            </div>
            <span>ВКонтакте</span>
          </Button>
          
          <Button 
            onClick={onShareToTelegram} 
            className="w-full justify-start gap-3 h-12"
            variant="outline"
          >
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <Icon name="Send" size={18} className="text-white" />
            </div>
            <span>Telegram</span>
          </Button>
          
          <Button 
            onClick={onShareToWhatsApp} 
            className="w-full justify-start gap-3 h-12"
            variant="outline"
          >
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
              <Icon name="MessageCircle" size={18} className="text-white" />
            </div>
            <span>WhatsApp</span>
          </Button>

          <div className="pt-4 border-t">
            <div className="flex gap-2">
              <Input 
                value={video ? getShareUrl(video) : ''} 
                readOnly 
                className="flex-1"
              />
              <Button onClick={onCopyToClipboard} variant={copySuccess ? "default" : "secondary"}>
                <Icon name={copySuccess ? "Check" : "Copy"} size={16} />
                {copySuccess ? 'Скопировано!' : 'Копировать'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
