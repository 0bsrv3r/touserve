const { Sequelize } = require('sequelize');


class Entities{

    static async getEntities(Model, modelIdField, { where, order, limit } = {}) {
        // Construct the name of the related model dynamically
        const relatedModelName = `${Model.name.toLowerCase()}s`;
        
        const queryOptions = {
            attributes: {
                include: [
                    [Sequelize.literal(`(SELECT AVG(stars) FROM reviews WHERE reviews.${modelIdField} = ${Model.name}.id)`), 'totalStars']
                ]
            },
            include: 'reviews',
            subQuery: false
        };

        if (where) {
            queryOptions.where = where;
        }

        if (order) {
            queryOptions.order = Sequelize.literal(order);
        }

        if (limit) {
            queryOptions.limit = limit;
        }

        try {
            const entities = await Model.findAll(queryOptions);
            return entities;
        } catch (error) {
            console.error(`Error fetching ${relatedModelName}:`, error);
            throw error;
        }
    }
}

module.exports = Entities