'use strict';

class Validator {
    constructor(){
        this.invalidEmailError = 'Write a valid email';
        this.passwordError = 'Your password must have at least 6 letters';
        this.invalidAccess = 'Your email or your password are incorrect';

        this.errorForms = {
            errorEmailMsg: this.invalidEmailError,
            errorPassMsg: this.passwordError,
        }
    }

    validateEmail = (e, str) => {
        let parent = e.target.parentNode;
        let formEl = e.target;

        if(!this.emailIsValid(str)){
            console.log('EMAIL INVALIDO')
            this.errorForms.errorEmailMsg = this.invalidEmailError;
        } else {
            console.log('EMAIL VALIDO')
            delete this.errorForms.errorEmailMsg;
        }

        this.checkValidationMsg(e, this.errorForms.errorEmailMsg || null)

    }

    emailIsValid = (email) => {
        // RegEx objeto special - contiene las reglas de la sintaxis
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        
        // metodo `test` prueba si la cadena cumple las reglas
        // y devuelve `true` o `false`
        const isValid = emailRegEx.test(email);
        
        //console.log(`Is a valid email: ${isValid}`)
        return isValid;      
    }

    validatePassWord = (e, str) => {
        if(str.length < 6){
            this.errorForms.errorPassMsg = this.passwordError
        } else {
            delete this.errorForms.errorPassMsg
        }

        this.checkValidationMsg(e, this.errorForms.errorPassMsg || null)
    }


    checkValidationMsg = (e, msgErr) => {

        let formEl = e.target;
        let parent = formEl.parentNode;

        if(msgErr === null || msgErr === undefined){
            msgErr = null
        }
        
        // Comprobamos si sigue existiendo el error
        if(this.getErrors().find(error => error === msgErr) && msgErr !== null){
            if(parent.querySelectorAll('.invalid-feedback').length === 0){
                let msg = document.createElement('div');
                msg.classList.add('invalid-feedback', 'message');
                msg.textContent = msgErr;
                parent.appendChild(msg);
            }
            formEl.classList.toggle('is-valid');
            formEl.classList.add('is-invalid');

        } else if(parent.querySelectorAll('.invalid-feedback').length !== 0){
            
            let errorMsg = parent.querySelector('.invalid-feedback');
            errorMsg.parentNode.removeChild(errorMsg);
            
            formEl.classList.remove('is-invalid')
            formEl.classList.add('is-valid')

        } else {

            formEl.classList.add('is-valid');
        }
    }

    getErrors(){
        return Object.values(this.errorForms)
    }

}

const validation = new Validator();