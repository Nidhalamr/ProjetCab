

import jwt  from 'jsonwebtoken';

import Patient from "../models/Patient.js";
import User from "../models/User.js";
import Rapport from "../models/Rapport.js";
import { uuid } from 'uuidv4';





const findPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json({ data: patients });
};

const createPatient = async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.json({ data: patient });
};

const findPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json({ data: patient });
  } catch {
    res.status(404).send({ error: "Patient not found!" });
  }
};













const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    Object.assign(patient, req.body);
    patient.save();
    res.json({ data: patient });
  } catch {
    res.status(404).send({ error: "Patient not found!" });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    await patient.remove();
    res.json({ data: true });
  } catch {
    res.status(404).send({ error: "Patient not found!" });
  }
};

// const createUser = async (req, res) => {
//     // let user = new User(req.body);
//     // if(req.body.isMedecin){
//     //     const MeId=uuidv4().split("-")[0]
//     //     const MedecinId={medecinId:MeId}
//     //     console.log(MedecinId)
//     //     Object.assign(user._doc,MedecinId)
//     //     console.log(user)
//     // }else{
//     //   const AnId=uuidv4().split("-")[0]
//     //   const AnyId={anyId:AnId}
//     //   Object.assign(user._doc,AnyId)
//     // }
//     // await user.save();
//     res.json({ data: user });
//   };

  const updateUser = async (req, res) => {
    try {
      let token =jwt.sign({theId:req.body.theId},"mallaprojet")
      let user = await User.findById(req.params.id);
      delete user.password;
      delete req.body.password;
      Object.assign(user, req.body);

      user.save();



  delete user.password;
  res.status(200).json({token,user})
    



    } catch {
      res.status(500).json({error:err.message})

    }
  };

  const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.remove();
      res.json({ data: true });
    } catch {
      res.status(404).send({ error: "User not found!" });
    }
  };


  const getUser= async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json({ data: user });
    } catch {
      res.status(404).send({ error: "User not found!" });
    }
  };



  const querrySearchUser = async (req, res) => {
    const {search, limit}=req.query
    console.log({search,limit})
    let patient
    if (search){
      const spaceNum=(search.match(/ /g) || []).length
      console.log(spaceNum)
      if (spaceNum==1){
        
        let prenom =search.split(' ')[0];
        let nom =search.split(' ')[1];
        patient =Object.assign( await Patient.find({prenom:prenom,nom:nom}), await Patient.find({prenom:nom,nom:prenom}),
        await Patient.find({prenom:search}),await Patient.find({nom:search})
        );
      } else if(spaceNum==2){
        let prenom =search.split(' ')[0];
        let middle =search.split(' ')[1];
        let nom=search.split(' ')[2];
        let composedFirst=prenom+middle
        let composedSecond=middle+nom
        let composedFirstSpace=prenom+" "+middle
        let composedSecondSpace=middle+" "+nom
        patient =Object.assign( 
          await Patient.find({prenom:composedFirst,nom:nom}), await Patient.find({prenom:nom,nom:composedFirst}),
          await Patient.find({prenom:composedSecond,nom:prenom}), await Patient.find({prenom:prenom,nom:composedSecond}),
          await Patient.find({prenom:composedFirstSpace,nom:nom}), await Patient.find({prenom:nom,nom:composedFirstSpace}),
          await Patient.find({prenom:composedSecondSpace,nom:prenom}), await Patient.find({prenom:prenom,nom:composedSecondSpace}),
          await Patient.find({prenom:search}),await Patient.find({nom:search})
        );
        console.log(patient,1)

      }else if(spaceNum==3){
        let prenom =search.split(' ')[0];
        let middle =search.split(' ')[1];
        let secondmiddle=search.split(' ')[2];
        let nom=search.split(' ')[3];
        let composedFirst=prenom+middle
        let composedSecond=secondmiddle+nom
        let composedFirstSpace=prenom+" "+middle
        let composedSecondSpace=secondmiddle+" "+nom
        console.log(composedFirstSpace,composedSecondSpace)
        patient =Object.assign( 
         await Patient.find({prenom:composedFirst,nom:composedSecond}), await Patient.find({prenom:composedSecond,nom:composedFirst}),
         await Patient.find({prenom:composedFirstSpace,nom:composedSecondSpace}), await Patient.find({prenom:composedSecondSpace,nom:composedFirstSpace}),
         await Patient.find({prenom:composedFirstSpace,nom:composedSecond}), await Patient.find({prenom:composedSecond,nom:composedFirstSpace}),
         await Patient.find({prenom:composedFirst,nom:composedSecondSpace}), await Patient.find({prenom:composedSecondSpace,nom:composedFirst}),
         await Patient.find({prenom:search}),await Patient.find({nom:search})
         );
         console.log(patient,2)

      }else if(spaceNum>3){
        return res.status(400).json({success:false})
                    
      }else{
        patient =Object.assign(await Patient.find({prenom:search}),await Patient.find({nom:search}));
      console.log(patient,3)

      };
    }else{
      patient = await Patient.find();
    }
    console.log(patient,4)
    if (limit){
      patient=patient.slice(0,Number(limit))
    };
    res.status(200).json({data:patient})
  };












  const findRapport = async (req, res) => {
    try {
      const rapport = await Rapport.findById(req.params.id);
      res.json({ data: rapport });
    } catch {
      res.status(404).send({ error: "Rapport not found!" });
    }
  };


  const createRapport = async (req, res) => {
    const rapport = new Rapport(req.body);
    await rapport.save();
    res.json({ data: rapport });
  };

  const updateRapport = async (req, res) => {
    try {
      const rapport = await Rapport.findById(req.params.id);
      Object.assign(rapport, req.body);
      rapport.save();
      res.json({ data: rapport });
    } catch {
      res.status(404).send({ error: "Rapport not found!" });
    }
  };

  const deleteRapport = async (req, res) => {
    try {
      const rapport = await Rapport.findById(req.params.id);
      await rapport.remove();
      res.json({ data: true });
    } catch {
      res.status(404).send({ error: "Rapport not found!" });
    }
  };


  const findRapports = async (req, res) => {
    console.log(req.params)
    const rapports = await Rapport.find({idPatient:req.params.id});
    res.json({ data: rapports });
  };


  export default {
    findPatients,
    createPatient,
    findPatient,
    updatePatient,
    deletePatient,
    updateUser,
    deleteUser,
    getUser,
    querrySearchUser,
    findRapport,
    createRapport,
    updateRapport,
    deleteRapport,
    findRapports,
  };