// скрипт, чтобы командой 'npm run new:lesson -- *название урока*'
// быстро создавать новый урок на основании шаблона

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const lessonName = process.argv[2]

if (!lessonName) {
  console.error('Укажи название урока.')
  console.error('Пример: npm run new:lesson -- 02-jsx')
  process.exit(1)
}

const projectRoot = path.resolve(__dirname, '..')
const templatePath = path.join(projectRoot, 'templates', 'new-lesson')
const targetPath = path.join(projectRoot, 'packages', lessonName)

if (fs.existsSync(targetPath)) {
  console.error(`Урок "${lessonName}" уже существует.`)
  process.exit(1)
}

function copyTemplate(source, destination) {
  fs.mkdirSync(destination, { recursive: true })

  for (const item of fs.readdirSync(source)) {
    const sourcePath = path.join(source, item)
    const destinationPath = path.join(destination, item)

    if (fs.statSync(sourcePath).isDirectory()) {
      copyTemplate(sourcePath, destinationPath)
    } else {
      let content = fs.readFileSync(sourcePath, 'utf8')

      content = content.replaceAll('__LESSON_NAME__', lessonName)

      fs.writeFileSync(destinationPath, content)
    }
  }
}

copyTemplate(templatePath, targetPath)

console.log(`✅ Урок "${lessonName}" создан.`)
console.log(`📁 packages/${lessonName}`)
console.log('')
console.log('Следующий шаг:')
console.log(`npm install`)
console.log(`npm run dev -w ${lessonName}`)