import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveToken(data){
    try {
        const jsonString = JSON.stringify(data);
        await AsyncStorage.setItem('user_token', jsonString);
    } catch (error) {
        console.log('error', error);
    }
}

export const getToken = async () => {
    try{
        let token = await AsyncStorage.getItem('user_token');
        return JSON.parse(token);
    } catch (error) {
        console.log('error', error);
        return null;
    }
}


export async function saveSouscrir(data){
    try {
        await AsyncStorage.setItem('souscrir_info', JSON.stringify(data));
    } catch (error) {
        console.log('error', error);
    }
}

/**
 * Retourne le pays selectionné dans AsyncStorage
 * 
 */
export const getSouscrir = async () => {
    try{
        let panier = await AsyncStorage.getItem('souscrir_info');
        
        panier = JSON.parse(panier);

        panier = panier ? panier : [];

        return panier;
    } catch (error) {
        console.log('error', error);
        return [];
    }
}


export async function saveLanguage(data){
    try {
        await AsyncStorage.setItem('language_info', JSON.stringify(data));
    } catch (error) {
        console.log('error', error);
    }
}

export async function removeLanguage(){
    try {
        await AsyncStorage.removeItem('language_info');
    } catch (error) {
        console.log('error', error);
    }
}

export async function getLanguage(){
    try {
        let language = await AsyncStorage.getItem('language_info');
        return JSON.parse(language);
    } catch (error) {
        console.log('error', error);
    }
}



// STORAGE GET SOUSCRIR
export async function saveSouscrirData(data){
    try {
        await AsyncStorage.setItem('souscrir_obj', JSON.stringify(data));
    } catch (error) {
        console.log('error', error);
    }
}

export async function getSouscrirData(){
    try {
        let souscrir_data = await AsyncStorage.getItem('souscrir_obj');
        souscrir_data = JSON.parse(souscrir_data);

        return souscrir_data;
        // return JSON.parse(verify_code);
    } catch (error) {
        console.log('error', error);
    }
}

export async function removeSouscrirData(){
    try {
        let souscrir_data = await AsyncStorage.remove('souscrir_obj');

        return souscrir_data;
        // return JSON.parse(verify_code);
    } catch (error) {
        console.log('error', error);
    }
}


// SOTRAGE DURREE
export async function saveDurre(data){
    try {
        await AsyncStorage.setItem('durre_obj', JSON.stringify(data));
    } catch (error) {
        console.log('error', error);
    }
}

export async function getDurre(){
    try {
        let verify_code = await AsyncStorage.getItem('durre_obj');

        return JSON.parse(verify_code);
        // return JSON.parse(verify_code);
    } catch (error) {
        console.log('error', error);
    }
}


// Sotrage of Verify Account

export async function saveCode(data){
    try {
        await AsyncStorage.setItem('verify_code', JSON.stringify(data));
    } catch (error) {
        console.log('error', error);
    }
}

export async function getCode(){
    try {
        let verify_code = await AsyncStorage.getItem('verify_code');
        return JSON.parse(verify_code);
    } catch (error) {
        console.log('error', error);
    }
}


// Sotrage of Verify Email

export async function saveEmailCode(data){
    try {
        await AsyncStorage.setItem('verify_email', JSON.stringify(data));
    } catch (error) {
        console.log('error', error);
    }
}

export async function getEmailCode(){
    try {
        let verify_email = await AsyncStorage.getItem('verify_email');
        return JSON.parse(verify_email);
    } catch (error) {
        console.log('error', error);
    }
}
