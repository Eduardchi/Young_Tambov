// src/pages/OrganizationPage/index.tsx
import { useState } from 'react';
import styles from './OrganizationPage.module.scss';

type Category =
  | 'Творчество и культура'
  | 'Патриотизм и туризм'
  | 'Международные отношения'
  | 'Волонтёрство'
  | 'Карьера и предпринимательство'
  | 'Экология'
  | 'Образование'
  | 'Детские организации';

interface Org {
  id: string;
  name: string;
  category: Category;
  vk?: string;
}

const CATEGORY_COLORS: Record<Category, string> = {
  'Творчество и культура':         '#9b59b6',
  'Патриотизм и туризм':           '#c0392b',
  'Международные отношения':       '#2980b9',
  'Волонтёрство':                  '#27ae60',
  'Карьера и предпринимательство': '#e67e22',
  'Экология':                      '#16a085',
  'Образование':                   '#4b6cf7',
  'Детские организации':           '#e84393',
};

const ORGS: Org[] = [
  // Творчество и культура
  {
    id: 'vk-kultura',
    name: 'Волонтёры культуры Тамбовской области',
    category: 'Творчество и культура',
    vk: 'https://vk.com/dobro.kultura68',
  },
  {
    id: 'tambov-art',
    name: 'Тамбов.Арт',
    category: 'Творчество и культура',
  },

  // Патриотизм и туризм
  {
    id: 'poisk',
    name: 'Тамбовское региональное отделение «Поисковое Движение России»',
    category: 'Патриотизм и туризм',
    vk: 'https://vk.com/tambov_poisk',
  },
  {
    id: 'pobeda',
    name: 'Тамбовское региональное отделение ВОД «Волонтёры Победы»',
    category: 'Патриотизм и туризм',
    vk: 'https://vk.com/tambov68.zapobedu',
  },
  {
    id: 'yunarmy',
    name: 'Тамбовское отделение Военно-патриотического движения «ЮНАРМИЯ»',
    category: 'Патриотизм и туризм',
    vk: 'https://vk.com/yunarmy_68',
  },
  {
    id: 'volk',
    name: 'Военно-спортивный центр «Волк»',
    category: 'Патриотизм и туризм',
    vk: 'https://vk.com/vsc_volk',
  },
  {
    id: 'rubezh',
    name: 'Военно-патриотический клуб «Тамбовский рубеж»',
    category: 'Патриотизм и туризм',
    vk: 'https://vk.com/tambovskijrubezh',
  },
  {
    id: 'rvio',
    name: 'Региональное отделение «Российское военно-историческое общество» в Тамбовской области',
    category: 'Патриотизм и туризм',
    vk: 'https://vk.com/club210976142',
  },
  {
    id: 'volrota',
    name: 'Тамбовское региональное отделение ВДМОД «Волонтёрская Рота Боевого Братства»',
    category: 'Патриотизм и туризм',
    vk: 'https://vk.ru/volrota_tmb',
  },
  {
    id: 'onf',
    name: 'Молодёжка Народного Фронта',
    category: 'Патриотизм и туризм',
    vk: 'https://vk.com/molodezhkanf_tambovobl',
  },
  {
    id: 'mger',
    name: 'Молодая Гвардия Единой России',
    category: 'Патриотизм и туризм',
    vk: 'https://vk.com/tmbmger',
  },

  // Международные отношения
  {
    id: 'mkd',
    name: 'Международный клуб дружбы Тамбовской области',
    category: 'Международные отношения',
    vk: 'https://vk.com/mkdtmb',
  },

  // Волонтёрство
  {
    id: 'volmed',
    name: 'Волонтёры-медики Тамбовской области',
    category: 'Волонтёрство',
    vk: 'https://vk.com/volmedic_tambov',
  },
  {
    id: 'vk-kultura-2',
    name: 'Волонтёры культуры Тамбовской области',
    category: 'Волонтёрство',
    vk: 'https://vk.com/dobro.kultura68',
  },
  {
    id: 'dobro-tmb',
    name: 'АНО «Ресурсный центр по развитию добровольчества Тамбовской области»',
    category: 'Волонтёрство',
    vk: 'https://vk.com/dobro.tambov',
  },
  {
    id: 'gorg',
    name: 'Добро.Центр «Горг»',
    category: 'Волонтёрство',
    vk: 'https://vk.com/club158758893',
  },
  {
    id: 'dc-dmt',
    name: 'Добро.Центр Дома молодёжи города Тамбова',
    category: 'Волонтёрство',
    vk: 'https://vk.com/club61055670',
  },
  {
    id: 'dc-kotovsk',
    name: 'Добро.Центр МБУ «Дворец культуры города Котовска»',
    category: 'Волонтёрство',
    vk: 'https://vk.com/club219820434',
  },
  {
    id: 'dc-nashgorod',
    name: 'Ресурсный центр / Добро.Центр АРСИ «Наш город»',
    category: 'Волонтёрство',
    vk: 'https://vk.com/club213544795',
  },
  {
    id: 'dc-bumerang',
    name: 'Ресурсный центр СДИ «БУМЕРАНГ» / Добро.Центр Державинского',
    category: 'Волонтёрство',
    vk: 'https://vk.com/club159028135',
  },

  // Карьера и предпринимательство
  {
    id: 'rso',
    name: 'Студенческие отряды Тамбовской области',
    category: 'Карьера и предпринимательство',
    vk: 'https://vk.com/rso.tambov',
  },
  {
    id: 'bizclub',
    name: 'Клуб молодых предпринимателей',
    category: 'Карьера и предпринимательство',
    vk: 'https://vk.com/tmb_rosmolbizclub',
  },

  // Экология
  {
    id: 'delai',
    name: 'Региональное отделение ВОО волонтёров-экологов «Делай!» в Тамбовской области',
    category: 'Экология',
    vk: 'https://vk.com/ecodelai68',
  },

  // Образование
  {
    id: 'univermol',
    name: 'АНО ЦРМ ДПО «Университет молодёжи»',
    category: 'Образование',
    vk: 'https://vk.com/univer_mol',
  },
  {
    id: 'tvoykhod',
    name: 'Региональная команда Всероссийского студенческого проекта «Твой Ход»',
    category: 'Образование',
    vk: 'https://vk.com/tvoyhodtmb',
  },

  // Детские организации
  {
    id: 'pervie',
    name: 'Движение Первых Тамбовской области',
    category: 'Детские организации',
    vk: 'https://vk.com/mypervie68',
  },
  {
    id: 'sdoto',
    name: 'Союз детских организаций Тамбовской области',
    category: 'Детские организации',
    vk: 'https://vk.com/sdoto',
  },
  {
    id: 'navigatory',
    name: 'Навигаторы Детства',
    category: 'Детские организации',
    vk: 'https://vk.com/navigatortmb',
  },
  {
    id: 'peremena',
    name: 'Региональная команда конкурса «Большая Перемена»',
    category: 'Детские организации',
    vk: 'https://vk.com/bp_tambov',
  },
];

const ALL = 'Все';
const CATEGORIES = [ALL, ...Object.keys(CATEGORY_COLORS)] as const;

export function OrganizationPage() {
  const [active, setActive] = useState<string>(ALL);

  const visible = active === ALL ? ORGS : ORGS.filter((o) => o.category === active);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>
            Молодёжные<br /><span className={styles.accent}>организации</span>
          </h1>
          <p className={styles.subtitle}>
            Найди своё направление и присоединяйся к команде единомышленников Тамбовской области
          </p>
        </div>
      </header>

      <div className={styles.filterWrap}>
        <div className={styles.filterInner}>
          <div className={styles.filterRow} role="group" aria-label="Фильтр по направлению">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={styles.filterBtn}
                data-active={active === cat}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                style={
                  cat !== ALL && active === cat
                    ? { borderColor: CATEGORY_COLORS[cat as Category], color: CATEGORY_COLORS[cat as Category] }
                    : undefined
                }
              >
                {cat !== ALL && (
                  <span
                    className={styles.filterDot}
                    style={{ background: CATEGORY_COLORS[cat as Category] }}
                    aria-hidden="true"
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.content}>
        <div className={styles.contentInner}>
          <p className={styles.count} aria-live="polite">
            {visible.length} {plural(visible.length, 'организация', 'организации', 'организаций')}
          </p>
          <ul className={styles.grid} aria-label="Организации">
            {visible.map((org) => {
              const color = CATEGORY_COLORS[org.category];
              return (
                <li key={org.id}>
                  <article className={styles.card} style={{ '--cat-color': color } as React.CSSProperties}>
                    <div className={styles.cardAccent} aria-hidden="true" />
                    <div className={styles.cardBody}>
                      <span className={styles.catBadge} style={{ color, borderColor: `${color}40` }}>
                        {org.category}
                      </span>
                      <h3 className={styles.orgName}>{org.name}</h3>
                    </div>
                    {org.vk && (
                      <a
                        href={org.vk}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.vkLink}
                        aria-label={`ВКонтакте — ${org.name}`}
                      >
                        <VkIcon />
                        <span>ВКонтакте</span>
                      </a>
                    )}
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}

function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

function VkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.585-1.496c.596-.19 1.365 1.26 2.179 1.815.615.418 1.082.326 1.082.326l2.172-.03s1.135-.071.597-1.103c-.044-.08-.313-.664-1.61-1.877-1.358-1.265-1.175-1.06.46-3.246.998-1.33 1.397-2.143 1.272-2.49-.12-.33-.849-.244-.849-.244l-2.443.015s-.181-.025-.315.059a.684.684 0 00-.222.29s-.387 1.04-.902 1.924c-1.088 1.87-1.52 1.968-1.698 1.85-.413-.267-.31-1.073-.31-1.646 0-1.792.27-2.538-.527-2.733a4.724 4.724 0 00-1.257-.078c-.96-.01-1.772.003-2.232.229-.306.15-.542.485-.398.504.178.024.58.109.794.4.276.377.266 1.224.266 1.224s.159 2.111-.37 2.372c-.362.178-.859-.185-1.926-1.843-.547-.96-.96-2.022-.96-2.022s-.08-.199-.21-.307a1.03 1.03 0 00-.384-.175l-2.32.015s-.348.01-.476.162c-.114.135-.009.414-.009.414s1.816 4.29 3.872 6.453c1.885 1.985 4.027 1.854 4.027 1.854h.97z" />
    </svg>
  );
}