const { ObjectId } = require("mongodb");
const { getCollection } = require("./mongo");
const nodemailer = require("nodemailer");

const getUsers = (req, res) => {
  let collection = getCollection();
  collection.find().toArray((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(users);
    }
  });
};

const getUser = (req, res) => {
  let collection = getCollection();
  collection.findOne({ _id: new ObjectId(req.params.id) }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(user);
    }
  });
};

const createUser = (req, res) => {
  let collection = getCollection();
  collection.insertOne(req.body, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(user);
    }
  });
};

const updateUser = (req, res) => {
  let collection = getCollection();
  console.log(req.body);
  collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        hobbies: req.body.hobbies,
      },
    },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(user);
        res.send(user);
      }
    }
  );
};

const deleteUser = (req, res) => {
  console.log(req.params.id);
  let collection = getCollection();
  collection.deleteOne({ _id: new ObjectId(req.params.id) }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(user);
      res.send({
        message: "User deleted successfully",
      });
    }
  });
};

const mailToEmail = (req, res) => {
  const mailServer = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const { data, mailId } = req.body;
  const email = mailId;
  const sub = "Selected User Details Table";
  const html = `
  <table style="border: 1px solid black; border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">Name</th>
    <th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">Email</th>
    <th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">Phone Number</th>
    <th style="border: 1px solid black; border-collapse: collapse; padding: 15px;">Hobbies</th>
  </tr>
  ${data.map((item) => {
    return `
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">${
        item.name
      }</td>
      <td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">${
        item.email
      }</td>
      <td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">${
        item.phoneNumber
      }</td>
      <td style="border: 1px solid black; border-collapse: collapse; padding: 15px;">${item.hobbies.toString()}</td>
    </tr>
    `;
  })}
</table>
  `;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: sub,
    html: html,
  };
  mailServer.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      console.log(info);
      return res.status(200).send(info);
    }
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  mailToEmail,
};
