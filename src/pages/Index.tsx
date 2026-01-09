import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import VideoCard from '@/components/VideoCard';
import VideoPlayerDialog from '@/components/VideoPlayerDialog';
import CommentsDialog from '@/components/CommentsDialog';
import ShareDialog from '@/components/ShareDialog';
import { Video, Comment } from '@/types/video';
import { mockVideos, categories } from '@/data/mockVideos';

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
  const [watchHistory, setWatchHistory] = useState<{ videoId: number; timestamp: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedVideos');
    const savedFavorites = localStorage.getItem('favoriteVideos');
    const savedWatched = localStorage.getItem('watchedVideos');
    const savedComments = localStorage.getItem('comments');
    const savedUserName = localStorage.getItem('userName');
    const savedHistory = localStorage.getItem('watchHistory');
    
    if (savedLikes) setLikedVideos(JSON.parse(savedLikes));
    if (savedFavorites) setFavoriteVideos(JSON.parse(savedFavorites));
    if (savedWatched) setWatchedVideos(JSON.parse(savedWatched));
    if (savedComments) setComments(JSON.parse(savedComments));
    if (savedUserName) setUserName(savedUserName);
    if (savedHistory) setWatchHistory(JSON.parse(savedHistory));
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

  useEffect(() => {
    localStorage.setItem('watchHistory', JSON.stringify(watchHistory));
  }, [watchHistory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const filteredVideos = useMemo(() => {
    let videos = mockVideos;

    if (selectedCategory === 'Избранное') {
      videos = mockVideos.filter(video => favoriteVideos.includes(video.id));
    } else if (selectedCategory === 'История') {
      const historyMap = new Map(watchHistory.map(h => [h.videoId, h.timestamp]));
      videos = mockVideos
        .filter(video => watchedVideos.includes(video.id))
        .sort((a, b) => (historyMap.get(b.id) || 0) - (historyMap.get(a.id) || 0));
    } else if (selectedCategory !== 'Все') {
      videos = mockVideos.filter(video => video.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      videos = videos.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.category.toLowerCase().includes(query)
      );
    }

    return videos;
  }, [selectedCategory, favoriteVideos, watchedVideos, watchHistory, searchQuery]);

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
    setWatchHistory(prev => [
      ...prev.filter(h => h.videoId !== video.id),
      { videoId: video.id, timestamp: Date.now() }
    ]);
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
    setWatchHistory(prev => [
      ...prev.filter(h => h.videoId !== video.id),
      { videoId: video.id, timestamp: Date.now() }
    ]);
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

  const handleLike = (videoId: number) => {
    setLikedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleFavorite = (videoId: number) => {
    setFavoriteVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
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

  const handleClearHistory = () => {
    setWatchedVideos([]);
    setWatchHistory([]);
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'только что';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} мин назад`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ч назад`;
    return `${Math.floor(seconds / 86400)} дн назад`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
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

  const getVideoLikes = (videoId: number, baseLikes: number) => {
    return likedVideos.includes(videoId) ? baseLikes + 1 : baseLikes;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Icon name="Lightbulb" className="text-primary" size={28} />
              ЛайфХаки
            </h1>
            <div className="flex items-center gap-2 flex-1 max-w-md">
              {searchOpen ? (
                <div className="flex items-center gap-2 flex-1 animate-fade-in">
                  <Input
                    placeholder="Поиск лайфхаков..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-auto">
                  {favoriteVideos.length > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Icon name="Star" size={12} />
                      {favoriteVideos.length}
                    </Badge>
                  )}
                  <div className="relative group">
                    <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                      <Icon name="Search" size={20} />
                    </Button>
                    <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Ctrl+K
                    </div>
                  </div>
                </div>
              )}
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
                {category === 'История' && <Icon name="History" size={14} />}
                {category}
                {category === 'Избранное' && favoriteVideos.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5">{favoriteVideos.length}</Badge>
                )}
                {category === 'История' && watchedVideos.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5">{watchedVideos.length}</Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {currentVideo && (
          <div className="mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
                      title={currentVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary">{currentVideo.category}</Badge>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setCurrentVideo(null)}
                        >
                          <Icon name="X" size={20} />
                        </Button>
                      </div>
                      <h2 className="text-2xl font-bold mb-2 text-foreground">{currentVideo.title}</h2>
                      <p className="text-muted-foreground mb-4">{currentVideo.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Icon name="Eye" size={16} />
                          {formatNumber(currentVideo.views)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="ThumbsUp" size={16} />
                          {formatNumber(getVideoLikes(currentVideo.id, currentVideo.likes))}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          {currentVideo.duration}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant={likedVideos.includes(currentVideo.id) ? "default" : "outline"}
                          onClick={() => handleLike(currentVideo.id)}
                          className="flex-1"
                        >
                          <Icon name="ThumbsUp" size={16} className="mr-2" />
                          {likedVideos.includes(currentVideo.id) ? 'Понравилось' : 'Нравится'}
                        </Button>
                        <Button
                          variant={favoriteVideos.includes(currentVideo.id) ? "default" : "outline"}
                          onClick={() => handleFavorite(currentVideo.id)}
                        >
                          <Icon name="Star" size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={(e) => handleShare(currentVideo, e)}
                        >
                          <Icon name="Share2" size={16} />
                        </Button>
                      </div>
                    </div>
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
                <VideoCard
                  key={video.id}
                  video={video}
                  index={index}
                  likedVideos={likedVideos}
                  favoriteVideos={favoriteVideos}
                  watchedVideos={watchedVideos}
                  onVideoClick={handleVideoClick}
                  onLike={toggleLike}
                  onFavorite={toggleFavorite}
                  onShare={handleShare}
                  getVideoLikes={getVideoLikes}
                  formatNumber={formatNumber}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              {searchQuery ? `Результаты поиска: "${searchQuery}"` : selectedCategory === 'Избранное' ? 'Избранные видео' : selectedCategory === 'История' ? 'История просмотров' : 'Все видео'}
            </h2>
            {selectedCategory === 'История' && watchedVideos.length > 0 && !searchQuery && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearHistory}
                className="flex items-center gap-2"
              >
                <Icon name="Trash2" size={16} />
                Очистить историю
              </Button>
            )}
          </div>
          {searchQuery && filteredVideos.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="Search" size={64} className="text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">Попробуйте изменить запрос или очистить фильтры</p>
            </div>
          ) : selectedCategory === 'Избранное' && filteredVideos.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="Star" size={64} className="text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Нет избранных видео</h3>
              <p className="text-muted-foreground">Добавьте лайфхаки в избранное, нажав на звёздочку</p>
            </div>
          ) : selectedCategory === 'История' && filteredVideos.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="History" size={64} className="text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">История пуста</h3>
              <p className="text-muted-foreground">Начните смотреть видео, чтобы они появились здесь</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVideos.map((video, index) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={index}
                  likedVideos={likedVideos}
                  favoriteVideos={favoriteVideos}
                  watchedVideos={watchedVideos}
                  onVideoClick={handleVideoClick}
                  onLike={toggleLike}
                  onFavorite={toggleFavorite}
                  onShare={handleShare}
                  getVideoLikes={getVideoLikes}
                  formatNumber={formatNumber}
                />
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

      <VideoPlayerDialog
        open={playerDialogOpen}
        onOpenChange={setPlayerDialogOpen}
        video={playerVideo}
        likedVideos={likedVideos}
        favoriteVideos={favoriteVideos}
        onLike={handleLike}
        onFavorite={handleFavorite}
        onShare={(video) => {
          setShareVideo(video);
          setShareDialogOpen(true);
        }}
        onOpenComments={handleOpenComments}
        onSimilarVideoClick={handleSimilarVideoClick}
        getSimilarVideos={getSimilarVideos}
        formatNumber={formatNumber}
      />

      <CommentsDialog
        video={currentVideo}
        videoComments={videoComments}
        commentText={commentText}
        userName={userName}
        onCommentTextChange={setCommentText}
        onUserNameChange={setUserName}
        onAddComment={handleAddComment}
        onClose={() => setCurrentVideo(null)}
        getInitials={getInitials}
        formatTimeAgo={formatTimeAgo}
      />

      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        video={shareVideo}
        copySuccess={copySuccess}
        onShareToVK={shareToVK}
        onShareToTelegram={shareToTelegram}
        onShareToWhatsApp={shareToWhatsApp}
        onCopyToClipboard={copyToClipboard}
        getShareUrl={getShareUrl}
      />
    </div>
  );
}