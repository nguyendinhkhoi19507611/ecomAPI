import db from "../models/index";
import bcrypt from "bcryptjs";
import emailService from "./emailService";
import { v4 as uuidv4 } from 'uuid';
import CommonUtils from '../utils/CommonUtils';
const { Op } = require("sequelize");
require('dotenv').config();
const salt = bcrypt.genSaltSync(10);

let buildUrlEmail = (token, userId) => {

    let result = `${process.env.URL_REACT}/verify-email?token=${token}&userId=${userId}`;
    return result;
}

let hashUserPasswordFromBcrypt = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
let handleCreateNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.lastName) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let check = await checkUserEmail(data.email);
                if (check === true) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Your email is already in used, Plz try another email!'
                    })
                } else {
                    let hashPassword = await hashUserPasswordFromBcrypt(data.password);
                    await db.User.create({
                        email: data.email,
                        password: hashPassword,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        roleId: data.roleId,
                        genderId: data.genderId,
                        phonenumber: data.phonenumber,
                        image: data.avatar,
                        dob: data.dob,
                        isActiveEmail: 0,
                        statusId: 'S1',
                        usertoken: '',
                    })
                    resolve({
                        errCode: 0,
                        message: 'OK'
                    })
                }

            }

        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    handleCreateNewUser: handleCreateNewUser,

}