export interface Project {
  id: string;
  projectNumber: number;
  itemName: string;
  employee: string;
  status: string;
}

export const fakeData: Project[] = [
  {
    id: '1',
    projectNumber: 345,
    itemName: 'Шкаф',
    employee: 'Иванова',
    status: 'Отгрузка',
  },
  {
    id: '2',
    projectNumber: 345,
    itemName: 'Шкаф',
    employee: 'Иванова',
    status: 'Отгрузка',
  },
  {
    id: '3',
    projectNumber: 382,
    itemName: 'Кровать для мальчика',
    employee: 'Бабушкина',
    status: 'Покраска',
  },
  {
    id: '4',
    projectNumber: 248,
    itemName: 'Тумба',
    employee: 'Петрова',
    status: 'Подготовка к отгрузке',
  },
  {
    id: '5',
    projectNumber: 319,
    itemName: 'СУ',
    employee: 'Лапкина',
    status: 'Покраска',
  },
  {
    id: '6',
    projectNumber: 284,
    itemName: 'Кровать',
    employee: 'Иванова',
    status: 'Подготовка к отгрузке',
  },
  {
    id: '7',
    projectNumber: 315,
    itemName: 'Комод',
    employee: 'Березовик',
    status: 'Раскрой',
  },
  {
    id: '8',
    projectNumber: 302,
    itemName: 'СУ',
    employee: 'Иванова',
    status: 'Фрезеровка',
  },
  {
    id: '9',
    projectNumber: 348,
    itemName: 'Шкаф',
    employee: 'Сидорова',
    status: 'Отгрузка',
  },
  {
    id: '10',
    projectNumber: 365,
    itemName: 'Тумба',
    employee: 'Сидорова',
    status: 'Покраска',
  },
  {
    id: '11',
    projectNumber: 315,
    itemName: 'Комод',
    employee: 'Березовик',
    status: 'Раскрой',
  },
  {
    id: '12',
    projectNumber: 302,
    itemName: 'СУ',
    employee: 'Иванова',
    status: 'Фрезеровка',
  },
  {
    id: '13',
    projectNumber: 348,
    itemName: 'Шкаф',
    employee: 'Сидорова',
    status: 'Отгрузка',
  },
  {
    id: '14',
    projectNumber: 365,
    itemName: 'Тумба',
    employee: 'Сидорова',
    status: 'Покраска',
  },
];
