<template>
    <div>
        <vs-row vs-w="12">
            <vs-col>
                <vs-input class="w-full" label-placeholder="Campaign Name" v-model="form_fields.campaign_name"/>
                <span class="error" v-if="submit && validateCampaignName">Campaign name is required!</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-3">
            <vs-col>
                <label for="Offer">Select Language:</label>
                <v-select label="lang" id="Language" :options="lang_list"
                          v-model="form_fields.lang"
                          :reduce="lang => lang.id"/>
                <span class="error" v-if="submit && validateOffer">Language is required!</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-3">
            <vs-col>
                <label for="Offer">Select Offer:</label>
                <v-select label="offer_name" id="Offer" :options="offers_list"
                          v-model="form_fields.offer_id"
                          :reduce="offer => offer.offer_id"/>
                <span class="error" v-if="submit && validateOffer">Offer is required!</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-3 mb-3">
            <vs-col>
                <label for="Rotator">Select Rotator:</label>
                <v-select label="rotator_name" id="Rotator" :options="rotators_list"
                          v-model="form_fields.rotator_id"
                          :reduce="rotator => rotator.id"/>
                <span class="error" v-if="submit && validateRotator">Rotator is required!</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-3">
            <vs-col>
                <label for="Postback">Select Postback:</label>
                <v-select label="pixel_name" id="Postback" :options="pixels_list"
                          v-model="form_fields.pixel_id"
                          :reduce="pixel => pixel.id"/>
                <span class="error" v-if="submit && validatePostback">Postback is required!</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-3">
            <vs-col>
                <label for="Iframe">Select Iframe pixel(optional):</label>
                <v-select label="iframe_name" id="Iframe" :options="iframe_list"
                          v-model="form_fields.iframe_id"
                          :reduce="iframe => iframe.id"/>
                <span class="info">Select iframe pixel to associated with the campaign</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-3 mb-3">
            <vs-col>
                <label for="Platform">Select Platform(optional):</label>
                <v-select label="platform_name" id="Platform" :options="platform_list"
                          v-model="form_fields.platform_id"
                          :reduce="platform => platform.id"/>
                <span class="info">Select platform associated with the campaign</span>
            </vs-col>
        </vs-row>
        <vs-divider/>
        <div class="mt-3 mb-3">
            <p class="info">Select form fields you wish to display for this campaign</p>
            <p class="mb-3 info">By default all fields will be displayed</p>
            <vs-row vs-w="12" vs-type="flex" vs-justify="space-between">
                <vs-col vs-w="3">
                    <ul class="centerx">
                        <li class="mt-2 mb-2">
                            <vs-checkbox v-model="form_fields.settings.first_name">First Name</vs-checkbox>
                        </li>
                        <li class="mt-2 mb-2">
                            <vs-checkbox v-model="form_fields.settings.last_name">Last Name</vs-checkbox>
                        </li>
                        <li class="mt-2 mb-2">
                            <vs-checkbox v-model="form_fields.settings.country">Country</vs-checkbox>
                        </li>
                        <li class="mt-2 mb-2">
                            <vs-checkbox v-model="form_fields.settings.phone">Phone</vs-checkbox>
                        </li>
                        <li class="mt-2 mb-2">
                            <vs-checkbox v-model="form_fields.settings.email">Email</vs-checkbox>
                        </li>
                        <li class="mt-2 mb-2">
                            <vs-checkbox v-model="form_fields.settings.password">Password</vs-checkbox>
                        </li>
                    </ul>
                </vs-col>
                <vs-col vs-w="9">
                    <p class="input_like--label" v-if="form_fields.settings.first_name">First Name:</p>
                    <p class="input_like--p" v-if="form_fields.settings.first_name"></p>
                    <p class="input_like--label" v-if="form_fields.settings.last_name">Last Name:</p>
                    <p class="input_like--p" v-if="form_fields.settings.last_name"></p>
                    <p class="input_like--label" v-if="form_fields.settings.country">Country:</p>
                    <p class="input_like--p" v-if="form_fields.settings.country"></p>
                    <p class="input_like--label" v-if="form_fields.settings.phone">Phone:</p>
                    <p class="input_like--p" v-if="form_fields.settings.phone"></p>
                    <p class="input_like--label" v-if="form_fields.settings.email">Email:</p>
                    <p class="input_like--p" v-if="form_fields.settings.email"></p>
                    <p class="input_like--label" v-if="form_fields.settings.password">Password:</p>
                    <p class="input_like--p" v-if="form_fields.settings.password"></p>
                    <p class="input_like--submit">Submit</p>
                </vs-col>
            </vs-row>
        </div>
        <vs-row vs-w="12" class="mt-5">
            <vs-col>
                <vs-button @click="save" color="success" type="filled">Save</vs-button>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
    import axios from "../../../axios";
    import vSelect from "vue-select";

    export default {
        name: "AddCampaignComponent",
        props: ['ci'],
        components: {
            'v-select': vSelect,
        },
        data: () => {
            return {
                submit: false,
                form_fields: {
                    campaign_name: '',
                    pixel_id: '',
                    iframe_id: '',
                    offer_id: '',
                    rotator_id: '',
                    platform_id: '',
                    lang: '',
                    ci: null,
                    settings: {
                        first_name: true,
                        last_name: true,
                        country: true,
                        phone: true,
                        email: true,
                        password: true,
                    }
                },
                pixels_list: [],
                iframe_list: [],
                rotators_list: [],
                offers_list: [],
                lang_list: [],
                platform_list: [
                    {id: 1, platform_name: 'Facebook'},
                    {id: 2, platform_name: 'Google'},
                    {id: 3, platform_name: 'Pinterest'},
                ],
            }
        },
        methods: {
            save: function () {
                this.submit = true;
                if (this.validateCampaignName || this.validateOffer || this.validatePostback || this.validateRotator) {
                    return false;
                }
                this.$vs.loading();
                this.form_fields.ci = this.ci == null ? 0 : this.ci;
                axios.post('campaigns/store', this.form_fields)
                    .then((response) => {
                        if (!response.data.status) {
                            throw response.data;
                        }
                        // if ("status" in response.data && !response.data.status) {
                        //     throw response.data;
                        // }
                        location.reload();
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
            getPixels: function () {
                axios.get('pixels/all')
                    .then((response) => {
                        if ("status" in response.data) {
                            throw response.data;
                        }
                        this.pixels_list = response.data;
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
            getRotators: function () {
                axios.get('rotators/get')
                    .then((response) => {
                        if ("status" in response.data) {
                            throw response.data;
                        }
                        this.rotators_list = response.data;
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
            getOffers: function () {
                axios.get('offers/get')
                    .then((response) => {
                        if ("status" in response.data) {
                            throw response.data;
                        }
                        this.offers_list = response.data;
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
            getLang: function () {
                axios.get('lang/get')
                    .then((response) => {
                        if ("status" in response.data) {
                            throw response.data;
                        }
                        this.lang_list = response.data;
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
            getCampaign: function () {
                this.$vs.loading();
                axios.get('campaigns/get/' + this.ci)
                    .then((response) => {
                        this.form_fields.campaign_name = response.data[0].campaign_name;
                        this.form_fields.offer_id = response.data[0].offer_id;
                        this.form_fields.rotator_id = response.data[0].rotator_id;
                        this.form_fields.platform_id = Number(response.data[0].platform);
                        this.form_fields.pixel_id = Number(response.data[0].pixel_id);
                        this.form_fields.iframe_id = Number(response.data[0].iframe_id);
                        this.form_fields.lang = Number(response.data[0].lang_id);
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
            getIframePixels: function () {
                this.$vs.loading();
                axios.get('iframe/get')
                    .then((response) => {
                        this.iframe_list = response.data;
                        this.$vs.loading.close();
                    })
                    .catch(error => {
                        console.log(error);
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
            destroyCI: function () {
                this.$emit('destroyci');
            }
        },
        computed: {
            validateCampaignName() {
                return this.form_fields.campaign_name === '';
            },
            validateOffer() {
                return this.form_fields.offer_id === '';
            },
            validatePostback() {
                return this.form_fields.pixel_id === '';
            },
            validateRotator() {
                return this.form_fields.rotator_id === '' && this.form_fields.offer_id === '';
            }
        },
        beforeMount() {
            this.getRotators();
            this.getPixels();
            this.getIframePixels();
            this.getOffers();
            this.getLang();
            if (this.ci !== null) {
                this.getCampaign();
            }
        },
        destroyed() {
            this.destroyCI();
        }
    }
</script>

<style scoped>
    .info {
        color: #ff9f43;
        font-weight: 600;
    }

    .input_like--label {

    }

    .input_like--p {
        max-width: 200px;
        width: 100%;
        height: 30px;
        border: 1px solid;
        border-radius: 5px;
    }

    .input_like--submit {
        max-width: 80px;
        width: 100%;
        text-align: center;
        padding: 3px 5px;
        border: 1px solid;
        border-radius: 5px;
        margin-top: 5px;
    }

    .error {
        color: red;
        margin: 2px 0;
    }
</style>