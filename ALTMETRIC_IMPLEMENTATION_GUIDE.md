# Nature风格"新闻报道"功能实现指南

## 🎯 功能概述

基于**Altmetric API**实现类似Nature期刊的"Mentions in news and blogs"功能，自动获取学术论文在新闻媒体和博客中的提及和报道。

## 🔍 Altmetric是什么？

**Altmetric**是全球领先的学术影响力跟踪服务：
- 📊 **覆盖范围广**：跟踪5000+新闻网站、100万+博客、社交媒体等
- 🏆 **权威认可**：Nature、Science、Cell等顶级期刊都在使用
- 🔄 **实时更新**：每天处理数百万条提及数据
- 📈 **专业分析**：提供影响力评分和详细分析报告

## 🛠 技术实现架构

### 1. **Altmetric服务层** (`src/lib/altmetric-service.ts`)
```typescript
class AltmetricService {
  // 根据DOI获取文章的新闻和博客提及
  async getNewsAndBlogMentions(doi: string): Promise<AltmetricMention[]>
  
  // 获取统计数据（新闻数量、博客数量、总提及数）
  async getMentionStats(doi: string): Promise<MentionStats>
  
  // 缓存管理（避免重复API调用）
  private cacheMap: Map<string, CachedData>
}
```

### 2. **API路由** (`src/app/api/papers/[id]/altmetric/route.ts`)
```typescript
GET /api/papers/[id]/altmetric?doi=10.1038/s41467-025-62625-w
```
**响应示例**：
```json
{
  "success": true,
  "stats": {
    "news_count": 15,
    "blog_count": 8, 
    "total_mentions": 45,
    "altmetric_score": 23.5
  },
  "mentions": [
    {
      "title": "新研究揭示气候变化的重要机制",
      "url": "https://www.sciencedaily.com/...",
      "source": "news",
      "author": "Science Daily",
      "publish_date": "2025-09-10",
      "description": "这项发表在Nature Communications的研究..."
    }
  ]
}
```

### 3. **UI组件集成** (`src/components/papers/PaperReports.tsx`)
```typescript
// 新增"搜索新闻报道"按钮
<button onClick={searchAltmetricMentions}>
  <Globe className="w-4 h-4" />
  <span>搜索新闻报道</span>
</button>

// 自动将Altmetric数据添加到本地数据库
const searchAltmetricMentions = async () => {
  const data = await fetch(`/api/papers/${id}/altmetric?doi=${doi}`)
  // 保存到本地reports表
}
```

## 🚀 部署和使用

### 第1步：获取Altmetric API密钥
1. **免费试用**：
   - 访问：https://www.altmetric.com/contact-us/
   - 申请试用账户（通常有API调用次数限制）
   
2. **付费版本**：
   - 企业版：联系销售获取报价
   - 学术版：教育机构可申请折扣

### 第2步：配置环境变量
```bash
# .env.local
ALTMETRIC_API_KEY=your_altmetric_api_key_here
ALTMETRIC_CACHE_MINUTES=60
```

### 第3步：在论文详情页面使用
```typescript
// 传入论文DOI
<PaperReports 
  paperId={paper.id}
  paperTitle={paper.title}
  paperDOI={paper.doi}  // 新增DOI参数
/>
```

## 📊 API数据结构解析

### Altmetric API返回的数据包含：

#### 基础信息
- `altmetric_id`: Altmetric内部ID  
- `doi`: 数字对象标识符
- `title`: 论文标题
- `journal`: 期刊名称
- `score`: Altmetric影响力评分

#### 分类统计
- `cited_by_msm_count`: 主流媒体提及数
- `cited_by_blogs_count`: 博客提及数  
- `cited_by_tweeters_count`: Twitter提及数
- `cited_by_facebook_count`: Facebook提及数
- `cited_by_reddit_count`: Reddit讨论数

#### 详细提及数据
```json
"posts": [
  {
    "title": "研究标题",
    "url": "文章链接", 
    "posted_on": 1726128000,  // Unix时间戳
    "author": "作者/媒体名称",
    "summary": "文章摘要或描述",
    "source": "news"  // 来源类型
  }
]
```

## 🎨 用户界面设计

### 搜索按钮样式
- **颜色**：紫色主题 (bg-purple-50, text-purple-700)
- **图标**：Globe图标表示全球新闻搜索
- **状态**：显示"搜索中..."加载状态
- **条件显示**：仅当有DOI时显示按钮

### 结果展示
- **来源分类**：新闻(news)、博客(blogs)、其他
- **时间排序**：按发布时间倒序
- **内容预览**：标题+摘要+来源+日期
- **外部链接**：点击跳转到原始报道

## 💡 优势对比

### Altmetric vs 微信搜索

| 特性 | Altmetric API | 微信公众号搜索 |
|------|---------------|----------------|
| **可行性** | ✅ 完全可行 | ❌ 官方无API |
| **数据准确性** | ✅ 专业验证 | ⚠️ 需要爬虫 |
| **覆盖范围** | ✅ 全球5000+媒体 | 🔒 仅微信平台 |
| **法律风险** | ✅ 官方授权 | ⚠️ 可能违规 |
| **技术难度** | ✅ API简单集成 | 🔴 技术门槛高 |
| **维护成本** | ✅ 稳定可靠 | 🔴 频繁失效 |
| **国际认可** | ✅ 顶级期刊使用 | 🔒 仅国内适用 |

## 📈 成本效益分析

### 免费版本限制
- 每月API调用次数有限
- 基础功能足够小型项目使用

### 付费版本收益
- 无限API调用
- 更详细的分析数据
- 历史数据访问
- 技术支持

### ROI计算
假设月访问1000篇论文：
- **手动收集成本**：人工费用 > ¥10,000
- **Altmetric费用**：API服务 ≈ ¥1,000-3,000
- **净收益**：节省80%+人力成本

## 🔄 扩展计划

### 第1阶段：基础实现 ✅
- [x] Altmetric API集成
- [x] 新闻博客数据获取
- [x] 基础UI展示

### 第2阶段：功能增强
- [ ] 社交媒体提及统计
- [ ] 影响力评分可视化  
- [ ] 时间趋势分析图表
- [ ] 多语言支持

### 第3阶段：高级分析
- [ ] 情感分析
- [ ] 关键词提取
- [ ] 影响力对比
- [ ] 报告导出功能

## 🎯 总结

通过集成**Altmetric API**，我们实现了：

1. **专业级功能**：与Nature等顶级期刊相同的技术方案
2. **全球覆盖**：跟踪全球主流媒体和博客的报道
3. **技术可行**：完全合规的API集成，无法律风险
4. **用户友好**：一键搜索，自动整理，展示直观
5. **成本可控**：相比人工收集大幅降低成本

这是一个真正可行且专业的解决方案，让学术研究的社会影响力变得可见、可量化、可追踪。

---

**🔗 相关链接**：
- [Altmetric官网](https://www.altmetric.com/)
- [API文档](https://api.altmetric.com/)
- [Nature示例](https://www.nature.com/articles/s41467-025-62625-w/metrics)
- [价格咨询](https://www.altmetric.com/contact-us/)