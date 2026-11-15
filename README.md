# 简历主页：研究与文化创作展示

双击 `index.html` 即可查看。无需安装、构建、联网调用模型或登录。
外部字体和图标可能需要网络；新模块的图形、数据和交互均使用本地文件。

## 新增展示
- 导航“仿真研究”：语料地图、四臂干预、八阶段设计、v5先导结果、数据核对。
- 数据核对：筛选全部日期/事件前七日/论文核心窗口/事件后七日，以及记录类型；可下载公开汇总CSV和JSON。
- 导航“文化创作”：文心原道先导图文展示，可切换三幅实机截图并点击放大；以“刚 / 柔 / 济”切换设计阐释。

文心原道为持续完善的 Windows Demo，页面介绍创作方向、先导画面与设计思路。

## 文件职责
- `index.html`：原简历与两个项目模块。
- `style.css`：原站样式；`socioverse.css`：研究模块与导航适配；`project-additions.css`：数据核对及游戏概念模块。
- `socioverse.js`：原研究视图；`socioverse-public-stats.js`：公开聚合计数；`socioverse-audit.js`：筛选和表格；`wenxin.js`：概念切换。
- `socioverse-sources.md`：研究口径和归档复核说明。
- `scripts/build_public_stats.py`：只输出公开汇总的离线重建脚本，Python标准库即可运行。

## 离线更新汇总
在项目目录运行（PRIVATE_ARCHIVE.zip由持有人本地提供，不提交到仓库）：

```text
python scripts/build_public_stats.py PRIVATE_ARCHIVE.zip --out .
```

脚本读取归档内指定规范清洗表，校验稳定ID唯一性及总数，再生成汇总JS、JSON、CSV。不会复制记录级文本或身份字段。统计口径以固定窗口的北京时间创建日期为准。新语料若更改研究窗口，应明确修改脚本并同步说明，不能只改页面数字。

## 公开范围与许可
新增模块代码适用 `LICENSE-CODE` 中的MIT许可，范围见该文件。原简历资产与第三方内容不因该代码许可自动取得再分发授权。

本网站包包含原简历压缩包的既有作品集图片与PDF，保留原状。本次新增三张作者授权的实机截图节选（assets/wenxin），仅用于作品宣传展示。另按作者最新授权加入完整展示视频的网页压缩版 wenxin-showcase.mp4。完整游戏工程、EXE/PCK、原说明PDF及独立素材文件未加入。研究归档、评论正文、作者键、原截图及来源映射同样未加入。

概念图形由CSS绘制，宣传图选自作者提供的实机截图。截图与演示视频不是MIT代码许可的一部分，画面中内容保留原有权利安排。AI辅助制作的概述是创作过程说明，不宣称素材许可可覆盖开源再分发。若将整个旧作品集重新发布，原有素材的许可沿用其各自权利与约定。

## GitHub图片与视频更新
仓库此前缺少assets/wenxin目录，导致相对路径图片加载失败。当前index.html已内嵌三张截图及视频封面，截图切换脚本从内嵌缩略图读取图像，不依赖上传图片目录。视频在根目录wenxin-showcase.mp4，请与index.html同级上传；不要只上传预览PNG或ZIP。播放器采用H.264/AAC、手动播放和metadata预载，支持手机与全屏。

## TapTap补充来源
论文旧表的8617条记录包含论坛646与评价34。新核对另发现reviews.csv的1094条唯一评价ID（核心窗口278条；与旧34条ID交集1）及Excel60行（28行日期缺失，缺稳定评价ID）。新增TapTap来源核对独立于论文分母，不改写旧情感或实验结果。公开taptap-source-audit.json、taptap-source-audit.js、taptap-review-score-summary.csv，只含汇总。

## 未覆盖评论内容分析更新
原词典未覆盖的3909条评论拆为14类内容/表达主标签；新页面默认展示内容复核，并保留原词典筛查对照。新增uncovered-analysis.js/.json、uncovered-analysis-view.js、uncovered-analysis-summary.csv、uncovered-analysis-codebook.json、uncovered-analysis-report.md；复算脚本scripts/analyze_uncovered_content.py使用私有原归档，不公开评论原文。
