<template>
    <div class="overly-modal" @click.self="this.$emit('closeModal')"></div>
    <div class="login-register-content">

  
        <div class="login-register">
            <div v-if="login_register_form" class="register-form">
                <form  class="register-form mb-lg-4" @submit.prevent="this.$emit('register', register_form)">
                    <h2>Register</h2>
                    <input type="text" name="name" id="name" placeholder="Name" v-model="register_form.name">
                    <input type="email" placeholder="Email" name="" v-model="register_form.email">
                    <input type="password" placeholder="Password" name="" v-model="register_form.password">
                    <input class="btn btn-primary" type="submit" value="Rgistre">
                </form>
                <div class="login-register-link">
                    <span @click="login_register_form= !login_register_form">Login</span>
                </div>
            </div>
            <div v-else class="login-form">
                <form  class="login-form mb-lg-4" @submit.prevent="this.$emit('login', login_form)">
                    <h2>Login</h2>
                    <input type="email" placeholder="Email" name="" v-model="login_form.email">
                    <input type="password" placeholder="Password" name="" v-model="login_form.password">
                    <input type="submit" class="btn btn-primary" value="Login">
                </form>
                <div class="login-register-link">
                    <span @click="login_register_form= !login_register_form">Create Account</span>
                </div>
            </div>
        </div> 


    </div>
</template>

<script>
export default {
    data() {
        return {
            login_form:{},
            register_form:{},
            login_register_form: false,
        }
    },
}
</script>

<style>

</style>