export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'views' | 'likes' | 'favorites';
  unlocked: boolean;
}

export const achievements: Achievement[] = [
  {
    id: 'first-view',
    title: 'Первый шаг',
    description: 'Посмотрите первое видео',
    icon: 'Play',
    requirement: 1,
    type: 'views',
    unlocked: false
  },
  {
    id: 'viewer-10',
    title: 'Любознательный',
    description: 'Посмотрите 10 видео',
    icon: 'Eye',
    requirement: 10,
    type: 'views',
    unlocked: false
  },
  {
    id: 'viewer-25',
    title: 'Знаток',
    description: 'Посмотрите 25 видео',
    icon: 'Award',
    requirement: 25,
    type: 'views',
    unlocked: false
  },
  {
    id: 'viewer-50',
    title: 'Эксперт',
    description: 'Посмотрите 50 видео',
    icon: 'Trophy',
    requirement: 50,
    type: 'views',
    unlocked: false
  },
  {
    id: 'first-like',
    title: 'Ценитель',
    description: 'Поставьте первый лайк',
    icon: 'ThumbsUp',
    requirement: 1,
    type: 'likes',
    unlocked: false
  },
  {
    id: 'liker-10',
    title: 'Активный зритель',
    description: 'Поставьте 10 лайков',
    icon: 'Heart',
    requirement: 10,
    type: 'likes',
    unlocked: false
  },
  {
    id: 'liker-25',
    title: 'Фанат',
    description: 'Поставьте 25 лайков',
    icon: 'Flame',
    requirement: 25,
    type: 'likes',
    unlocked: false
  },
  {
    id: 'first-favorite',
    title: 'Коллекционер',
    description: 'Добавьте первое видео в избранное',
    icon: 'Star',
    requirement: 1,
    type: 'favorites',
    unlocked: false
  },
  {
    id: 'collector-10',
    title: 'Архивариус',
    description: 'Добавьте 10 видео в избранное',
    icon: 'Bookmark',
    requirement: 10,
    type: 'favorites',
    unlocked: false
  },
  {
    id: 'master',
    title: 'Мастер лайфхаков',
    description: 'Посмотрите 100 видео',
    icon: 'Crown',
    requirement: 100,
    type: 'views',
    unlocked: false
  }
];
