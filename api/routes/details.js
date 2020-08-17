const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Details= require("../models/detail");
router.get("/", (req, res, next) => {
    Details.find()
      .select("name contact _id")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              name: doc.name,
              contact: doc.contact,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/details/" + doc._id
              }
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  router.post("/", (req, res, next) => {
    const deta = new Details({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      contact: req.body.contact
    });
    deta
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created details successfully",
          createddetails: {
              name: result.name,
              contact: result.contact,
              _id: result._id,
              request: {
                  type: 'POST',
                  url: "http://localhost:3000/details/" + result._id
              }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  

module.exports=router;