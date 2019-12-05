mongoimport --db SUPERVENTES --collection membres --file membres.json --jsonArray --drop
mongoimport --db SUPERVENTES --collection produits --file produits.json --jsonArray --drop
mongoimport --db SUPERVENTES --collection users --file users.json --jsonArray --drop
mongoimport --db SUPERVENTES --collection categories --file categories.json --jsonArray --drop
mongoimport --db SUPERVENTES --collection paniers --file paniers.json --jsonArray --drop
