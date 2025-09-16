#!/usr/bin/env node

/**
 * 🎯 线上数据初始化脚本
 * 解决线上Mock数据为空的问题
 */

const fs = require('fs');
const path = require('path');

// 创建示例数据
const sampleData = {
  papers: [
    {
      id: 'paper-1',
      title: 'Attention Is All You Need',
      authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar'],
      doi: '10.48550/arXiv.1706.03762',
      abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...',
      keywords: ['transformer', 'attention', 'neural networks', 'machine learning'],
      publication_date: '2017-06-12',
      journal: 'Neural Information Processing Systems',
      view_count: 1250,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'mock-admin-001'
    },
    {
      id: 'paper-2',
      title: 'BERT: Pre-training of Deep Bidirectional Transformers',
      authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee'],
      doi: '10.48550/arXiv.1810.04805',
      abstract: 'We introduce a new language representation model called BERT...',
      keywords: ['bert', 'nlp', 'transformers', 'language model'],
      publication_date: '2018-10-11',
      journal: 'NAACL',
      view_count: 980,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'mock-admin-001'
    },
    {
      id: 'paper-3',
      title: 'GPT-3: Language Models are Few-Shot Learners',
      authors: ['Tom B. Brown', 'Benjamin Mann', 'Nick Ryder'],
      doi: '10.48550/arXiv.2005.14165',
      abstract: 'Recent work has demonstrated substantial gains on many NLP tasks...',
      keywords: ['gpt', 'language model', 'few-shot learning', 'nlp'],
      publication_date: '2020-05-28',
      journal: 'Neural Information Processing Systems',
      view_count: 2100,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'mock-admin-001'
    }
  ],
  
  users: [
    {
      id: 'mock-admin-001',
      email: 'admin@test.edu.cn',
      username: 'admin',
      role: 'admin',
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'mock-user-001',
      email: 'user@test.edu.cn',
      username: 'testuser',
      role: 'user',
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  
  ratings: [
    {
      id: 'rating-1',
      user_id: 'mock-admin-001',
      paper_id: 'paper-1',
      innovation_score: 5,
      methodology_score: 5,
      practicality_score: 4,
      overall_score: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'rating-2',
      user_id: 'mock-user-001',
      paper_id: 'paper-2',
      innovation_score: 4,
      methodology_score: 5,
      practicality_score: 4,
      overall_score: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  
  comments: [
    {
      id: 'comment-1',
      user_id: 'mock-admin-001',
      paper_id: 'paper-1',
      content: '这篇论文彻底改变了自然语言处理领域，Transformer架构的提出具有里程碑式的意义。',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'comment-2',
      user_id: 'mock-user-001',
      paper_id: 'paper-2',
      content: 'BERT的预训练方法非常创新，双向编码器的设计思路值得深入研究。',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'comment-3',
      user_id: 'mock-admin-001',
      paper_id: 'paper-3',
      content: 'GPT-3展示了大规模语言模型的惊人能力，few-shot learning的效果令人印象深刻。',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
};

console.log('🎯 生成线上环境初始化数据...\n');

// 生成客户端初始化脚本
const clientScript = `
/**
 * 🚀 线上环境数据初始化脚本
 * 在浏览器控制台中运行此脚本来初始化演示数据
 */

console.log('🎯 开始初始化学术评价平台演示数据...');

const demoData = ${JSON.stringify(sampleData, null, 2)};

// 初始化各类数据
Object.entries(demoData).forEach(([dataType, items]) => {
  const storageKey = \`academic_rating_mock_\${dataType}\`;
  localStorage.setItem(storageKey, JSON.stringify(items));
  console.log(\`✅ 已初始化 \${dataType}: \${items.length} 条记录\`);
});

// 设置统计数据
const stats = {
  totalPapers: demoData.papers.length,
  totalUsers: demoData.users.length,
  totalRatings: demoData.ratings.length,
  totalComments: demoData.comments.length,
  totalVisits: 1234,
  todayVisits: 56
};

localStorage.setItem('academic_rating_mock_stats', JSON.stringify(stats));
console.log('✅ 已初始化统计数据');

console.log('🎉 演示数据初始化完成！请刷新页面查看效果。');
console.log('📊 数据概览:');
console.log('- 论文数量:', demoData.papers.length);
console.log('- 用户数量:', demoData.users.length);  
console.log('- 评分数量:', demoData.ratings.length);
console.log('- 评论数量:', demoData.comments.length);
`;

// 保存脚本文件
fs.writeFileSync(path.join(__dirname, 'public', 'init-demo-data.js'), clientScript);

console.log('✅ 已生成初始化脚本: public/init-demo-data.js');
console.log('');
console.log('🎯 使用方法:');
console.log('1. 访问线上网站');
console.log('2. 打开浏览器开发者工具 (F12)');
console.log('3. 进入 Console 标签');
console.log('4. 访问: https://your-domain.com/init-demo-data.js');
console.log('5. 复制脚本内容并在控制台中运行');
console.log('6. 刷新页面查看效果');
console.log('');
console.log('🔧 或者直接在控制台运行以下代码:');
console.log('');
console.log(clientScript);

console.log('\n🎉 初始化脚本生成完成！');
console.log('📁 文件位置: public/init-demo-data.js');
console.log('🌐 访问地址: https://your-domain.com/init-demo-data.js');
