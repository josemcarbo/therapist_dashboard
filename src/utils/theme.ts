export const getAppliedTheme = (pref: string) => {
  if (pref === 'light' || pref === 'dark') return pref;
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDark ? 'dark' : 'light';
};