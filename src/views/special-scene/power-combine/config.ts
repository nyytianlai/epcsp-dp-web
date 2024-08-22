/*
 * @Author: niyayong@sutpc.com
 * @Date: 2024-08-06 11:16:57
 * @LastEditors: niyayong@sutpc.com
 * @LastEditTime: 2024-08-06 11:27:17
 * @Description:
 * @FilePath: /epcsp-dp-web/src/views/special-scene/power-combine/config.ts
 */
import i18n from '@/locales/i18n'; 
const { t } = i18n.global;
const configHead  = `special-scene.power-combine.config`;

export const bottomTabDataFun = () => {
  return [
    {
      code: 1,
      label: '交能协同',
      displayLabel: t(`${configHead}.bottomTabDataFun.jnxt`)
    },
    {
      code: 2,
      label: '停充一体',
      displayLabel: t(`${configHead}.bottomTabDataFun.tcyt`)
    }
  ];
};
