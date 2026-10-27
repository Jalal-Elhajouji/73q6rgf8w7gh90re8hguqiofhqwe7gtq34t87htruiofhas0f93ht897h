const paths = {
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  balances: 'M4 6h12M4 11h8M4 16h6M17 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  transactions: 'M7 4 3 8l4 4M3 8h14M17 12l4 4-4 4M21 16H7',
  customers: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  catalog: 'M12 3 4 7v10l8 4 8-4V7zM4 7l8 4 8-4M12 11v10',
  identity: 'M14 4l6 6-9 9H5v-6zM12 6l6 6M4 20l3-3',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  wallet: 'M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l2-3h11l1 3M16 13.5h2',
  billing: 'M6 3h9l4 4v14H6zM9 9h6M9 13h6M9 17h3',
  reporting: 'M4 4v16h16M8 16v-5M12 16V8M16 16v-3',
  apps: 'M4 4h6v6H4zM14 14h6v6h-6zM4 14h6v6H4zM17 4v6M14 7h6',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  chevronDown: 'm6 9 6 6 6-6',
  chevronLeft: 'm15 6-6 6 6 6',
  chevronRight: 'm9 6 6 6-6 6',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6M12 17h.01',
  bell: 'M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z',
  plus: 'M12 5v14M5 12h14',
  export: 'M12 15V4M8 8l4-4 4 4M5 14v5h14v-5',
  chart: 'M5 5v14h14M9 15v-4M13 15V8M17 15v-6',
  filter: 'M4 7h16M7 12h10M10 17h4',
  sliders: 'M4 8h9M17 8h3M15 6v4M4 16h3M11 16h9M9 14v4',
  bank: 'M3 9 12 4l9 5M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18',
  edit: 'M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  close: 'M6 6l12 12M18 6 6 18',
} as const

export type IconName = keyof typeof paths

type IconProps = {
  name: IconName
  size?: number
  className?: string
}

export function Icon({ name, size = 16, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
