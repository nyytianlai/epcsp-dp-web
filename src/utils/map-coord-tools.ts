/*
 * @Author: niyayong@sutpc.com
 * @Date: 2024-05-20 09:43:11
 * @LastEditors: niyayong@sutpc.com
 * @LastEditTime: 2024-06-05 15:52:48
 * @Description: 地图坐标转换工具
 * @FilePath: /ebcam-dp-web/src/utils/map-coord-tools.ts
 */
//coordinateType  0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)
import proj4 from 'proj4';
import CoordinateUtil from './coord-util';
import { isArray } from 'lodash-es';
interface epsgType {
  name: 'EPSG:4547' | 'EPSG:4326' | 'EPSG:3857' | 'EPSG:4544';
  proj4Str: string;
}
const epsgList: epsgType[] = [
  {
    name: 'EPSG:4547',
    proj4Str:
      '+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs +type=crs'
  },
  {
    name: 'EPSG:4326',
    proj4Str: '+proj=longlat +datum=WGS84 +no_defs +type=crs'
  },
  {
    name: 'EPSG:3857',
    proj4Str:
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs'
  },
  {
    name: 'EPSG:4544',
    proj4Str:
      '+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs +type=crs'
  }
];
epsgList.forEach((epsg) => {
  proj4.defs(epsg.name, epsg.proj4Str);
});

/**
 * 点数据转换
 */
export const transformCoords = (
  fromProjection: epsgType['name'],
  toProjection: epsgType['name'],
  coordinate: number[]
) => {
  return proj4(fromProjection, toProjection, coordinate);
};

/**
 * 批量转换
 */

export const transformCoordsArr = (
  coordinates,
  fromProjection: epsgType['name'],
  toProjection: epsgType['name']
) => {
  if (isArray(coordinates[0])) {
    const newCoordinate = [];
    coordinates.forEach((coor) => {
      newCoordinate.push(transformCoordsArr(coor, fromProjection, toProjection));
    });
    return newCoordinate;
  } else {
    return transformCoords(fromProjection, toProjection, coordinates);
  }
};
// GCJ02转84
export const transformGCJ2WGS84 = (coordinate: number[]) => {
  // return gcood.transform(coordinate as Position, gcood.GCJ02, gcood.WGS84);
  return CoordinateUtil.gcj02towgs84(coordinate[0], coordinate[1]);
};

// BD09转84
export const transformBD2WGS84 = (coordinate: number[]) => {
  // return gcood.transform(coordinate as Position, gcood.BD09, gcood.WGS84);
  const gc02Coord = CoordinateUtil.bd09togcj02(coordinate[0], coordinate[1]);
  return CoordinateUtil.gcj02towgs84(gc02Coord[0], gc02Coord[1]);
};
/**
 * 点数据转换
 */
export const transformCoordsByType = (coordinate: number[], coordinateType = 0, height = 0) => {
  switch (coordinateType) {
    case 0:
      return [...coordinate, height];
    case 1:
      return [...transformCoords('EPSG:4326', 'EPSG:4547', coordinate), height];
    case 2:
      const coord84 = transformGCJ2WGS84(coordinate);
      return [...transformCoords('EPSG:4326', 'EPSG:4547', coord84), height];
    case 3:
      const coordBD = transformBD2WGS84(coordinate);
      return [...transformCoords('EPSG:4326', 'EPSG:4547', coordBD), height];
    default:
      return [...coordinate, height];
  }
};
/**
 * 批量转换
 */

export const transformCoordsArrByType = (coordinates, coordinateType = 0, height = 0) => {
  if (isArray(coordinates[0])) {
    const newCoordinate = [];
    coordinates.forEach((coor) => {
      newCoordinate.push(transformCoordsArrByType(coor, coordinateType, height));
    });
    return newCoordinate;
  } else {
    return transformCoordsByType(coordinates, coordinateType, height);
  }
};
