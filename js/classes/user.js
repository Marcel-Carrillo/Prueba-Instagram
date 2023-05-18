class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.photos = [];
    this.followers = [];
    this.follow = [];
  }

  //Verifica el password del usuario de la plataforma
  checkPassword(password) {
    return password === this.password;
  }

  //Muestra las fotos en las que esta etiquetado el usuario
  showTaggedPhotos() {
    console.log(`Fotos etiquetadas a ${this.email}:`);
    Instagram.showTaggedPhotos(this.email);
  }
}
