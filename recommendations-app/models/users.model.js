
module.exports = (sequelize, Sequelize, db) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fname: {
            type: Sequelize.STRING
        },
        sname: {
            type: Sequelize.STRING
        },
        profile_picture: {
            type: Sequelize.TEXT
        },
        bio: {
            type: Sequelize.TEXT
        },
        created_at: {
            type: Sequelize.DATE
        }
    },{
        timestamps: false,
        underscored: true
    });
    
    return User;
  };

