const sequelize = require('./sql.js')
const Sequelize = require('sequelize')


const User = sequelize.define('user', {
    // attributes
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING
        // allowNull defaults to true
    },
    role: {
        type: Sequelize.DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // options
});

const Product = sequelize.define('products', {
    // attributes
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    station: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
    },
    coupon: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
    },
    blocked: {
        type: Sequelize.DataTypes.BOOLEAN
    },
    hiden: {
        type: Sequelize.DataTypes.BOOLEAN
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.DataTypes.STRING,

    },
    helper: {
        type: Sequelize.DataTypes.STRING,

    },
    price: {
        type: Sequelize.DataTypes.INTEGER
        // allowNull defaults to true
    }
}, {
    // options
});

const Set = sequelize.define('sets', {
    // attributes
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    n: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    products: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER),
        allowNull: false
    }
}, {
    // options
})
const Group = sequelize.define('groups', {
    // attributes
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    img: {
        type: Sequelize.DataTypes.STRING,

    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
}, {
    // options
});
const Img = sequelize.define('imgs', {
    // attributes
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    img: {
        type: Sequelize.DataTypes.STRING,

    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    blocked: {
        type: Sequelize.DataTypes.BOOLEAN
    },
    hiden: {
        type: Sequelize.DataTypes.BOOLEAN
    },

}, {
    // options
});
const Kiosk = sequelize.define('kiosks', {
    // attributes
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    pincodeReal: {
        type: Sequelize.DataTypes.STRING,

    },
    litera: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
}, {
    // options
});


Product.hasMany(Set)
Group.hasMany(Product)

//sequelize.sync({ force: true })

module.exports = {
    User,
    Product,
    Set,
    Group,
    Img
}