"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = exports.provider = exports.auth = exports.db = void 0;

var _firebase = _interopRequireDefault(require("firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firebaseConfig = {
  apiKey: "AIzaSyBvkUMaV-U3zLS32we1Gpxc2i9eIseb3Ac",
  authDomain: "mumble-f5b70.firebaseapp.com",
  databaseURL: "https://mumble-f5b70-default-rtdb.firebaseio.com",
  projectId: "mumble-f5b70",
  storageBucket: "mumble-f5b70.appspot.com",
  messagingSenderId: "595927879007",
  appId: "1:595927879007:web:d39701c23e30aedda0faea",
  measurementId: "G-WD2GDSWNWW"
};

var firebaseApp = _firebase["default"].initializeApp(firebaseConfig);

var db = firebaseApp.firestore();
exports.db = db;

var auth = _firebase["default"].auth();

exports.auth = auth;
var provider = new _firebase["default"].auth.GoogleAuthProvider();
exports.provider = provider;

var storage = _firebase["default"].storage();

exports.storage = storage;