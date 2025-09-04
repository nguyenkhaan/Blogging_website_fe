import * as emailjs from '@emailjs/browser';
function sendAdsEmail(userEmail) {
  const serviceID = "service_8r9d4tg";
  const templateID = "template_gsk9s2p";
  const publicKey = "hR8oZdTOWo1WhbqGA";
  const templateParams = {
    toEmail: userEmail,
  };

  emailjs
    .send(serviceID, templateID, templateParams, { publicKey })
    .then(() => console.log("Email sent successfully!"))
    .catch((error) => {
      console.error("Email send failed:", error);
    });
}

export default sendAdsEmail;
