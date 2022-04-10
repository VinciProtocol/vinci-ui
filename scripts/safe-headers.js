const fs = require('fs')
const path = require('path')
const nextSafe = require('next-safe')

async function main() {
  const headers = nextSafe()
  const netifiy = `
[[headers]]
  for = "/*"
  [headers.values]
${headers.reduce((str, { key, value }) => (str += `    ${key} = ${JSON.stringify(value)}\n`), '')}
`
  const outputPath = path.resolve(__dirname, '../netlify.toml')
  fs.writeFileSync(outputPath, netifiy, 'utf-8')
  console.log('[safe-headers] updated', outputPath)
}

main()
  .then((e) => {})
  .catch((e) => {
    console.error(e)
  })
