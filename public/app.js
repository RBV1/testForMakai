const BASE_URL = 'http://localhost:3000'
const form = document.getElementById('form')
const result_field = document.getElementById('answer')
const result_span = document.getElementById('result')

const updateWindowWithResult = result => {
  result_field.classList.remove('answer')
  result_span.innerText = result
}

const postToServer = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/submit_form`, data)

    console.log(response.data)
    return response.data
  } catch (errors) {
    console.error(errors)
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault()

  const formData = new FormData(form)
  const data = {
    operator: formData.get('operator'),
    number1: formData.get('number1'),
    number2: formData.get('number2')
  }

  const letsGetResult = await postToServer(data)
  updateWindowWithResult(letsGetResult.response)
})
