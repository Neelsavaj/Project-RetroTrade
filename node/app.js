const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()
app.use(cors())
app.use(express.json()) //to accept data as json......

//import role routes

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

//userRoutes
const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes)
//http://localhost:3000/addState
//http://localhost:3000/state/addState

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes) //http://localhost:3000/city/addCity

const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area",areaRoutes) //http://localhost:3000/area/add

const hordingRoutes = require("./src/routes/HordingRoutes")
app.use("/hording",hordingRoutes) //http://localhost:3000/hording/add

const categoryRoutes = require ("./src/routes/CategoryRoutes")
app.use("/category",categoryRoutes)

const subcategoryRoutes = require("./src/routes/SubCategoryRoutes")
app.use("/subcategory",subcategoryRoutes)

const productRoutes = require("./src/routes/ProductRoutes")
app.use("/product",productRoutes)

const buyerRoutes = require("./src/routes/BuyerRoutes")
app.use("/buyer",buyerRoutes)

const reviewRoutes = require("./src/routes/ReviewRoutes")
app.use("/review",reviewRoutes)

const paymentRoutes = require("./src/routes/PaymentRoutes")
app.use("/pay",paymentRoutes)

const shippingRoutes = require ("./src/routes/ShippingRoutes")
app.use("/shipping",shippingRoutes)

const orderRoutes = require ("./src/routes/OrderRoutes")
app.use("/order",orderRoutes)

const cartRoutes = require("./src/routes/CartRoutes")
app.use("/cart",cartRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})