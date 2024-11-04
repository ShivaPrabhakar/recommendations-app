
module.exports = (sequelize, Sequelize, db) => {
    const Collections = sequelize.define("collections", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        created_at: {
            type: Sequelize.DATE
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },{
        timestamps: false,
        underscored: true,
        associate: function(models) {
            // associations can be defined here
            console.log(models);
          db.collection_recommendations.hasOne(db.sequelize.model(db.collections));
        }
    });
    Collections.belongsTo(db.users);
    db.users.hasMany(Collections);
    return Collections;
  };

// module.exports = (sequelize, db) => {
//     // @Table({ tableName: 'collections', createdAt: true })
//     class Collection extends Model {
//         @Attribute(DataTypes.INTEGER)
//         @PrimaryKey
//         @AutoIncrement
//         id;
      
//         @Attribute(DataTypes.STRING)
//         @NotNull
//         name;
   
//         @Attribute(DataTypes.TEXT)
//         description;

//         @Attribute(DataTypes.DATE)
//         created_at;

//         @Attribute(DataTypes.INTEGER)
//         @NotNull
//         @HasOne(() => db.users)
//         user_id;
//     }
//     sequelize.models.push(Collection);
//     return Collection;
//   };