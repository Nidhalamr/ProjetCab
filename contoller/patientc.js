


const Patient = require("../models/Patient");
const User = require("../models/User");
const Rapport = require("../models/Rapport");
const { v4: uuidv4 } = require('uuid');





exports.findPatients = async (req, res) => {
  const patients = await Patient.find();
  res.send({ data: patients });
};

exports.createPatient = async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.send({ data: patient });
};

exports.findPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.send({ data: patient });
  } catch {
    res.status(404).send({ error: "Patient not found!" });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    Object.assign(patient, req.body);
    patient.save();
    res.send({ data: patient });
  } catch {
    res.status(404).send({ error: "Patient not found!" });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    await patient.remove();
    res.send({ data: true });
  } catch {
    res.status(404).send({ error: "Patient not found!" });
  }
};

exports.createUser = async (req, res) => {
    let user = new User(req.body);
    if(req.body.isMedecin){
        const MeId=uuidv4().split("-")[0]
        const MedecinId={medecinId:MeId}
        console.log(MedecinId)
        Object.assign(user._doc,MedecinId)
        console.log(user)
    }
    await user.save();
    res.send({ data: user });
  };

  exports.updateUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      Object.assign(user, req.body);
      user.save();
      res.send({ data: user });
    } catch {
      res.status(404).send({ error: "User not found!" });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.remove();
      res.send({ data: true });
    } catch {
      res.status(404).send({ error: "User not found!" });
    }
  };



  exports.findRapport = async (req, res) => {
    try {
      const rapport = await Rapport.findById(req.params.id);
      res.send({ data: rapport });
    } catch {
      res.status(404).send({ error: "Rapport not found!" });
    }
  };


  exports.createRapport = async (req, res) => {
    const rapport = new Rapport(req.body);
    await rapport.save();
    res.send({ data: rapport });
  };

  exports.updateRapport = async (req, res) => {
    try {
      const rapport = await Rapport.findById(req.params.id);
      Object.assign(rapport, req.body);
      rapport.save();
      res.send({ data: rapport });
    } catch {
      res.status(404).send({ error: "Rapport not found!" });
    }
  };

  exports.deleteRapport = async (req, res) => {
    try {
      const rapport = await Rapport.findById(req.params.id);
      await rapport.remove();
      res.send({ data: true });
    } catch {
      res.status(404).send({ error: "Rapport not found!" });
    }
  };


  exports.findRapports = async (req, res) => {
    const rapports = await Rapport.find();
    res.send({ data: rapports });
  };