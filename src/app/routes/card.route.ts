const cardController = require("../controllers/card.controller");

module.exports = (app: any) => {
  app.route("/api/card").post(cardController.createNewCard);
};
