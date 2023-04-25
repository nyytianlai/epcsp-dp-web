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
const quCodeArr = [
  '440308',
  '440305',
  '440303',
  '440307',
  '440309',
  '440310',
  '440311',
  '440306',
  '440343',
  '440304'
];
//图层名加上区名构成对象的id
export const layerNameQuNameArr = (layerName) => {
  return quNameArr.map((item) => {
    return layerName + '-' + item;
  });
};
export const infoObj = {
  terrainId: '84F17E17411A28C0657442A8EC039B02', //地形图图层id
  szView: {
    //全市视角
    x: 523800.9,
    y: 2449743.7,
    z: 51713.465,
    pitch: -44.999977,
    yaw: -91.697815,
    roll: 0.000002 //该参数无用，会自动忽略
  },
  szViewFull: {
    //全市视角
    x: 522834.503438,
    y: 2463897.97625,
    z: 38218.56,
    pitch: -44.999977,
    yaw: -91.697815,
    roll: 0.000002
  }
};

export const getImageUrl = (dir: string) => {
  return new URL(`../../assets/images/map/${dir}.png`, import.meta.url).href;
};
export const getImageByCloud = (picName: string) => {
  return `${import.meta.env.VITE_FD_FileURL}/data/images/${picName}.png`;
};

//区名字和区code互转
export const quNameCodeInterTrans = (key: 'name' | 'code', value: string) => {
  let index = key === 'name' ? quNameArr.indexOf(value) : quCodeArr.indexOf(value);
  if (index !== -1) {
    return key === 'name' ? quCodeArr[index] : quNameArr[index];
  }
};

//获取屏幕中心点的坐标
export const getMapCenterCoord = (aircityObj) => {
  const x = aircityObj.player.rect.width; //视频流的宽度
  const y = aircityObj.player.rect.height; //视频流的高度
  const screen2World_result = aircityObj.acApi.coord.screen2World(x / 2, y / 2); //屏幕坐标转三维坐标
  return screen2World_result;
};
