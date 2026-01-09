import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface Comment {
  id: string;
  videoId: number;
  author: string;
  text: string;
  timestamp: number;
}

const mockVideos: Video[] = [
  {
    id: 1,
    title: 'Как сложить футболку за 2 секунды',
    category: 'Дом',
    youtubeId: 'uz6rjbw0ZA0',
    duration: '2:15',
    views: 245000,
    likes: 12400,
    description: 'Японский метод складывания одежды, который сэкономит место и время'
  },
  {
    id: 2,
    title: 'Очистка микроволновки за минуту',
    category: 'Кухня',
    youtubeId: 'RllyGCJF614',
    duration: '1:30',
    views: 189000,
    likes: 9500,
    description: 'Используй лимон и воду для идеальной чистоты'
  },
  {
    id: 3,
    title: 'Организация кабелей своими руками',
    category: 'Технологии',
    youtubeId: 'WcCLN92eZAk',
    duration: '3:45',
    views: 312000,
    likes: 15600,
    description: 'Простые решения для порядка на рабочем столе'
  },
  {
    id: 4,
    title: 'Идеальные стрелки за 30 секунд',
    category: 'Красота',
    youtubeId: 'z8bPqxGQXhQ',
    duration: '2:00',
    views: 421000,
    likes: 21000,
    description: 'Лайфхак с ложкой для безупречного макияжа'
  },
  {
    id: 5,
    title: 'Заморозка зелени правильно',
    category: 'Кухня',
    youtubeId: 'rCTZSrYKJBI',
    duration: '1:45',
    views: 156000,
    likes: 7800,
    description: 'Сохрани свежесть зелени на месяцы'
  },
  {
    id: 6,
    title: 'Быстрая зарядка телефона: секреты',
    category: 'Технологии',
    youtubeId: 'AF2O4l1JprI',
    duration: '2:30',
    views: 278000,
    likes: 13900,
    description: 'Как заряжать телефон в 2 раза быстрее'
  },
  {
    id: 7,
    title: 'Удаление пятен без химии',
    category: 'Дом',
    youtubeId: '6BgLBFQ6drg',
    duration: '3:00',
    views: 198000,
    likes: 9900,
    description: 'Натуральные средства для любых пятен'
  },
  {
    id: 8,
    title: 'Объём волос без фена',
    category: 'Красота',
    youtubeId: 'wh8sUCPAibg',
    duration: '1:50',
    views: 334000,
    likes: 16700,
    description: 'Простая техника для пышных волос'
  },
];

const categories = ['Все', 'Дом', 'Кухня', 'Технологии', 'Красота', 'Избранное'];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [watchedVideos, setWatchedVideos] = useState<number[]>([]);
  const [likedVideos, setLikedVideos] = useState<number[]>([]);
  const [favoriteVideos, setFavoriteVideos] = useState<number[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareVideo, setShareVideo] = useState<Video | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [playerDialogOpen, setPlayerDialogOpen] = useState(false);
  const [playerVideo, setPlayerVideo] = useState<Video | null>(null);

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedVideos');
    const savedFavorites = localStorage.getItem('favoriteVideos');
    const savedWatched = localStorage.getItem('watchedVideos');
    const savedComments = localStorage.getItem('comments');
    const savedUserName = localStorage.getItem('userName');
    
    if (savedLikes) setLikedVideos(JSON.parse(savedLikes));
    if (savedFavorites) setFavoriteVideos(JSON.parse(savedFavorites));
    if (savedWatched) setWatchedVideos(JSON.parse(savedWatched));
    if (savedComments) setComments(JSON.parse(savedComments));
    if (savedUserName) setUserName(savedUserName);
  }, []);

  useEffect(() => {
    localStorage.setItem('likedVideos', JSON.stringify(likedVideos));
  }, [likedVideos]);

  useEffect(() => {
    localStorage.setItem('favoriteVideos', JSON.stringify(favoriteVideos));
  }, [favoriteVideos]);

  useEffect(() => {
    localStorage.setItem('watchedVideos', JSON.stringify(watchedVideos));
  }, [watchedVideos]);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    }
  }, [userName]);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'Избранное') {
      return mockVideos.filter(video => favoriteVideos.includes(video.id));
    }
    return selectedCategory === 'Все'
      ? mockVideos
      : mockVideos.filter(video => video.category === selectedCategory);
  }, [selectedCategory, favoriteVideos]);

  const recommendedVideos = useMemo(() => {
    if (watchedVideos.length === 0) return mockVideos.slice(0, 3);
    
    const lastWatched = mockVideos.find(v => v.id === watchedVideos[watchedVideos.length - 1]);
    if (!lastWatched) return mockVideos.slice(0, 3);
    
    const sameCategoryVideos = mockVideos.filter(
      v => v.category === lastWatched.category && !watchedVideos.includes(v.id)
    );
    
    return sameCategoryVideos.slice(0, 3);
  }, [watchedVideos]);

  const videoComments = useMemo(() => {
    if (!currentVideo) return [];
    return comments
      .filter(c => c.videoId === currentVideo.id)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [comments, currentVideo]);

  const handleVideoClick = (video: Video) => {
    setPlayerVideo(video);
    setPlayerDialogOpen(true);
    if (!watchedVideos.includes(video.id)) {
      setWatchedVideos([...watchedVideos, video.id]);
    }
  };

  const handleOpenComments = (video: Video) => {
    setCurrentVideo(video);
    setPlayerDialogOpen(false);
  };

  const handleSimilarVideoClick = (video: Video) => {
    setPlayerVideo(video);
    if (!watchedVideos.includes(video.id)) {
      setWatchedVideos([...watchedVideos, video.id]);
    }
  };

  const toggleLike = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const toggleFavorite = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleAddComment = () => {
    if (!currentVideo || !commentText.trim()) return;
    
    const displayName = userName.trim() || 'Гость';
    
    const newComment: Comment = {
      id: Date.now().toString(),
      videoId: currentVideo.id,
      author: displayName,
      text: commentText.trim(),
      timestamp: Date.now()
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
  };

  const handleShare = (video: Video, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShareVideo(video);
    setShareDialogOpen(true);
    setCopySuccess(false);
  };

  const getShareUrl = (video: Video) => {
    return `${window.location.origin}?video=${video.id}`;
  };

  const shareToVK = () => {
    if (!shareVideo) return;
    const url = getShareUrl(shareVideo);
    window.open(`https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(shareVideo.title)}`, '_blank');
  };

  const shareToTelegram = () => {
    if (!shareVideo) return;
    const url = getShareUrl(shareVideo);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareVideo.title)}`, '_blank');
  };

  const shareToWhatsApp = () => {
    if (!shareVideo) return;
    const url = getShareUrl(shareVideo);
    window.open(`https://wa.me/?text=${encodeURIComponent(shareVideo.title + ' ' + url)}`, '_blank');
  };

  const copyToClipboard = async () => {
    if (!shareVideo) return;
    try {
      await navigator.clipboard.writeText(getShareUrl(shareVideo));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getSimilarVideos = (currentVideo: Video) => {
    return mockVideos
      .filter(v => v.id !== currentVideo.id && v.category === currentVideo.category)
      .slice(0, 3);
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'только что';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} мин назад`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ч назад`;
    return `${Math.floor(seconds / 86400)} дн назад`;
  };

  const getVideoLikes = (videoId: number, baseLikes: number) => {
    return baseLikes + (likedVideos.includes(videoId) ? 1 : 0);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const VideoCard = ({ video, index }: { video: Video; index: number }) => (
    <Card
      className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => handleVideoClick(video)}
    >
      <div className="aspect-video bg-muted relative overflow-hidden">
        <img 
          src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
          }}
        />
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
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => toggleFavorite(video.id, e)}
          >
            <Icon 
              name={favoriteVideos.includes(video.id) ? "Star" : "Star"} 
              size={16}
              className={favoriteVideos.includes(video.id) ? "fill-yellow-500 text-yellow-500" : ""}
            />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <Icon name="Eye" size={14} />
            {formatNumber(video.views)}
          </span>
          <Badge variant="outline" className="text-xs">{video.category}</Badge>
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Button
            size="sm"
            variant={likedVideos.includes(video.id) ? "default" : "ghost"}
            className="flex-1 h-8"
            onClick={(e) => toggleLike(video.id, e)}
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
            onClick={(e) => toggleFavorite(video.id, e)}
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

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Icon name="Lightbulb" className="text-primary" size={28} />
              ЛайфХаки
            </h1>
            <div className="flex items-center gap-2">
              {favoriteVideos.length > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Icon name="Star" size={12} />
                  {favoriteVideos.length}
                </Badge>
              )}
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
            </div>
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
                className="rounded-full flex items-center gap-1"
              >
                {category === 'Избранное' && <Icon name="Star" size={14} />}
                {category}
                {category === 'Избранное' && favoriteVideos.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5">{favoriteVideos.length}</Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {currentVideo && (
          <div className="mb-12 animate-fade-in">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="aspect-video bg-black relative">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{currentVideo.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={16} />
                        {formatNumber(currentVideo.views)} просмотров
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        {currentVideo.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="MessageCircle" size={16} />
                        {videoComments.length} {videoComments.length === 1 ? 'комментарий' : 'комментариев'}
                      </span>
                    </div>
                    <Badge variant="secondary">{currentVideo.category}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant={likedVideos.includes(currentVideo.id) ? "default" : "ghost"}
                      onClick={(e) => toggleLike(currentVideo.id, e)}
                    >
                      <Icon 
                        name="ThumbsUp" 
                        size={20}
                        className={likedVideos.includes(currentVideo.id) ? "fill-current" : ""}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant={favoriteVideos.includes(currentVideo.id) ? "default" : "ghost"}
                      onClick={(e) => toggleFavorite(currentVideo.id, e)}
                    >
                      <Icon 
                        name="Star" 
                        size={20}
                        className={favoriteVideos.includes(currentVideo.id) ? "fill-current" : ""}
                      />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleShare(currentVideo)}>
                      <Icon name="Share2" size={20} />
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{currentVideo.description}</p>
                <div className="flex items-center gap-4 text-sm mb-6">
                  <span className="flex items-center gap-1 text-foreground">
                    <Icon name="ThumbsUp" size={16} />
                    {formatNumber(getVideoLikes(currentVideo.id, currentVideo.likes))} лайков
                  </span>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="MessageCircle" size={20} />
                    Комментарии ({videoComments.length})
                  </h4>
                  
                  <div className="mb-6">
                    <div className="flex gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-white">
                          {getInitials(userName || 'Гость')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input
                          placeholder="Ваше имя"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="mb-2"
                        />
                        <Textarea
                          placeholder="Добавьте комментарий..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="min-h-[80px] resize-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleAddComment}
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
                          <div className="flex-1 bg-muted rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(comment.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-foreground whitespace-pre-wrap">{comment.text}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
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
                <VideoCard key={video.id} video={video} index={index} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            {selectedCategory === 'Избранное' ? 'Избранные видео' : 'Все видео'}
          </h2>
          {selectedCategory === 'Избранное' && filteredVideos.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="Star" size={64} className="text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Нет избранных видео</h3>
              <p className="text-muted-foreground">Добавьте лайфхаки в избранное, нажав на звёздочку</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVideos.map((video, index) => (
                <VideoCard key={video.id} video={video} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-8 bg-white">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2024 ЛайфХаки — Делимся полезными советами</p>
        </div>
      </footer>

      <Dialog open={playerDialogOpen} onOpenChange={setPlayerDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{playerVideo?.title}</DialogTitle>
            <DialogDescription>
              {playerVideo?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              {playerVideo && (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${playerVideo.youtubeId}?autoplay=1`}
                  title={playerVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => playerVideo && handleLike(playerVideo.id)}
                  className={likedVideos.includes(playerVideo?.id || 0) ? 'text-red-500' : ''}
                >
                  <Icon name="Heart" size={20} fill={likedVideos.includes(playerVideo?.id || 0) ? 'currentColor' : 'none'} />
                  <span className="ml-1">{playerVideo?.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => playerVideo && handleOpenComments(playerVideo)}
                >
                  <Icon name="MessageCircle" size={20} />
                  <span className="ml-1">Комментарии</span>
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => playerVideo && handleFavorite(playerVideo.id)}
                  className={favoriteVideos.includes(playerVideo?.id || 0) ? 'text-yellow-500' : ''}
                >
                  <Icon name="Star" size={20} fill={favoriteVideos.includes(playerVideo?.id || 0) ? 'currentColor' : 'none'} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (playerVideo) {
                      setShareVideo(playerVideo);
                      setShareDialogOpen(true);
                    }
                  }}
                >
                  <Icon name="Share2" size={20} />
                </Button>
              </div>
            </div>

            {playerVideo && getSimilarVideos(playerVideo).length > 0 && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-3 text-foreground">Похожие видео</h3>
                <div className="grid grid-cols-1 gap-3">
                  {getSimilarVideos(playerVideo).map((video) => (
                    <div
                      key={video.id}
                      onClick={() => handleSimilarVideoClick(video)}
                      className="flex gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    >
                      <div className="relative w-32 h-20 flex-shrink-0">
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2 text-foreground mb-1">
                          {video.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="text-xs">
                            {video.category}
                          </Badge>
                          <span>{(video.views / 1000).toFixed(0)}K просмотров</span>
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

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Поделиться видео</DialogTitle>
            <DialogDescription>
              {shareVideo?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <Button 
              onClick={shareToVK} 
              className="w-full justify-start gap-3 h-12"
              variant="outline"
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                VK
              </div>
              <span>ВКонтакте</span>
            </Button>
            
            <Button 
              onClick={shareToTelegram} 
              className="w-full justify-start gap-3 h-12"
              variant="outline"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Icon name="Send" size={18} className="text-white" />
              </div>
              <span>Telegram</span>
            </Button>
            
            <Button 
              onClick={shareToWhatsApp} 
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
                  value={shareVideo ? getShareUrl(shareVideo) : ''} 
                  readOnly 
                  className="flex-1"
                />
                <Button onClick={copyToClipboard} variant={copySuccess ? "default" : "secondary"}>
                  <Icon name={copySuccess ? "Check" : "Copy"} size={16} />
                  {copySuccess ? 'Скопировано!' : 'Копировать'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}