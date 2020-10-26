/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import jwt from '../../http/requests/auth/jwt/index.js'


import router from '@/router'
import axios from "../../axios";

export default {

    // JWT
    loginJWT({commit}, payload) {

        return new Promise((resolve, reject) => {
            jwt.login(payload.userDetails.email, payload.userDetails.password)
                .then(response => {

                    // If there's user data in response
                    if (response.data.userData) {
                        // Navigate User to homepage
                        router.push(router.currentRoute.query.to || '/')

                        // Set accessToken
                        localStorage.setItem('accessToken', response.data.accessToken)

                        // Update user details
                        commit('UPDATE_USER_INFO', response.data.userData, {root: true})

                        // Set bearer token in axios
                        commit('SET_BEARER', response.data.accessToken)

                        resolve(response)
                    } else {
                        reject({message: 'Wrong Email or Password'})
                    }

                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    registerUserJWT({commit}, payload) {

        const {displayName, email, password, confirmPassword} = payload.userDetails

        return new Promise((resolve, reject) => {

            // Check confirm password
            if (password !== confirmPassword) {
                reject({message: 'Password doesn\'t match. Please try again.'})
            }

            jwt.registerUser(displayName, email, password)
                .then(response => {
                    // Redirect User
                    router.push(router.currentRoute.query.to || '/')

                    // Update data in localStorage
                    localStorage.setItem('accessToken', response.data.accessToken)
                    commit('UPDATE_USER_INFO', response.data.userData, {root: true})

                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    fetchAccessToken() {
        return new Promise((resolve) => {
            jwt.refreshToken().then(response => {
                resolve(response)
            })
        })
    },
    retrieveToken({commit}, credentials) {
        return new Promise((resolve, reject) => {
            axios.post('/login', {
                username: credentials.username,
                password: credentials.password,
            }).then((response) => {
                // commit('UPDATE_USER_INFO', response.data.userData, {root: true});
                const token = response.data.access_token
                if (token !== undefined) {
                    localStorage.setItem('access_token', token);
                    commit('SET_TOKEN', token, {root: true});
                }
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    destroyToken({commit}) {
        return new Promise(((resolve, reject) => {
            axios.post('/logout', '').then((response) => {
                localStorage.removeItem('access_token');
                commit('DESTROY_TOKEN', '', {root: true});
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        }))
    },
}
