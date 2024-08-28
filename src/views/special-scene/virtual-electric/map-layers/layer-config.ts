import dayjs from 'dayjs';

export const allHeatIds = [`虚拟电厂/热力图1.3dt`, `虚拟电厂/热力图2.3dt`, `虚拟电厂/热力图3.3dt`];
export const virtureTileIds = '2C897BAD4F66E30971D5488BADFE9727';
export const virtureView = [505518.737813, 2485694.364688, 6167.716875, -37.957706, -92.772568, 2];
export const virturePoint = [508190.19, 2494363.18, 389.6];
export const timeline = Array.from({ length: 6 }, (_, i) =>
  dayjs(dayjs().format('YYYY-MM-DD 12:00:00'))
    .add(i + 1, 'hour')
    .format('YYYY:MM:DD:HH:mm')
    .split(':')
    .map((i) => +i)
);
