const { response } = require("express");

const userGet = (req, res = response) => {
  res.json({
    message: "Get User - Controller",
  });
};
const userGetId = (req, res = response) => {
    const {id} = req.params;
  res.json({
    message: "Get User ID - Controller",
    id
  });
};
const userPost = (req, res = response) => {
  const body = req.body;
  res.json({
    message: "POST User - Controller",
    body,
  });
};

module.exports = {
  userGet,
  userPost,
  userGetId,
};
