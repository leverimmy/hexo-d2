const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const cacheDir = path.join(__dirname, '.d2_cache');

// to create cache directory if not exists
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

// to generate hash value for the content
function getHash(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

hexo.extend.filter.register('before_post_render', function (data) {
  const d2Regex = /```d2\n([\s\S]*?)```/g;

  data.content = data.content.replace(d2Regex, (match, d2Code) => {
    try {
      const code = d2Code.trim();
      const hash = getHash(code);

      // cache file path
      const cacheFilePath = path.join(cacheDir, `${hash}.svg`);

      if (fs.existsSync(cacheFilePath)) {
        hexo.log.info(`Using cache for ${hash}`);
      } else {
        // create temporary file
        const tempFilePath = path.join(cacheDir, `temp-${hash}.d2`);
        fs.writeFileSync(tempFilePath, code, 'utf8');

        execSync(`d2 ${tempFilePath} ${cacheFilePath} --pad 10`);

        // remove the temporary file
        fs.unlinkSync(tempFilePath);
      }

      const svgContent = fs.readFileSync(cacheFilePath, 'utf8');

      return `<div class="d2-diagram" style="width: 30%; margin: auto;">${svgContent}</div>`;
    } catch (err) {
      hexo.log.error('D2 渲染失败:', err);
      return `<pre>${match}</pre>`; // fallback to code block
    }
  });

  return data;
}, 9); // priority is 9, which is higher than hexo's default code block rendering
