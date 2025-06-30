export const NAVIGATION_STEPS = [
  { id: 0, label: 'Home', path: '/demo' },
  { id: 1, label: 'Guide', path: '/guide' },
  { id: 2, label: 'Capture', path: '/capture' },
  { id: 3, label: 'Results', path: '/result' },
  { id: 4, label: 'History', path: '/history' }
];

export const getBreadcrumbs = (currentPath: string) => {
  const pathMap: Record<string, Array<{ label: string; path?: string; isActive?: boolean }>> = {
    '/demo': [
      { label: 'Cholesterol Test', isActive: true }
    ],
    '/guide': [
      { label: 'Cholesterol Test', path: '/demo' },
      { label: 'Sample Collection Guide', isActive: true }
    ],
    '/capture': [
      { label: 'Cholesterol Test', path: '/demo' },
      { label: 'Guide', path: '/guide' },
      { label: 'Capture', isActive: true }
    ],
    '/result': [
      { label: 'Cholesterol Test', path: '/demo' },
      { label: 'Guide', path: '/guide' },
      { label: 'Capture', path: '/capture' },
      { label: 'Results', isActive: true }
    ],
    '/history': [
      { label: 'Cholesterol Test', path: '/demo' },
      { label: 'History', isActive: true }
    ]
  };

  return pathMap[currentPath] || [];
};

export const getCurrentStep = (path: string): number => {
  const stepMap: Record<string, number> = {
    '/demo': 0,
    '/guide': 1,
    '/capture': 2,
    '/result': 3,
    '/history': 4
  };
  
  return stepMap[path] ?? 0;
};