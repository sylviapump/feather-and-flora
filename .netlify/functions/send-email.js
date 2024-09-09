// netlify-functions/send-email.js
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    try {
        // Parse the form data
        const formData = JSON.parse(event.body);

        // Set up your email transport using SMTP or a service like SendGrid
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'
            }
        });

        // Define the email options
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'recipient-email@example.com',
            subject: 'New Order Form Submission',
            text: `New order form submission:\n\n
                First Name: ${formData.firstName}\n
                Last Name: ${formData.lastName}\n
                Email: ${formData.email}\n
                Wedding Date: ${formData.weddingDate}\n
                Guest Count: ${formData.guestCount}\n
                Postcode: ${formData.postcode}\n
                Sample Set: ${formData.sampleSet ? 'Yes' : 'No'}\n
                Save The Date Cards: ${formData.saveTheDate ? 'Yes' : 'No'}\n
                Invitations: ${formData.invitations ? 'Yes' : 'No'}\n
                Invitations Design: ${formData.invitationsDesign || 'Not Selected'}\n
                RSVP Cards: ${formData.rsvpCards ? 'Yes' : 'No'}\n
                RSVP Cards Design: ${formData.rsvpCardsDesign || 'Not Selected'}\n
                Details Card: ${formData.detailsCard ? 'Yes' : 'No'}\n
                Details Card Design: ${formData.detailsDesign || 'Not Selected'}\n
                Invitations + RSVP Cards Set: ${formData.invitationsRsvpSet ? 'Yes' : 'No'}\n
                Invitations + RSVP Cards Set Design: ${formData.invitationsRsvpSetDesign || 'Not Selected'}\n
                Invitations + RSVP Cards + Details Cards Set: ${formData.invitationsRsvpDetailsSet ? 'Yes' : 'No'}\n
                Invitations + RSVP Cards + Details Cards Set Design: ${formData.invitationsRsvpDetailsSetDesign || 'Not Selected'}\n
                Programs: ${formData.programs ? 'Yes' : 'No'}\n
                Programs Design: ${formData.programsDesign || 'Not Selected'}\n
                Menus: ${formData.menus ? 'Yes' : 'No'}\n
                Menus Design: ${formData.menusDesign || 'Not Selected'}\n
                Place Cards: ${formData.placeCards ? 'Yes' : 'No'}\n
                Place Cards Design: ${formData.placeCardsDesign || 'Not Selected'}\n
                Favour Tags: ${formData.favourTags ? 'Yes' : 'No'}\n
                Favour Tags Design: ${formData.favourTagsDesign || 'Not Selected'}\n
                Thank You Note Cards: ${formData.thankYouNoteCards ? 'Yes' : 'No'}\n
                Thank You Note Cards Design: ${formData.thankYouNoteCardsDesign || 'Not Selected'}\n
                Envelope Seals: ${formData.envelopeSeals ? 'Yes' : 'No'}\n
                Envelope Seals Design: ${formData.envelopeSealsDesign || 'Not Selected'}\n
                Sender Address Labels: ${formData.senderAddressLabels ? 'Yes' : 'No'}\n
                Additional Details: ${formData.additionalDetails || 'None'}\n
                Estimated Budget: $${formData.budget || 'Not Provided'}\n
                How Did You Hear About Us: ${formData.howDidYouHear || 'Not Provided'}\n
            `
        };
        

        // Send the email
        await transporter.sendMail(mailOptions);

        // Redirect to the thank you page
        return {
            statusCode: 302,
            headers: { Location: '/thank-you.html' }
        };
    } catch (error) {
        console.error('Error sending email:', error);

        // Return a 500 status code and error message if email sending fails
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email' })
        };
    }
};
