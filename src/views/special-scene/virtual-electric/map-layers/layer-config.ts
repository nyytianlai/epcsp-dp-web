import dayjs from 'dayjs';

export const allHeatIds = [`虚拟电厂/热力图1.3dt`, `虚拟电厂/热力图2.3dt`, `虚拟电厂/热力图3.3dt`];
export const allHeatIdsList = [
  [`虚拟电厂/热力图7.3dt`, `虚拟电厂/热力图6.3dt`, `虚拟电厂/热力图4.3dt`, `虚拟电厂/热力图5.3dt`],
  [`虚拟电厂/热力图7.3dt`, `虚拟电厂/热力图6.3dt`, `虚拟电厂/热力图1.3dt`, `虚拟电厂/热力图2.3dt`],
  [
    `虚拟电厂/热力图7.3dt`,
    `虚拟电厂/热力图6.3dt`,
    `虚拟电厂/热力图1.3dt`,
    `虚拟电厂/热力图2.3dt`,
    `虚拟电厂/热力图3.3dt`,
    `虚拟电厂/热力图4.3dt`
  ]
];
export const showIds = [
  [`虚拟电厂/热力图5.3dt`],
  [`虚拟电厂/热力图2.3dt`],
  [`虚拟电厂/热力图6.3dt`]
];
export const virtureTileIds = '2C897BAD4F66E30971D5488BADFE9727';
export const virtureView = [504324.51625, 2480835.005, 24153.905, -57.411629, -95.109795, 0];
export const virturePoint = [508190.19, 2494363.18, 389.6];
export const timeline = Array.from({ length: 6 }, (_, i) =>
  dayjs(dayjs().format('YYYY-MM-DD 12:00:00'))
    .add(i + 1, 'hour')
    .format('YYYY:MM:DD:HH:mm')
    .split(':')
    .map((i) => +i)
);
