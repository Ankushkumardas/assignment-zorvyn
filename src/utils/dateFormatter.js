export const formatDate = (dateString, includeYear = true) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const [year, month, day] = dateString.split('-');
  if (year && month && day) {
    const localDate = new Date(year, parseInt(month) - 1, day);
    return localDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: includeYear ? 'numeric' : undefined
    });
  }
  
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: includeYear ? 'numeric' : undefined
  });
};
