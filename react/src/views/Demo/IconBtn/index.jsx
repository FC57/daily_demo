// 实际开发中
// import { useState } from 'react';
// import { Space, Checkbox } from 'antd';
// import IconButton from '../../component/IconButton/index.jsx';

/** demo 1 基于 antd Button 封装自定义图标按钮*/
function IconBtn() {
  const { Space, Checkbox } = antd;
  const { useState } = React;
  const [isDisabled, setIsDisabled] = useState(false);

  /** 设置按钮禁用 */
  const disabledHandler = () => {
    setIsDisabled(cur => !cur);
  };

  return (
    <>
      <Space>
        <Checkbox checked={isDisabled} onChange={disabledHandler}>
          禁用按钮
        </Checkbox>
        <IconButton iconName="new" disabled={isDisabled}>
          你好，Ant Design!
        </IconButton>
      </Space>
    </>
  );
}

// export default IconBtn
