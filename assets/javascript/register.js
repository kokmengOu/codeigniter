const { createApp } = Vue


const app = createApp({
  data() {
    return {
      url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
	  dynamic_class : true,
	  dynamic_login_class : true,
	  message : null,
	  is_disable : false,
	  login_is_disable : false,
	  class_name : '',
	  login_class_name : '',
	  login_message : '',
	  Repassword : null,
	  register:{
		username: null,
        email : null,
        password : null,
		repassword: null,
	  },
	  signIn :{
		email : null,
        password : null
	  },
	  isInvalid: '',

    }
  },

  methods: {

	checkEmail(){
		if(this.register.email.length > 2)
		{
			const form = new FormData();
			form.append("email", this.register.email);
			axios.post(this.url + "UserAPI/checkEmail" , form)
			.then((response) => {
				if(response.data.is_available != "yes" )
				{
					console.log(response.data.is_available);
					this.dynamic_class = true;
					this.message = 'This Email is Available for registration';
					this.class_name = 'success'
				}else{
					this.dynamic_class = false;
					this.message = 'This email is already registered';
					this.class_name = 'danger';
				}
			})
		}
	},
	

    addUser(){
		if( this.register.username != '' && this.register.username != null )  {
			if (this.register.email != '' && this.register.email != null) {
				if (this.register.password != '' && this.register.password != null) {
					if (this.register.repassword != '' && this.register.repassword != null) {
						if(this.register.password == this.register.repassword){
							const form = new FormData();
							form.append("username", this.register.username);
							form.append("email" , this.register.email);
							form.append("password", this.register.password);
							axios.post(this.url + "UserAPI/register_post" , form)
								.then(() => {
									alert("You have been successfully registered , Please sign in you account");
									window.location.assign(this.url + 'UserAPI/index');
								}).catch((err) => {
									console.log(err);
								});
						}else{
							alert('Password need to be match Re-password');
						}
					}else{
						alert('Need Re-password');
					}
				}else{
					alert('Need Password');
				}
			}else{
				alert('Need email');
			}
		}else{
			alert('Need username');
		}
    },

		checksignIn(){

			if (this.signIn.email != '' && this.signIn.email != null) {
				if (this.signIn.password != '' && this.signIn.password != null) {
					const form = new FormData();
					form.append('email', this.signIn.email);
					form.append('password', this.signIn.password);
					axios.post(this.url + "UserAPI/login_post", form)
						.then((result) => {
							console.log(result.data.login_is_available);
							window.location.assign(this.url + "HomeAPI/index");
						})
				} else {
					alert('Need password');
				}
			} else {
				alert('Need email');
			}
		}
	}

})

app.mount("#app");

// Code By Webdevtrick ( https://webdevtrick.com )s
let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

let getButtons = (e) => e.preventDefault()

let changeForm = (e) => {

    switchCtn.classList.add("is-gx");
    setTimeout(function(){
        switchCtn.classList.remove("is-gx");
    }, 1500)

    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200");
}

let mainF = (e) => {
    for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons );
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
}

window.addEventListener("load", mainF);
