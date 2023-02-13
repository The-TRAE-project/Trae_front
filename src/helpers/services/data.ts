import { Employee, Project } from './types';

export const fakeData: Project[] = [
  {
    id: '1',
    projectNumber: 345,
    itemName: 'Шкаф',
    employee: 'Иванова',
    status: 'Отгрузка',
    isInWork: true,
    stages: [
      {
        id: '1',
        projectId: '1',
        stage: 'Раскрой',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '2',
        projectId: '1',
        stage: 'Кромка',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Берёзов Пётр',
      },
      {
        id: '3',
        projectId: '1',
        stage: 'Фрезеровка',
        isTodo: true,
        isComplete: false,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '4',
        projectId: '1',
        stage: 'Сборка',
        isComplete: false,
        isTodo: false,
        isNext: true,
      },
      {
        id: '5',
        projectId: '1',
        stage: 'Подготовка к покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '6',
        projectId: '1',
        stage: 'Покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '7',
        projectId: '1',
        stage: 'Упаковка',
        isComplete: false,
        isTodo: false,
      },
    ],
  },
  {
    id: '2',
    projectNumber: 345,
    itemName: 'Шкаф',
    employee: 'Иванова',
    status: 'Отгрузка',
    isInWork: false,
    stages: [
      {
        id: '1',
        projectId: '2',
        stage: 'Раскрой',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '2',
        projectId: '2',
        stage: 'Кромка',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Берёзов Пётр',
      },
      {
        id: '3',
        projectId: '2',
        stage: 'Фрезеровка',
        isTodo: true,
        isComplete: false,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '4',
        projectId: '2',
        stage: 'Сборка',
        isComplete: false,
        isTodo: false,
        isNext: true,
      },
      {
        id: '5',
        projectId: '2',
        stage: 'Подготовка к покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '6',
        projectId: '2',
        stage: 'Покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '7',
        projectId: '2',
        stage: 'Упаковка',
        isComplete: false,
        isTodo: false,
      },
    ],
  },
  {
    id: '3',
    projectNumber: 382,
    itemName: 'Кровать для мальчика',
    employee: 'Бабушкина',
    status: 'Покраска',
    isInWork: true,
    stages: [
      {
        id: '1',
        projectId: '3',
        stage: 'Раскрой',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '2',
        projectId: '3',
        stage: 'Кромка',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Берёзов Пётр',
      },
      {
        id: '3',
        projectId: '3',
        stage: 'Фрезеровка',
        isTodo: true,
        isComplete: false,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '4',
        projectId: '3',
        stage: 'Сборка',
        isComplete: false,
        isTodo: false,
        isNext: true,
      },
      {
        id: '5',
        projectId: '3',
        stage: 'Подготовка к покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '6',
        projectId: '3',
        stage: 'Покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '7',
        projectId: '3',
        stage: 'Упаковка',
        isComplete: false,
        isTodo: false,
      },
    ],
  },
  {
    id: '4',
    projectNumber: 248,
    itemName: 'Тумба',
    employee: 'Петрова',
    status: 'Подготовка к отгрузке',
    isInWork: false,
    stages: [
      {
        id: '1',
        projectId: '4',
        stage: 'Раскрой',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '2',
        projectId: '4',
        stage: 'Кромка',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Берёзов Пётр',
      },
      {
        id: '3',
        projectId: '4',
        stage: 'Фрезеровка',
        isTodo: true,
        isComplete: false,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '4',
        projectId: '4',
        stage: 'Сборка',
        isComplete: false,
        isTodo: false,
        isNext: true,
      },
      {
        id: '5',
        projectId: '4',
        stage: 'Подготовка к покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '6',
        projectId: '4',
        stage: 'Покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '7',
        projectId: '4',
        stage: 'Упаковка',
        isComplete: false,
        isTodo: false,
      },
    ],
  },
  {
    id: '5',
    projectNumber: 319,
    itemName: 'СУ',
    employee: 'Лапкина',
    status: 'Покраска',
    isInWork: false,
    stages: [
      {
        id: '1',
        projectId: '5',
        stage: 'Раскрой',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '2',
        projectId: '5',
        stage: 'Кромка',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Берёзов Пётр',
      },
      {
        id: '3',
        projectId: '5',
        stage: 'Фрезеровка',
        isTodo: true,
        isComplete: false,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '4',
        projectId: '5',
        stage: 'Сборка',
        isComplete: false,
        isTodo: false,
        isNext: true,
      },
      {
        id: '5',
        projectId: '5',
        stage: 'Подготовка к покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '6',
        projectId: '5',
        stage: 'Покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '7',
        projectId: '5',
        stage: 'Упаковка',
        isComplete: false,
        isTodo: false,
      },
    ],
  },
  {
    id: '6',
    projectNumber: 284,
    itemName: 'Кровать',
    employee: 'Иванова',
    status: 'Подготовка к отгрузке',
    isInWork: false,
    stages: [
      {
        id: '1',
        projectId: '6',
        stage: 'Раскрой',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '2',
        projectId: '6',
        stage: 'Кромка',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Берёзов Пётр',
      },
      {
        id: '3',
        projectId: '6',
        stage: 'Фрезеровка',
        isTodo: true,
        isComplete: false,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '4',
        projectId: '6',
        stage: 'Сборка',
        isComplete: false,
        isTodo: false,
        isNext: true,
      },
      {
        id: '5',
        projectId: '6',
        stage: 'Подготовка к покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '6',
        projectId: '6',
        stage: 'Покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '7',
        projectId: '6',
        stage: 'Упаковка',
        isComplete: false,
        isTodo: false,
      },
    ],
  },
  {
    id: '7',
    projectNumber: 315,
    itemName: 'Комод',
    employee: 'Березовик',
    status: 'Раскрой',
    isInWork: true,
    stages: [
      {
        id: '1',
        projectId: '7',
        stage: 'Раскрой',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '2',
        projectId: '7',
        stage: 'Кромка',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Берёзов Пётр',
      },
      {
        id: '3',
        projectId: '7',
        stage: 'Фрезеровка',
        isTodo: true,
        isComplete: false,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '4',
        projectId: '7',
        stage: 'Сборка',
        isComplete: false,
        isTodo: false,
        isNext: true,
      },
      {
        id: '5',
        projectId: '7',
        stage: 'Подготовка к покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '6',
        projectId: '7',
        stage: 'Покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '7',
        projectId: '7',
        stage: 'Упаковка',
        isComplete: false,
        isTodo: false,
      },
    ],
  },
  {
    id: '8',
    projectNumber: 302,
    itemName: 'СУ',
    employee: 'Иванова',
    status: 'Фрезеровка',
    isInWork: true,
    stages: [
      {
        id: '1',
        projectId: '8',
        stage: 'Раскрой',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '2',
        projectId: '8',
        stage: 'Кромка',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Берёзов Пётр',
      },
      {
        id: '3',
        projectId: '8',
        stage: 'Фрезеровка',
        isTodo: true,
        isComplete: false,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '4',
        projectId: '8',
        stage: 'Сборка',
        isComplete: false,
        isTodo: false,
        isNext: true,
      },
      {
        id: '5',
        projectId: '8',
        stage: 'Подготовка к покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '6',
        projectId: '8',
        stage: 'Покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '7',
        projectId: '8',
        stage: 'Упаковка',
        isComplete: false,
        isTodo: false,
      },
    ],
  },
  {
    id: '9',
    projectNumber: 348,
    itemName: 'Шкаф',
    employee: 'Сидорова',
    status: 'Отгрузка',
    isInWork: true,
    stages: [
      {
        id: '1',
        projectId: '9',
        stage: 'Раскрой',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '2',
        projectId: '9',
        stage: 'Кромка',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Берёзов Пётр',
      },
      {
        id: '3',
        projectId: '9',
        stage: 'Фрезеровка',
        isTodo: true,
        isComplete: false,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '4',
        projectId: '9',
        stage: 'Сборка',
        isComplete: false,
        isTodo: false,
        isNext: true,
      },
      {
        id: '5',
        projectId: '9',
        stage: 'Подготовка к покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '6',
        projectId: '9',
        stage: 'Покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '7',
        projectId: '9',
        stage: 'Упаковка',
        isComplete: false,
        isTodo: false,
      },
    ],
  },
  {
    id: '10',
    projectNumber: 365,
    itemName: 'Тумба',
    employee: 'Сидорова',
    status: 'Покраска',
    isInWork: true,
    stages: [
      {
        id: '1',
        projectId: '10',
        stage: 'Раскрой',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '2',
        projectId: '10',
        stage: 'Кромка',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Берёзов Пётр',
      },
      {
        id: '3',
        projectId: '10',
        stage: 'Фрезеровка',
        isTodo: true,
        isComplete: false,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '4',
        projectId: '10',
        stage: 'Сборка',
        isComplete: false,
        isTodo: false,
        isNext: true,
      },
      {
        id: '5',
        projectId: '10',
        stage: 'Подготовка к покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '6',
        projectId: '10',
        stage: 'Покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '7',
        projectId: '10',
        stage: 'Упаковка',
        isComplete: false,
        isTodo: false,
      },
    ],
  },
  {
    id: '11',
    projectNumber: 315,
    itemName: 'Комод',
    employee: 'Березовик',
    status: 'Раскрой',
    isInWork: false,
    stages: [
      {
        id: '1',
        projectId: '11',
        stage: 'Раскрой',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '2',
        projectId: '11',
        stage: 'Кромка',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Берёзов Пётр',
      },
      {
        id: '3',
        projectId: '11',
        stage: 'Фрезеровка',
        isTodo: true,
        isComplete: false,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '4',
        projectId: '11',
        stage: 'Сборка',
        isComplete: false,
        isTodo: false,
        isNext: true,
      },
      {
        id: '5',
        projectId: '11',
        stage: 'Подготовка к покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '6',
        projectId: '11',
        stage: 'Покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '7',
        projectId: '11',
        stage: 'Упаковка',
        isComplete: false,
        isTodo: false,
      },
    ],
  },
  {
    id: '12',
    projectNumber: 302,
    itemName: 'СУ',
    employee: 'Иванова',
    status: 'Фрезеровка',
    isInWork: false,
    stages: [
      {
        id: '1',
        projectId: '12',
        stage: 'Раскрой',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '2',
        projectId: '12',
        stage: 'Кромка',
        isTodo: false,
        isComplete: true,
        isNext: false,
        employee: 'Берёзов Пётр',
      },
      {
        id: '3',
        projectId: '12',
        stage: 'Фрезеровка',
        isTodo: true,
        isComplete: false,
        isNext: false,
        employee: 'Иванов Иван',
      },
      {
        id: '4',
        projectId: '12',
        stage: 'Сборка',
        isComplete: false,
        isTodo: false,
        isNext: true,
      },
      {
        id: '5',
        projectId: '12',
        stage: 'Подготовка к покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '6',
        projectId: '12',
        stage: 'Покраска',
        isComplete: false,
        isTodo: false,
        isNext: false,
      },
      {
        id: '7',
        projectId: '12',
        stage: 'Упаковка',
        isComplete: false,
        isTodo: false,
      },
    ],
  },
];

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Берёзов Иван',
  },
  {
    id: '2',
    name: 'Шишкин Пётр',
  },
  {
    id: '3',
    name: 'Речков Павел',
  },
  {
    id: '4',
    name: 'Иванов Иван',
  },
  {
    id: '5',
    name: 'Грибков Павел',
  },
  {
    id: '6',
    name: 'Лапкин Роман',
  },
  {
    id: '7',
    name: 'Никулин Алексей',
  },
  {
    id: '8',
    name: 'Лапкин Роман',
  },
  {
    id: '9',
    name: 'Иванов Иван',
  },
];