import { readFile, writeFile, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

// 读取Markdown文件内容
function readMarkdownFile(filePath) {
    return new Promise((resolve, reject) => {
        readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

const list = [];

function countLeadingSpaces(str) {
  const match = str.match(/^\s*/); // 匹配字符串前面的空格
  return match ? match[0].length : 0;
}

function extractContent(str) {
  // 匹配中括号内容
  const bracketRegex = /\[([^\]]*)\]/;
  // 匹配圆括号内容
  const parenthesesRegex = /\((.*?)\)/;

  // 使用正则表达式的exec方法查找匹配项
  const bracketMatch = bracketRegex.exec(str);
  const parenthesesMatch = parenthesesRegex.exec(str);

  // 提取并返回匹配的内容
  const text = bracketMatch ? bracketMatch[1] : undefined;
  const link = parenthesesMatch ? parenthesesMatch[1] : undefined;

  return {
    text,
    link
  };
}

function getLast(list) {
  return list[list.length - 1];
}

function pushItem(parent, item) {
  if(Array.isArray(parent.items)) {
    parent.items.push(item)
  } else {
    parent.items = [item];
  }
  // 一级菜单配置了 collapsed = false，其他层级需要默尔收起折叠
  parent.collapsed ??= true;
}

function parseMarkdownToJSON(str) {
  const lines = str.split('\n').filter(v => {
    // 只保留 ## 和 - 开头的内容
    return /^(##|\s*-)/.test(v);
  });

  for(let line of lines) {
    if(line.startsWith('##')) {
      list.push({
        text: line.replace('##', '').trim(),
        collapsed: false,
        items: [],
      });
    } else if(line.trim().startsWith('-')) {
      const count = countLeadingSpaces(line);
      if(count % 4 !== 0) {
        console.error(line, '格式错误，请确保 4 个空格的缩进');
        return;
      }
      let level = count / 4;
      const item = extractContent(line);

      switch(level) {
        case 0:
          pushItem(getLast(list), item)
          break;
        case 1:
          pushItem(getLast(getLast(list).items), item)
          break;  
        case 2:
          pushItem(getLast(getLast(getLast(list).items).items), item)
          break;
        case 3:
          pushItem(getLast(getLast(getLast(getLast(list).items).items).items), item)
          break;
        case 4:
          pushItem(getLast(getLast(getLast(getLast(getLast(list).items).items).items).items), item)
          break;
        case 5:
          pushItem(getLast(getLast(getLast(getLast(getLast(getLast(list).items).items).items).items).items), item)
          break;                       
        default: 
        break;  
      }
    } else {
      console.warn(line + 'is not available!')
    }
  }
  return list
}


// 主函数
async function main() {
    const root = process.cwd();
    // 在 vscode 上，找到 SUMMAEY.md , 右键复制相对路径 当作该脚本的执行参数
    const summaryFile = process.argv[2] || 'undefine';
    const summaryFilePath = join(root, summaryFile);

    if(!existsSync(summaryFilePath)) {
      return console.log(summaryFile + 'is not exist!');
    }

    try {
     
        const __dirname = dirname(summaryFilePath);
        const markdownContent = await readMarkdownFile(summaryFilePath);
        const jsonData = parseMarkdownToJSON(markdownContent);

        // 删除需要隐藏的导航
        ['CC_HIDE_IN_SUMMARY_START', 'CC_HIDE_IN_SUMMARY_END'].forEach(text => {
          const i = jsonData.findIndex(v => v.text === text);
          if(i !== -1) {
            jsonData.splice(i, 1);
          }
        })

        writeFile(join(__dirname, 'summary.json'), JSON.stringify(jsonData, null, 4), function() {}) 
    } catch (error) {
        console.error('Error:', error);
    }
}

main();