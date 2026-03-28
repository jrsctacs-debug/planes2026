const fs = require('fs');
const filePath = 'c:/PLAN OPERATIVO 2026/Dashboard_Final/index.html';

let content = fs.readFileSync(filePath, 'utf8');

// Fix broken template literals of the form: $ {\n      expr\n    }
// This regex matches `$ {` followed by optional whitespace/newlines, then the expression, then whitespace/newlines and `}`
// We need to be careful to only match template literal expressions, not CSS/HTML blocks

let count = 0;
// Fix: $ {  \n   identifier  \n  } -> ${identifier}
content = content.replace(/\$\s*\{\s*\n([\s\S]*?)\n\s*\}/g, (match, inner) => {
  const trimmed = inner.trim();
  // Only replace if there are no nested braces that would indicate a complex expression
  // and if the trimmed content looks like a JS expression (no HTML tags unless it's an expression)
  count++;
  return '${' + trimmed + '}';
});

console.log(`Fixed ${count} broken template literals.`);
fs.writeFileSync(filePath, content, 'utf8');
console.log('File updated successfully.');
