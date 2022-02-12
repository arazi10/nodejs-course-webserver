console.log('Client side')
const weatherForm = document.querySelector('form')
const address = document.getElementById('location')
const _result = document.querySelector('#result')
addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log('Location:' +loaction.value)

    fetch('http://localhost:3000/weather?address=' + address.value).then((response) => {
        console.log(response)

        response.json().then((data) => {
            let result = ''
            if (data.error)
                console.log(data.error);
            else
                if (data.body.current)
                    result = 'The temperature in: ' + data.body.location.region + ' is: ' + data.body.current.temperature
                else
                    result = 'Error on request'
            _result.textContent = result
        })
    })
})