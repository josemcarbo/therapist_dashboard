import moment from 'moment';

export const transformDuration = (minutes: number) => {
    const duration = moment.duration(minutes, 'minutes');

    const years = Math.floor(duration.asYears());
    const months = Math.floor(duration.asMonths() % 12);
    const days = Math.floor(duration.asDays() % 30);
    const hours = duration.hours();
    const mins = duration.minutes();

    const parts = [];

    if (years) parts.push(`${years}y`);
    if (months) parts.push(`${months}mo`);
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (mins || parts.length === 0) parts.push(`${mins}m`);

    return parts.join(' ');
  }