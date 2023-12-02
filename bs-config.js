const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 共通設定
const dirPath = 'dist'; // ベースとなるディレクトリ（String）

// Browsersync上で表示させるページ一覧設定
const listPage = 'index.html'; // リストページのパス（String）

// 静的に生成するページ一覧設定
const staticFileFlag = true; // リストページを静的に生成するかどうか（Boolean）
const staticFileName = 'file-list.html'; // 静的リストページのファイル名（String）
const previewShowFlag = false; // 見出しやプレビューの表示領域を表示するかどうか（Boolean）


const htmlFiles = glob.sync(`${dirPath}/**/*.html`, {
  ignore: `${dirPath}/${listPage}`
});

const listHtml = `
  ${htmlFiles.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const titleMatch = fileContent.match(/<title>(.*)<\/title>/);
    const title = titleMatch ? titleMatch[1] : filePath.replace(dirPath, '');
    const stats = fs.statSync(filePath);
    const creationDate = stats.birthtime;
    const creationYear = creationDate.getFullYear();
    const creationMonth = creationDate.getMonth() + 1;
    return `<li><a href="${filePath.replace(dirPath, '')}" target="_blank"><span class="date">ページ作成時期:${creationYear}年${creationMonth}月</span><br><span class="link__in">${title}</span><br>${titleMatch ? filePath.replace(dirPath, '') : ''}<div class="preview"><iframe src="${filePath.replace(dirPath, '')}"></iframe></div></a></li>`;
  }).join('\n')}
`;

staticFileFlag || process.env.NODE_ENV ? staticFileCreate() : '';
function staticFileCreate() {
  const stream = fs.createWriteStream(staticFileName);

  const indexHtmlPath = path.join(dirPath, listPage);
  const htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
  let modifiedHtml;

  if(!previewShowFlag) {
    modifiedHtml = htmlContent.replace(/<!-- file list -->/, listHtml).replace(/<body>/, '<body class="no-preview">');
  }else {
    modifiedHtml = htmlContent.replace(/<!-- file list -->/, listHtml).replace(/<body class="no-preview">/, '<body>');
  }


  stream.write(modifiedHtml);
  stream.end();
}


/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */

module.exports = {
    "files": [dirPath + '/**/*.{html,css,js,webp,jpg,png,svg}'],
    "watchEvents": [
        "change", "add"
    ],
    "ghostMode": false,
    "server": {
        "baseDir": dirPath,
    },
    "proxy": false,
    "online": true,
    "open": "external",
    "reloadOnRestart": true,
    "notify": false,
    "middleware": [(req, res, next) => {
      if(req.url === '/' || req.url === + listPage) {
        const indexHtmlPath = path.join(dirPath, listPage);
        const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

        const modifiedHtml = indexHtml.replace(/<!-- file list -->/, listHtml);

        res.end(modifiedHtml);
      }else {
        next();
      }
    }]
};
