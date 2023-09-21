const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;
//TODO: required some fields -> basic nombre, apellido, correo, empresa/ estudiante
// const Joi = require('joi');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor rellena tu nombre'],
    },
    surname: {
      type: String,
      required: [true, 'Por favor rellena tu/s apellido/s'],
    },
    age: {
      type: integer,
      required: [true, 'Por favor rellena tu edad'],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, 'Por favor inserta uno válido'],
      required: [true, 'Por favor rellena tu email'],
    },
    password: {
      type: String,
      match: [
        /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,30}$"/,
        'mín: 10caracteres 1mayús 1minús 1número 1carácter especial,',
      ],
      required: [true, 'Por favor rellena tu contraseña'],
    },
    //FIXME: delete after test - email confirmed
    // confirmed: {
    //   type: Boolean,
    //   default: false,
    // },
    eventIds: [{ type: ObjectId, ref: 'Event' }],
    reviewIds: [{ type: ObjectId, ref: 'Review' }],
    followers: [{ type: ObjectId, ref: 'User' }],
    occupation: {
      type: String,
      required: [true, 'Por favor rellena tu ocupación'],
    },
    eventIds: [{ type: ObjectId, ref: 'Event' }],
    reviewIds: [{ type: ObjectId, ref: 'Review' }],
    followers: [{ type: ObjectId, ref: 'User' }],
    orderIds: [{ type: ObjectId, ref: 'Order' }],
    wishList: [{ type: ObjectId, ref: 'Event' }],

    avatar: String,
    role: String,
    confirmed: Boolean,
    tokens: [],
  },
  { timestamps: true }
);

//TODO: yol info
// Agregar una propiedad virtual para la URL del avatar
UserSchema.virtual('avatar_url').get(function () {
  if (this.avatar) {
    return `/assets/images/user/${this.avatar}`;
  }
  // Si no hay avatar, puedes proporcionar una URL predeterminada o manejarlo de la manera que prefieras
  return '/assets/images/user/avatar-default.png'; // Cambia la ruta según tu estructura de carpetas
});

UserSchema.methods.toJSON = function () {
  console.log(this.avatar_url);
  //const user = this.toObject();
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  //FIXME: delete user.confirmed;
  delete user.role;
  delete user._v;

  // Agregar la URL del avatar
  user.avatar_url = this.avatar_url;
  return user;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
