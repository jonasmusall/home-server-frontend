export function html(title: string, ...children: string[]) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="https://vastivety.github.io/img/vastivety.ico">
<link rel="stylesheet" href="/static/main.css">
<title>${title}</title>
</head>
<body>
${children.join('\n')}
</body>
</html>`;
}
