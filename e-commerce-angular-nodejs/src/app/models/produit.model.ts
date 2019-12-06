export class Produit {
  _id: number;
  nom: string;
  type: string;
  prix: number;
  image: string;

  constructor(nom: string, type: string, prix: number, image: string) {
    this.nom = nom;
    this.type = type;
    this.prix = prix;
    this.image = image;
  }

}
