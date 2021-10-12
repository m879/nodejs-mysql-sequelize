module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING,
            validate:{
                notEmpty:{
                    args:true,
                    msg:"Email-id required"
                },
                isEmail:{
                    args:true,
                    msg:'Valid email-id required'
                }
            },
           unique: { msg: 'Email address already in use!' }
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_orders: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_image:{
            type: DataTypes.BLOB("long")   
        }
    });

    return User;
};
