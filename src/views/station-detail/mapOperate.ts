//运营商分布标签可视
export const operatorLabel = async (__g, isShow: boolean) => {
   __g.misc.callBPFunction(
    {
      objectName: 'BP_IconMain_1',
      functionName: 'SetIconVisibility',
      paramType: 5,
      paramValue: isShow ? 'Visible' : 'Collapsed'
    },
    null
  );
};
//默认移动车辆
export const moveCar = async (__g, isShow: boolean) => {
   __g.misc.callBPFunction(
    {
      //移动车辆 ML_VehicleSpline
      objectName: 'BP_MainSpline_1',
      functionName: 'SetSplineIsHidden',
      paramType: 5,
      paramValue: isShow ? 'TRUE' : 'FALSE'
    },
    null
  );
};
