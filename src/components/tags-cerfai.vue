<template>
  <el-scrollbar class="menu">
    <el-menu
      :ellipsis="false"
      :unique-opened="true"
      menu-trigger="click"
      mode="horizontal"
      @select="handleSelect">
      <el-sub-menu v-for="i in cate.data.filter(v => v.level === 1)" :key="i.id" :index="i.id.toString()">
        <template #title>{{ i.name }}</template>
        <el-menu-item
          v-for="f in cate.data.filter(v => v.level === 2 && (v.id/100).toFixed(0) === (i.id/100).toFixed(0))"
          :key="f.id"
          :index="f.id.toString()">
          {{ f.name }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
  <el-card v-if="tableData.data">
    <el-table
      :data="tableData.data"
      size="small"
      style="width: 100%; height: 50vh"
      @row-click="rowClick">
      <el-table-column fixed label="词条" prop="name"/>
      <el-table-column fixed label="中文名" prop="t_name"/>
      <el-table-column label="NFSW" prop="is_nsfw"/>
      <el-table-column label="描述" prop="desc"/>
      <el-table-column label="备注" prop="remarks"/>
      <el-table-column label="更新时间" prop="update_time"/>
      <el-table-column label="贡献者" prop="contributor"/>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { mainStore } from '@/store/main_store'

const store = mainStore()
const cate = {
  code: 200,
  data: [
    {
      desc: null,
      id: 1100,
      level: 1,
      name: '画面设定'
    },
    {
      desc: null,
      id: 1101,
      level: 2,
      name: '画面基础/数值'
    },
    {
      desc: null,
      id: 1102,
      level: 2,
      name: '画面结构/类型'
    },
    {
      desc: null,
      id: 1103,
      level: 2,
      name: '画面解析/画质'
    },
    {
      desc: null,
      id: 1104,
      level: 2,
      name: '画面效果/精度'
    },
    {
      desc: null,
      id: 1105,
      level: 2,
      name: '画面风格/主题'
    },
    {
      desc: null,
      id: 1106,
      level: 2,
      name: '画面边框/底纹'
    },
    {
      desc: null,
      id: 1107,
      level: 2,
      name: '画面焦点/视角'
    },
    {
      desc: null,
      id: 1108,
      level: 2,
      name: '画面亮度/光影'
    },
    {
      desc: null,
      id: 1109,
      level: 2,
      name: '画面色彩/饱和'
    },
    {
      desc: null,
      id: 1110,
      level: 2,
      name: '画面设定/其他'
    },
    {
      desc: null,
      id: 1200,
      level: 1,
      name: '角色设定'
    },
    {
      desc: null,
      id: 1201,
      level: 2,
      name: '性别标签/取向'
    },
    {
      desc: null,
      id: 1202,
      level: 2,
      name: '年龄标签/寿命'
    },
    {
      desc: null,
      id: 1203,
      level: 2,
      name: '人物生成/数量'
    },
    {
      desc: null,
      id: 1204,
      level: 2,
      name: '人物体形/体格'
    },
    {
      desc: null,
      id: 1205,
      level: 2,
      name: '人物种族/非人'
    },
    {
      desc: null,
      id: 1206,
      level: 2,
      name: '人物职业/身份'
    },
    {
      desc: null,
      id: 1207,
      level: 2,
      name: '人物风格/印象'
    },
    {
      desc: null,
      id: 1208,
      level: 2,
      name: '人物关系/家庭'
    },
    {
      desc: null,
      id: 1209,
      level: 2,
      name: '人物状态/异常'
    },
    {
      desc: null,
      id: 1210,
      level: 2,
      name: '人物标签/其他'
    },
    {
      desc: null,
      id: 1300,
      level: 1,
      name: '人体设定'
    },
    {
      desc: null,
      id: 1301,
      level: 2,
      name: '人体结构/透视'
    },
    {
      desc: null,
      id: 1302,
      level: 2,
      name: '人体动作/姿势'
    },
    {
      desc: null,
      id: 1303,
      level: 2,
      name: '人体外观/线条'
    },
    {
      desc: null,
      id: 1304,
      level: 2,
      name: '人体光影/阴影'
    },
    {
      desc: null,
      id: 1305,
      level: 2,
      name: '人体质感/皮肤'
    },
    {
      desc: null,
      id: 1306,
      level: 2,
      name: '人体表现/外观'
    },
    {
      desc: null,
      id: 1307,
      level: 2,
      name: '胸部形状/胸围'
    },
    {
      desc: null,
      id: 1308,
      level: 2,
      name: '胸部效果/表现'
    },
    {
      desc: null,
      id: 1309,
      level: 2,
      name: '人体部位/器官'
    },
    {
      desc: null,
      id: 1310,
      level: 2,
      name: '人体标签/其他'
    },
    {
      desc: null,
      id: 1400,
      level: 1,
      name: '脸部设定'
    },
    {
      desc: null,
      id: 1401,
      level: 2,
      name: '脸部色彩/质感'
    },
    {
      desc: null,
      id: 1402,
      level: 2,
      name: '脸部特征/疤痕'
    },
    {
      desc: null,
      id: 1403,
      level: 2,
      name: '脸部妆容/化妆'
    },
    {
      desc: null,
      id: 1404,
      level: 2,
      name: '脸部装饰/面具'
    },
    {
      desc: null,
      id: 1405,
      level: 2,
      name: '脸部表情/感情'
    },
    {
      desc: null,
      id: 1406,
      level: 2,
      name: '表情符号/表情'
    },
    {
      desc: null,
      id: 1407,
      level: 2,
      name: '表情组合/动作'
    },
    {
      desc: null,
      id: 1408,
      level: 2,
      name: '脸部形状/结构'
    },
    {
      desc: null,
      id: 1409,
      level: 2,
      name: '脸部效果/光影'
    },
    {
      desc: null,
      id: 1410,
      level: 2,
      name: '脸部标签/其他'
    },
    {
      desc: null,
      id: 1500,
      level: 1,
      name: '五官设定'
    },
    {
      desc: null,
      id: 1501,
      level: 2,
      name: '眼睛外观/眼影'
    },
    {
      desc: null,
      id: 1502,
      level: 2,
      name: '瞳孔颜色/形状'
    },
    {
      desc: null,
      id: 1503,
      level: 2,
      name: '眉毛形状/效果'
    },
    {
      desc: null,
      id: 1504,
      level: 2,
      name: '舌头形状/动作'
    },
    {
      desc: null,
      id: 1505,
      level: 2,
      name: '嘴唇形状/效果'
    },
    {
      desc: null,
      id: 1506,
      level: 2,
      name: '耳朵形状/效果'
    },
    {
      desc: null,
      id: 1507,
      level: 2,
      name: '牙齿形状/效果'
    },
    {
      desc: null,
      id: 1508,
      level: 2,
      name: '鼻子形状/效果'
    },
    {
      desc: null,
      id: 1509,
      level: 2,
      name: '胡子形状/效果'
    },
    {
      desc: null,
      id: 1510,
      level: 2,
      name: '五官标签/其他'
    },
    {
      desc: null,
      id: 1511,
      level: 2,
      name: '五官组合'
    },
    {
      desc: null,
      id: 1600,
      level: 1,
      name: '头发设定'
    },
    {
      desc: null,
      id: 1601,
      level: 2,
      name: '头发属性/发型'
    },
    {
      desc: null,
      id: 1602,
      level: 2,
      name: '头发长度/外观'
    },
    {
      desc: null,
      id: 1603,
      level: 2,
      name: '头发颜色/染发'
    },
    {
      desc: null,
      id: 1604,
      level: 2,
      name: '头发质感/触感'
    },
    {
      desc: null,
      id: 1605,
      level: 2,
      name: '头发发饰/装饰'
    },
    {
      desc: null,
      id: 1606,
      level: 2,
      name: '头发效果/风格'
    },
    {
      desc: null,
      id: 1607,
      level: 2,
      name: '前发设定/刘海'
    },
    {
      desc: null,
      id: 1608,
      level: 2,
      name: '侧发设定/辫子'
    },
    {
      desc: null,
      id: 1609,
      level: 2,
      name: '后发马尾/发髻'
    },
    {
      desc: null,
      id: 1610,
      level: 2,
      name: '发型组合/其他'
    },
    {
      desc: null,
      id: 1700,
      level: 1,
      name: '服装设定'
    },
    {
      desc: null,
      id: 1701,
      level: 2,
      name: '服装类型/设定'
    },
    {
      desc: null,
      id: 1702,
      level: 2,
      name: '服装风格/流派'
    },
    {
      desc: null,
      id: 1703,
      level: 2,
      name: '服装材质/厚度'
    },
    {
      desc: null,
      id: 1704,
      level: 2,
      name: '服装状态/变化'
    },
    {
      desc: null,
      id: 1705,
      level: 2,
      name: '服装分离/损坏'
    },
    {
      desc: null,
      id: 1706,
      level: 2,
      name: '服装穿着/部位'
    },
    {
      desc: null,
      id: 1707,
      level: 2,
      name: '服装穿着/动作'
    },
    {
      desc: null,
      id: 1708,
      level: 2,
      name: '角色扮演/cosplay'
    },
    {
      desc: null,
      id: 1710,
      level: 2,
      name: '服装标签/其他'
    },
    {
      desc: null,
      id: 1800,
      level: 1,
      name: '服装外观'
    },
    {
      desc: null,
      id: 1801,
      level: 2,
      name: '衬衫短袖/外观'
    },
    {
      desc: null,
      id: 1802,
      level: 2,
      name: '内衣文胸/外观'
    },
    {
      desc: null,
      id: 1803,
      level: 2,
      name: '内裤胖次/外观'
    },
    {
      desc: null,
      id: 1804,
      level: 2,
      name: '外套风衣/外观'
    },
    {
      desc: null,
      id: 1805,
      level: 2,
      name: '制服套装/外观'
    },
    {
      desc: null,
      id: 1806,
      level: 2,
      name: '鞋子靴子/外观'
    },
    {
      desc: null,
      id: 1807,
      level: 2,
      name: '袜子裤袜/外观'
    },
    {
      desc: null,
      id: 1808,
      level: 2,
      name: '手套护手/外观'
    },
    {
      desc: null,
      id: 1809,
      level: 2,
      name: '帽子头盔/外观'
    },
    {
      desc: null,
      id: 1810,
      level: 2,
      name: '裤子短裤/外观'
    },
    {
      desc: null,
      id: 1811,
      level: 2,
      name: '裙子裙摆/外观'
    },
    {
      desc: null,
      id: 1812,
      level: 2,
      name: '泳装泳衣/外观'
    },
    {
      desc: null,
      id: 1813,
      level: 2,
      name: '季节服装/外观'
    },
    {
      desc: null,
      id: 1814,
      level: 2,
      name: '常服休闲/外观'
    },
    {
      desc: null,
      id: 1898,
      level: 2,
      name: '服装组合/外观'
    },
    {
      desc: null,
      id: 1899,
      level: 2,
      name: '其他服装/外观'
    },
    {
      desc: null,
      id: 1900,
      level: 1,
      name: '装饰设定'
    },
    {
      desc: null,
      id: 1901,
      level: 2,
      name: '手指/手腕装饰'
    },
    {
      desc: null,
      id: 1902,
      level: 2,
      name: '腿部/脚腕装饰'
    },
    {
      desc: null,
      id: 1903,
      level: 2,
      name: '背部/翅膀装饰'
    },
    {
      desc: null,
      id: 1904,
      level: 2,
      name: '颈部/项链装饰'
    },
    {
      desc: null,
      id: 1905,
      level: 2,
      name: '头部/兽耳装饰'
    },
    {
      desc: null,
      id: 1906,
      level: 2,
      name: '耳环/挂坠装饰'
    },
    {
      desc: null,
      id: 1907,
      level: 2,
      name: '眼镜/镜片装饰'
    },
    {
      desc: null,
      id: 1908,
      level: 2,
      name: '臀部/尾巴装饰'
    },
    {
      desc: null,
      id: 1909,
      level: 2,
      name: '胸花/徽章装饰'
    },
    {
      desc: null,
      id: 1999,
      level: 2,
      name: '装饰标签/其他'
    },
    {
      desc: null,
      id: 2000,
      level: 1,
      name: '背景设定'
    },
    {
      desc: null,
      id: 2001,
      level: 2,
      name: '具体时间/历史'
    },
    {
      desc: null,
      id: 2002,
      level: 2,
      name: '季节环境/四季'
    },
    {
      desc: null,
      id: 2003,
      level: 2,
      name: '自然风景/地点'
    },
    {
      desc: null,
      id: 2004,
      level: 2,
      name: '室外场所/建筑'
    },
    {
      desc: null,
      id: 2005,
      level: 2,
      name: '室内设施/场景'
    },
    {
      desc: null,
      id: 2006,
      level: 2,
      name: '天气变化/气候'
    },
    {
      desc: null,
      id: 2007,
      level: 2,
      name: '庆典节日/祭典'
    },
    {
      desc: null,
      id: 2008,
      level: 2,
      name: '群星宇宙/维度'
    },
    {
      desc: null,
      id: 2009,
      level: 2,
      name: '野生动物/宠物'
    },
    {
      desc: null,
      id: 2010,
      level: 2,
      name: '机械背景/未来'
    },
    {
      desc: null,
      id: 2011,
      level: 2,
      name: '幻想世界/生命'
    },
    {
      desc: null,
      id: 2012,
      level: 2,
      name: '宗教符号/仪式'
    },
    {
      desc: null,
      id: 2013,
      level: 2,
      name: '场景动态/特效'
    },
    {
      desc: null,
      id: 2014,
      level: 2,
      name: '自然灾难/地理'
    },
    {
      desc: null,
      id: 2015,
      level: 2,
      name: '人类战争/死亡'
    },
    {
      desc: null,
      id: 2016,
      level: 2,
      name: '近代科技/科学'
    },
    {
      desc: null,
      id: 2017,
      level: 2,
      name: '工业科技/蒸汽'
    },
    {
      desc: null,
      id: 2019,
      level: 2,
      name: '魔法科技/魔幻'
    },
    {
      desc: null,
      id: 2020,
      level: 2,
      name: '修仙武侠/玄幻'
    },
    {
      desc: null,
      id: 2099,
      level: 2,
      name: '其他元素/背景'
    },
    {
      desc: null,
      id: 2100,
      level: 1,
      name: '动作设定'
    },
    {
      desc: null,
      id: 2101,
      level: 2,
      name: '头部/脖子动作'
    },
    {
      desc: null,
      id: 2102,
      level: 2,
      name: '身体/躯干动作'
    },
    {
      desc: null,
      id: 2103,
      level: 2,
      name: '手指/手势动作'
    },
    {
      desc: null,
      id: 2104,
      level: 2,
      name: '手臂/双手动作'
    },
    {
      desc: null,
      id: 2105,
      level: 2,
      name: '腿部/双腿动作'
    },
    {
      desc: null,
      id: 2106,
      level: 2,
      name: '足部/脚部动作'
    },
    {
      desc: null,
      id: 2107,
      level: 2,
      name: '体操/武术动作'
    },
    {
      desc: null,
      id: 2108,
      level: 2,
      name: '多人/交互动作'
    },
    {
      desc: null,
      id: 2109,
      level: 2,
      name: '运动/灵巧动作'
    },
    {
      desc: null,
      id: 2110,
      level: 2,
      name: '动作标签/其他'
    },
    {
      desc: null,
      id: 2200,
      level: 1,
      name: '肢体设定'
    },
    {
      desc: null,
      id: 2201,
      level: 2,
      name: '肢体数量/设定'
    },
    {
      desc: null,
      id: 2202,
      level: 2,
      name: '肢体类型/设定'
    },
    {
      desc: null,
      id: 2203,
      level: 2,
      name: '肢体状态/设定'
    },
    {
      desc: null,
      id: 2204,
      level: 2,
      name: '腿部外观/效果'
    },
    {
      desc: null,
      id: 2205,
      level: 2,
      name: '足部外观/效果'
    },
    {
      desc: null,
      id: 2206,
      level: 2,
      name: '手部外观/效果'
    },
    {
      desc: null,
      id: 2207,
      level: 2,
      name: '脖子外观/效果'
    },
    {
      desc: null,
      id: 2208,
      level: 2,
      name: '身躯外观/效果'
    },
    {
      desc: null,
      id: 2209,
      level: 2,
      name: '头部外观/效果'
    },
    {
      desc: null,
      id: 2210,
      level: 2,
      name: '肢体设定/其他'
    },
    {
      desc: null,
      id: 2300,
      level: 1,
      name: '物品设定'
    },
    {
      desc: null,
      id: 2301,
      level: 2,
      name: '材料/品质'
    },
    {
      desc: null,
      id: 2302,
      level: 2,
      name: '武器/装备'
    },
    {
      desc: null,
      id: 2303,
      level: 2,
      name: '魔法/道具'
    },
    {
      desc: null,
      id: 2304,
      level: 2,
      name: '矿物/宝石'
    },
    {
      desc: null,
      id: 2305,
      level: 2,
      name: '音乐/乐谱'
    },
    {
      desc: null,
      id: 2306,
      level: 2,
      name: '动物/家畜'
    },
    {
      desc: null,
      id: 2307,
      level: 2,
      name: '工艺/手工'
    },
    {
      desc: null,
      id: 2308,
      level: 2,
      name: '食物/食材'
    },
    {
      desc: null,
      id: 2309,
      level: 2,
      name: '绘画/颜料'
    },
    {
      desc: null,
      id: 2310,
      level: 2,
      name: '机械/设备'
    },
    {
      desc: null,
      id: 2311,
      level: 2,
      name: '水产/海鲜'
    },
    {
      desc: null,
      id: 2312,
      level: 2,
      name: '鲜花/花卉'
    },
    {
      desc: null,
      id: 2313,
      level: 2,
      name: '养殖/畜牧'
    },
    {
      desc: null,
      id: 2314,
      level: 2,
      name: '昆虫/动物'
    },
    {
      desc: null,
      id: 2315,
      level: 2,
      name: '植物/森林'
    },
    {
      desc: null,
      id: 2316,
      level: 2,
      name: '农业/农场'
    },
    {
      desc: null,
      id: 2317,
      level: 2,
      name: '现代枪械/武装'
    },
    {
      desc: null,
      id: 2318,
      level: 2,
      name: '科幻物品/未来'
    },
    {
      desc: null,
      id: 2319,
      level: 2,
      name: '历史物品/古代'
    },
    {
      desc: null,
      id: 2399,
      level: 2,
      name: '物品道具/对象'
    },
    {
      desc: null,
      id: 2400,
      level: 1,
      name: '特殊设定'
    },
    {
      desc: null,
      id: 2401,
      level: 2,
      name: '特殊体型/变化'
    },
    {
      desc: null,
      id: 2402,
      level: 2,
      name: '特殊外观/形态'
    },
    {
      desc: null,
      id: 2403,
      level: 2,
      name: '特殊材料/扭曲'
    },
    {
      desc: null,
      id: 2404,
      level: 2,
      name: '特殊效果/特效'
    },
    {
      desc: null,
      id: 2405,
      level: 2,
      name: '特殊装饰/氛围'
    },
    {
      desc: null,
      id: 2406,
      level: 2,
      name: '特殊动作/非人'
    },
    {
      desc: null,
      id: 2407,
      level: 2,
      name: '特殊标签/词条'
    },
    {
      desc: null,
      id: 2408,
      level: 2,
      name: '特殊旗帜/领袖'
    },
    {
      desc: null,
      id: 2500,
      level: 1,
      name: '人物设定'
    },
    {
      desc: null,
      id: 2501,
      level: 2,
      name: '画师/插画师'
    },
    {
      desc: null,
      id: 2502,
      level: 2,
      name: '原著/艺术作品'
    },
    {
      desc: null,
      id: 2503,
      level: 2,
      name: '网络名人/主播'
    },
    {
      desc: null,
      id: 2504,
      level: 2,
      name: '虚拟主播/Vtuber'
    },
    {
      desc: null,
      id: 2505,
      level: 2,
      name: '原创角色/独立角色'
    },
    {
      desc: null,
      id: 2506,
      level: 2,
      name: '虚拟歌姬/ Vocaloid'
    },
    {
      desc: null,
      id: 2507,
      level: 2,
      name: '现实偶像/演员'
    },
    {
      desc: null,
      id: 2508,
      level: 2,
      name: '影视剧/电影'
    },
    {
      desc: null,
      id: 2509,
      level: 2,
      name: '历史人物/艺术家'
    },
    {
      desc: null,
      id: 2510,
      level: 2,
      name: '人物相关/其他'
    },
    {
      desc: null,
      id: 2600,
      level: 1,
      name: '动漫相关'
    },
    {
      desc: null,
      id: 2601,
      level: 2,
      name: '动漫作品/漫画作品'
    },
    {
      desc: null,
      id: 2602,
      level: 2,
      name: '动漫角色/漫画角色'
    },
    {
      desc: null,
      id: 2603,
      level: 2,
      name: '动漫周边/角色二创'
    },
    {
      desc: null,
      id: 2604,
      level: 2,
      name: '高达系列'
    },
    {
      desc: null,
      id: 2605,
      level: 2,
      name: '龙珠系列'
    },
    {
      desc: null,
      id: 2606,
      level: 2,
      name: 'FATE/FGO系列'
    },
    {
      desc: null,
      id: 2607,
      level: 2,
      name: '兽娘动物园'
    },
    {
      desc: null,
      id: 2608,
      level: 2,
      name: '偶像大师系列'
    },
    {
      desc: null,
      id: 2609,
      level: 2,
      name: '少女战车系列'
    },
    {
      desc: null,
      id: 2610,
      level: 2,
      name: '魔法小圆系列'
    },
    {
      desc: null,
      id: 2611,
      level: 2,
      name: 'RE0/从零开始系列'
    },
    {
      desc: null,
      id: 2612,
      level: 2,
      name: '假面骑士系列'
    },
    {
      desc: null,
      id: 2613,
      level: 2,
      name: '魔法相关/动漫'
    },
    {
      desc: null,
      id: 2614,
      level: 2,
      name: '小马宝莉/彩虹小马'
    },
    {
      desc: null,
      id: 2615,
      level: 2,
      name: '火焰纹章系列'
    },
    {
      desc: null,
      id: 2616,
      level: 2,
      name: 'cookie系列'
    },
    {
      desc: null,
      id: 2698,
      level: 2,
      name: '动漫相关/ACG标签'
    },
    {
      desc: null,
      id: 2699,
      level: 2,
      name: '网络流行/meme梗'
    },
    {
      desc: null,
      id: 2700,
      level: 1,
      name: '游戏相关'
    },
    {
      desc: null,
      id: 2701,
      level: 2,
      name: '原神/米哈游'
    },
    {
      desc: null,
      id: 2702,
      level: 2,
      name: '阴阳师/网易'
    },
    {
      desc: null,
      id: 2703,
      level: 2,
      name: '碧蓝航线'
    },
    {
      desc: null,
      id: 2704,
      level: 2,
      name: '碧蓝幻想'
    },
    {
      desc: null,
      id: 2705,
      level: 2,
      name: '少女前线'
    },
    {
      desc: null,
      id: 2706,
      level: 2,
      name: '碧蓝档案'
    },
    {
      desc: null,
      id: 2707,
      level: 2,
      name: '公主链接'
    },
    {
      desc: null,
      id: 2708,
      level: 2,
      name: '宝可梦系列'
    },
    {
      desc: null,
      id: 2709,
      level: 2,
      name: '舰队收藏/舰c'
    },
    {
      desc: null,
      id: 2710,
      level: 2,
      name: '明日方舟'
    },
    {
      desc: null,
      id: 2711,
      level: 2,
      name: '马里奥系列'
    },
    {
      desc: null,
      id: 2712,
      level: 2,
      name: '最终幻想/FF'
    },
    {
      desc: null,
      id: 2713,
      level: 2,
      name: '少女前线'
    },
    {
      desc: null,
      id: 2714,
      level: 2,
      name: '仙境传说'
    },
    {
      desc: null,
      id: 2715,
      level: 2,
      name: '塞尔达系列'
    },
    {
      desc: null,
      id: 2716,
      level: 2,
      name: '东方project/zun'
    },
    {
      desc: null,
      id: 2717,
      level: 2,
      name: '赛马娘PrettyDerby'
    },
    {
      desc: null,
      id: 2792,
      level: 2,
      name: '游戏制作/公司'
    },
    {
      desc: null,
      id: 2793,
      level: 2,
      name: '掌机/街机系列'
    },
    {
      desc: null,
      id: 2794,
      level: 2,
      name: '手游/页游相关'
    },
    {
      desc: null,
      id: 2795,
      level: 2,
      name: 'Galgame/novel'
    },
    {
      desc: null,
      id: 2796,
      level: 2,
      name: '单机/主机游戏'
    },
    {
      desc: null,
      id: 2797,
      level: 2,
      name: '网游/联机游戏'
    },
    {
      desc: null,
      id: 2798,
      level: 2,
      name: '游戏角色/其他'
    },
    {
      desc: null,
      id: 2799,
      level: 2,
      name: '游戏设定/其他'
    },
    {
      desc: null,
      id: 2800,
      level: 1,
      name: '专业名词'
    },
    {
      desc: null,
      id: 2801,
      level: 2,
      name: '百科WIKI/词条'
    },
    {
      desc: null,
      id: 2802,
      level: 2,
      name: '调色板/颜色库'
    },
    {
      desc: null,
      id: 2803,
      level: 2,
      name: '画质提升/渲染'
    },
    {
      desc: null,
      id: 2804,
      level: 2,
      name: '模型优化/代码'
    },
    {
      desc: null,
      id: 2805,
      level: 2,
      name: '基础反咒/负面'
    },
    {
      desc: null,
      id: 2806,
      level: 2,
      name: '神奇反咒/禁咒'
    },
    {
      desc: null,
      id: 2807,
      level: 2,
      name: '推特内容/账号'
    },
    {
      desc: null,
      id: 2808,
      level: 2,
      name: '网站论坛/图库'
    },
    {
      desc: null,
      id: 2900,
      level: 1,
      name: '其他标签'
    },
    {
      desc: null,
      id: 2901,
      level: 2,
      name: '符号/标点代码'
    },
    {
      desc: null,
      id: 2902,
      level: 2,
      name: '命令/指令代码'
    },
    {
      desc: null,
      id: 2903,
      level: 2,
      name: '数字/量词'
    },
    {
      desc: null,
      id: 2904,
      level: 2,
      name: '字母/单词'
    },
    {
      desc: null,
      id: 3000,
      level: 1,
      name: 'NSFW'
    },
    {
      desc: null,
      id: 3001,
      level: 2,
      name: '色情液体/体液'
    },
    {
      desc: null,
      id: 3002,
      level: 2,
      name: '色情体位/姿势'
    },
    {
      desc: null,
      id: 3003,
      level: 2,
      name: '色情动作/表演'
    },
    {
      desc: null,
      id: 3004,
      level: 2,
      name: '色情裸露/器官'
    },
    {
      desc: null,
      id: 3005,
      level: 2,
      name: '色情道具/物品'
    },
    {
      desc: null,
      id: 3006,
      level: 2,
      name: '色情设定/效果'
    },
    {
      desc: null,
      id: 3007,
      level: 2,
      name: '色情地点/场所'
    },
    {
      desc: null,
      id: 3008,
      level: 2,
      name: '色情服装/情趣'
    },
    {
      desc: null,
      id: 3009,
      level: 2,
      name: '禁忌关系/乱伦'
    },
    {
      desc: null,
      id: 3010,
      level: 2,
      name: '禁忌血腥/犯罪'
    },
    {
      desc: null,
      id: 3011,
      level: 2,
      name: '施虐SM/SP受虐'
    },
    {
      desc: null,
      id: 3012,
      level: 2,
      name: '捆绑BD/囚禁'
    },
    {
      desc: null,
      id: 3013,
      level: 2,
      name: '调教DS/露出'
    },
    {
      desc: null,
      id: 3100,
      level: 1,
      name: '默认标签'
    },
    {
      desc: null,
      id: 3101,
      level: 2,
      name: '尚未分类'
    },
    {
      desc: null,
      id: 3102,
      level: 2,
      name: '无效标签'
    },
    {
      desc: null,
      id: 3103,
      level: 2,
      name: '新增分类'
    },
    {
      desc: null,
      id: 3200,
      level: 1,
      name: '组合标签'
    },
    {
      desc: null,
      id: 3201,
      level: 2,
      name: '元素法典X'
    },
    {
      desc: null,
      id: 3202,
      level: 2,
      name: '清晰咒语X'
    },
    {
      desc: null,
      id: 3203,
      level: 2,
      name: '风景生成X'
    },
    {
      desc: null,
      id: 3204,
      level: 2,
      name: '建筑咒语X'
    },
    {
      desc: null,
      id: 3205,
      level: 2,
      name: '精华短语X'
    },
    {
      desc: null,
      id: 3206,
      level: 2,
      name: '大神原创X'
    }
  ],
  msg: '获取完整分类成功'
}

const tableData = {
  code: 200,
  data: [
    {
      c_id: 2799,
      contributor: 'lanfeicui,',
      desc: '',
      effect_level: null,
      id: 16171,
      is_locked: null,
      is_nsfw: 0,
      name: 'kogame',
      remarks: '',
      source: null,
      t_name: '格斗游戏',
      update_time: 'Wed, 15 Mar 2023 01:45:29 GMT',
      update_times: 1
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 12274,
      is_locked: null,
      is_nsfw: 0,
      name: 'hk (hk)',
      remarks: null,
      source: null,
      t_name: '香港(香港)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 12275,
      is_locked: null,
      is_nsfw: 0,
      name: 'hk (nt)',
      remarks: null,
      source: null,
      t_name: '港币 (新台币)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: '阿巧,厚实表皮,',
      desc: '来自自由游戏Ib的主角。有时叫伊芙。一个上流社会的小女孩，棕色头发，红色眼睛，白色衬衫和红色裙子。经常和红色联系在一起。因为她是个小女孩，她读复杂的汉字有困难。 别名: イヴ(Ib)',
      effect_level: null,
      id: 13051,
      is_locked: null,
      is_nsfw: 0,
      name: 'ib (ib)',
      remarks: 'https://danbooru.donmai.us/posts?tags=ib (ib)',
      source: null,
      t_name: '伊布(恐怖美术馆)',
      update_time: 'Sat, 12 Nov 2022 18:11:41 GMT',
      update_times: 1
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 18604,
      is_locked: null,
      is_nsfw: 0,
      name: 'mao (6r)',
      remarks: null,
      source: null,
      t_name: '毛 (6r)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 25317,
      is_locked: null,
      is_nsfw: 0,
      name: 'q (ed69)',
      remarks: null,
      source: null,
      t_name: 'q (ed69)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 8239,
      is_locked: null,
      is_nsfw: 0,
      name: 'f7(eiki)',
      remarks: null,
      source: null,
      t_name: 'f7(eiki)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 21899,
      is_locked: null,
      is_nsfw: 0,
      name: 'ni (221)',
      remarks: null,
      source: null,
      t_name: '你 (221)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 13396,
      is_locked: null,
      is_nsfw: 0,
      name: 'in (ain)',
      remarks: null,
      source: null,
      t_name: '在 (ain)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 4299,
      is_locked: null,
      is_nsfw: 0,
      name: 'c (neta)',
      remarks: null,
      source: null,
      t_name: 'c (净额)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 26381,
      is_locked: null,
      is_nsfw: 0,
      name: 'rom (20)',
      remarks: null,
      source: null,
      t_name: '只读存储器 (20)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: ',北北,',
      desc: '是日本一个二次元卡牌moba游戏，形式为3v3的对战',
      effect_level: null,
      id: 3,
      is_locked: null,
      is_nsfw: 0,
      name: '#compass',
      remarks: '',
      source: null,
      t_name: '《コンパス~戦闘摂理解析システム(COMPASS~戰鬥天賦解析系統~)',
      update_time: 'Sun, 06 Nov 2022 20:46:55 GMT',
      update_times: 2
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 20219,
      is_locked: null,
      is_nsfw: 0,
      name: 'mk (mod0)',
      remarks: null,
      source: null,
      t_name: 'MK (mod0)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 17761,
      is_locked: null,
      is_nsfw: 0,
      name: 'lk (lk00)',
      remarks: null,
      source: null,
      t_name: 'lk (lk00)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 12819,
      is_locked: null,
      is_nsfw: 0,
      name: 'hou (ppo)',
      remarks: null,
      source: null,
      t_name: '侯 (ppo)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 21138,
      is_locked: null,
      is_nsfw: 0,
      name: 'nae (rno)',
      remarks: null,
      source: null,
      t_name: 'nae (rno)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 10757,
      is_locked: null,
      is_nsfw: 0,
      name: 'gya (144)',
      remarks: null,
      source: null,
      t_name: '嘉 (144)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 22470,
      is_locked: null,
      is_nsfw: 0,
      name: 'ntk (7t5)',
      remarks: null,
      source: null,
      t_name: 'ntk (7t5)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 16038,
      is_locked: null,
      is_nsfw: 0,
      name: 'kj (k777)',
      remarks: null,
      source: null,
      t_name: 'kj (k777)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 34349,
      is_locked: null,
      is_nsfw: 0,
      name: 'wato (ko)',
      remarks: null,
      source: null,
      t_name: 'wato (ko)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 15310,
      is_locked: null,
      is_nsfw: 0,
      name: 'kay (utd)',
      remarks: null,
      source: null,
      t_name: '凯 (utd)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 14442,
      is_locked: null,
      is_nsfw: 0,
      name: 'k (anime)',
      remarks: null,
      source: null,
      t_name: 'k (动漫)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 19541,
      is_locked: null,
      is_nsfw: 0,
      name: 'miho (mi)',
      remarks: null,
      source: null,
      t_name: '美穗 (mi)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 3854,
      is_locked: null,
      is_nsfw: 0,
      name: 'bow (bhp)',
      remarks: null,
      source: null,
      t_name: '弓（bhp）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 32867,
      is_locked: null,
      is_nsfw: 0,
      name: 'try (lsc)',
      remarks: null,
      source: null,
      t_name: '尝试 (LSC)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 6971,
      is_locked: null,
      is_nsfw: 0,
      name: 'do (4-rt)',
      remarks: null,
      source: null,
      t_name: '做（4-rt）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 35926,
      is_locked: null,
      is_nsfw: 0,
      name: 'yuu (kfc)',
      remarks: null,
      source: null,
      t_name: '悠（肯德基）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 30828,
      is_locked: null,
      is_nsfw: 0,
      name: 'sw (taco)',
      remarks: null,
      source: null,
      t_name: 'sw（炸玉米饼）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: '阿巧,厚实表皮,',
      desc: '免费游戏Ib中的第三个角色，原本不可玩的，游戏1.4版的更新包含了一个小部分，从她的角度讲述了这个故事。玛丽是一个金发碧眼的女孩，穿着绿色的裙子。通常用油漆刀描绘。 别名: メアリー(Ib)|メアリー',
      effect_level: null,
      id: 18805,
      is_locked: null,
      is_nsfw: 0,
      name: 'mary (ib)',
      remarks: 'https://danbooru.donmai.us/posts?tags=mary (ib)',
      source: null,
      t_name: '玛丽(恐怖美术馆)',
      update_time: 'Sat, 12 Nov 2022 18:12:14 GMT',
      update_times: 1
    },
    {
      c_id: 2799,
      contributor: '阿巧,厚实表皮,',
      desc: '陈在她完整的猫形式，一个双尾尼科玛塔。 别名: nan',
      effect_level: null,
      id: 4941,
      is_locked: null,
      is_nsfw: 0,
      name: 'chen (cat)',
      remarks: 'https://danbooru.donmai.us/posts?tags=chen (cat)',
      source: null,
      t_name: '橙(猫)',
      update_time: 'Sat, 12 Nov 2022 18:12:28 GMT',
      update_times: 1
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 11799,
      is_locked: null,
      is_nsfw: 0,
      name: 'hhh (wave)',
      remarks: null,
      source: null,
      t_name: 'hhh (波)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 29569,
      is_locked: null,
      is_nsfw: 0,
      name: 'sora (efr)',
      remarks: null,
      source: null,
      t_name: '空 (efr)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 23540,
      is_locked: null,
      is_nsfw: 0,
      name: 'p2 (uxjzz)',
      remarks: null,
      source: null,
      t_name: 'p2 (uxjzz)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 35772,
      is_locked: null,
      is_nsfw: 0,
      name: 'yukin (es)',
      remarks: null,
      source: null,
      t_name: 'yukin (es)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 27236,
      is_locked: null,
      is_nsfw: 0,
      name: 'sao (0060)',
      remarks: null,
      source: null,
      t_name: '骚 (0060)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 7606,
      is_locked: null,
      is_nsfw: 0,
      name: 'eho (icbm)',
      remarks: null,
      source: null,
      t_name: 'eho (icbm)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 25527,
      is_locked: null,
      is_nsfw: 0,
      name: 'rakko (r2)',
      remarks: null,
      source: null,
      t_name: 'rakko (r2)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 8016,
      is_locked: null,
      is_nsfw: 0,
      name: 'es (eisis)',
      remarks: null,
      source: null,
      t_name: 'es (eisis)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 24726,
      is_locked: null,
      is_nsfw: 0,
      name: 'pon (0737)',
      remarks: null,
      source: null,
      t_name: '蓬 (0737)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 9820,
      is_locked: null,
      is_nsfw: 0,
      name: 'gen (enji)',
      remarks: null,
      source: null,
      t_name: 'gen (enji)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 23921,
      is_locked: null,
      is_nsfw: 0,
      name: 'pen (pen3)',
      remarks: null,
      source: null,
      t_name: '笔 (pen3)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 22020,
      is_locked: null,
      is_nsfw: 0,
      name: 'nikku (ra)',
      remarks: null,
      source: null,
      t_name: '日空 (ra)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 29343,
      is_locked: null,
      is_nsfw: 0,
      name: 'smile (rz)',
      remarks: null,
      source: null,
      t_name: '微笑 (rz)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 26288,
      is_locked: null,
      is_nsfw: 0,
      name: 'ro (aahnn)',
      remarks: null,
      source: null,
      t_name: '罗 (aahnn)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 28369,
      is_locked: null,
      is_nsfw: 0,
      name: 'shin (new)',
      remarks: null,
      source: null,
      t_name: '新（新）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 30962,
      is_locked: null,
      is_nsfw: 0,
      name: 'taa (acid)',
      remarks: null,
      source: null,
      t_name: 'taa（酸）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 2057,
      is_locked: null,
      is_nsfw: 0,
      name: 'asa (coco)',
      remarks: null,
      source: null,
      t_name: 'asa (可可)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 35156,
      is_locked: null,
      is_nsfw: 0,
      name: 'yami (m31)',
      remarks: null,
      source: null,
      t_name: '亚美 (m31)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 22319,
      is_locked: null,
      is_nsfw: 0,
      name: 'non (nobu)',
      remarks: null,
      source: null,
      t_name: '非（信）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 8452,
      is_locked: null,
      is_nsfw: 0,
      name: 'fe (tetsu)',
      remarks: null,
      source: null,
      t_name: '铁（铁）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 33464,
      is_locked: null,
      is_nsfw: 0,
      name: 'uni (melm)',
      remarks: null,
      source: null,
      t_name: '大学 (melm)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 13827,
      is_locked: null,
      is_nsfw: 0,
      name: 'isu (is88)',
      remarks: null,
      source: null,
      t_name: '伊苏 (is88)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 13760,
      is_locked: null,
      is_nsfw: 0,
      name: 'ise (0425)',
      remarks: null,
      source: null,
      t_name: '伊势 (0425)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 27489,
      is_locked: null,
      is_nsfw: 0,
      name: 'sb (coco1)',
      remarks: null,
      source: null,
      t_name: '某人 (coco1)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 34723,
      is_locked: null,
      is_nsfw: 0,
      name: 'wk (low-f)',
      remarks: null,
      source: null,
      t_name: '周（低-f）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 32222,
      is_locked: null,
      is_nsfw: 0,
      name: 'tobi (one)',
      remarks: null,
      source: null,
      t_name: '托比（一）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 3758,
      is_locked: null,
      is_nsfw: 0,
      name: 'bon (rump)',
      remarks: null,
      source: null,
      t_name: '好（臀部）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 17398,
      is_locked: null,
      is_nsfw: 0,
      name: 'lee (colt)',
      remarks: null,
      source: null,
      t_name: '李（小马）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 23637,
      is_locked: null,
      is_nsfw: 0,
      name: 'pan (mimi)',
      remarks: null,
      source: null,
      t_name: '潘（咪咪）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 179,
      is_locked: null,
      is_nsfw: 0,
      name: '8 (yamalu)',
      remarks: null,
      source: null,
      t_name: '8（亚马鲁）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 10666,
      is_locked: null,
      is_nsfw: 0,
      name: 'gum (gmng)',
      remarks: null,
      source: null,
      t_name: '口香糖 (gmng)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 8470,
      is_locked: null,
      is_nsfw: 0,
      name: 'fed (giba)',
      remarks: null,
      source: null,
      t_name: '美联储 (giba)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 233,
      is_locked: null,
      is_nsfw: 0,
      name: 'a (phrase)',
      remarks: null,
      source: null,
      t_name: '一个（短语）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 10291,
      is_locked: null,
      is_nsfw: 0,
      name: 'goto (sep)',
      remarks: null,
      source: null,
      t_name: '转到（九月）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 22466,
      is_locked: null,
      is_nsfw: 0,
      name: 'nr (cmnrr)',
      remarks: null,
      source: null,
      t_name: '天然橡胶 (cmnrr)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 25651,
      is_locked: null,
      is_nsfw: 0,
      name: 're (re 09)',
      remarks: null,
      source: null,
      t_name: '重新（重新 09）',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: '阿巧,厚实表皮,',
      desc: '自由游戏Ib中的第二个角色。在游戏中救出他后可以玩，与蓝色有关。一个紫色头发的高个子男人，一件破烂的外套。尽管比Ib大，但他在游戏中的攻击行为标志着他是一个容易被吓到的人。也害怕娃娃。 别名: ギャリー',
      effect_level: null,
      id: 9745,
      is_locked: null,
      is_nsfw: 0,
      name: 'garry (ib)',
      remarks: 'https://danbooru.donmai.us/posts?tags=garry (ib)',
      source: null,
      t_name: '加里(恐怖美术馆)',
      update_time: 'Sat, 12 Nov 2022 18:12:04 GMT',
      update_times: 1
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 2547,
      is_locked: null,
      is_nsfw: 0,
      name: 'azusa (hws)',
      remarks: null,
      source: null,
      t_name: '梓 (hws)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 243,
      is_locked: null,
      is_nsfw: 0,
      name: 'a.a (aa772)',
      remarks: null,
      source: null,
      t_name: 'aa (aa772)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 11329,
      is_locked: null,
      is_nsfw: 0,
      name: 'haru (kyou)',
      remarks: null,
      source: null,
      t_name: '春 (kyou)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 17095,
      is_locked: null,
      is_nsfw: 0,
      name: 'kyou (fr39)',
      remarks: null,
      source: null,
      t_name: '京 (fr39)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 1512,
      is_locked: null,
      is_nsfw: 0,
      name: 'anti (0324)',
      remarks: null,
      source: null,
      t_name: '反 (0324)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 7202,
      is_locked: null,
      is_nsfw: 0,
      name: 'dqn (dqnww)',
      remarks: null,
      source: null,
      t_name: 'dqn (dqnww)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 102,
      is_locked: null,
      is_nsfw: 0,
      name: '2l (2lsize)',
      remarks: null,
      source: null,
      t_name: '2l (2lsize)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 126,
      is_locked: null,
      is_nsfw: 0,
      name: '40 (0f0urw)',
      remarks: null,
      source: null,
      t_name: '40 (0f0urw)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 16446,
      is_locked: null,
      is_nsfw: 0,
      name: 'kosuke (bb)',
      remarks: null,
      source: null,
      t_name: '光介 (bb)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 11247,
      is_locked: null,
      is_nsfw: 0,
      name: 'hao (haozz)',
      remarks: null,
      source: null,
      t_name: '好 (haozz)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 7434,
      is_locked: null,
      is_nsfw: 0,
      name: 'dx (dekusu)',
      remarks: null,
      source: null,
      t_name: 'dx (dekusu)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 28696,
      is_locked: null,
      is_nsfw: 0,
      name: 'shitou (4h)',
      remarks: null,
      source: null,
      t_name: '屎头 (4h)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 29617,
      is_locked: null,
      is_nsfw: 0,
      name: 'sou (tuhut)',
      remarks: null,
      source: null,
      t_name: '苏 (tuhut)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 4324,
      is_locked: null,
      is_nsfw: 0,
      name: 'cad (caddo)',
      remarks: null,
      source: null,
      t_name: 'cad (caddo)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: '阿巧,厚实表皮,',
      desc: 'nan 别名: 綾音|あやね',
      effect_level: null,
      id: 2446,
      is_locked: null,
      is_nsfw: 0,
      name: 'ayane (doa)',
      remarks: 'https://danbooru.donmai.us/posts?tags=ayane (doa)',
      source: null,
      t_name: '绫音(DOA)',
      update_time: 'Sat, 12 Nov 2022 18:11:55 GMT',
      update_times: 1
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 20768,
      is_locked: null,
      is_nsfw: 0,
      name: 'mudo (saji)',
      remarks: null,
      source: null,
      t_name: 'mudo (saji)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 34896,
      is_locked: null,
      is_nsfw: 0,
      name: 'xia (ryugo)',
      remarks: null,
      source: null,
      t_name: '夏 (ryugo)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: '阿巧,厚实表皮,',
      desc: '一个来自剑术在线（母亲的罗萨里奥故事弧）的阿尔海姆在线化身。对于她的真实生活的外观，使用这个标签：Konno Yuuki 别名: ユウキ(SAO)|ユウキ',
      effect_level: null,
      id: 35965,
      is_locked: null,
      is_nsfw: 0,
      name: 'yuuki (sao)',
      remarks: 'https://danbooru.donmai.us/posts?tags=yuuki (sao)',
      source: null,
      t_name: '优纪(SAO)',
      update_time: 'Sat, 12 Nov 2022 18:11:49 GMT',
      update_times: 1
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 34941,
      is_locked: null,
      is_nsfw: 0,
      name: 'y (036 yng)',
      remarks: null,
      source: null,
      t_name: 'y (036 yng)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 15405,
      is_locked: null,
      is_nsfw: 0,
      name: 'kei (bekei)',
      remarks: null,
      source: null,
      t_name: 'kei (bekei)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 2421,
      is_locked: null,
      is_nsfw: 0,
      name: 'aya (lezon)',
      remarks: null,
      source: null,
      t_name: '绫 (lezon)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 26480,
      is_locked: null,
      is_nsfw: 0,
      name: 'rou (rou22)',
      remarks: null,
      source: null,
      t_name: '肉 (rou22)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 26638,
      is_locked: null,
      is_nsfw: 0,
      name: 'ryo (tg290)',
      remarks: null,
      source: null,
      t_name: '亮 (tg290)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 28003,
      is_locked: null,
      is_nsfw: 0,
      name: 'sg (esujii)',
      remarks: null,
      source: null,
      t_name: 'sg (esujii)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 33589,
      is_locked: null,
      is_nsfw: 0,
      name: 'uroko (mnr)',
      remarks: null,
      source: null,
      t_name: 'uroko (mnr)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 7064,
      is_locked: null,
      is_nsfw: 0,
      name: 'don (29219)',
      remarks: null,
      source: null,
      t_name: '唐 (29219)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 19247,
      is_locked: null,
      is_nsfw: 0,
      name: 'meiro (yuu)',
      remarks: null,
      source: null,
      t_name: 'meiro (yuu)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 8010,
      is_locked: null,
      is_nsfw: 0,
      name: 'eruru (erl)',
      remarks: null,
      source: null,
      t_name: 'eruru (erl)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 2180,
      is_locked: null,
      is_nsfw: 0,
      name: 'ask (askzy)',
      remarks: null,
      source: null,
      t_name: '问 (askzy)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 14423,
      is_locked: null,
      is_nsfw: 0,
      name: 'juu (juuzi)',
      remarks: null,
      source: null,
      t_name: 'juu (juuzi)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: null,
      desc: null,
      effect_level: null,
      id: 26172,
      is_locked: null,
      is_nsfw: 0,
      name: 'riku (wana)',
      remarks: null,
      source: null,
      t_name: 'riku (wana)',
      update_time: null,
      update_times: null
    },
    {
      c_id: 2799,
      contributor: '阿巧,厚实表皮,',
      desc: '可玩的角色从最终幻想X，X-2和Dissidia 012最终幻想。在FFX，她是一个朝圣战胜罪恶的召唤者。在X-2中，她成为了一名熟练的炮手级战士，在世界各地寻找斯皮拉的遗产，同时发现了一种被遗忘的机器武器，叫做织女星。在异教，她返回她的召唤师类，并能够召唤在战斗中的万年。 别名: ユウナ',
      effect_level: null,
      id: 35842,
      is_locked: null,
      is_nsfw: 0,
      name: 'yuna (ff10)',
      remarks: 'https://danbooru.donmai.us/posts?tags=yuna (ff10)',
      source: null,
      t_name: '尤娜(FF10)',
      update_time: 'Sat, 12 Nov 2022 18:11:49 GMT',
      update_times: 1
    },
    {
      c_id: 2799,
      contributor: '阿巧,厚实表皮,',
      desc: '主要对手乔乔诺·金尤娜·布肯第二部分。支柱人物的首领，远古吸血鬼们远胜于那些由他发明的石头面具所创造的。他有三个角和波浪形的长发，他默认的着装是赤膊，炫耀他的肌肉和腹肌。 别名: カーズ',
      effect_level: null,
      id: 15107,
      is_locked: null,
      is_nsfw: 0,
      name: 'kars (jojo)',
      remarks: 'https://danbooru.donmai.us/posts?tags=kars (jojo)',
      source: null,
      t_name: '卡兹(JOJO)',
      update_time: 'Sat, 12 Nov 2022 18:11:39 GMT',
      update_times: 1
    }
  ]
}

const handleSelect = (index: number) => {
  console.log(index)
}
const rowClick = (row: { name: string | undefined; }) => {
  const tag: ITag = store.tagModel(row.name)
  tag.state.editing = false
  store.todo.push(tag)
  store.info.todo.expansion = true
}

</script>

<style scoped>
.menu {
  position: relative;
  overflow: hidden;
}
</style>
