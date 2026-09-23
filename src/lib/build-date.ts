// The build date in Ottawa time, computed once per build. GitHub runners are
// UTC; without the time zone an evening deploy would stamp tomorrow's date.
// Feeds the RECEIVED stamp and the close of file.
export const buildDate: string = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Toronto',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());
