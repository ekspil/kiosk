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
    position: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
    },
    coupon: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
    },
    corner: {
        type: Sequelize.DataTypes.STRING,
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
    codeOneC: {
        type: Sequelize.DataTypes.STRING
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
    },
    price2: {
        type: Sequelize.DataTypes.INTEGER
        // allowNull defaults to true
    },
    price3: {
        type: Sequelize.DataTypes.INTEGER
        // allowNull defaults to true
    },
    price4: {
        type: Sequelize.DataTypes.INTEGER
        // allowNull defaults to true
    },
    price5: {
        type: Sequelize.DataTypes.INTEGER
        // allowNull defaults to true
    },
    en: {
        type: Sequelize.DataTypes.STRING,

    },
    jp: {
        type: Sequelize.DataTypes.STRING,

    },
    cn: {
        type: Sequelize.DataTypes.STRING,

    },
    ko: {
        type: Sequelize.DataTypes.STRING,

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

const Helper = sequelize.define('helpers', {
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
    set: {
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
    position: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    blocked: {
        type: Sequelize.DataTypes.BOOLEAN
    },
    en: {
        type: Sequelize.DataTypes.STRING,

    },
    jp: {
        type: Sequelize.DataTypes.STRING,

    },
    cn: {
        type: Sequelize.DataTypes.STRING,

    },
    ko: {
        type: Sequelize.DataTypes.STRING,

    }
}, {
    // options
});
const Order = sequelize.define('orders', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    orderType: {
        type: Sequelize.DataTypes.INTEGER
    },
    payType: {
        type: Sequelize.DataTypes.INTEGER
    },
    sum: {
        type: Sequelize.DataTypes.STRING,
    },
    discountCard: {
        type: Sequelize.DataTypes.STRING,
    },
    status: {
        type: Sequelize.DataTypes.STRING,
    },
    AuthorizationCode: {
        type: Sequelize.DataTypes.STRING,
    },
    RRNCode: {
        type: Sequelize.DataTypes.STRING,
    },
    fiscalNum: {
        type: Sequelize.DataTypes.INTEGER
    },
    returnPay: {
        type: Sequelize.DataTypes.BOOLEAN
    },
    returnCheck: {
        type: Sequelize.DataTypes.BOOLEAN
    },
}, {
    // options
});

const OrderPosition = sequelize.define('order_positions', {

    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    count: {
        type: Sequelize.DataTypes.INTEGER
    },
    positionId: {
        type: Sequelize.DataTypes.INTEGER
    },
    type: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    station: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
    },
    position: {
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
    codeOneC: {
        type: Sequelize.DataTypes.STRING
    },
    img: {
        type: Sequelize.DataTypes.STRING,

    },
    helper: {
        type: Sequelize.DataTypes.STRING,

    },
    corner: {
        type: Sequelize.DataTypes.STRING,

    },
    price: {
        type: Sequelize.DataTypes.INTEGER
    }
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

const MainScreen = sequelize.define('main_screen', {
    // attributes
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    img: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false

    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    blocked: {
        type: Sequelize.DataTypes.BOOLEAN
    },
    restorans: {
        type: Sequelize.DataTypes.STRING
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
const Lang = sequelize.define('langs', {
    // attributes
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,

    },
    printName: {
        type: Sequelize.DataTypes.STRING,

    },
}, {
    // options
});
const LangItem = sequelize.define('lang_items', {
    // attributes
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,

    },
    ru: {
        type: Sequelize.DataTypes.STRING,

    },
    en: {
        type: Sequelize.DataTypes.STRING,

    },
    jp: {
        type: Sequelize.DataTypes.STRING,

    },
    cn: {
        type: Sequelize.DataTypes.STRING,

    },
    ko: {
        type: Sequelize.DataTypes.STRING,

    },
}, {
    // options
});


Product.hasMany(Set)
Group.hasMany(Product)
Order.hasMany(OrderPosition)
Lang.hasMany(LangItem)

sequelize.sync({alter: true})
//{ force: true }

module.exports = {
    User,
    Product,
    Set,
    Group,
    Img,
    Order,
    OrderPosition,
    Lang,
    LangItem,
    Helper,
    MainScreen
}