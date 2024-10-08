// 实际开发中
// import { useEffect } from 'react';

/** ag-grid-react 的 AgGridReact 组件数据适配 */
function AgGridReact() {
  const { useEffect } = React;

  // 展示图
  const showImgs = ['/assets/imgs/ag-grid-react.png', '/assets/imgs/ag-grid-react.tsx.png'];

  useEffect(() => {
    handleData();
  }, []);

  /** 获取数据 */
  const fetchResData = () => {
    return {
      ids: [1, 2, 3, 4],
      headerList: [
        { itemName: 'classType', itemValue: '债券类型' },
        { itemName: 'shortName', itemValue: '简称' },
        { itemName: 'balance', itemValue: '规模' }
      ],
      trustIdNames: [
        { id: 1, trustName: '数据-1' },
        { id: 2, trustName: '数据-2' },
        { id: 3, trustName: '数据-3' },
        { id: 4, trustName: '数据-4' }
      ],
      dataInfo: [
        [
          { id: 1, classType: '优先级', shortName: '简称1', balance: '111' },
          { id: 1, classType: '优先级', shortName: '简称2', balance: '222' },
          { id: 1, classType: '次优先级', shortName: '简称3', balance: '333' },
          { id: 1, classType: '次级', shortName: '简称4', balance: '444' }
        ],
        [],
        [
          { id: 3, classType: '次优先级', shortName: '简称5', balance: '555' },
          { id: 3, classType: '次优先级', shortName: '简称6', balance: '666' }
        ],
        [
          { id: 4, classType: '次优先级', shortName: '简称7', balance: '777' },
          { id: 4, classType: '次级', shortName: '简称8', balance: '888' }
        ]
      ]
    };
  };

  // 目标数据
  // const data = [
  //   {
  //     classType: '优先级',
  //     shortName1: '简称1',
  //     shortName2: '-',
  //     shortName3: '-',
  //     shortName4: '-',
  //     balance1: '111',
  //     balance2: '-',
  //     balance3: '-',
  //     balance4: '-'
  //   },
  //   {
  //     classType: '优先级',
  //     shortName1: '简称2',
  //     shortName2: '-',
  //     shortName3: '-',
  //     shortName4: '-',
  //     balance1: '222',
  //     balance2: '-',
  //     balance3: '-',
  //     balance4: '-'
  //   },
  //   {
  //     classType: '次优先级',
  //     shortName1: '简称3',
  //     shortName2: '-',
  //     shortName3: '简称5',
  //     shortName4: '简称7',
  //     balance1: '333',
  //     balance2: '-',
  //     balance3: '555',
  //     balance4: '777'
  //   },
  //   {
  //     classType: '次优先级',
  //     shortName1: '-',
  //     shortName2: '-',
  //     shortName3: '简称6',
  //     shortName4: '-',
  //     balance1: '-',
  //     balance2: '-',
  //     balance3: '666',
  //     balance4: '-'
  //   },
  //   {
  //     classType: '次级',
  //     shortName1: '简称4',
  //     shortName2: '-',
  //     shortName3: '-',
  //     shortName4: '简称8',
  //     balance1: '444',
  //     balance2: '-',
  //     balance3: '-',
  //     balance4: '888'
  //   }
  // ];

  /** 处理数据 */
  const handleData = () => {
    const { ids, headerList, dataInfo } = fetchResData();
    const originFeids = headerList.map(item => item.itemName);
    // 全量字段的空数据
    const nullData = {};
    originFeids.forEach(key => {
      ids.forEach(id => {
        nullData[key !== 'classType' ? `${key}${id}` : key] = '-';
      });
    });
    // 债券等级类型常量
    const CLASSTYPE = ['优先级', '次优先级', '次级'];
    // 记录债券类型及其对应的数据和数据条数
    const classtypedataMap = {};
    // 当前债券各类债券数据初始统计，方便后续遍历初始统计赋值
    const initClassTypeDataLenMap = {};
    CLASSTYPE.forEach(item => {
      initClassTypeDataLenMap[item] = 0;
      classtypedataMap[item] = {
        // 对应债券类型数据初始条数
        dataLen: 0,
        // 对应债券类型的详细数据，从对应数据中摘取
        dataList: new Array(dataInfo.length).fill('').map(it => [])
      };
    });
    // 数据分类与拆分
    dataInfo.forEach((curIdDataInfoList, index) => {
      // 当前债券各类债券数量统计
      const curIdClassTypeDataLensMap = { ...initClassTypeDataLenMap };
      curIdDataInfoList.forEach(curIdDataInfo => {
        const curType = curIdDataInfo.classType;
        curIdClassTypeDataLensMap[curType]++;
        if (curIdClassTypeDataLensMap[curType] > classtypedataMap[curType].dataLen) {
          classtypedataMap[curType].dataLen = curIdClassTypeDataLensMap[curType];
        }
        classtypedataMap[curType].dataList[index].push(curIdDataInfo);
      });
    });

    // 组装数据
    const resultData = [];
    for (let i = 0; i < CLASSTYPE.length; i++) {
      const curType = CLASSTYPE[i];
      for (let j = 0; j < classtypedataMap[curType].dataLen; j++) {
        const curSetData = { ...nullData, classType: curType };
        for (let k = 0; k < classtypedataMap[curType].dataList.length; k++) {
          const curInfo = classtypedataMap[curType].dataList[k][j];
          if (curInfo) {
            for (let o = 0; o < originFeids.length; o++) {
              if (originFeids[o] !== 'classType') {
                curSetData[`${originFeids[o]}${curInfo.id}`] = curInfo[originFeids[o]];
              }
            }
          }
        }
        resultData.push(curSetData);
      }
    }

    console.log({ nullData, originFeids, classtypedataMap, resultData });
  };

  return (
    <>
      <h4>ag-grid-react 的 AgGridReact 组件数据适配</h4>
      <h5 style={{ color: '#00ff' }}>
        后端返回数据转换（表格表头不固定、数据不固定，避免卡顿，使用了上述组件）
      </h5>
      <hr />
      {showImgs.map(src => (
        <img className="show" src={src} alt="" />
      ))}
    </>
  );
}

// export default AgGridReact
