const sauce = require("../models/sauces");

exports.addLikeOrDislike = (req, res, next) => {
  if (req.body.like == 1) {
    sauce.updateOne(
      { _id: req.params.id },
      {
        $push: { usersLiked: req.body.userId },
        $inc: { likes: req.body.like },
      }
    )

      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(500).json({ error }));
  }

  if (req.body.like == -1) {
    sauce.updateOne(
      { _id: req.params.id },
      {
        $push: { usersDisliked: req.body.userId },
        $inc: { dislikes: 1 },
      }
    )

      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(500).json({ error }));
  }

  if (req.body.like == 0) {
    sauce.findOne({ _id: req.params.id }).then((sauceFound) => {
      console.log(sauceFound.usersLiked);
      let usersLikedFound = sauceFound.usersLiked.includes(req.body.userId);

      if(usersLikedFound){
        console.log("coucou");
        sauce.updateOne(
          { _id: req.params.id },
          {
            $pull: { usersLiked: req.body.userId },
            $inc: { likes: -1 },
          }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(500).json({ error }));

      }
      else{
        sauce.updateOne(
          { _id: req.params.id },
          {
            $pull: { usersDisliked: req.body.userId },
            $inc: { dislikes: -1 },
          }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(500).json({ error }));
      }
    });
  }
};