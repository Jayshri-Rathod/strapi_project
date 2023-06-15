// 'use strict';

/**
 * category controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::category.category');


'use strict';
/**
 *  [collection-name] controller
 */
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::category.category', ({ strapi }) => ({
  async find(ctx) {
    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    // console.log(data, "data")
    const query = strapi.db.query('api::category.category');
    await Promise.all(
      data.map(async (item, index) => {
        const foundItem = await query.findOne({
          where: {
            id: item.id,
          },
          populate: ['createdBy', 'updatedBy'],
        });
        
        data[index].attributes.createdBy = {
          id: foundItem.createdBy.id,
          firstname: foundItem.createdBy.firstname,
          lastname: foundItem.createdBy.lastname,
        };
        data[index].attributes.updatedBy = {
          id: foundItem.updatedBy.id,
          firstname: foundItem.updatedBy.firstname,
          lastname: foundItem.updatedBy.lastname,
        };
      })
    );
    return { data, meta };
  },
}));