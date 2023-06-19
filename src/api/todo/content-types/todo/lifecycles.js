
module.exports = {
    async afterCreate(event){
        const {result}= event;
        try{
            // const data = await strapi.service("api::client.client").find();
            // // console.log(clients, "client")
            // const clients = data.results
            // const clients = await strapi.query('clients').find();
            const clients = await strapi.db.query('api::client.client').findMany()
            const emailAddresses = clients.map(client => client.email);
            console.log(emailAddresses, "emailAddresses")
            await strapi.plugins['email'].services.email.send({
                to:emailAddresses,
                from:"ipangram.devs@gmail.com",
                subject:"you have new todo",
                text: `${result.name}`
            })
        }catch(err){
            console.log(err)
        }
    }
}




