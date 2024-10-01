// 实际开发中
// import { RouterProvider,createBrowserRouter, NavLink } from 'react-router-dom';
// import Demo from './views/Demo/index.jsx';
// import AgGridReact from './views/data/AgGridReact/index.jsx';

/** 根组件 */
function App() {
  const { RouterProvider, createBrowserRouter, NavLink, Outlet } = ReactRouterDOM;

  // 跳转配置
  const navBar = [
    { to: '/', name: 'React 案例' },
    { to: 'data', name: 'AgGridReact 表格数据转换' }
  ];
  // 路由配置
  const routes = [
    {
      path: '/',
      element: (
        <>
          <nav className="nav-bar">
            <a href="javascript:void(0)" onClick={() => history.back()}>
              返回
            </a>
            {navBar.map(({ to, name }) => (
              <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={to}>
                {name}
              </NavLink>
            ))}
          </nav>
          <Outlet />
        </>
      ),
      children: [
        { element: <Demo />, index: true },
        { path: 'data', element: <AgGridReact /> }
      ]
    }
  ];
  // history 模式路由
  const router = createBrowserRouter(routes, { basename: '/react' });

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

// export default App;
