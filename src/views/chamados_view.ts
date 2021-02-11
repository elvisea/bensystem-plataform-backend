import Chamado from "../models/Chamado";

export default {
    render(chamado: Chamado) {
        return {
            id: chamado.id,
            name: chamado.name,
            email: chamado.email,
            whatsapp: chamado.whatsapp,
            description: chamado.description,
        };
    },

    renderMany(chamado: Chamado[]) {
        return chamado.map((chamado) => this.render(chamado));
    },
};