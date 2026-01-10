import { Video } from '@/types/video';

export const mockVideos: Video[] = [
  {
    id: 1,
    title: '10 кухонных лайфхаков которые упростят жизнь',
    category: 'Кулинария',
    youtubeId: 'uz6rjbw0ZA0',
    duration: '4:23',
    views: 1245000,
    likes: 42400,
    description: 'Полезные хитрости для кухни: быстрая чистка овощей, хранение продуктов и многое другое',
    difficulty: 'easy'
  },
  {
    id: 2,
    title: 'Как быстро очистить микроволновку',
    category: 'Уборка',
    youtubeId: 'RllyGCJF614',
    duration: '2:15',
    views: 589000,
    likes: 19500,
    description: 'Простой способ с лимоном и водой для идеальной чистоты',
    difficulty: 'easy'
  },
  {
    id: 3,
    title: 'Упражнения для спины за 5 минут',
    category: 'Здоровье',
    youtubeId: 'WcCLN92eZAk',
    duration: '5:45',
    views: 912000,
    likes: 35600,
    description: 'Эффективная зарядка для здоровой спины, которую можно делать дома',
    difficulty: 'medium'
  },
  {
    id: 4,
    title: 'Идеальные стрелки макияж за 30 секунд',
    category: 'Красота',
    youtubeId: 'z8bPqxGQXhQ',
    duration: '2:30',
    views: 1421000,
    likes: 61000,
    description: 'Лайфхак с ложкой для безупречного макияжа глаз',
    difficulty: 'easy'
  },
  {
    id: 5,
    title: 'Ремонт телефона своими руками',
    category: 'Техника',
    youtubeId: 'rCTZSrYKJBI',
    duration: '8:45',
    views: 756000,
    likes: 27800,
    description: 'Простые способы починить треснувший экран и другие неполадки',
    difficulty: 'hard'
  },
  {
    id: 6,
    title: 'DIY органайзер для рабочего стола',
    category: 'DIY',
    youtubeId: 'AF2O4l1JprI',
    duration: '6:30',
    views: 478000,
    likes: 23900,
    description: 'Создаём стильный органайзер из подручных материалов',
    difficulty: 'medium'
  },
  {
    id: 7,
    title: 'Уборка дома за 15 минут',
    category: 'Уборка',
    youtubeId: '6BgLBFQ6drg',
    duration: '3:20',
    views: 698000,
    likes: 29900,
    description: 'Экспресс-уборка: эффективные методы для быстрого результата',
    difficulty: 'easy'
  },
  {
    id: 8,
    title: 'Домашний уход за кожей лица',
    category: 'Красота',
    youtubeId: 'wh8sUCPAibg',
    duration: '7:50',
    views: 1134000,
    likes: 46700,
    description: 'Натуральные маски и процедуры для сияющей кожи',
    difficulty: 'medium'
  },
  {
    id: 9,
    title: 'Секреты идеальных блинов',
    category: 'Кулинария',
    youtubeId: 'b9434BoGkNQ',
    duration: '4:15',
    views: 823000,
    likes: 38200,
    description: 'Рецепт тонких блинов без комочков с секретными ингредиентами',
    difficulty: 'easy'
  },
  {
    id: 10,
    title: 'Йога для начинающих утренний комплекс',
    category: 'Здоровье',
    youtubeId: 'v7AYKMP6rOE',
    duration: '12:00',
    views: 1567000,
    likes: 52300,
    description: 'Простые асаны для бодрости и энергии на весь день',
    difficulty: 'medium'
  },
  {
    id: 11,
    title: 'Организация гардероба лайфхаки',
    category: 'DIY',
    youtubeId: 'Lnzz-v_1Svw',
    duration: '5:40',
    views: 445000,
    likes: 21100,
    description: 'Как правильно хранить одежду и обувь, экономя пространство',
    difficulty: 'easy'
  },
  {
    id: 12,
    title: 'Удаление царапин с экрана телефона',
    category: 'Техника',
    youtubeId: 'xhFpey7Z-L8',
    duration: '3:25',
    views: 892000,
    likes: 34500,
    description: 'Эффективные методы полировки экрана в домашних условиях',
    difficulty: 'medium'
  },
];

export const categories = ['Все', 'История', 'Кулинария', 'Уборка', 'Здоровье', 'Красота', 'Техника', 'DIY', 'Избранное'];