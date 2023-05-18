class Instagram {
  static users = [];

  //Añade un usuario a la plataforma
  static addUser(email, password) {
    if (this.users.some((user) => user.email === email)) {
      return console.log(`El email ${email} ya esta registrado}`);
    }
    let user = new User(email, password);

    this.users.push(user);
  }

  //Añade una foto al usuario de la plataforma
  static addPhoto(email, password, id, createDate) {
    let user = this.findUser(email);
    if (!user) {
      return console.log("El usuario no existe");
    }
    if (!user.checkPassword(password)) {
      return console.log("Contraseña incorrecta");
    }
    let existingPhoto = user.photos.find((photo) => photo.id === id);
    if (existingPhoto) {
      return console.log("Esta foto ya está registrada");
    }
    let photo = new Photo(id, createDate);
    user.photos.push(photo);
    return photo;
  }

  //Añade un like a una foto de un usuario de la plataforma
  static addLikeToPhoto(email, password, idPhoto) {
    const user = this.findUser(email);
    if (!user || !user.checkPassword(password)) {
      return console.log("Credenciales de usuario inválidas");
    }
    const photo = user.photos.find((photo) => photo.id === idPhoto);
    if (!photo) {
      return console.log("La foto no existe");
    }
    const likeExists = photo.likes.some((like) => like.email === email);
    if (likeExists) {
      return console.log("El usuario ya ha dado like a esta foto");
    }
    photo.likes.push(user);
  }

  //Añade un follow a un usuario de la plataforma
  static followUser(email, password, userEmailToFollow) {
    let user = this.findUser(email);
    if (!user) {
      return console.log("Usuario no existe");
    }
    if (!user.checkPassword(password)) {
      return console.log("Password incorrecta");
    }
    if (email === userEmailToFollow) {
      return console.log("No puedes seguirte a ti mismo");
    }
    let userToFollow = this.findUser(userEmailToFollow);
    if (!userToFollow) {
      return console.log("No se encuentra el usuario");
    }
    if (user.follow.some((follow) => follow.email === userEmailToFollow)) {
      return console.log("Ya sigues a este usuario");
    }
    user.follow.push(userToFollow);
    userToFollow.followers.push(user);
  }

  //Encuentra a un usuario de la plataforma mediante su email
  static findUser(email) {
    return this.users.find((user) => user.email === email);
  }

  //Etiqueta a un usuario de la plataforma en una foto
  static tagUser(email, password, idPhoto, userEmail) {
    const user = this.findUser(email);
    if (!user || !user.checkPassword(password)) {
      return console.log("Credenciales de usuario inválidas");
    }
    const photo = user.photos.find((photo) => photo.id === idPhoto);
    if (!photo) {
      return console.log("La foto no existe");
    }
    const userToTag = this.findUser(userEmail);
    if (!userToTag) {
      return console.log("El usuario no existe");
    }
    if (photo.tagged.some((tag) => tag.email === userEmail)) {
      return console.log("El usuario ya está etiquetado en esta foto");
    }
    photo.tagged.push(userToTag);
  }

  // Muestra las fotos de un usuario
  static showPhotos(email, password) {
    const user = this.findUser(email);
    if (!user || !user.checkPassword(password)) {
      return console.log("Credenciales de usuario inválidas");
    }
    console.log(`Fotos de ${this.email}:`);
    user.photos.forEach((photo) => {
      console.log(`- Foto ${photo.id}, creada el ${photo.createDate}`);
      console.log(
        ` ${photo.likes.length} likes, ${photo.tagged.length}etiquetados`
      );
    });
  }

  //Muestra las fotos en las que esta etiquetado un usuario
  static showTaggedPhotos(email, password) {
    const user = this.findUser(email);
    user.photos.forEach((photo) => {
      photo.tagged.forEach((tag) => {
        if (!user || !user.checkPassword(password)) {
          return console.log("Credenciales de usuario inválidas");
        }
        if (tag.email === email) {
          console.log(`- Foto ${photo.id}, creada el ${photo.createDate}`);
          console.log(
            ` ${photo.likes.length} likes, ${photo.tagged.length} etiquetados`
          );
        }
      });
    });
  }
}
