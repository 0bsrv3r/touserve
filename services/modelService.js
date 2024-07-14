const { Sequelize, Customers } = require('sequelize');


class Entities{

    static async getEntities(Model, { where, order, limit } = {}) {
        // Construct the name of the related model dynamically
        const relatedModelName = `${Model.name.toLowerCase()}s`;
        
        const queryOptions = {
            attributes: {
                include: [
                        [Sequelize.fn('AVG', Sequelize.col('reviews.stars')), 'totalStars']
                    ]
                },
                include: [
                    {
                    model: Model.associations.reviews.target,
                    as: 'reviews',
                    attributes:[]
                    },
                ],
                group: [`${Model.name}.id`],
                subQuery: false
            };

            if (where) {
                queryOptions.where = where;
            }

            if (order) {
                queryOptions.order = [order]
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

    static async getOneEntity(Model, id, {include} = {}) {
        // Construct the name of the related model dynamically
        const relatedModelName = `${Model.name.toLowerCase()}s`;
        
        const queryOptions = {
            where: id,
            include: [
                {
                    model: Model.associations.reviews.target,
                    as: 'reviews'
                }
            ],
            group: [`${Model.name}.id`,'reviews.id'],
            subQuery: false
        };

        if (include) {
            queryOptions.include.push({
                model: Model.associations[include].target,
                as: `${include}`,
                attributes: ['firstName', 'languages', 'image', 'description'],
            });

            queryOptions.group.push(`${include}.id`)
        }

        try {
            const entities = await Model.findOne(queryOptions);
            return entities;
        } catch (error) {
            console.error(`Error fetching ${relatedModelName}:`, error);
            throw error;
        }
    }
}

module.exports = Entities