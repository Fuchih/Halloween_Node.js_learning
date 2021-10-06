const fs = require('fs')
const path = require('path')
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

fs.readFile(path.join(__dirname, './demo.html'), 'utf8', function (err, data) {
  if (err) console.log(err)

  resolveCss(data)
  resolveScript(data)
  resolveHtml(data)
})

function resolveCss(data) {
  const r1 = regStyle.exec(data)
  const indexStyle = r1[0].replace('<style>', '').replace('</style>', '')

  fs.writeFile(path.join(__dirname, './index.css'), indexStyle, (err) => {
    console.log(err)
    console.log('CSS Success')
  })
}

function resolveScript(data) {
  const r2 = regScript.exec(data)
  const indexScript = r2[0].replace('<script>', '').replace('</script>', '')

  fs.writeFile(path.join(__dirname, './index.js'), indexScript, (err) => {
    console.log(err)
    console.log('JS Success')
  })
}

function resolveHtml(data) {
  const newHtml = data.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')

  fs.writeFile(path.join(__dirname, './index.html'), newHtml, (err) => {
    console.log(err)
    console.log('Finished')
  })
}
