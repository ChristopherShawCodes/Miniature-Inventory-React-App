const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/Miniature-Inventory', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(( ) => {
    console.log('Connected to Miniature Inventory DB')
}).catch((err) => {
    console.log(err)
})