// src/entities/SupportProgram/model/mock.ts
import type { SupportProgram } from '@shared/types';

export const MOCK_SUPPORT: SupportProgram[] = [
  {
    id: '1',
    title: 'Гранты для молодых учёных',
    category: 'Гранты',
    audience: 'Предпринимателям / Социальная сфера',
    deadline: '2025-05-01',
    description:
      'Поддержка инновационных проектов в области сельского хозяйства и биотехнологиях. Сумма грантов до 500 000 рублей.',
    imageUrl: '/images/support-1.svg',
  },
  {
    id: '2',
    title: "Программа «Земский учитель»",
    category: 'Трудоустройство',
    audience: 'Прямо сейчас',
    deadline: null,
    description:
      'Единовременная выплата в размере 1 млн рублей учителям, прибывшим на работу в сельскую местность.',
    imageUrl: '/images/support-2.svg',
  },
  {
    id: '3',
    title: 'Стипендия Правительства области',
    category: 'Стипендии',
    audience: 'Студентам',
    deadline: '2025-06-01',
    description:
      'Ежегодные выплаты для студентов, активно участвующих в учёбе и общественной деятельности.',
    imageUrl: '/images/support-3.svg',
  },
  {
    id: '4',
    title: 'Молодая семья — доступное жильё',
    category: 'Жильё',
    audience: 'Молодым семьям',
    deadline: null,
    description:
      'Социальные выплаты на приобретение жилого помещения или строительство индивидуального жилого дома.',
    imageUrl: '/images/support-4.svg',
  },
];