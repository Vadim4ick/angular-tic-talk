import { HomeIcon } from '@/shared/icons/home-icon';
import { SearchIcon } from '@/shared/icons/search-icon';
import { ChatsIcon } from '@/shared/icons/chats-icon';

export const sidebarMenu = [
  {
    id: 'home',
    title: 'Моя страница',
    icon: HomeIcon,
    link: ['profile/me'],
  },
  {
    id: 'chats',
    title: 'Чаты',
    icon: ChatsIcon,
    link: ['#'],
  },
  {
    id: 'search',
    title: 'Поиск',
    icon: SearchIcon,
    link: ['#'],
  },
];
