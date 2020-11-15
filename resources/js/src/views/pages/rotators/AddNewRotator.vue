<template>
    <div>
        <vs-row vs-w="12">
            <vs-col>
                <vs-input class="w-full" label-placeholder="Rotator Name" v-model="form_fields.rotator_name"/>
                <span class="error" v-if="submit && validateRotatorName">Rotator name is required!</span>
            </vs-col>
        </vs-row>
        <vs-divider/>
        <h5>{{weightErr.msg}}</h5>
        <vs-divider/>
        <vs-row vs-w="12" v-for="(item, index) in form_fields.networks">
            <vs-col vs-w="4">
                <label for="Network">Network:</label>
                <v-select label="network_name" id="Network" :options="networks_list"
                          v-model="item.network_id"
                          :reduce="network => network.id"/>
            </vs-col>
            <vs-col vs-w="2" class="ml-3 mr-3">
                <vs-input @keyup="validateWeight(item.weight)" class="w-full" label-placeholder="Weight"
                          v-model="item.weight"/>
            </vs-col>
            <vs-col vs-w="2">
                <vs-input class="w-full" label-placeholder="Priority" v-model="item.priority"/>
            </vs-col>
            <vs-col vs-w="2" class="ml-3">
                <vs-button @click="removeNetwork(index)" class="mt-5" icon-pack="feather" icon="icon-minus-square" type="border"
                           color="dark" :disabled="form_fields.networks.length <= 1"></vs-button>
            </vs-col>
        </vs-row>
        <vs-row class="mt-4">
            <vs-col>
                <vs-button @click="addNetwork" color="dark" type="border">Add network</vs-button>
            </vs-col>
        </vs-row>
        <vs-divider/>
        <vs-row vs-w="12" vs-type="flex" vs-justify="flex-end" vs-align="center" class="mt-5">
            <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center">
                <vs-button :disabled="NaNWeight" @click="save" color="success" type="filled">Save</vs-button>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
    import axios from "../../../axios";
    import vSelect from "vue-select";

    export default {
        name: "AddNewRotator",
        props: ['ri'],
        components: {
            'v-select': vSelect,
        },
        data: () => {
            return {
                NaNWeight: false,
                submit: false,
                networks_list: [],
                form_fields: {
                    rotator_name: '',
                    networks: [{
                        network_id: '',
                        weight: '',
                        priority: '',
                    }],
                    status: 1,
                    rotator_id: 0,
                },
                weightErr: {
                    msg: '',
                },
                maxWeight: 100,
            }
        },
        methods: {
            getNetworks: function () {
                axios.get('networks/get')
                    .then((response) => {
                        if ("status" in response.data) {
                            throw response.data;
                        }
                        this.networks_list = response.data;
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
            destroyRI: function () {
                this.$emit('destroyri');
            },
            addNetwork: function () {
                this.form_fields.networks.push({network_id: '', weight: '', priority: ''});
            },
            removeNetwork: function (index) {
                this.form_fields.networks.splice(index, 1);
            },
            save: function () {
                this.$vs.loading();
                this.form_fields.rotator_id = this.ri == undefined ? 0 : this.ri;
                this.submit = true;
                if (this.validateRotatorName) {
                    this.$vs.loading.close();
                    return;
                }
                axios.post('rotators/store', this.form_fields)
                    .then((response) => {
                        if (!response.data.status) {
                            throw response.data.msg;
                        }
                        location.reload();
                    })
                    .catch(error => {
                        this.$vs.loading.close();
                        this.$vs.notify({
                            title: 'Error',
                            text: error,
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'warning'
                        })
                    })
            },
            getRotatorData: function () {
                this.$vs.loading();
                axios.get('rotators/get/' + this.ri)
                    .then((response) => {
                        this.form_fields.rotator_name = response.data[0].rotator_name;
                        this.form_fields.networks = response.data[0].rotator_group;
                        this.$vs.loading.close();
                    })
                    .catch(error => {
                        this.$vs.loading.close();
                        this.$vs.notify({
                            title: 'Error',
                            text: error.msg,
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'warning'
                        })
                    })
            },
            validateWeight: function (weight) {
                let startWeight = 0;
                if (isNaN(weight)) {
                    this.NaNWeight = true;
                    this.weightErr.msg = 'Weight must be a number'
                    return;
                }
                this.weightErr.msg = '';
                this.NaNWeight = false;
                for (let i = 0; i < this.form_fields.networks.length; i++) {
                    startWeight += Number(this.form_fields.networks[i].weight);
                    if (this.maxWeight < startWeight) {
                        this.NaNWeight = true;
                        this.weightErr.msg = 'Weight is above max percentage (100%)';
                    }
                }
            },
        },
        computed: {
            validateRotatorName() {
                return this.form_fields.rotator_name === '';
            }
        },
        beforeMount() {
            this.getNetworks();
            if (this.ri !== null) {
                this.getRotatorData();
            }
        },
        destroyed() {
            this.destroyRI();
        }
    }
</script>

<style scoped>

</style>