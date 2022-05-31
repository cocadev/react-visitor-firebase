// import {
//   useState
// } from 'react';
import {
  createAction
} from 'redux-act';
import {
  toastr
} from 'react-redux-toastr';
// import database from "firebase/database";
import {
  firebaseError
} from 'utils';

import firebase from 'firebase/app';
// import "firebase/auth";

const auth = firebase.auth()
// import 'firebase/database';
// import 'firebase/auth';
// import 'firebase/storage';
// import 'firebase/functions';

import {
  checkUserData,
  AUTH_UPDATE_USER_DATA
} from './auth';
import {
  fetchCollection,
  fetchDocument,
  createDocument,
  deleteDocument,
  updateDocument,
} from '../api';

export const USERS_FETCH_DATA_INIT = createAction('USERS_FETCH_DATA_INIT');
export const USERS_FETCH_DATA_SUCCESS = createAction(
  'USERS_FETCH_DATA_SUCCESS'
);
export const USERS_FETCH_DATA_FAIL = createAction('USERS_FETCH_DATA_FAIL');

export const USERS_DELETE_USER_INIT = createAction('USERS_DELETE_USER_INIT');
export const USERS_DELETE_USER_SUCCESS = createAction(
  'USERS_DELETE_USER_SUCCESS'
);
export const USERS_DELETE_USER_FAIL = createAction('USERS_DELETE_USER_FAIL');

export const USERS_CREATE_USER_INIT = createAction('USERS_CREATE_USER_INIT');
export const USERS_CREATE_USER_SUCCESS = createAction(
  'USERS_CREATE_USER_SUCCESS'
);
export const USERS_CREATE_USER_FAIL = createAction('USERS_CREATE_USER_FAIL');

export const USERS_MODIFY_USER_INIT = createAction('USERS_MODIFY_USER_INIT');
export const USERS_MODIFY_USER_SUCCESS = createAction(
  'USERS_MODIFY_USER_SUCCESS'
);
export const USERS_MODIFY_USER_FAIL = createAction('USERS_MODIFY_USER_FAIL');

export const USERS_CLEAN_UP = createAction('USERS_CLEAN_UP');

export const USERS_CLEAR_DATA_LOGOUT = createAction('USERS_CLEAR_DATA_LOGOUT');


export const fetchUsers = (userId = '') => {

  return async (dispatch, getState) => {

    dispatch(checkUserData());

    dispatch(USERS_FETCH_DATA_INIT());

    if (userId) {
      let user;
      try {
        user = await fetchDocument('users', userId);
      } catch (error) {
        toastr.error('', error);
        return dispatch(USERS_FETCH_DATA_FAIL({
          error
        }));
      }

      if (!user) {
        const errorMessage = 'User not available';
        toastr.error('', errorMessage);
        return dispatch(USERS_FETCH_DATA_FAIL({
          error: errorMessage
        }));
      }

      const users = getState().users.data;
      users.push(user);

      return dispatch(
        USERS_FETCH_DATA_SUCCESS({
          data: users,
        })
      );
    }

    const {
      id
    } = getState().auth.userData;

    let users;

    try {
      users = await fetchCollection('users');
    } catch (error) {
      toastr.error('', error);
      return dispatch(USERS_FETCH_DATA_FAIL({
        error
      }));
    }

    return dispatch(
      USERS_FETCH_DATA_SUCCESS({
        data: users.filter((user) => user.id !== id),
      })
    );
  };
};


const deleteLogo = (oldLogo) => {
  if (!oldLogo.includes('firebasestorage')) {
    return null;
  }
  const logoPath = oldLogo.split('users%2F').pop().split('?alt=media').shift();
  return firebase.storage().ref(`users/${logoPath}`).delete();
};

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    dispatch(USERS_DELETE_USER_INIT());
    const {
      locale
    } = getState().preferences;
    const {
      logoUrl
    } = getState()
      .users.data.filter((user) => user.id === id)
      .pop();

    const deleteLogoTask = logoUrl ? deleteLogo(logoUrl) : null;

    const deleteUserTask = deleteDocument('users', id);

    try {
      await Promise.all([deleteLogoTask, deleteUserTask]);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(
        USERS_DELETE_USER_FAIL({
          error: errorMessage,
        })
      );
    }

    toastr.success('', 'The user was deleted.');
    return dispatch(USERS_DELETE_USER_SUCCESS({
      id
    }));
  };
};

export const clearUsersDataLogout = () => {
  return (dispatch) => {
    dispatch(USERS_CLEAR_DATA_LOGOUT());
  };
};

const uploadLogo = (uid, file) => {
  const storageRef = firebase.storage().ref();

  const fileExtension = file.name.split('.').pop();

  const fileName = `${uid}.${fileExtension}`;

  return storageRef.child(`users/${fileName}`).put(file);
};

const getLogoUrl = (uid, file) => {
  const fileExtension = file.name.split('.').pop();

  const bucketUrl = `${process.env.REACT_APP_FIRE_BASE_STORAGE_API}`;

  return `${bucketUrl}/o/users%2F${uid}_200x200.${fileExtension}?alt=media`;
};


// const database = firebase.database();
export const createUser = async ({
  name,
  email,
  password,
  location,
  file,
  createdAt,
  isAdmin,
}) => {
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(location);
  console.log(file);
  console.log(createdAt);
  console.log(isAdmin);
  const emailval = email;
  const passval = password;
  // const nameval = name;
  // const locationval = location;
  // const fileval = file;
  // const createdAtval = createdAt;
  // const isAdminval = isAdmin;
  return async (dispatch, getState) => {
    dispatch(USERS_CREATE_USER_INIT());
    const {
      locale
    } = getState().preferences;

    let response;
    const getId = async (uid) => {




      let uploadLogoTask = null;
      let logoUrl = null;
      if (file) {
        logoUrl = getLogoUrl(uid, file);
        uploadLogoTask = uploadLogo(uid, file);
      }
      const userData = {
        name,
        email,
        location,
        logoUrl,
        createdAt,
        isAdmin
      };

      const createUserDbTask = createDocument('users', uid, userData);

      const actionCodeSettings = {
        url: process.env.REACT_APP_LOGIN_PAGE_URL,
        handleCodeInApp: true,
      };

      const sendSignInLinkToEmailTask = firebase
        .auth()
        .sendSignInLinkToEmail(email, actionCodeSettings);

      try {

        await Promise.all([
          uploadLogoTask,
          createUserDbTask,
          sendSignInLinkToEmailTask,
        ]);
      } catch (error) {
        const errorMessage = firebaseError(error.code, locale);
        // toastr.error('', errorMessage);
        return dispatch(
          USERS_CREATE_USER_FAIL({
            error: errorMessage,
          })
        );
      }
      // toastr.success('', 'User created successfully');
      return dispatch(USERS_CREATE_USER_SUCCESS({
        user: response.data
      }));
    };
    const myid = firebase.auth().createUserWithEmailAndPassword(emailval, passval)
      .then(function (firebaseUser) {

        console.log("User ", firebaseUser.user.uid, " created successfully!");
        getId(firebaseUser.user.uid);
        
        // updateFirestore(form, firebaseUser.uid);
        
        // database.ref("users").push({
          //   email: emailval,
          //   name: nameval,
          //   location: locationval,
          //   file: fileval,
          //   createdAt: createdAtval,
          //   isAdmin: isAdminval,
          
          // });
          
          toastr.success('Success', "User Register Successfully");
          return firebaseUser.user.uid;
      }).catch(function (error) {
        alert(error.message);
      });
    return myid;
  };
};

export const modifyUser = async ({
  name,
  location,
  isAdmin,
  file,
  createdAt,
  id,
  isEditing,
  isProfile,
}) => {
  return async (dispatch, getState) => {

    dispatch(USERS_MODIFY_USER_INIT());
    const {
      locale
    } = getState().preferences;
    const user = isProfile ?
      getState().auth.userData :
      getState().users.data.find((thisUser) => thisUser.id === id);
    const logo = user;
    const logoUrl = logo?.logoUrl
    let deleteLogoTask;
    let uploadLogoTask;
    let newLogoUrl = null;
    if (file) {
      newLogoUrl = getLogoUrl(id, file);
      deleteLogoTask = logoUrl && deleteLogo(logoUrl);
      uploadLogoTask = uploadLogo(id, file);
    }
    const userData = {
      name,
      location,
      createdAt,
      isAdmin: isAdmin || user?.isAdmin || false,
      logoUrl: logoUrl || newLogoUrl,
    };
    const updateUserDbTask = updateDocument('users', id, userData);

    try {
      await Promise.all([deleteLogoTask, uploadLogoTask, updateUserDbTask]);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(
        USERS_MODIFY_USER_FAIL({
          error: errorMessage,
        })
      );
    }

    const {
      uid
    } = firebase.auth().currentUser;

    if (id === uid) {
      dispatch(AUTH_UPDATE_USER_DATA({
        ...userData,
        id
      }));
    }

    if (isProfile) {
      toastr.success('', 'Profile updated successfully');
    } else if (isEditing) {
      toastr.success('', 'User updated successfully');
    }

    return dispatch(USERS_MODIFY_USER_SUCCESS({
      user: userData,
      id
    }));
  };
};

export const usersCleanUp = () => (dispatch) => dispatch(USERS_CLEAN_UP());