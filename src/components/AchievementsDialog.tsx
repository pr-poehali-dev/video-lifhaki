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
import { Achievement } from '@/types/achievements';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AchievementsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  achievements: Achievement[];
}

export default function AchievementsDialog({
  open,
  onOpenChange,
  achievements
}: AchievementsDialogProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progress = Math.round((unlockedCount / totalCount) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Trophy" className="text-primary" size={24} />
            Достижения
          </DialogTitle>
          <DialogDescription>
            Открыто {unlockedCount} из {totalCount} достижений ({progress}%)
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30'
                    : 'opacity-60'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-3 rounded-full ${
                        achievement.unlocked
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon name={achievement.icon} size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-foreground">
                          {achievement.title}
                        </h4>
                        {achievement.unlocked && (
                          <Badge variant="default" className="ml-2">
                            <Icon name="Check" size={12} className="mr-1" />
                            Получено
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="Target" size={12} />
                        <span>
                          {achievement.type === 'views' && 'Просмотры'}
                          {achievement.type === 'likes' && 'Лайки'}
                          {achievement.type === 'favorites' && 'Избранное'}
                          : {achievement.requirement}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
