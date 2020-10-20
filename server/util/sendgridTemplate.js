require('dotenv').config();

module.exports = (id) => {
  return {
    to: `${id}`, // Change to your recipient
    from: 'AndrewBroestl@gmail.com', // Change to your verified sender
    subject: 'Todo App Email Verification',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<strong>Vertify your mail by clicking this link: ${process.env.BASE_URL}#/verify/${id} </strong>`,
  }
}