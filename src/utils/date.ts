import moment from 'moment';

export const transformDuration = (seconds: number) => {
  const duration = moment.duration(seconds, 'seconds');

  const years = Math.floor(duration.asYears());
  const months = Math.floor(duration.asMonths() % 12);
  const days = Math.floor(duration.asDays() % 30);
  const hours = duration.hours();
  const mins = duration.minutes();
  const secs = duration.seconds();

  const parts = [];

  if (years) parts.push(`${years}y`);
  if (months) parts.push(`${months}mo`);
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (mins) parts.push(`${mins}m`);
  
  // Mostrar segundos solo si hay menos de 1 minuto o como parte de minutos+segundos
  if (secs || (parts.length === 0 && seconds < 60)) parts.push(`${secs}s`);

  return parts.join(' ');
};
