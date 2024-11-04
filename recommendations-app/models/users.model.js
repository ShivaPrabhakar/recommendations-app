
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

// module.exports = (sequelize, Sequelize) => {
//     // @Table({ tableName: 'users', createdAt: true })
//     class User extends Model {
//         @Attribute(DataTypes.INTEGER)
//         @PrimaryKey
//         @AutoIncrement
//         id;
      
//         @Attribute(DataTypes.STRING)
//         @NotNull
//         fname;
      
//         @Attribute(DataTypes.STRING)
//         @NotNull
//         sname;

//         @Attribute(DataTypes.TEXT)
//         profile_picture;

//         @Attribute(DataTypes.TEXT)
//         bio;

//         @Attribute(DataTypes.DATE)
//         created_at;
//     }
//     sequelize.models.push(User);
//     return User;
//   };