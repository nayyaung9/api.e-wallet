const cardController = require("../controllers/card.controller");

module.exports = (app: any) => {
  app.route("/api/card").post(cardController.createNewCard);
  app.route("/api/cards").get(cardController.fetchAllCards);
  app
    .route("/api/card/:id")
    .get(cardController.fetchCardDetail)
    .put(cardController.updateCard)
    .delete(cardController.deleteCard);
};
