class Login{
    constructor(){
        this.emailInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password')
        this.buttonSubmit = document.getElementById('submitBtn');

        this.message = document.getElementById('messageResponse');
    }

    resetForm = () => {
        const fields = document.querySelectorAll('.form-control');
        fields.forEach(field => {
            field.classList.remove('is-valid')
        })

        this.emailInput.value = '';
        this.passwordInput.value = '';
    }

    addListeners = () => {

        // Asignamos eventos a los botones
        this.emailInput.addEventListener('blur', this.handleEmail)
        this.passwordInput.addEventListener('blur', this.handlePassword)
        this.buttonSubmit.addEventListener('click', this.submit)
    }

    submit = (e) => {
        e.preventDefault();
        this.handelLogin(e);
    }

    handelLogin = (e) => {

        if(this.emailInput.value === "" || this.passwordInput.value === "" ){
            this.message.classList.remove('is-valid');
            this.message.classList.add('is-invalid');
            this.message.innerHTML = 'Fields cannot be empty!'
            this.message.classList.remove('d-none');
            return;
        }

        e.target.form.submit()
    }

    init = () => {
        this.addListeners();
        this.resetForm();
        console.log('init');
    }
    
}

const login = new Login();

window.addEventListener('load', login.init)