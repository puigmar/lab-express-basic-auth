
class Signup{
    constructor(){
        this.emailInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.buttonSubmit = document.getElementById('submitBtn');
    }

    handleSpecie = (e) => {
        const specie = e.target.value;

        // validamos con validator
        validation.validateSpecies(e, specie);
        this.checkSubmitButton();
    }

    handleEmail = (e) => {
        const email = e.target.value;

        // validamos con validator
        validation.validateEmail(e, email);

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