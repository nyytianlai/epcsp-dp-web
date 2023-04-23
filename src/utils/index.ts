import { booleanPointInPolygon, point, polygon } from '@turf/turf';
import proj4 from 'proj4';
proj4.defs('EPSG:4490', '+proj=longlat +ellps=GRS80 +no_defs +type=crs');
proj4.defs(
  'EPSG:4547',
  '+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs +type=crs'
);
const CGCS2000_2_GK114 = proj4('EPSG:4490', 'EPSG:4547');

export type Cartesian2D = [number, number];

//4490坐标转4547
export const projectCGCS2000_2_GK114 = (coord: Cartesian2D) => {
  return CGCS2000_2_GK114.forward(coord);
};

//点是否在面内
export const pointIsInPolygon = (pointCoord: Cartesian2D, polygonCoord) => {
  var pt = point(pointCoord);
  var poly = polygon(polygonCoord);
  // var poly = polygonCoord;

  return booleanPointInPolygon(pt, poly);
};
