


const Patient = require("../models/Patient");
const User = require("../models/User");
const Rapport = require("../models/Rapport");
const { v4: uuidv4 } = require('uuid');





exports.findPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json({ data: patients });
};

exports.createPatient = async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.json({ data: patient });
};

exports.findPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json({ data: patient });
  } catch {
    res.status(404).send({ error: "Patient not found!" });
  }
};













exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    Object.assign(patient, req.body);
    patient.save();
    res.json({ data: patient });
  } catch {
    res.status(404).send({ error: "Patient not found!" });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    await patient.remove();
    res.json({ data: true });
  } catch {
    res.status(404).send({ error: "Patient not found!" });
  }
};

// exports.createUser = async (req, res) => {
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

  exports.updateUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      Object.assign(user, req.body);
      user.save();
      res.json({ data: user });
    } catch {
      res.status(404).send({ error: "User not found!" });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.remove();
      res.json({ data: true });
    } catch {
      res.status(404).send({ error: "User not found!" });
    }
  };


  exports.getUser= async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json({ data: user });
    } catch {
      res.status(404).send({ error: "User not found!" });
    }
  };



  exports.querrySearchUser = async (req, res) => {
    const {search, limit}=req.query
    console.log({search,limit})
    let user
    if (search){
      const spaceNum=(search.match(/ /g) || []).length
      console.log(spaceNum)
      if (spaceNum==1){
        
        let prenom =search.split(' ')[0];
        let nom =search.split(' ')[1];
      user =Object.assign( await User.find({prenom:prenom,nom:nom}), await User.find({prenom:nom,nom:prenom}));
      } else if(spaceNum==2){
        let prenom =search.split(' ')[0];
        let middle =search.split(' ')[1];
        let nom=search.split(' ')[2];
        let composedFirst=prenom+middle
        let composedSecond=middle+nom
        let composedFirstSpace=prenom+" "+middle
        let composedSecondSpace=middle+" "+nom
        user =Object.assign( 
          await User.find({prenom:composedFirst,nom:nom}), await User.find({prenom:nom,nom:composedFirst}),
          await User.find({prenom:composedSecond,nom:prenom}), await User.find({prenom:prenom,nom:composedSecond}),
          await User.find({prenom:composedFirstSpace,nom:nom}), await User.find({prenom:nom,nom:composedFirstSpace}),
          await User.find({prenom:composedSecondSpace,nom:prenom}), await User.find({prenom:prenom,nom:composedSecondSpace})
        );
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
        user =Object.assign( 
         await User.find({prenom:composedFirst,nom:composedSecond}), await User.find({prenom:composedSecond,nom:composedFirst}),
         await User.find({prenom:composedFirstSpace,nom:composedSecondSpace}), await User.find({prenom:composedSecondSpace,nom:composedFirstSpace}),
         await User.find({prenom:composedFirstSpace,nom:composedSecond}), await User.find({prenom:composedSecond,nom:composedFirstSpace}),
         await User.find({prenom:composedFirst,nom:composedSecondSpace}), await User.find({prenom:composedSecondSpace,nom:composedFirst})
         );

      }else if(spaceNum>3){
        return res.status(400).json({success:false})
                    
      }else{
      user =Object.assign(await User.find({prenom:search}),await User.find({nom:search}));
      };
    }else{
    user = await User.find();
    }
    if (limit){
      user=user.slice(0,Number(limit))
    };
    res.status(200).json({data:user})
  };












  exports.findRapport = async (req, res) => {
    try {
      const rapport = await Rapport.findById(req.params.id);
      res.json({ data: rapport });
    } catch {
      res.status(404).send({ error: "Rapport not found!" });
    }
  };


  exports.createRapport = async (req, res) => {
    const rapport = new Rapport(req.body);
    await rapport.save();
    res.json({ data: rapport });
  };

  exports.updateRapport = async (req, res) => {
    try {
      const rapport = await Rapport.findById(req.params.id);
      Object.assign(rapport, req.body);
      rapport.save();
      res.json({ data: rapport });
    } catch {
      res.status(404).send({ error: "Rapport not found!" });
    }
  };

  exports.deleteRapport = async (req, res) => {
    try {
      const rapport = await Rapport.findById(req.params.id);
      await rapport.remove();
      res.json({ data: true });
    } catch {
      res.status(404).send({ error: "Rapport not found!" });
    }
  };


  exports.findRapports = async (req, res) => {
    const rapports = await Rapport.find();
    res.json({ data: rapports });
  };