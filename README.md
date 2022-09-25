# Glocery-store
This application is used to connect with mongodb database using Node Js, Express Js , Mongoose. In that i created customers, products, and order collections on the 
database.

# Rest APIs 

1) Create new Customer  (post)
      
      API : http://localhost:5000/api/customer/
      
      Schema:   name: { type: String, required: true },
                email: { type: String, required: true, unique: true },
                phone: { type: String, required: true }

2) Fetch Customers list (get)
      
      API : http://localhost:5000/api/customer/
       
3) Create new Product (post)
      
      API :  http://localhost:5000/api/product/
      
      Schema :  productCategory: { type: String, required: true },
                productInfo: {
                    title: { type: String, required: true },
                    description: { type: String, required: true },
                    imgSrc: { type: String, required: true },
                    availbleSize: { type: String, required: true },
                    color: { type: String, required: true },
                    storage: { type: String, required: false },
                    ram: { type: String, required: false },
                    camera: {
                        front: { type: String, required: false } ,
                        rear: { type: String, required: false }
                    }
               price: { type: Number, required: true },
               quantityAvailable: { type: String, required: true } 
      
4) Update Product Price (patch)
      
      API : http://localhost:5000/api/product/:productId
      
      params : productId (Object id of created product)
      
      Required content in body : price

5) Fetch specific Customer Orders list (get)
      
      API : http://localhost:5000/api/customer/orders/:customerId
      
      params : customerId (Object id of customer)
      
6) Create new Order (post)
    
    API : http://localhost:5000/api/customer/orders/
    
    Schema :  {
         customerId: {
                type: mongoose.Types.ObjectId,
            required: true,
                ref: 'User'
            },
        productList: [{
            productId: {
                type: mongoose.Types.ObjectId,
            required: true,
                ref: 'Product'
            }
        }
        ],
        totalPrice: {
            type: Number,
            required: true
        },
        paymentInfo: {
            status: {
                type: String,
                required : true
            }
        },
        quantity: {
            type: Number,
            required: true
        },
         date: {
                type: Date,
                required: true,
            },
        paymentType: {
            type: String,
            required : true
        },
    }
  

6) Fetch customer Details with maximum Orders in an year (get)
      
      API : http://localhost:5000/api/customer/orders/:customerId/:year
      
      params : customerId (Object id of custome) , year (Number)
    
# Status code
        
        200     -   Update data
        
        201     -   Created new Data in database ( new customer, new product)
        
        404     -   Could not found this page
        
        422     -   Inputs invalid provides / Already exits customer / data not found / customer not created
        
        500     -   Failed to fetch data 

# Tech Stack
        
        Node js, Express js, MongoDb , mongoose, nodemon, express-validator, mongoose-unique-validator
