const db = require("../models");
const Contact = db.contact;
const Op = db.Sequelize.Op;


// Create and Save a new Contact
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.email && !req.body.phoneNumber) {
      return res.status(400).send({
        message: "Either email or phoneNumber must be provided.",
      });
    }
    // Create a new contact based on the provided data
    const contact = {};
    if (req.body.phoneNumber) {
      contact.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.email) {
      contact.email = req.body.email;
    }
    const duplicate = await Contact.findOne({
      where: {
        phoneNumber: contact.phoneNumber,
        email: contact.email,
      },
    });

    if (duplicate) {
      return res.send({ message: "Try avoiding duplicates. Both Data already in DB" });
    }

    // Check if the contact already exists in the database
    const existingContact = await findByEmailOrPhoneNumber(req);

    if (existingContact) {
      // If the contact already exists, check if it is a primary contact
      if (existingContact.linkPrecedence === 'primary') {
        //  create a new secondary contact linked to this primary contact
        const primaryContact = await Contact.create({
          ...contact,
          linkPrecedence: 'secondary',
          linkedId: existingContact.id, // Link the new primary contact to the existing secondary contact
        });

        return res.send({ contact: await formatPrimaryContact(primaryContact,req) });
      }
    } else {

      // Perform data manipulation here if needed
      if (!contact.linkPrecedence) {
        contact.linkPrecedence = 'primary'; // Set a default value if linkPrecedence is not provided
        contact.linkedId = null;
      }
      // Save the new contact in the database as a primary contact
      const newContact = await Contact.create(contact);
      console.log(newContact, "NEWADD")


      return res.send({ contact: await formatPrimaryContact(newContact,req) });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the contact.",
    });
  }
};




// Helper function to format the contact data
const formatPrimaryContact =async (contact,req) => {
  const existingContact = await findByEmailOrPhoneNumber(req);
  console.log(existingContact,"OOOOOO")
  // const secondaryContact = await Contact.findOne({where:{
  //   id:existingContact.linkedId
  // }})
  return {
    primaryContatctId: contact.id,
    emails: [contact.email,existingContact.email].filter((value, index, self) => self.indexOf(value) === index),
    phoneNumbers: [contact.phoneNumber,existingContact.phoneNumber].filter((value, index, self) => self.indexOf(value) === index),
    secondaryContactIds: [contact.linkedId]
  };
};




// Function to find a contact by email or phoneNumber
const findByEmailOrPhoneNumber = async (req) => {
  const { email, phoneNumber } = req.body;

  // Check if either email or phoneNumber is provided in the request
  if (!email && !phoneNumber) {
    throw new Error("Please provide either email or phoneNumber.");
  }

  // Create the query condition based on the provided email or phoneNumber
  const condition = { [Op.or]: [] };
  if (email) {
    condition[Op.or].push({ email: email });
  }
  if (phoneNumber) {
    condition[Op.or].push({ phoneNumber: phoneNumber });
  }

  // Find the contacts with the provided email or phoneNumber using the OR operator
  return await Contact.findOne({ where: condition });
}






// Retrieve all Contacts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Contact.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving contacts.",
      });
    });

};


