const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const participanteSchema = new mongoose.Schema({
    nomeCompleto: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    dataNascimento: { type: String, required: true },
    estadoCivil: { type: String, enum: ['Casada', 'Solteira', 'Viúva', 'Divorciada'], required: true },
    rg: { type: Number, required: true },
    cpf: { type: Number, required: true },
    telefoneResidencial: { type: Number },
    telefoneCelular: { type: Number, required: true },
    cep: { type: Number, required: true },
    rua: { type: String, required: true },
    numero: { type: Number, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    formacaoAcademica: { type: String, enum: ['Superior Completo', 'Superior Cursando', 'Ensino Médio Completo'], required: true },
    resultadosProcesso: [{
        curso: { type: Object},
        teste: { type: String, enum: ['Aguardando', 'Aprovada', 'Reprovada'] },
        videoEntrevista: { type: String, enum: ['Aguardando', 'Aprovada', 'Reprovada'] },
        entrevista: { type: String, enum: ['Aguardando', 'Aprovada', 'Reprovada'] }

    }]
})
    participanteSchema.pre('save', async function(next) {
        const hashPass = await bcrypt.hash(this.password, 3)
        this.password = hashPass
    
        next()
    })

const Participantes = mongoose.model('Participantes', participanteSchema)
module.exports = Participantes