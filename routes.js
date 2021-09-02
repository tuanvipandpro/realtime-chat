const RestaurantController = require('./src/controller/RestaurantController')

module.exports = (app) => {
    app.route('/api/v1/restaurant')
        .get(RestaurantController.getRestaurant)
        .post(RestaurantController.createRestaurant)
        
    app.route('/api/v1/restaurant/:id')
        .delete(RestaurantController.deleteRestaurant)
        .put(RestaurantController.updateRestaurant)
    
    
}