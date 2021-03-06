const sauces = require('../models/sauces')
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.sauce);
  delete saucesObject._id;
  const sauce = new sauces({
    ...saucesObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(500).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const saucesObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  sauces.updateOne({ _id: req.params.id, userId:req.auth.userId }, { ...saucesObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(500).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  sauces.findOne({ _id: req.params.id, userId:req.auth.userId })
    .then(sauces => {
      const filename = sauces.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        sauces.deleteOne({ _id: req.params.id, userId:req.auth.userId })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(500).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    sauces.findOne({ _id: req.params.id })
      .then(sauces => {
        if(!sauces)return res.status(404).json({ error: 'Not Found'})
        res.status(200).json(sauces)
      })
      .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    sauces.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(500).json({ error }));
};