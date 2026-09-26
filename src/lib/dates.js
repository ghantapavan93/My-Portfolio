// "Jan 2026 – Present" → "2026 – Now", "Jul 2019 – Jul 2020" → "2019 – 2020".
export function yearSpan(dateRange = '') {
  const years = dateRange.match(/\d{4}/g) || [];
  const end = /present/i.test(dateRange) ? 'Now' : years[1];
  if (!years[0]) return dateRange;
  return end && end !== years[0] ? `${years[0]} – ${end}` : years[0];
}
