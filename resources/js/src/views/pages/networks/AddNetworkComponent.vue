<template>
    <div>
        <vs-row vs-w="12">
            <vs-col>
                <vs-input class="w-full" label-placeholder="Network Name" v-model="fields.network_name"/>
                <span class="error" v-if="submit && validateNetworkName">Network name is required!</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" v-for="(item, index) in fields.tokens" class="mb-3 mt-3">
            <vs-col vs-w="4">
                <vs-input class="w-full" label-placeholder="Token Name" v-model="item.token_name"/>
                <!--                <span class="error" v-if="submit && validateTokenName">Token name is required!</span>-->
            </vs-col>
            <vs-col vs-w="4" class="mr-3 ml-3">
                <vs-input class="w-full" label-placeholder="Token" v-model="item.token"/>
                <!--                <span class="error" v-if="submit && validateToken">Token is required!</span>-->
            </vs-col>
            <vs-col vs-w="2">
                <vs-button @click="removeToken(index)" class="mt-5" icon-pack="feather" icon="icon-minus-square" type="border"
                           color="dark" :disabled="fields.tokens.length <= 1"></vs-button>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12">
            <vs-col>
                <vs-button size="small" @click="AddToken" color="dark" type="border">+ Add Token</vs-button>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-5">
            <vs-col>
                <vs-button @click="save" color="success" type="filled">Save</vs-button>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
    import axios from "../../../axios";

    export default {
        name: "AddNetworkComponent",
        data: () => {
            return {
                submit: false,
                fields: {
                    network_name: '',
                    network_id: 0,
                    status: 1,
                    tokens: [
                        {token_name: '', token: ''}
                    ]
                }
            }
        },
        methods: {
            save: function () {
                this.submit = true;
                if (this.validateNetworkName) {
                    return
                }
                axios.post('networks/store', this.fields)
                    .then((response) => {
                        if (!response.data.status) {
                            throw response.data
                        }
                        location.reload();
                    })
                    .catch(error => {
                        this.$vs.notify({
                            title: 'Error',
                            text: error.msg,
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'warning'
                        })
                    })
            },
            AddToken: function () {
                this.fields.tokens.push({token_name: '', token: ''});
            },
            removeToken: function (index) {
                this.fields.tokens.splice(index, 1);
            },
        },
        computed: {
            validateNetworkName() {
                return this.fields.network_name === '';
            },
            // validateTokenName() {
            //     return this.fields.token_name === '';
            // },
            // validateToken() {
            //     return this.fields.token === '';
            // },
        }
    }
</script>

<style scoped>

</style>