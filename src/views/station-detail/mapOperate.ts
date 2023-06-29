//设置默认移动车辆的车速
export const setMoveCarSpeed = async (__g, value:number) => {
  __g.misc.callBPFunction(
    {
      //移动车辆 ML_VehicleSpline
      objectName: 'BP_MainSpline_1',
      functionName: 'SetSpeed',
      paramType: 3,
      paramValue: value
    },
    null
  );
};

export const handleClickFocus = async(__g,layerId, eid, status,afterLocatedFn=()=>{}) => {
  //清除绿色高亮
  await __g.tileLayer.stopHighlightAllActors();
  //删除红色
  await __g.misc.callBPFunction({
    objectName: 'BP_Warning_2',
    functionName: 'PauseTimer'
  });
  await __g.marker.deleteByGroupId('warningPointGroup');
  // 查询充电桩信息
  await __g?.tileLayer?.getActorInfo(
    {
      id: layerId,
      objectIds: [eid]
    },
    async (res) => {
      if (!res?.data) {
        afterLocatedFn()
        return
      };
      const rotation = res?.data[0].rotation;
      //定位过去
      console.log('pppppp')
      await __g?.tileLayer?.focusActor(layerId, eid, 3, 2, [
        rotation[0] - 12,
        rotation[1] - 92,
        0
      ],afterLocatedFn);
      //故障高亮
      if (+status === 255) {
        // const { location } = res.data[0];
        // location[0] = location[0];
        // location[1] = location[1];
        // location[2] = 92.8;
        // __g.tileLayer.setLocation('1E0DA98D4A4DA1E3106E69AE5469D860', location);
        // //Xy坐标在获取的基础上都加0.1
        // __g.tileLayer.setRotation('1E0DA98D4A4DA1E3106E69AE5469D860', [0, 58, 0]);
        // __g.tileLayer.setScale('1E0DA98D4A4DA1E3106E69AE5469D860', [0.0001, 0.0001, 0.0001]);
        // __g.tileLayer.setCollision('1E0DA98D4A4DA1E3106E69AE5469D860', false);
        // __g.misc.callBPFunction({
        //   objectName: 'BP_Warning_2',
        //   functionName: 'UnpauseTimer'
        // });
        // addWarningPoint(res.data);
      } else {
        //设置高亮颜色（全局生效）
        __g.settings.highlightColor(Color.Green);
        __g.tileLayer.highlightActor(layerId, eid);
      }
    }
  );
};
