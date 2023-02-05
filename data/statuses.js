const statuses = [{
    name: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
},
    {
        name: 'in_transit',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'delivered',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'cancelled',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'refund',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'verified',
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

module.exports = {
    statuses
}
