import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Contact from '../models/Contact';
import contacts_view from "../views/contacts_view";
import * as Yup from "yup";

export default {
  async create(request: Request, response: Response) {
    const { name, lastname, email, telephone } = request.body;

    const contactsRepository = getRepository(Contact);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      lastname,
      email,
      telephone,
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      lastname: Yup.string().required(),
      telephone: Yup.string().required(),
      email: Yup.string().required().email(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, { abortEarly: false });

    const contact = contactsRepository.create(data);

    await contactsRepository.save(contact);

    return response.status(201).json(contact)
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const contactsRepository = getRepository(Contact);
    await contactsRepository.delete(id);

    return response.status(201).json({ message: "Contato Deletado" });
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const contactsRepository = getRepository(Contact);
    const contact = await contactsRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.status(201).json(contacts_view.render(contact));
  },

  async index(request: Request, response: Response) {
    const contactsRepository = getRepository(Contact);
    const contacts = await contactsRepository.find({
      relations: ['images']
    })

    return response.status(201).json(contacts_view.renderMany(contacts))
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, lastname, email, telephone } = request.body;
    const data = { name, lastname, email, telephone }

    const contactsRepository = getRepository(Contact);
    await contactsRepository.update(id, data);

    return response.status(201).json({ message: "Contato Atualizado" });
  },
}
