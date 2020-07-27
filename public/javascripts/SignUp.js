
class Signup{
    constructor(){
        this.emailInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.nameInput = document.getElementById('name');
        this.buttonSubmit = document.getElementById('submitBtn');
    }

    handleEmail = (e) => {
        const email = e.target.value;

        // validamos con validator
        validation.validateEmail(e, email);

        this.checkSubmitButton();
    }

    handleName = (e) => {
        const name = e.target.value;

        // validamos con validator
        validation.validateName(e, name);

        this.checkSubmitButton();
    }

    handlePassword = (e) => {
        const password = e.target.value;
        // Validamos campo
        validation.validatePassWord(e, password);
        this.checkSubmitButton();
    }

    resetForm = () => {
        const fields = document.querySelectorAll('.form-control');
        fields.forEach(field => {
            field.classList.remove('is-valid')
            field.value = '';
        })

        this.emailInput.value = '';
        this.passwordInput.value = '';
    }

    saveUser = (e) => {
        e.preventDefault();
        
        const errors = Object.keys(validation.errorForms);

        if(errors.length === 0 ){
            e.currentTarget.form.submit();
        }
    }

    addListeners = () => {

        // Asignamos eventos a los botones
        this.emailInput.addEventListener('input', this.handleEmail)
        this.passwordInput.addEventListener('input', this.handlePassword)
        this.nameInput.addEventListener('input', this.handleName)
        this.nameInput.addEventListener('blur', this.handleName)
    }

    checkSubmitButton = () => {
        
        const errors = Object.keys(validation.errorForms);
        if(errors.length !== 0){
            this.buttonSubmit.disabled = true;
        } else {
            this.buttonSubmit.disabled = false;
        }
    }

    init(){
        this.addListeners();
        this.checkSubmitButton();
        this.resetForm();
    }
    
}

const signup = new Signup();

window.addEventListener('load', signup.init())
setTimeout(function(){
    signup.resetForm()
}, 400)