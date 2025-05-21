<template>
    <v-container class="d-flex justify-center align-center fill-height">
        <v-card class="pa-6" max-width="400">
            <v-card-title class="text-h5">Login</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                        v-model="email"
                        label="Email"
                        type="email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>
                    <v-btn
                        class="mt-4"
                        block
                        color="primary"
                        @click="login"
                    >
                        Login
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            if (this.email && this.password) {
                // Handle login logic here
                console.log('Logging in with:', this.email, this.password);
            } else {
                alert('Please fill in all fields.');
            }
        },
    },
};
</script>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>