export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return 'N/A';
  if (amount >= 100000) {
    const lakhs = (amount / 100000).toFixed(1);
    return `₹${lakhs.endsWith('.0') ? lakhs.slice(0, -2) : lakhs} Lakhs`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatFeeRange = (min, max) => {
  if (!min && !max) return 'Fee on Request';
  if (min && !max) return `From ${formatCurrency(min)} / yr`;
  if (!min && max) return `Up to ${formatCurrency(max)} / yr`;
  return `${formatCurrency(min)} - ${formatCurrency(max)} / yr`;
};

export const formatRating = (rating) => {
  if (!rating) return '4.8';
  return Number(rating).toFixed(1);
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
