const Cursos = require("../models/cursoSchema")
const Participantes = require("../models/participanteSchema")
const mongoose = require("mongoose")

exports.post = (req, res) => {
    let curso = new Cursos(req.body)
    curso.save(function (err) {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(201).send({
            status: "true",
            mensagem: "Curso cadastrado com sucesso"
        })
    })
}

exports.get = (req, res) => {
    Cursos.find(function (err, cursos) {
        if (err) res.status(500).send(err)
        res.status(200).send(cursos)
    })

}
exports.getCursoNome = async (req, res) => {
    try {
        const nomeCurso = req.params.nomeCurso
        const response = await Cursos.findOne({ nomeCurso })
        res.status(200).send(response)
    } catch {
        if (!response) {
            return res.status(401).send({ mensagem: `Curso ${response} não encontrado` })
        }
    }
}
exports.getCursoId = async (req, res) => {
    const cursoId = req.params.id
    await Cursos.findById(cursoId, function (err, curso) {
        if (err) return res.status(500).send(err)
        if (!curso) {
            return res.status(200).send({ message: `Curso  não encontrado` })
        }
        res.status(200).send(curso)
    })

}

// exports.inscricaoCurso = async (req, res) => {
//     const { nomeCurso } = req.body
//     const inscreverCurso = new Cursos({
//         nomeCurso,
//         participantes: req.params.participanteId
//     })
//     try {
//         await inscreverCurso.save()
//         let participante = await Participantes.findById(req.params.participanteId)
//         participante.resultadosProcesso.push(inscreverCurso._id)
//         await participante.save()
//         let inscricao = await Cursos.findById(req.params.cursoId)
//         inscricao.inscritas.push()
//         res.status(200).send({ mensagem: "Inserido com sucesso" })

//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({ mensagem: Error })
//     }
// }

// exports.inscricaoCurso = async (req, res) => {
//     const { nomeCurso } = req.body
//     const inscreverCurso = new Cursos({
//         nomeCurso,
//         participantes: req.params.participanteId
//     })
//     try {
//         await inscreverCurso.save()
//         let participante = await Participantes.findById(req.params.participanteId)
//         if (!participante) {
//             participante.resultadosProcesso.push(inscreverCurso._id)
//             await participante.save()
//             let inscricao = await Cursos.findById(req.params.cursoId)
//             inscricao.inscritas.push()
//             res.status(200).send({ mensagem: "Inserido com sucesso" })
//         } else {
//             res.status(404).send({ mensagem: "Participante já inscrita" })
//         }
//     } catch (error) {
//     console.log(error)
//     return res.status(500).send({ mensagem: Error })
// }
// }


exports.inscricaoCurso = async (req, res) => {
    try {
        const cursoId = req.params.cursoId
        console.log('curso', cursoId)
        const participanteId = req.params.participanteId
        console.log('participante', participanteId)
        await Participantes.findByIdAndUpdate(participanteId,
            { $push: { resultadosProcesso: { curso: cursoId } } }
        )
        await Cursos.findByIdAndUpdate(cursoId,
            { $push: { inscritas: participanteId } }
        )
        res.status(200).send({ mensagem: "Inserido com sucesso" })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ mensagem: Error })
    }
}

exports.deleteCurso = (req, res, next) => {
    try {
        const cursoId = req.params.id
        console.log(cursoId)
        const response = Cursos.findById(curso)
        console.log(response)
        response.remove(function (error) {
            if (!error) {
                res.status(200).send({ mensagem: `Participante foi removida com sucesso ` })
            }
        })

    } catch (error) {
        return res.status(500).send({ mensagem: Error })

    }
}