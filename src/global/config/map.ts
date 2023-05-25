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
export const quView = {
  盐田区:[526161.507422,2492962.024277,6038.915,-44.99995,-89.440895,2],
  南山区: [491997.28,2480720.229375,13827.865,-44.999977,-89.440895,2],
  罗湖区:[513908.451484,2491118.620313,6038.9125,-44.999977,-89.440895,2],
  龙岗区: [517003.580937,2494984.815625,13390.7875,-44.999977,-89.440895,2],
  龙华区:[502971.697813,2498430.7525,9883.83625,-44.999977,-89.440895,2],
  坪山区: [535168.512773,2498967.770625,11631.5075,-44.999977,-89.440895,2],
  光明区:[490930.331562,2506703.8225,11572.8525,-44.999977,-89.440895,2],
  宝安区: [488489.648125,2490075.870234,17785.27125,-44.999977,-91.697815,],
  大鹏新区:[549647.3225,2482515.143125,13827.865,-44.999977,-89.440895,2],
  福田区:[505279.921797,2488181.229375,5346.12875,-44.999977,-89.440895,2]
};
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
  return new URL(`./images/map/${dir}.png`, import.meta.url).href;
};
export const getHtmlUrl = () => {
  if (import.meta.env.MODE == 'base') {
    return 'http://127.0.0.1:5500/public';
  } else {
    return window.location.origin;
  }
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
  const y = aircityObj.player.rect.height + 40; //视频流的高度
  const screen2World_result = aircityObj.acApi.coord.screen2World(x / 2, y / 2); //屏幕坐标转三维坐标
  return screen2World_result;
};

//控制3dt的显示隐藏
export const control3dts = async (__g, ids: string[], isShow: boolean) => {
  isShow ? __g.infoTree.show(ids) : __g.infoTree.hide(ids);
};

export const add3dt = async (__g, fileName: string) => {
  await __g.tileLayer.add({
    id: fileName,
    fileName: `${import.meta.env.VITE_FD_FileURL}/data/3dt/民乐/${fileName}.3dt`, //3dt文件路径
    location: [0, 0, 92.5], //坐标位置
    rotation: [0, 0, 0], //旋转角度
    scale: [1, 1, 1] //缩放大小
  });
};
export const delete3dt = async (__g, ids: string[]) => {
  await __g.tileLayer.delete(ids);
};

export const isShowActors = async (__g, layerid: string, ids: string[], isShow: boolean) => {
  isShow
    ? await __g.tileLayer.showActors([{ id: layerid, objectIds: ids }])
    : await __g.tileLayer.hideActors([{ id: layerid, objectIds: ids }]);
};

//根据图层树的图层名字获取图层id
export const getTreeLayerIdByName = (name: string | string[], treeInfo): any => {
  if (Array.isArray(name)) {
    return name.map((item, index) => {
      return getTreeLayerIdByName(item, treeInfo);
    });
  } else {
    return (
      (treeInfo as unknown as any[]).find((item: any) => {
        return item.name === name;
      })?.iD || ''
    );
  }
};

export const hideAllStation3dt = (__g, treeInfo) => {
  let ids = getTreeLayerIdByName('充电站模型', treeInfo);
  __g.infoTree.hide(ids);
};
