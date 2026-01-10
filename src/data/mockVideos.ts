import { Video } from '@/types/video';

export const mockVideos: Video[] = [
  {
    id: 1,
    title: 'Как сложить футболку за 2 секунды',
    category: 'Дом',
    youtubeId: 'uz6rjbw0ZA0',
    duration: '2:15',
    views: 245000,
    likes: 12400,
    description: 'Японский метод складывания одежды, который сэкономит место и время',
    difficulty: 'medium'
  },
  {
    id: 2,
    title: 'Очистка микроволновки за минуту',
    category: 'Кухня',
    youtubeId: 'RllyGCJF614',
    duration: '1:30',
    views: 189000,
    likes: 9500,
    description: 'Используй лимон и воду для идеальной чистоты',
    difficulty: 'easy'
  },
  {
    id: 3,
    title: 'Организация кабелей своими руками',
    category: 'Технологии',
    youtubeId: 'WcCLN92eZAk',
    duration: '3:45',
    views: 312000,
    likes: 15600,
    description: 'Простые решения для порядка на рабочем столе',
    difficulty: 'medium'
  },
  {
    id: 4,
    title: 'Идеальные стрелки за 30 секунд',
    category: 'Красота',
    youtubeId: 'z8bPqxGQXhQ',
    duration: '2:00',
    views: 421000,
    likes: 21000,
    description: 'Лайфхак с ложкой для безупречного макияжа',
    difficulty: 'easy'
  },
  {
    id: 5,
    title: 'Заморозка зелени правильно',
    category: 'Кухня',
    youtubeId: 'rCTZSrYKJBI',
    duration: '1:45',
    views: 156000,
    likes: 7800,
    description: 'Сохрани свежесть зелени на месяцы',
    difficulty: 'easy'
  },
  {
    id: 6,
    title: 'Быстрая зарядка телефона: секреты',
    category: 'Технологии',
    youtubeId: 'AF2O4l1JprI',
    duration: '2:30',
    views: 278000,
    likes: 13900,
    description: 'Как заряжать телефон в 2 раза быстрее',
    difficulty: 'medium'
  },
  {
    id: 7,
    title: 'Удаление пятен без химии',
    category: 'Дом',
    youtubeId: '6BgLBFQ6drg',
    duration: '3:00',
    views: 198000,
    likes: 9900,
    description: 'Натуральные средства для любых пятен',
    difficulty: 'medium'
  },
  {
    id: 8,
    title: 'Объём волос без фена',
    category: 'Красота',
    youtubeId: 'wh8sUCPAibg',
    duration: '1:50',
    views: 334000,
    likes: 16700,
    description: 'Простая техника для пышных волос',
    difficulty: 'easy'
  },
];

export const categories = ['Все', 'История', 'Дом', 'Кухня', 'Технологии', 'Красота', 'Избранное'];