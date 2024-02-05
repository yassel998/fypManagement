const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const session = require("express-session");
var nodemailer = require("nodemailer");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: ["userId", "filId", "auth", "role"], //the name of the cookie u'r gonna create
    secret: "Azghenghan",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24, //in secondes ~ 24 hours
    },
  })
);

app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "pfe",
});

// ************************* Registation *****************************

//get id and name of filiere while registering
app.get("/filiere", (req, res) => {
  db.query("SELECT idFiliere,  name FROM filiere", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// get idfiliere, idprerequis and name of prerequis while registering according
// to the selected option(filiere)
app.get("/prerequi", (req, res) => {
  db.query(
    "SELECT idFiliere, idprerequis,  name FROM prerequis",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//registration of new student
//store info's in students table
//strore Prerequisites while registration & put them in studentspre table
app.post("/registerStudent", async (req, res) => {
  const filiere = req.body.filiere;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const [idPrerequisites] = [req.body.idPrerequisites];
  await db.query(
    "SELECT id FROM users WHERE email = ?",
    email,
    (err, result) => {
      // if (err) {
      //   console.log(err);
      // } else
      if (result.length > 0) {
        res.send({ message: "The Email is already exist" });
        console.log("The Email is already exist");
      } else {
        db.query(
          "INSERT INTO users (email, password, firstName, lastName, idFiliere, phone,role) VALUES (?,?,?,?,?,?,?)",
          [email, password, firstName, lastName, filiere, phone, role],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result.insertId);
              const idStd = result.insertId;
              idPrerequisites.map((prerequi) => {
                db.query(
                  "INSERT INTO studentspre (idStd, idPrerequi) VALUES (?,?)",
                  [idStd, prerequi]
                );
              });
            }
          }
        );
      }
    }
  );
  // await db.query(
  //   "INSERT INTO users (email, password, firstName, lastName, idFiliere, phone,role) VALUES (?,?,?,?,?,?,?)",
  //   [email, password, firstName, lastName, filiere, phone, role],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(result.insertId);
  //       const idStd = result.insertId;
  //       idPrerequisites.map((prerequi) => {
  //         db.query("INSERT INTO studentspre (idStd, idPrerequi) VALUES (?,?)", [
  //           idStd,
  //           prerequi,
  //         ]);
  //       });
  //     }
  //   }
  // );
});

//*************************Login*******************************/

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        req.session.user = result;
        res.cookie("filId", result[0].idFiliere);
        res.cookie("userId", result[0].id);
        res.cookie("auth", true);
        res.cookie("role", result[0].role);
        res.send(result);
      } else {
        res.send({ message: "Wrong email/password combination !" });
      }
    }
  );
});
//***********************************Admin ************************/

//Creation d'un compte prof/ched dep
app.post("/adminCreate", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const filiere = req.body.filiere;
  await db.query(
    "INSERT INTO users (email, password,role,idFiliere) VALUES (?,?,?,?)",
    [email, password, role, filiere],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// ********************** update profile *****************************
//get the profile infos to display them in our page & in input's
app.get("/profile/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT users.*,filiere.name as filiere FROM users,filiere WHERE users.id = ?  AND users.idFiliere = filiere.idFiliere",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get the profile infos to student to display them in our page & in input's
app.get("/profileStd/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT users.*,filiere.name as filiere, prerequis.name as pree FROM users,filiere,prerequis,studentspre WHERE users.id = ?  AND users.idFiliere = filiere.idFiliere AND users.id=studentspre.idStd AND studentspre.idPrerequi=prerequis.idprerequis AND users.idFiliere=prerequis.idFiliere",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//get the filiere name & id
// app.get("/userFiliere/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("SELECT * FROM filiere WHERE idFiliere = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.put("/updateProfile", (req, res) => {
  const id = req.body.id;
  const fil = req.body.fil;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  db.query(
    "UPDATE users SET idFiliere = ?, firstName = ?, lastName = ?, email = ?, phone = ?, password = ? WHERE id = ?",
    [fil, firstName, lastName, email, phone, password, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get prof's to chef departement according to filiere
app.get("/prof/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT users.*,filiere.name as filiere FROM users,filiere where users.idFiliere=? AND users.role=0 AND users.idFiliere = filiere.idFiliere",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get prof's to admin
app.get("/allProf", (req, res) => {
  db.query(
    "SELECT users.*,filiere.name as filiere FROM users,filiere where users.idFiliere=filiere.idFiliere AND users.role=0",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get chef's to admin
app.get("/allChefDep", (req, res) => {
  db.query(
    "SELECT users.*,filiere.name as filiere FROM users,filiere where users.idFiliere=filiere.idFiliere AND users.role=1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get number of prof's according to filiere to admin
app.get("/profChart", (req, res) => {
  db.query(
    "SELECT COUNT(u.id) as num, f.name as name FROM filiere AS f LEFT JOIN users AS u ON u.idFiliere = f.idFiliere AND u.role IN(0,1) GROUP BY f.name",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get number of own pfe's to CD
app.get("/chefDepadv/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT COUNT(pfe.id) as num, avancement FROM pfe WHERE idProf = ? GROUP BY avancement",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get number of all pfe's to CD
app.get("/chefDepadvAll/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT COUNT(pfe.id) as num, avancement FROM pfe WHERE idFiliere = ? GROUP BY avancement",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get students to chef departement according to filiere
app.get("/stdListe/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT users.*,filiere.name as filiere FROM users,filiere where users.idFiliere=? AND users.role=2 AND users.idFiliere = filiere.idFiliere AND valid = 1",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get all students not activated to admin
app.get("/stdListe", (req, res) => {
  db.query(
    "SELECT users.*,filiere.name as filiere FROM users,filiere where users.valid = 0 AND users.role=2 AND users.idFiliere = filiere.idFiliere",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get all students  activated to admin
app.get("/stdListeAct", (req, res) => {
  db.query(
    "SELECT users.*,filiere.name as filiere FROM users,filiere where users.valid = 1 AND users.role=2 AND users.idFiliere = filiere.idFiliere",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// get idprerequis and name of prerequis according to filiere after login
// to put them in select
app.get("/prerequisFil/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT idprerequis,  name FROM prerequis where idFiliere = ? ",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// get idDomaine and name of domaine according to filiere after login
// to put them in select
app.get("/domaineFil/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT id_domaine,  name FROM domaines where idFiliere = ? ",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//creation of new pfe
//store info's in pfe table
//strore Prerequisites while creation & put them in pfeprerequis table
app.post("/newPfe", async (req, res) => {
  const filiere = req.body.filiere;
  const titre = req.body.titre;
  const description = req.body.description;
  const nbr_etd = req.body.nbr_etd;
  const domaine = req.body.domaine;
  const prof = req.body.prof;
  const avancement = req.body.avancement;
  const [idPrerequisites] = [req.body.idPrerequisites];
  await db.query(
    "INSERT INTO pfe (idFiliere, titre, description, nbr_etd, id_domaine, idProf, avancement) VALUES (?,?,?,?,?,?,?)",
    [filiere, titre, description, nbr_etd, domaine, prof, avancement],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.insertId);
        const idPfe = result.insertId;
        idPrerequisites.map((prerequi) => {
          db.query(
            "INSERT INTO pfeprerequis (id_pfe, idPrerequis) VALUES (?,?)",
            [idPfe, prerequi]
          );
        });
      }
    }
  );
});

//get own pfe's to chef departement
app.get("/myPfe/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT pfe.*,filiere.name as filiere, domaines.name as domaine FROM pfe, filiere, domaines where pfe.idProf=? AND pfe.idFiliere = filiere.idFiliere AND pfe.id_domaine= domaines.id_domaine",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get all pfe's in filiere to chef departement
app.get("/allPfe/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT pfe.*, CONCAT(users.firstName, ' ', users.lastName) AS fname FROM pfe, users WHERE pfe.idFiliere=? AND pfe.idProf = users.id AND users.role = 0 ",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get all pfe's in filiere to chef departement
app.get("/allPfeStd/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT pfe.*, CONCAT(users.firstName, ' ', users.lastName) AS fname, domaines.name as domaine FROM pfe, users, domaines WHERE pfe.idFiliere=? AND pfe.idProf = users.id AND pfe.id_domaine= domaines.id_domaine",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get single pfe (SinglePfe component)
app.get("/SinglePfe/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT pfe.*, domaines.name as domaine,users.email,users.phone,CONCAT(users.firstName, ' ', users.lastName) AS fname FROM pfe, domaines, users where pfe.id=? AND pfe.id_domaine= domaines.id_domaine AND users.id=pfe.idProf",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get prerequis for a single pfe (SinglePfe component)
app.get("/prerequisPfe/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT prerequis.name as name FROM prerequis, pfeprerequis where pfeprerequis.id_pfe=? AND pfeprerequis.idPrerequis= prerequis.idprerequis",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get prerequis for student (student profile components)
app.get("/prerequisStd/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT prerequis.name as name FROM prerequis, studentspre where studentspre.idStd=? AND studentspre.idPrerequi= prerequis.idprerequis",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get the number of prof in filiere for chef departement
app.get("/numProfChedDep/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT count(*) as num FROM users where idFiliere= ? AND role=0",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get the number of students in filiere for chef departement
app.get("/numStdChedDep/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT count(*) as num FROM users where idFiliere= ? AND role=2 AND valid = 1",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get the number of pfe's in filiere for prof
app.get("/numPfeProf/:idUser", (req, res) => {
  // const id = req.params.id;
  const id = req.params.idUser;
  // const idUser = 35;
  db.query(
    "SELECT count(*) as num FROM pfe WHERE idProf= ? ",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get the number of pfe's in filiere for chef dep
app.get("/numPfe/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT count(*) as num FROM pfe where idFiliere= ? ",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get the number of domaine's in filiere for chef departement
app.get("/numDomaines/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT count(*) as num FROM domaines where idFiliere= ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//get the total number of prof for admin
app.get("/numProf", (req, res) => {
  db.query("SELECT count(*) as num FROM users WHERE role=0", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//get the total number of prof for admin
app.get("/numChefDep", (req, res) => {
  db.query("SELECT count(*) as num FROM users WHERE role=1", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//get the total number of prof for admin
app.get("/numStd", (req, res) => {
  db.query(
    "SELECT count(*) as num FROM users WHERE role=2 AND valid = 1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//update pfe chef dep
app.put("/updatePfe", async (req, res) => {
  const id = req.body.idPfe;
  const titre = req.body.titre;
  const description = req.body.description;
  const nbr_etd = req.body.nbr_etd;
  const domaine = req.body.domaine;
  const [idPrerequisites] = [req.body.idPrerequisites];
  await db.query(
    db.query(
      "UPDATE pfe SET titre = ?, description = ?, nbr_etd = ?, id_domaine = ? WHERE id = ? ",
      [titre, description, nbr_etd, domaine, id]
    ),
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        await db.query("DELETE FROM pfeprerequis WHERE id = ?", id);
        idPrerequisites.map((prerequi) => {
          db.query("INSERT INTO pfeprerequis (id, idPrerequis) VALUES (?,?)", [
            id,
            prerequi,
          ]);
        });
      }
    }
  );
});

//delete pfe chef dep
app.delete("/deletePfe/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM pfe WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//delete demande chef dep
app.delete("/deleteDemande/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM demandes WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//reject demande of activation by admin
app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//add new domaine
app.post("/addDomaine", async (req, res) => {
  const filiere = req.body.idFiliere;
  const name = req.body.name;
  await db.query(
    "INSERT INTO domaines (idFiliere, name) VALUES (?,?)",
    [filiere, name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//add new prerequi
app.post("/addPrerequi", async (req, res) => {
  const filiere = req.body.idFiliere;
  const name = req.body.name;
  await db.query(
    "INSERT INTO prerequis (idFiliere, name) VALUES (?,?)",
    [filiere, name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//add new domaine
app.post("/addFiliere", async (req, res) => {
  const name = req.body.name;
  await db.query(
    "INSERT INTO filiere (name) VALUES (?)",
    name,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/addDemande", async (req, res) => {
  const id_pfe = req.body.id_pfe;
  const id_user = req.body.id_user;
  const id_prof = req.body.id_prof;
  await db.query(
    "INSERT INTO demandes (id_pfe, id_user,idProf) VALUES (?,?,?)",
    [id_pfe, id_user, id_prof],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//get demandes to chef departement
app.get("/demandes/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "select demandes.id, DATE_FORMAT(demandes.date, '%m/%d/%Y %H:%i') as date, users.firstName, users.lastName, pfe.titre, users.id as idUser from demandes, users, pfe where demandes.idProf = ? AND demandes.id_user=users.id AND demandes.id_pfe = pfe.id AND demandes.dispo = 0",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get list pfe stuendt to chef departement
app.get("/stdPfe/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "select demandes.id,DATE_FORMAT(demandes.date, '%m/%d/%Y %H:%i') as date, CONCAT(users.firstName, ' ', users.lastName) AS fname, pfe.avancement,pfe.id as idPfe, pfe.nbr_etd, pfe.titre,pfe.dateSoutenance from demandes, users, pfe where demandes.idProf = ? AND demandes.id_user=users.id AND demandes.id_pfe = pfe.id AND demandes.dispo=1",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get list of pfe postuled to stuendt
app.get("/pfeOfStd/:idUser", (req, res) => {
  const id = req.params.idUser;
  db.query(
    // "select demandes.id,pfe.titre,DATE_FORMAT(demandes.date, '%m/%d/%Y %H:%i') as date from demandes, pfe where demandes.id_user = ? AND demandes.id_pfe=pfe.id AND demandes.dispo=0",
    "SELECT demandes.id,DATE_FORMAT(demandes.date, '%m/%d/%Y %H:%i') as date, CONCAT(users.firstName, ' ', users.lastName) AS fname , pfe.titre  FROM demandes, pfe, users WHERE demandes.id_user = ? AND demandes.id_pfe = pfe.id AND demandes.idProf = users.id AND demandes.dispo = 0",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get my pfe to stuendt
app.get("/MypfeOfStd/:idUser", (req, res) => {
  const id = req.params.idUser;
  db.query(
    // "select demandes.id,pfe.titre,DATE_FORMAT(demandes.date, '%m/%d/%Y %H:%i') as date from demandes, pfe where demandes.id_user = ? AND demandes.id_pfe=pfe.id AND demandes.dispo=0",
    "SELECT demandes.id,DATE_FORMAT(demandes.date, '%m/%d/%Y %H:%i') as date, CONCAT(users.firstName, ' ', users.lastName) AS fname , pfe.titre,pfe.dateSoutenance  FROM demandes, pfe, users WHERE demandes.id_user = ? AND demandes.id_pfe = pfe.id AND demandes.idProf = users.id AND demandes.dispo = 0",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//update adavancement
app.put("/updateavan", (req, res) => {
  const id = req.body.id;
  const avancement = req.body.avancement;
  db.query(
    "UPDATE pfe SET avancement = ? WHERE id = ?",
    [avancement, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//update date de soutenance
app.put("/updateDateSout", (req, res) => {
  const id = req.body.id;
  const date = req.body.date;
  db.query(
    "UPDATE pfe SET dateSoutenance = ? WHERE id = ?",
    [date, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//affect pfe
app.put("/affectPfe", (req, res) => {
  const id = req.body.id;
  db.query("UPDATE demandes SET dispo = 1 WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//activate student account by admin
app.put("/validStd", (req, res) => {
  const id = req.body.id;
  db.query("UPDATE users SET valid = 1 WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//(forgot password)
function sendEmail(email, password) {
  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yassine.elaissati@ump.ac.ma", // Your email id
      pass: "H144021979", // Your password
    },
  });

  var mailOptions = {
    from: "yassine.elaissati@ump.ac.ma",
    to: email,
    subject: "Mot de passe oublié ----- Gestion des PFE-FPN",
    text: "Votre mot de passe est : " + password + " .",
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Sent : " + info.response);
    }
  });
}

/* send reset password link in email */
app.post("/reset-password-email", async function (req, res) {
  var email = req.body.email;
  await db.query(
    "SELECT password FROM users  WHERE email = ?",
    email,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result[0]) {
        if (result[0].password > 0) {
          sendEmail(email, result[0].password);
        }
      } else {
        console.log("2");
        // type = "error";
        // msg = "The Email is not registered with us";
        // res.send(msg);
        res.send({ message: "The Email is not registered with us" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("The server is running on port 3001");
});
