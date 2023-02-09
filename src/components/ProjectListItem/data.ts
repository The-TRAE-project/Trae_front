export interface Project {
  id: string;
  projectNumber: number;
  itemName: string;
  employee: string;
  status: string;
  isInWork: boolean;
}

export const fakeData: Project[] = [
  {
    id: '1',
    projectNumber: 345,
    itemName: 'Шкаф',
    employee: 'Иванова',
    status: 'Отгрузка',
    isInWork: true,
  },
  {
    id: '2',
    projectNumber: 345,
    itemName: 'Шкаф',
    employee: 'Иванова',
    status: 'Отгрузка',
    isInWork: false,
  },
  {
    id: '3',
    projectNumber: 382,
    itemName: 'Кровать для мальчика',
    employee: 'Бабушкина',
    status: 'Покраска',
    isInWork: true,
  },
  {
    id: '4',
    projectNumber: 248,
    itemName: 'Тумба',
    employee: 'Петрова',
    status: 'Подготовка к отгрузке',
    isInWork: false,
  },
  {
    id: '5',
    projectNumber: 319,
    itemName: 'СУ',
    employee: 'Лапкина',
    status: 'Покраска',
    isInWork: false,
  },
  {
    id: '6',
    projectNumber: 284,
    itemName: 'Кровать',
    employee: 'Иванова',
    status: 'Подготовка к отгрузке',
    isInWork: false,
  },
  {
    id: '7',
    projectNumber: 315,
    itemName: 'Комод',
    employee: 'Березовик',
    status: 'Раскрой',
    isInWork: true,
  },
  {
    id: '8',
    projectNumber: 302,
    itemName: 'СУ',
    employee: 'Иванова',
    status: 'Фрезеровка',
    isInWork: true,
  },
  {
    id: '9',
    projectNumber: 348,
    itemName: 'Шкаф',
    employee: 'Сидорова',
    status: 'Отгрузка',
    isInWork: true,
  },
  {
    id: '10',
    projectNumber: 365,
    itemName: 'Тумба',
    employee: 'Сидорова',
    status: 'Покраска',
    isInWork: true,
  },
  {
    id: '11',
    projectNumber: 315,
    itemName: 'Комод',
    employee: 'Березовик',
    status: 'Раскрой',
    isInWork: false,
  },
  {
    id: '12',
    projectNumber: 302,
    itemName: 'СУ',
    employee: 'Иванова',
    status: 'Фрезеровка',
    isInWork: false,
  },
  {
    id: '13',
    projectNumber: 348,
    itemName: 'Шкаф',
    employee: 'Сидорова',
    status: 'Отгрузка',
    isInWork: true,
  },
  {
    id: '14',
    projectNumber: 365,
    itemName: 'Тумба',
    employee: 'Сидорова',
    status: 'Покраска',
    isInWork: true,
  },
];
