await __g.cameraTour.delete('1');
//通过接口添加导览并播放
let frames = [];
//注意：rocation属可选参数，若不传入则相机朝向会根据相机的连续位置自动计算
frames.push(
  new CameraTourKeyFrame(
    0,
    1.0,
    [506996.645625, 2496440.09375, 3384.596562],
    [-48.471748, -121.72995, -0.000003]
  )
);
frames.push(
  new CameraTourKeyFrame(
    1,
    3.0,
    [505358.043906, 2499039.137031, 739.661797],
    [-53.508652, -116.761917, 0]
  )
);
frames.push(
  new CameraTourKeyFrame(
    2,
    5.0,
    [504887.247227, 2499464.469102, 253.484668],
    [-47.255333, -116.788826, 0]
  )
);
frames.push(
  new CameraTourKeyFrame(
    3,
    7.0,
    [504941.220625, 2499574.668008, 252.689883],
    [-45.053925, -153.107422, 0]
  )
);
frames.push(
  new CameraTourKeyFrame(
    4,
    9.0,
    [504891.87418, 2499611.262578, 232.468652],
    [-45.053917, -167.170715, 0]
  )
);
frames.push(
  new CameraTourKeyFrame(
    5,
    11.0,
    [504874.962773, 2499699.641172, 228.090449],
    [-43.006763, 156.649338, -0.000002]
  )
);
frames.push(
  new CameraTourKeyFrame(
    6,
    12.0,
    [504826.693281, 2499764.434063, 223.499121],
    [-47.180679, 138.310196, 0.000006]
  )
);
frames.push(
  new CameraTourKeyFrame(
    7,
    13.0,
    [504763.533672, 2499817.279219, 223.499121],
    [-47.180672, 113.153786, -0.000003]
  )
);
frames.push(
  new CameraTourKeyFrame(
    8,
    14.0,
    [504723.044609, 2499786.98375, 159.522529],
    [-47.180672, 113.153786, -0.000003]
  )
);

let o = new CameraTourData('1', 'test', frames);
await __g.cameraTour.add(o);
__g.cameraTour.play('1');
