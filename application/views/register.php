<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login/Registration</title>
  <link rel="stylesheet" href="<?php echo base_url() ;?>assets/css/css.css">
 
</head>
<body>
  <video class="video-bg" autoplay muted loop play-inline>
    
    <source src="<?php echo base_url();?>assets/img/lifeAndDeath.mkv" type="video/mp4">
  </video>
  <div id="app">
    <div class="main">
      <div class="container a-container" id="a-container">
        <form class="form" id="a-form" method="" action="">
          <h2 class="form_title title">Create Account</h2>
 
          <input class="form__input" type="text" placeholder="Name" name="username" v-model.trim="register.username">
          <input class="form__input" type="email" placeholder="Email" name="email" v-model.trim="register.email" :class="class_name" @keyup="checkEmail()">
		  		<span :class="[dynamic_class ? 'success' : 'danger']">{{ message }}</span>
          <input class="form__input" type="password" placeholder="Password" name="password" v-model.trim="register.password" >
          <input class="form__input" type="password" placeholder="Re-Password" name="password" v-model="Repassword" >
          	<button type="submit" class="form__button button submit" :disabled="is_disable" @click="addUser()">SIGN UP</button>
        </form>
      </div>
      <div class="container b-container" id="b-container">
        <form class="form" id="b-form" method="" action=" ">
          <h2 class="form_title title">Sign In</h2>
 
          <input class="form__input" type="email" placeholder="Email" name="email" v-model.trim="signIn.email" >
          <input class="form__input" type="password" placeholder="Password" name="password" v-model.trim="signIn.password" >
					<a href="<?php echo base_url();?>index.php/HomeAPI/index">
          	<button class="form__button button submit" type="submit" @click="checksignIn()" > SIGN IN</button>
					</a>
        </form>
      </div>
      <div class="switch" id="switch-cnt">
        <div class="switch__circle"></div>
        <div class="switch__circle switch__circle--t"></div>
        <div class="switch__container" id="switch-c1">
          <h2 class="switch__title title">Welcome Back !</h2>
          <p class="switch__description description">To keep connected with us please login with your personal info</p>
          <button class="switch__button button switch-btn">SIGN IN</button>
        </div>
        <div class="switch__container is-hidden" id="switch-c2">
          <h2 class="switch__title title">Hello Friend !</h2>
          <p class="switch__description description">Enter your personal details and start journey with us</p>
          <button class="switch__button button switch-btn">SIGN UP</button>
        </div>
      </div>
    </div>
  </div>

  	<script type="text/javascript" src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  	<script src="<?php echo base_url() ;?>assets/javascript/register.js"></script>
 
</body>
</html>
