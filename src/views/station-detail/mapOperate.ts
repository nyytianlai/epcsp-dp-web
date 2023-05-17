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

export const handleClickFocus = (__g, eid, status) => {
  //清除绿色高亮
  __g.tileLayer.stopHighlightAllActors();
  //删除红色
  __g.misc.callBPFunction({
    objectName: 'BP_Warning_2',
    functionName: 'PauseTimer'
  });
  __g.marker.deleteByGroupId('warningPointGroup');
  // 查询充电桩信息
  __g?.tileLayer?.getActorInfo(
    {
      id: '7CED6A4A4F00FFA1B7273C9511B55B85',
      objectIds: [eid]
    },
    (res) => {
      if (!res?.data) return;
      const rotation = res?.data[0].rotation;
      //定位过去
      // __g?.tileLayer?.focusActor("7CED6A4A4F00FFA1B7273C9511B55B85", eid, 3.5, 2, [-18, 140, 0])
      __g?.tileLayer?.focusActor('7CED6A4A4F00FFA1B7273C9511B55B85', eid, 3, 2, [
        rotation[0] - 12,
        rotation[1] - 92,
        0
      ]);
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
        __g.tileLayer.highlightActor('7CED6A4A4F00FFA1B7273C9511B55B85', eid);
      }
    }
  );
};
