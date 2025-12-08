import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Video {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  views: number;
  description: string;
}

const mockVideos: Video[] = [
  {
    id: 1,
    title: 'Как сложить футболку за 2 секунды',
    category: 'Дом',
    thumbnail: '/placeholder.svg',
    duration: '2:15',
    views: 245000,
    description: 'Японский метод складывания одежды, который сэкономит место и время'
  },
  {
    id: 2,
    title: 'Очистка микроволновки за минуту',
    category: 'Кухня',
    thumbnail: '/placeholder.svg',
    duration: '1:30',
    views: 189000,
    description: 'Используй лимон и воду для идеальной чистоты'
  },
  {
    id: 3,
    title: 'Организация кабелей своими руками',
    category: 'Технологии',
    thumbnail: '/placeholder.svg',
    duration: '3:45',
    views: 312000,
    description: 'Простые решения для порядка на рабочем столе'
  },
  {
    id: 4,
    title: 'Идеальные стрелки за 30 секунд',
    category: 'Красота',
    thumbnail: '/placeholder.svg',
    duration: '2:00',
    views: 421000,
    description: 'Лайфхак с ложкой для безупречного макияжа'
  },
  {
    id: 5,
    title: 'Заморозка зелени правильно',
    category: 'Кухня',
    thumbnail: '/placeholder.svg',
    duration: '1:45',
    views: 156000,
    description: 'Сохрани свежесть зелени на месяцы'
  },
  {
    id: 6,
    title: 'Быстрая зарядка телефона: секреты',
    category: 'Технологии',
    thumbnail: '/placeholder.svg',
    duration: '2:30',
    views: 278000,
    description: 'Как заряжать телефон в 2 раза быстрее'
  },
  {
    id: 7,
    title: 'Удаление пятен без химии',
    category: 'Дом',
    thumbnail: '/placeholder.svg',
    duration: '3:00',
    views: 198000,
    description: 'Натуральные средства для любых пятен'
  },
  {
    id: 8,
    title: 'Объём волос без фена',
    category: 'Красота',
    thumbnail: '/placeholder.svg',
    duration: '1:50',
    views: 334000,
    description: 'Простая техника для пышных волос'
  },
];

const categories = ['Все', 'Дом', 'Кухня', 'Технологии', 'Красота'];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [watchedVideos, setWatchedVideos] = useState<number[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const filteredVideos = useMemo(() => {
    return selectedCategory === 'Все'
      ? mockVideos
      : mockVideos.filter(video => video.category === selectedCategory);
  }, [selectedCategory]);

  const recommendedVideos = useMemo(() => {
    if (watchedVideos.length === 0) return mockVideos.slice(0, 3);
    
    const lastWatched = mockVideos.find(v => v.id === watchedVideos[watchedVideos.length - 1]);
    if (!lastWatched) return mockVideos.slice(0, 3);
    
    const sameCategoryVideos = mockVideos.filter(
      v => v.category === lastWatched.category && !watchedVideos.includes(v.id)
    );
    
    return sameCategoryVideos.slice(0, 3);
  }, [watchedVideos]);

  const handleVideoClick = (video: Video) => {
    setCurrentVideo(video);
    if (!watchedVideos.includes(video.id)) {
      setWatchedVideos([...watchedVideos, video.id]);
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
    return views.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Icon name="Lightbulb" className="text-primary" size={28} />
              ЛайфХаки
            </h1>
            <Button variant="ghost" size="icon">
              <Icon name="Search" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Категории</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {currentVideo && (
          <div className="mb-12 animate-fade-in">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="aspect-video bg-muted relative flex items-center justify-center">
                <Icon name="Play" size={64} className="text-primary" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{currentVideo.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={16} />
                        {formatViews(currentVideo.views)} просмотров
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        {currentVideo.duration}
                      </span>
                    </div>
                    <Badge variant="secondary">{currentVideo.category}</Badge>
                  </div>
                  <Button size="icon" variant="ghost">
                    <Icon name="Share2" size={20} />
                  </Button>
                </div>
                <p className="text-muted-foreground leading-relaxed">{currentVideo.description}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {recommendedVideos.length > 0 && watchedVideos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <Icon name="Sparkles" className="text-primary" size={20} />
              Рекомендации для вас
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedVideos.map((video, index) => (
                <Card
                  key={video.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Icon name="Play" size={48} className="text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={14} />
                        {formatViews(video.views)}
                      </span>
                      <Badge variant="outline" className="text-xs">{video.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Все видео</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video, index) => (
              <Card
                key={video.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleVideoClick(video)}
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="Play" size={48} className="text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  {watchedVideos.includes(video.id) && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Icon name="Check" size={12} />
                      Просмотрено
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={14} />
                      {formatViews(video.views)}
                    </span>
                    <Badge variant="outline" className="text-xs">{video.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-8 bg-white">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2024 ЛайфХаки — Делимся полезными советами</p>
        </div>
      </footer>
    </div>
  );
}
