import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import ContactsController from "./controllers/ContactsController";
import ChamadosController from "./controllers/ChamadosController";
import OrcamentosController from "./controllers/OrcamentosController";

const routes = Router();
const upload = multer(uploadConfig);

// Contatos
routes.post("/contacts", upload.array('images'), ContactsController.create)
routes.get("/contacts", ContactsController.index);
routes.delete("/contacts/:id", ContactsController.delete);
routes.get("/contacts/:id", ContactsController.show);
routes.patch("/contacts/:id", ContactsController.update);

// Chamados
routes.post("/chamados", ChamadosController.create)
routes.get("/chamados", ChamadosController.index);
routes.delete("/chamado/:id", ChamadosController.delete);
routes.get("/chamado/:id", ChamadosController.show);
routes.patch("/chamado/:id", ChamadosController.update);

// Orçamentos
routes.post("/orcamento", OrcamentosController.create)
routes.get("/orcamentos", OrcamentosController.index);
routes.delete("/orcamento/:id", OrcamentosController.delete);
routes.get("/orcamento/:id", OrcamentosController.show);
routes.patch("/orcamento/:id", OrcamentosController.update);

export default routes;