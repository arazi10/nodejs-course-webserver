const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weather = require('../../weather-app/app')

console.log(__dirname)
// console.log(path.join( __dirname,'../public'))

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

// setup static directory to serve for static pages
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        headerTitle: "Main page",
        footerTitle: 'בר-עוז המרכז לביטוח',
        title: "Weather",
        name: 'Israel'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        headerTitle: "About page",
        footerTitle: 'בר-עוז המרכז לביטוח',
        title: "Me"
    })
})

app.get('/help', (req, res) => {
    res.send('<h1>Baroz Help Center</h1>')
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        res.send('You must supply an address!')
        return
    }
    const response = weather.getWeather(address, (response,error) => {
        if (response)
            res.send(response)
        else
            if (error)
                res.send(error)
            else
                res.send('No response!')
    })

})

// Default page for Help not found pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorNumber: 404,
        errorDescription: "Help article was not found"
    })
})

// Default page for not found pages
app.get('*', (req, res) => {
    res.render('404', {
        errorNumber: 404,
        errorDescription: "Page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is started!')
})