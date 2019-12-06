const express = require('express');
let multer = require('multer');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = "mongodb+srv://karim:karim@cluster0-cqups.mongodb.net/test?retryWrites=true&w=majority";

//const port = process.env.PORT || 8888;
app.set('port', process.env.PORT || 8888);

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
     let db = client.db("superventes");
    if (err) {
        console.log('erreur de connexion au serveur Atlas MongDB:', err);
    } else {
        console.log('conneced to mongoDB', url);
    }

    /* Liste des produits */
    app.get("/produits", (req, res) => {
        console.log("/produits");
        try {
            db.collection("produits").find().sort({nom: 1}).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("erreur sur produits"+e);
            res.end(JSON.stringify([]));
        }
    });
    /* Liste des produits par catégorie */
    app.get("/produits/:categorie", (req, res) => {
        categorie = req.params.categorie;
        console.log("/produits/" + categorie);
        try {
             db.collection("produits").find({type: categorie}).toArray((err, documents) => {
                 res.end(JSON.stringify(documents));
             });
        } catch(e) {
             console.log("Erreur sur /produit/"+ categorie + ":" +e);
             res.end(JSON.stringify([]));
        }
    });

    app.post("/produits/search", (req, res) => {
        let search = req.body.search;
        try {
            db.collection("produits").find({ $or: [{nom: search}, {type: search}, {prix: search}]}).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("erreur lors de recherche du produit");
            res.end(JSON.stringify([]));
        }
    });

    //Liste des categories de produits
    app.get("/categories", (req, res) => {
        console.log("/categories");
        categories = [];
        try {
            db.collection("categories").find().toArray((err, documents) => {
                for(let doc of documents){
                    if(!categories.includes(doc.type)) {
                       // console.log("****" + doc + "************");
                        categories.push(doc.type);
                    }
                }
                console.log("Revoi de liste des categories " + res.end(JSON.stringify(documents)));
            });
        } catch(e) {
            console.log("Erreur sur /categories" + e);
            res.end(JSON.stringify([]));
        }

    });

    //user connection
    app.post("/users/connexion", (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        console.log("/utilisateur/connexion ==> email: "+ email + " pass : " + password);
        try {
            db.collection("users").find({email: email, password: password}).toArray((err, documents) => {
               if(documents.length == 1) {
                   console.log("============ authentification succed - status 1 ");
                   res.end(JSON.stringify({"result": 1, "message": "Authentification réussie"}));
                   //res.end(JSON.stringify(documents));
               } else {
                   console.log("!!!!!!!!!!!!!! authentification failed");
                   res.end(JSON.stringify({"result": 0, "message": "Email ou mot de passe incorrect"}));
                   //res.end(JSON.stringify([]));
               }
            });
        } catch(e) {
            console.log("Erreur d'authentifiction" + e);
            res.end(JSON.stringify([]));
        }
    });

    app.get("/users/:search", (req, res) => {
        let search = req.params.search;
        try {
            db.collection("users").find({email: search}).toArray((err, documents) => {
                for(let a of documents)
                    console.log(a);
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            res.end(JSON.stringify([]));
        }
    });

    //Add new user
    app.post("/users/inscription", (req, res, next) => {
        let user = {"nom": req.body.nom, "prenom": req.body.prenom, "email":req.body.email, "password": req.body.password}
        try {
            db.collection("users").insertOne(user, function(err, res) {
                console.log("Un nouvel utilisateur inseré");
            });
        } catch(e) {
            console.log("Erreur lors la création de l'utilisateur" + e);
        }
        res.json(req.body);
        //res.end(JSON.stringify(user));
    });




    // repertoire des images
    const DIR = './public/assets/img/';

    // paramétrage de Multer File upload
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, DIR);
        },
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, fileName)
        }
    });

    // Validation de type de fichier télécharger via Multer
    var upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Seulement les formats .png, .jpg and .jpeg autorisés!'));
            }
        }
    });


    //Add new product
    app.post("/produits/add", upload.single('image'), (req, res, next) => {
        //const url = req.protocol + '://' + req.get('host');
        const produit = {
            nom: req.body.nom,
            type: req.body.type,
            prix: req.body.prix,
            image: req.file.filename
        };

        try {
            db.collection("produits").insertOne(produit, function(err, res) {
                console.log("Produit bien inseré");
            });
        } catch(e) {
            console.log("Erreur lors la création de produit " + e);
        }
        res.json(req.body);
    });

    //Insert into panie
   app.post("/panier/add", (req, res, next) => {
        let panier = req.body;
        console.log("bbbbbbbbbbbbbb");
        try {
            db.collection("paniers").insertOne(panier, function(err, res) {
                console.log("panier inseré");
            });
        } catch(e) {
            console.log("Erreur lors la création de panier" + e);
        }
        res.json(panier);
        //res.end(JSON.stringify(user));
    });


    //Delete an existing user
    app.post("/users/remove", (req, res, next) => {
        try {
            db.collection("users").deleteOne({email: req.body.email} , function(err, res) {
                console.log("Utilisateur supprimé");
            });
        } catch(e) {
            console.log("Erreur lors de la création de l'utilisateur" + e);
        }
        res.json(req.body);
        //res.end(JSON.stringify(user));
    });

    //Update user's information
    app.post("/users/update", (req, res, next) => {
        let user_email = {"nom": req.body.nom, "email":req.body.email}
        try {
            db.collection("users").updateOne(
                { "email" : req.body.email },
                [{ $set: { "nom" : req.body.nom }}, { $set: { "tel" : req.body.tel }}]
            );
            console.log("Utilisateur a bien été mis à jour");
        } catch(e) {
            console.log("Erreur lors de la création de l'utilisateur" + e);
        }
        res.json(req.body);
        //res.end(JSON.stringify(user));
    });


});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
}


app.listen(app.get('port'), function() {
    console.log("Serveur s'exécute sur le port :" + app.get('port'));
});
