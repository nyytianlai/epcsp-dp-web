
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
