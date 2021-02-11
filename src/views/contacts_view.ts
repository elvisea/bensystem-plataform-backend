import Contact from "../models/Contact";
import imagesView from "./images_view";

export default {
    render(contact: Contact) {
        return {
            id: contact.id,
            name: contact.name,
            lastname: contact.lastname,
            email: contact.email,
            telephone: contact.telephone,
            images: imagesView.renderMany(contact.images),
        };
    },

    renderMany(contacts: Contact[]) {
        return contacts.map((contact) => this.render(contact));
    },
};