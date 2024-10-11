/** indexedDB 页面展示 */
export function indexedDBRender() {
  return `<h4>indexedDB demo</h4>
  <div class="desc">
    👨🏻‍💻 请按 <strong>F12</strong>，在控制台的 <strong>Application</strong> 选项卡中查看 <strong>IndexedDB</strong>
  </div>
  <hr />`;
}

/** indexedDB 操作 */
export function indexedDBHandler() {
  const DB_NAME = 'test';
  let curDB = null;

  // 1、链接数据库
  const request = window.indexedDB.open(DB_NAME, 1);

  /**
   * 2、相关事件
   * * onupgradeneeded 版本更新（初始化）
   * * onsuccess 链接成功
   * * onerror 链接失败
   */
  request.onupgradeneeded = e => {
    console.log('数据库初始化完成或版本更新');
    const db = e.target.result;
    // 创建数据存储对象
    if (!db.objectStoreNames.contains('user')) {
      const store = db.createObjectStore('user');
      console.log({ store });
      // 添加数据 store.add(数据,键) 或 store.put
      store.add({ name: 'fwz', age: 30 }, 'user_1');
    }
  };

  request.onsuccess = e => {
    console.log('数据库链接成功');
    const db = (curDB = e.target.result);
    console.log(db);
    // 创建处理数据存储对象的事务 第二个参数指定模式 readonly-只读 readwrite-读写 readwriteflush-读写更新版本
    const transaction = db.transaction(['user'], 'readwrite');
    // 拿出数据对象
    const store = transaction.objectStore('user');

    // 增加数据
    // store.add({ name: 'cyx', age: 29 }, 'user_2');
    // store.add({ name: 'fjn', age: 4 }, 'user_3');
    // store.add({ name: 'fwj', age: 22 }, 'user_4');

    // 删除数据
    // store.delete('user_1');

    // 修改数据，如果没有，就添加
    store.put({ name: 'cyx', age: 28 }, 'user_2');

    // 获取数据 get 或者 getAll
    const r = store.getAll();
    r.onsuccess = ({ target: { result } }) => {
      console.log(result);
    };
  };

  request.onerror = ({ target: { error } }) => {
    console.log('数据库链接失败', error);
  };

  // 删除数据库
  function deleteDatabase(dbName) {
    const request = window.indexedDB.deleteDatabase(dbName);

    request.onsuccess = function () {
      console.log(`数据库 ${dbName} 删除成功！`);
    };

    request.onerror = function (event) {
      console.error(`删除数据库 ${dbName} 失败:`, event);
    };

    request.onblocked = function () {
      console.warn(`数据库 ${dbName} 正在被其他连接使用，无法删除。`);
    };
  }

  // 离开或刷新 indexedDB 页执行的副作用
  return () => {
    console.log('离开或刷新 indexedDB 页');
    // 不关闭链接则无法删除
    curDB && curDB.close();
    // 删除数据库
    deleteDatabase(DB_NAME);
  };
}
