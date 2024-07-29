/**
 * @Author: niyayong@sutpc.com
 * @Date: 2024-07-26 16:53:32
 * @LastEditors: niyayong@sutpc.com
 * @LastEditTime: 2024-07-26 16:53:48
 * @Description: 字典库
 * @FilePath: /epcsp-dp-web/src/global/js/dictMap.js
 */

const dictMap = {
  facility_sites: [
    // 设施场所
    {
      label: '社会经营性停车场（非住宅）',
      value: 'construction1'
    },
    {
      label: '道路范围内',
      value: 'construction2'
    },
    {
      label: '交通场站',
      value: 'construction3'
    },
    {
      label: '公园停车场',
      value: 'construction4'
    },
    {
      label: '环卫设施用地',
      value: 'construction5'
    },
    {
      label: '住宅小区停车场',
      value: 'construction6'
    },
    {
      label: '国有企业内部停车场',
      value: 'construction7'
    },
    {
      label: '党政机关、事业单位、公共机构等内部停车场',
      value: 'construction8'
    },
    {
      label: '加油站、加气站',
      value: 'construction9'
    },
    {
      label: '高速公路服务区',
      value: 'construction10'
    },
    {
      label: '其他',
      value: 'construction255'
    }
  ],
  superStation: [
    {
      label: '>=480kw并且<600kw',
      value: 'power10'
    },
    {
      label: '>=600kw',
      value: 'power11'
    }
  ]
};

export default dictMap;
