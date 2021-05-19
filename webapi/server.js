const express = require('express')
const helmet = require('helmet')
const path = require('path')
const corsExp = require('cors')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const multer = require('multer')

const authCtl = require('./controller/authController')
const partyCatCtl = require('./controller/partyCategoryController')
const partyCtl = require('./controller/partyController')
const productCatyCtl = require('./controller/productCategoryController')
const gstCtl = require('./controller/gstRateController')
const confCtl = require('./controller/configurationController')
const stockCtl = require('./controller/stockController')
const stockTUCtl = require('./controller/stockTopUpController')
const returnStockCtl = require('./controller/returnStockController')

/* =============================================== */
/* Change with .env or environment variable */
const ENV = require('./config/env.json')
/* =============================================== */

const PORT = process.env.PORT || ENV.PORT;
const API_PORT = process.env.PORT || ENV.API_PORT;
const upload = multer({ dest: 'uploads/' })
const app = express()

const corsSetting = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
}
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../dist/app'))
app.engine('html', ejs.renderFile);
app.use(express.static('../dist/app'))
app.use(corsExp(corsSetting))
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//     res.render('index.html')
// })

// app.listen(PORT, () => {    
//     console.log(`Application is running at port ${PORT}`);
// })

/* ============================================================
    API Server and application
*/

app.post('/api/login', function (req, res, next) {
    authCtl.login(req, res, next)
})

app.get('/api/party-category', (req, res, next) => {
    partyCatCtl.getCategory(req, res, next)
})

app.get('/api/party-category/:id', (req, res, next) => {
    partyCatCtl.getCategoryByID(req, res, next)
})

app.post('/api/party-category', (req, res, next) => {
    partyCatCtl.addPartyCategory(req, res, next)
})

app.post('/api/party-category/mdelete', (req, res, next) => {
    partyCatCtl.deleteMultiplePartyCategory(req, res, next)
})

app.put('/api/party-category', (req, res, next) => {
    partyCatCtl.updatePartyCategory(req, res, next)
})

app.delete('/api/party-category/:id', function (req, res, next) {
    partyCatCtl.deletePartyCategory(req, res, next)
})
// ===========================================
app.get('/api/party', (req, res, next) => {
    partyCtl.getParty(req, res, next)
})

app.get('/api/party/:id', (req, res, next) => {
    partyCtl.getPartyByID(req, res, next)
})

app.post('/api/party', (req, res, next) => {
    partyCtl.addParty(req, res, next)
})

app.post('/api/party/mdelete', (req, res, next) => {
    partyCtl.deleteMultipleParty(req, res, next)
})

app.put('/api/party', (req, res, next) => {
    partyCtl.updateParty(req, res, next)
})

app.delete('/api/party/:id', function (req, res, next) {
    partyCtl.deleteParty(req, res, next)
})
// ==================================================
app.get('/api/product-category', (req, res, next) => {
    productCatyCtl.getProductCategory(req, res, next)
})

app.get('/api/product-category/:id', (req, res, next) => {
    productCatyCtl.getProductCategoryByID(req, res, next)
})

app.post('/api/product-category', (req, res, next) => {
    productCatyCtl.addProductCategory(req, res, next)
})

app.post('/api/product-category/mdelete', (req, res, next) => {
    productCatyCtl.deleteMultipleProductCategory(req, res, next)
})

app.put('/api/product-category', (req, res, next) => {
    productCatyCtl.updateProductCategory(req, res, next)
})

app.delete('/api/product-category/:id', function (req, res, next) {
    productCatyCtl.deleteProductCategory(req, res, next)
})
// ==================================================
app.get('/api/gst', (req, res, next) => {
    gstCtl.getGstRate(req, res, next)
})

app.get('/api/gst/:id', (req, res, next) => {
    gstCtl.getGstRateByID(req, res, next)
})

app.post('/api/gst', (req, res, next) => {
    gstCtl.addGstRate(req, res, next)
})

app.post('/api/gst/mdelete', (req, res, next) => {
    gstCtl.deleteMultipleGstRate(req, res, next)
})

app.put('/api/gst', (req, res, next) => {
    gstCtl.updateGstRate(req, res, next)
})

app.delete('/api/gst/:id', function (req, res, next) {
    gstCtl.deleteGstRate(req, res, next)
})
// ==================================================
app.get('/api/settings', (req, res, next) => {
    confCtl.getConfiguration(req, res, next)
})

app.put('/api/settings', (req, res, next) => {
    confCtl.updateConfiguration(req, res, next)
})
// ==================================================
app.get('/api/stock', (req, res, next) => {
    stockCtl.getStock(req, res, next)
})

app.get('/api/stock/:id', (req, res, next) => {
    stockCtl.getStockByID(req, res, next)
})

app.post('/api/stock', (req, res, next) => {
    stockCtl.addStock(req, res, next)
})

app.post('/api/stock/mdelete', (req, res, next) => {
    stockCtl.deleteMultipleStock(req, res, next)
})

app.put('/api/stock', (req, res, next) => {
    stockCtl.updateStock(req, res, next)
})

app.delete('/api/stock/:id', function (req, res, next) {
    stockCtl.deleteStock(req, res, next)
})
// ==================================================
app.get('/api/stock-top-up', (req, res, next) => {    
    stockTUCtl.getRecords(req, res, next)
})

app.get('/api/stock-top-up/:id', (req, res, next) => {
    stockTUCtl.getRecordByID(req, res, next)
})

app.post('/api/stock-top-up', (req, res, next) => {
    stockTUCtl.addRecords(req, res, next)
})

app.post('/api/stock-top-up/mdelete', (req, res, next) => {
    stockTUCtl.deleteMultipleRecords(req, res, next)
})

app.put('/api/stock-top-up', (req, res, next) => {
    stockTUCtl.updateRecords(req, res, next)
})

app.delete('/api/stock-top-up/:id', function (req, res, next) {
    stockTUCtl.deleteRecords(req, res, next)
})
// ==================================================
app.get('/api/return-stock', (req, res, next) => {
    returnStockCtl.getRecords(req, res, next)
})

app.get('/api/return-stock/:id', (req, res, next) => {
    returnStockCtl.getRecordByID(req, res, next)
})

app.post('/api/return-stock', (req, res, next) => {
    returnStockCtl.addRecords(req, res, next)
})

app.post('/api/return-stock/mdelete', (req, res, next) => {
    returnStockCtl.deleteMultipleRecords(req, res, next)
})

app.put('/api/return-stock', (req, res, next) => {
    returnStockCtl.updateRecords(req, res, next)
})

app.delete('/api/return-stock/:id', function (req, res, next) {
    returnStockCtl.deleteRecords(req, res, next)
})
// ==================================================
app.listen(API_PORT, () => {
    console.log(`Application is running at port ${API_PORT}`);
})

