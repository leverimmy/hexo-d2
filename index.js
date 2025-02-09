const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// 缓存目录
const cacheDir = path.join(__dirname, '.d2_cache');

// 确保缓存目录存在
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

// 生成 D2 代码的哈希值
function getHash(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

hexo.extend.filter.register('before_post_render', function (data) {
  const d2Regex = /```d2\n([\s\S]*?)```/g;

  // 替换文章中的每个 D2 代码块
  data.content = data.content.replace(d2Regex, (match, d2Code) => {
    try {
      // 去除多余空白并生成哈希值
      const code = d2Code.trim();
      const hash = getHash(code);

      // 缓存文件路径
      const cacheFilePath = path.join(cacheDir, `${hash}.svg`);

      // 检查缓存
      if (fs.existsSync(cacheFilePath)) {
        hexo.log.info(`使用缓存的 D2 图表: ${hash}`);
      } else {
        // 创建临时文件
        const tempFilePath = path.join(cacheDir, `temp-${hash}.d2`);
        fs.writeFileSync(tempFilePath, code, 'utf8');

        // 使用 D2 CLI 渲染为 SVG
        execSync(`d2 ${tempFilePath} ${cacheFilePath} --pad 10`);

        // 删除临时文件
        fs.unlinkSync(tempFilePath);
      }

      // 读取生成的 SVG 文件
      const svgContent = fs.readFileSync(cacheFilePath, 'utf8');

      // 返回 SVG 嵌入 HTML
      return `<div class="d2-diagram" style="width: 30%; margin: auto;">${svgContent}</div>`;
    } catch (err) {
      hexo.log.error('D2 渲染失败:', err);
      return `<pre>${match}</pre>`; // 渲染失败时保留原始代码块
    }
  });

  return data;
}, 9); // 优先级 9，确保在 Hexo 内置的代码块处理之前执行
