const models = require("../../models")
const Customer = models.customers;
const Order = models.orders;
const Product = models.products;
const OrderProduct = models.orderProducts;
const OrderVariants = models.orderVariants;
const Address = models.address
const Status = models.statuses;
const Payment = models.payments;
const bodyParser = require('body-parser');
const fs = require("fs")
const express = require('express')
const Variant = models.variants
const app = express()
const db = models.sequelize;
app.set('view engine', 'handlebars');
app.set('views', __dirname)
// Without middleware
app.get('/test', (req, res) => {
    res.json({title: "api", message: "root"});
})

app.get('/render', (req, res) => {
    res.sendFile(__dirname + "/views/index.handlebars");
})

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const log = console.log;
require('dotenv').config();
// Step 1
let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    // secure: false,
    auth: {
        user: process.env.EMAIL || "info@pakvitamins.com", // TODO: your gmail account
        pass: process.env.PASSWORD || "iMirha2020" // TODO: your gmail password
    },

    // tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false
    // },
});

transporter.use("compile", hbs({
    viewEngine: {
        partialsDir: "./views/",
        defaultLayout: false
    },
    viewPath: "./views/",
    // extName: ".handlebars"
}))


// Retrieve all Brands from the database.

async function create(req, res) {
    try {
        console.log(req.body.data)
        let products = req.body.products;
        // await Customer.findOrCreate({
        //     where: {
        //         email: req.body.data.email
        //     },
        //     defaults: req.body.data
        // })
        const foundItem = await Customer.findOne({
            where: {
                email: req.body.data.email
            }
        });
        console.log(foundItem)

        if (!foundItem) {
            // Item not found, create a new one

            let customer = await Customer.create({defaults: req.body.data})
            let address = {
                address:req.body.data.address,
                label:req.body.data.address,
                state:req.body.data.province,
                city:req.body.data.city,
                postal_code:req.body.data.postal_code,
                customerId:customer.id
            }
            let newAddress = await Address.create(address)
        }
        // Found an item, update it
        await Customer.update(
            req.body.data,
            {
                where:{
                    email: req.body.data.email
                }
            }
        );
        let updatedCustomer = await Customer.findOne({where:{email:req.body.data.email}})
            let address = {
            address:req.body.data.address,
            label:req.body.data.address,
            province:req.body.data.state,
            city:req.body.data.city,
            postal_code:req.body.data.postal_code,
            customerId:updatedCustomer.id
        }
        let newAddress = await Address.create(address)

        const status = await Status.findOne({
            where: {
                name: 'pending'
            }
        })
        const customer = await Customer.findOne({where: {email: req.body.data.email}})
        const order = await Order.create({
            'order_no': Date.now().toString(),
            'customerId': customer.dataValues.id,
            'address': req.body.data.address,
            'statusId': status.id,
            'province': req.body.data.province,
            'city': req.body.data.city,
            'amount': req.body.data.amount,
            'type': req.body.data.type,
            'dc_charges':process.env.DC_CHARGES
        })
        console.log(order)

        const savedOrderProducts = [];
        await products.map((product) => {

            updateProduct();

            OrderVariants.create({
                'orderId': order.id,
                'variantId': product.variantId,
                'quantity': product.quantity
            }).then(success => {
                console.log(success);
            }).catch(error => {
                console.log(error);
            });
            savedOrderProducts.push(product);

            async function updateProduct() {
                try {
                    let nestedProduct = await Variant.findOne({
                        where: {
                            id: product.variantId
                        }
                    })

                    if (product.quantity > nestedProduct.stock) {
                        return res.status(500).json({
                            message: `${product.quantity} are not in stock.`
                        })
                    }

                    let stock = nestedProduct.stock - product.quantity;

                    await Variant.update({
                        stock: stock
                    }, {
                        where: {
                            id: product.variantId
                        }
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        })
        let name = customer.dataValues.firstName

        const totalPrice = savedOrderProducts.reduce((sum, item) => {
            return sum = sum + item.price;
        }, 0);

        console.log(totalPrice)
        let emailContext = {
            app_url: process.env.APP_URL,
            customer: customer,
            products: savedOrderProducts,
            order_details: order,
            totalPrice: totalPrice
        };

        let mailOptions = {
            from: 'info@pakvitamins.com',
            to: req.body.data.email,
            subject: 'pakvitamins',
            template: 'index',
            context: emailContext
        };
        let mailOptionsAdmin = {
            from: 'info@pakvitamins.com',
            to: 'info@pakvitamins.com',
            subject: 'pakvitamins',
            template: 'index',
            context: emailContext
        };
        res.status(200).send({
            'order_no': order.order_no,
            'name': customer.dataValues.firstName
        })


        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(err)
                return log('Error occurs' + err);
            }
            console.log(data.response)
            return log('Email sent!!!' + data.response);
        });
        transporter.sendMail(mailOptionsAdmin, (err, data) => {
            console.log('admin mail')
            if (err) {
                console.log(err)
                return log('Error occurs' + err);
            }
            console.log(data.response)
            return log('Email sent!!!' + data.response);
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    create
}



