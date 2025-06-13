export const showFormattedDate = (date, locale = 'en-US', options = {}) => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    ...options,
  })
}

export const sleep = (time = 1000) => {
  return new Promise(resolve => setTimeout(resolve, time))
}
