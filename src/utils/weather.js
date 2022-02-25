const postman_request = require('postman-request')

const weather = {}
weather.getWeather = (address,callback) =>
{
    const uri = 'http://api.weatherstack.com/current?access_key=8a4842033b3bfce48de8859c5c65581d&query=' + address + '&unit=m'
    postman_request({ uri: uri, json: true }, (error, response) => {
        if (response) {
            callback(response,undefined)
        }
        else
            callback(undefined, error)
    })
}

// Export module
module.exports = weather