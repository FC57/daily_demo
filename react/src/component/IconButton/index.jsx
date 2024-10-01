// 实际开发中 import { Button } from 'antd';

/**
 * 自定义图标按钮组件
 * * iconName 为 assets/imgs/btns 图片名称（如：new.png 和 new.gray.png 为一组的图片，取 new）
 */
function IconButton({ children, iconName, disabled = false, ...resetOption }) {
  const { Button } = antd;

  let cIcon = null;
  if (typeof iconName === 'string') {
    // 图片路径
    // webpack 中使用 require(`/assets/imgs/btns/${iconName}${disabled ? '.gray' : ''}.png`)

    // vite 中使用 const imgs = import.meta.glob('/assets/imgs/btns/*.png') 获取所有图片
    // const iconPath = imgs[`/assets/imgs/btns/${iconName}${disabled ? '.gray' : ''}.png`]

    const iconPath = `/assets/imgs/btns/${iconName}${disabled ? '.gray' : ''}.png`;
    cIcon = <img src={iconPath} alt={iconName} />;
  }
  return (
    <Button className="icon-btn" {...resetOption} icon={cIcon} disabled={disabled}>
      {children}
    </Button>
  );
}

// export default IconButton;
