/** 乱数假文页面 */
export default function loremRender() {
  const lorem_zh =
    '勉接是狂破，谢国人妄只归于在专报解请奔，喜重竟召壬帅要人弟忧种第极破，预感你助已牛仃他教求娘雷此变胜始如，亡归俭三来心使先千者生得法家乐将，一天国而赏治愿愚修人病书是皇打张了，风司之药向前耳，我他风害订况太，文不大娘谓我整这人厄不语了不，创来娇感得一我仍倒狱司光，司九秦的故是前不动，兴开冇未云选陈又卡六，向永洪智云得年我是张要出弟，李皇失往司价土卅没，大力法，恨降到航贼是之而竟秦我们是谓意畴惊苦。';
  const lorem_en =
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ea atque ipsam amet eius facilis ipsum mollitia placeat incidunt alias, autem quod provident sint esse consequuntur hic at quasi aliquid natus quaerat eligendi aut ut! Laboriosam quos cupiditate nihil tenetur aliquid quam natus consectetur dolorem possimus. Quos, molestiae repellat? Est magnam minus amet illo cupiditate officiis voluptate et ipsam quia ex aliquam aperiam sed necessitatibus cumque quos nemo dicta quaerat, incidunt nihil, obcaecati iure expedita? Laboriosam aut veniam suscipit fugiat corrupti, quas fuga quibusdam consectetur quidem dolorem laborum, deleniti fugit nobis nam sit quia dignissimos. Quibusdam facilis iste pariatur distinctio culpa exercitationem, modi alias aspernatur odio cupiditate aliquid. Dolorem sunt distinctio facilis optio, earum quidem perferendis doloribus officia, beatae tenetur quae magni iure esse amet ducimus nemo voluptates?';

  const style = {
    wrap: 'margin-top:1rem;padding:1rem;',
    en: 'margin:2em 0 0',
    zh: 'font-size:14px;text-indent:2em;line-height:2em;margin:0;'
  };

  return `<h4>Vscode 插件-乱数假文</h4>
  <div class="desc">
    🧩&emsp;Vscode 自带 <strong>lorem数字</strong> 生成数字个随机英文单词
  </div>
  <div class="desc">
    🧩&emsp;插件 <strong>Chinese Lorem</strong>，作用： <strong>jw数字</strong> 生成数字个随机中文字符
  </div>
  <hr/>
  <div class="lorem-wrap" style="${style.wrap}">
    <p style="${style.zh}">${lorem_zh}</p>
    <p style="${style.en}">${lorem_en}</p>
  </div>
  `;
}
