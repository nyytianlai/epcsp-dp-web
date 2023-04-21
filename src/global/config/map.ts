import proj4 from 'proj4';
proj4.defs('EPSG:4490', '+proj=longlat +ellps=GRS80 +no_defs +type=crs');
proj4.defs(
  'EPSG:4547',
  '+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs +type=crs'
);
const CGCS2000_2_GK114 = proj4('EPSG:4490', 'EPSG:4547');
export type Cartesian2D = [number, number]

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
  }
};

//4490坐标转4547
export const projectCGCS2000_2_GK114 = (coord: Cartesian2D) => {
  return CGCS2000_2_GK114.forward(coord);
};
