import express from 'express'
import bodyParser from 'body-parser'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
const urlencodedParser = bodyParser.urlencoded({ extended: true })

const letMath = {
  '+': (a, b) => { return a + b },
  '-': (a, b) => { return a - b },
  '*': (a, b) => { return a * b },
  '/': (a, b) => {
    if (b === '0') {
      return 'Can`t divide to 0'
    } else {
      return a / b
    }
  }
}

app.post('/submit_form', urlencodedParser, (req, res) => {
  console.log('Got body:', req.body)

  const counted = letMath[req.body.operator](Number(req.body.number1), Number(req.body.number2))
  console.log(counted)

  res.json({ response: counted })
  res.end()
})

app.listen(3000)
