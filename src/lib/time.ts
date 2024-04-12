import dayjs from 'dayjs';
import ordinal from 'dayjs/plugin/advancedFormat';

dayjs.extend(ordinal);

export const prettyDate = (date: Date) => {
    if (!date) {
      return ''
    }
  
    const d = dayjs(date)
  
    return `${d.format('Do')} of ${d.format('MMMM YYYY')}, ${d.format('h:mm A')}`
  }