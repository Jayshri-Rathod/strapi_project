stripe = require("stripe")(process.env.STRIPE_KEY);
("use strict");

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    // async exampleAction(ctx) {
    const { products } = ctx.request.body;
    // ctx.send("okay")

    const lineItems = await Promise.all(
      products.map(async (product) => {
        const item = await strapi
          .service("api::product.product")
          .findOne(product.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.availableQty,
        };
      })
    );
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
        line_items: lineItems,
        payment_method_types: ["card"],
        shipping_address_collection: { allowed_countries: ["CA", "US"] },
      });

      console.log(session.id, "id");
      await strapi.service("api::order.order").create({
        data: { stripeid: session.id ,products: products},
      });

      return { stripeSesstion: session };
      // ctx.send({ stripeSesstion: session})
    } catch (err) {
      ctx.response.status = 500;
      console.log(err);
      return err;
    }
  },
}));
