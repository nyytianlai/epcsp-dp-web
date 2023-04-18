const quNameArr = [
  '盐田区',
  '南山区',
  '罗湖区',
  '龙岗区',
  '龙华区',
  '坪山区',
  '光明区',
  '宝安区',
  '大鹏新区',
  '福田区'
];
//图层名加上区名构成对象的id
export const layerNameQuNameArr = (layerName) => {
  return quNameArr.map((item) => {
    return layerName + '-' + item;
  });
};
