<template>
  <vs-card>
    <vs-row vs-type="flex" vs-justify="space-between" vs-align="center" vs-w="12">
      <vs-col vs-w="6" vs-type="flex" vs-justify="flex-start" vs-align="center">
        <div>
          <h3>Leads</h3>
        </div>
      </vs-col>
      <!--            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-end" vs-align="center">-->
      <!--                <vs-button @click="activePopup=true" color="primary" type="border">Resend leads</vs-button>-->
      <!--            </vs-col>-->
    </vs-row>
    <vs-divider/>
    <vs-row class="mt-5" vs-type="flex" vs-justify="space-evenly" vs-align="center" vs-w="12">
      <vs-col vs-w="2">
        <label for="Campaign">Campaigns:</label>
        <v-select class="w-11/12" label="campaign_name" id="Campaign" :options="campaigns_list"
                  v-model="filters.campaign_id"
                  :reduce="campaign => campaign.id"/>
      </vs-col>
      <vs-col vs-w="2">
        <label for="Network">Networks:</label>
        <v-select class="w-11/12" label="network_name" id="Network" :options="networks_list"
                  v-model="filters.network_id"
                  :reduce="network => network.id"/>
      </vs-col>
      <vs-col vs-w="2">
        <label for="Rotator">Rotators:</label>
        <v-select class="w-11/12" label="rotator_name" id="Rotator" :options="rotators_list"
                  v-model="filters.rotator_id"
                  :reduce="rotator => rotator.id"/>
      </vs-col>
      <vs-col vs-w="2">
        <label for="Country">Countries:</label>
        <v-select class="w-11/12" label="country_name" id="Country" :options="countries_list"
                  v-model="filters.country_id"
                  :reduce="country => country.country_iso_code"/>
      </vs-col>
      <vs-col vs-w="2">
        <label for="Type">Lead Type:</label>
        <v-select class="w-11/12" label="type" id="Type" :options="type_list"
                  v-model="filters.type"
                  :reduce="type => type.val"/>
      </vs-col>
      <vs-row class="mt-5" vs-type="flex" vs-justify="space-evenly" vs-align="center" vs-w="12">
        <vs-col vs-w="2">
          <datepicker class="w-11/12" @input="setDateRange" placeholder="Start Date"
                      v-model="filters.start_date"></datepicker>
        </vs-col>
        <vs-col vs-w="2">
          <datepicker class="w-11/12" @input="setDateRange" placeholder="End Date"
                      v-model="filters.end_date"></datepicker>
        </vs-col>
        <vs-col vs-w="2"></vs-col>
        <vs-col vs-w="2"></vs-col>
        <vs-col vs-w="2"></vs-col>
      </vs-row>
    </vs-row>
    <vs-divider/>
    <vs-row>
      <vs-col>
        <vs-table v-Hamodel="selected_leads" search :data="leads_list" max-items="25" pagination>
          <template slot="header">
            <vs-button @click="getLeads" color="primary" type="border">
              <i class="feather icon-refresh-cw"></i>
            </vs-button>
          </template>
          <template slot="thead">
            <vs-th sort-key="unique_id">ID</vs-th>
            <vs-th sort-key="campaign_name">Campaign</vs-th>
            <vs-th sort-key="rotator_name">Rotator</vs-th>
            <vs-th sort-key="network_name">Network</vs-th>
            <vs-th sort-key="offer_id">Offer</vs-th>
            <vs-th sort-key="country">Country</vs-th>
            <vs-th sort-key="first_name">First Name</vs-th>
            <vs-th sort-key="last_name">Last Name</vs-th>
            <vs-th sort-key="email">Email</vs-th>
            <vs-th sort-key="prefix">Prefix</vs-th>
            <vs-th sort-key="phone">Phone</vs-th>
            <vs-th sort-key="status">Type</vs-th>
            <vs-th sort-key="network_response">Network Response</vs-th>
            <vs-th sort-key="updated_at">Created</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr,indextr) in data">
              <vs-td class="text-sm" :data="data[indextr].unique_id">{{ data[indextr].unique_id }}</vs-td>
              <vs-td class="text-sm" v-if="data[indextr].campaign !== null" :data="data[indextr].campaign_name">
                {{ data[indextr].campaign_name }}
              </vs-td>
              <vs-td class="text-sm" v-else>Campaign not found!</vs-td>
              <vs-td class="text-sm" v-if="data[indextr].rotator_name !== null" :data="data[indextr].rotator_name">
                {{ data[indextr].rotator_name }}
              </vs-td>
              <vs-td class="text-sm" v-else>Rotator not found</vs-td>
              <vs-td class="text-sm" v-if="data[indextr].network_name !== null" :data="data[indextr].network_name">
                {{ data[indextr].network_name }}
              </vs-td>
              <vs-td class="text-sm" v-else>Network not found</vs-td>
              <vs-td class="text-sm" v-if="data[indextr].offer_id !== null" :data="data[indextr].offer_id">
                {{ data[indextr].offer_id }}
              </vs-td>
              <vs-td class="text-sm" v-else>Offer not found</vs-td>
              <vs-td class="text-sm" :data="data[indextr].country">{{ data[indextr].country }}</vs-td>
              <vs-td class="text-sm" :data="data[indextr].first_name">{{ data[indextr].first_name }}</vs-td>
              <vs-td class="text-sm" :data="data[indextr].last_name">{{ data[indextr].last_name }}</vs-td>
              <vs-td class="text-sm" :data="data[indextr].email">{{ data[indextr].email }}</vs-td>
              <vs-td class="text-sm" :data="data[indextr].prefix">{{ data[indextr].prefix }}</vs-td>
              <vs-td class="text-sm" :data="data[indextr].phone">{{ data[indextr].phone }}</vs-td>
              <vs-td v-if="data[indextr].status === 3" class="font-bold text-success text-sm"
                     :data="data[indextr].status">
                FTD
              </vs-td>
              <vs-td class="text-sm" v-else
                     :class="[data[indextr].status === 1 ? 'text-dark' : 'text-primary font-bold']"
                     :data="data[indextr].status">{{ data[indextr].status === 1 ? 'Click' : 'Lead' }}
              </vs-td>
              <vs-td class="text-sm text-danger" :data="data[indextr].network_response">
                <vx-tooltip title="Full" color="primary" :text="data[indextr].network_response" position="bottom">
                  {{ cutString(data[indextr].network_response) }}
                </vx-tooltip>
              </vs-td>
              <vs-td class="text-sm" :data="data[indextr].updated_at">
                {{ data[indextr].updated_at }}
              </vs-td>
              <template class="expand-user" slot="expand">
                <vs-list>
                  <vs-list-item v-for="(val,key) in urlParamsObj(data[indextr].url_params)"
                                :title="''" :subtitle="key+' : '+ val"></vs-list-item>
                </vs-list>
                <vs-list>
                  <vs-list-item title="UA" :subtitle="data[indextr].ua"></vs-list-item>
                  <vs-list-item title="IP" :subtitle="data[indextr].ip"></vs-list-item>
                  <vs-list-item title="Created" :subtitle="data[indextr].created_at"></vs-list-item>
                  <vs-list-item title="Updated" :subtitle="data[indextr].updated_at"></vs-list-item>
                  <vs-list-item v-if="(data[indextr].status === 1 && data[indextr].email && data[indextr].phone) || data[indextr].network_response" title="Resend to Network"
                                subtitle="Resend a leads to the same network">
                    <vs-button @click="sendLeads(data[indextr].unique_id, data[indextr].network_id)" color="primary"
                               type="border">
                      <i class="feather icon-send"></i>
                    </vs-button>
                  </vs-list-item>
                  <vs-list-item
                      v-if="(data[indextr].status === 1 && data[indextr].email && data[indextr].phone) || data[indextr].network_response"
                      title="Resend to Other Network" subtitle="Resend a leads to different networks">
<!--                    <vs-button @click="sendLeadsOtherNetwork(data[indextr], urlParamsObj(data[indextr].url_params))"-->
                    <vs-button @click="showModal(data[indextr], urlParamsObj(data[indextr].url_params))"
                               color="primary" type="border">
                      <i class="feather icon-send"></i>
                    </vs-button>
                  </vs-list-item>
                </vs-list>
                <br>
              </template>
            </vs-tr>
          </template>
        </vs-table>
      </vs-col>
    </vs-row>
    <vs-popup title="Send leads" :active.sync="activePopup">
      <vs-row>
        <vs-col>
          <p>Please select options from all of the filters below, in order the send leads:</p>
        </vs-col>
      </vs-row>
      <vs-row class="mt-5">
        <vs-col>
          <label for="LeadCampaign">Select Campaigns:</label>
          <v-select class="w-full" label="campaign_name" id="LeadCampaign" :options="campaigns_list"
                    v-model="resend.campaign"
                    :reduce="campaign => campaign.id"/>
        </vs-col>
      </vs-row>
      <vs-row class="mt-5">
        <vs-col>
          <label for="LeadNetwork">Select Network:</label>
          <v-select class="w-full" label="network_name" id="LeadNetwork" :options="networks_list"
                    v-model="resend.network"
                    :reduce="network => network.id"/>
        </vs-col>
      </vs-row>
      <vs-row class="mt-5">
        <vs-col>
          <vs-button @click="sendLeads" color="primary" type="border">Send</vs-button>
        </vs-col>
      </vs-row>
    </vs-popup>
    <modal v-if="isSelectNetworkVisible" @close="closeModal">
      <template v-slot:header>
        <p>Select Networks</p>
      </template>
      <template v-slot:body>
        <vs-list>
          <vs-list-item v-for="(network ,key) in networks_list" :title="''" :subtitle="network.network_name">
            <vs-button :id="'send_'+network.id" @click="sendLeadsOtherNetwork(network.id)" color="primary" type="border">
              Send Here
              <i class="feather icon-send"></i>
            </vs-button>
          </vs-list-item>
        </vs-list>
      </template>
    </modal>
  </vs-card>
</template>

<script>
import axios from "../../../axios";
import vSelect from "vue-select";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    'v-select': vSelect,
    flatPickr,
    Datepicker,
  },
  name: "IndexComponent",
  data: () => {
    return {
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i'
      },
      isSelectNetworkVisible: false,
      activePopup: false,
      leads_list: [],
      selected_leads: [],
      networks_list: [],
      selectedNetwork: {},
      selectNetworkData: {lead: {}, urlParameters: {}},
      campaigns_list: [],
      rotators_list: [],
      countries_list: [],
      networks_err_list: [],
      type_list: [
        {val: 1, type: 'Click'},
        {val: 2, type: 'Lead'},
        {val: 3, type: 'FTD'},
      ],
      filters: {
        network_id: '',
        campaign_id: '',
        rotator_id: '',
        country_id: '',
        type: '',
        datetime: '',
        start_date: '',
        end_date: ''
      },
      resend: {
        campaign: '',
        network: ''
      }

    }
  },
  methods: {
    showModal(lead, urlParameters) {
      this.isSelectNetworkVisible = true;
      // save current data to variable
      this.selectNetworkData = {
        ...lead,
        ...urlParameters
      };
    },
    closeModal() {
      this.isSelectNetworkVisible = false;
    },
    getLeads: function () {
      this.$vs.loading();
      axios.post('leads/get', this.filters)
          .then((response) => {
            if ("status" in response.data) {
              throw response.data;
            }
            this.leads_list = response.data;
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
    urlParamsObj: function (params) {
      return JSON.parse(params);
    },
    getNetworks: function () {
      axios.get('networks/get')
          .then((response) => {
            if ("status" in response.data) {
              throw response.data;
            }
            response.data.filter((item, index) => {
              this.networks_list.push(
                  {network_name: item.network_name + ' (' + item.id + ')', id: item.id}
              )
              this.selectedNetwork[item.id] = false;
            })
            // this.networks_list = response.data;
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
    getCampaigns: function () {
      this.$vs.loading();
      axios.get('campaigns/get')
          .then((response) => {
            if ("status" in response.data) {
              throw response.data;
            }
            response.data.filter((item, index) => {
              this.campaigns_list.push({campaign_name: item.campaign_name + ' (' + item.id + ')', id: item.id})
            });
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
    getRotators: function () {
      this.$vs.loading();
      axios.get('rotators/get')
          .then((response) => {
            response.data.filter((item, index) => {
              this.rotators_list.push(
                  {rotator_name: item.rotator_name + ' (' + item.id + ')', id: item.id}
              )
            })
            if (this.rotators_list.length === 0) {
              throw 'No rotators found'
            }
            this.$vs.loading.close();
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
    getCountries: function () {
      this.$vs.loading();
      axios.get('countries/get')
          .then((response) => {
            this.countries_list = response.data
            if (this.countries_list.length === 0) {
              throw 'No rotators found'
            }
            this.$vs.loading.close();
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
    cutString: function (str) {
      const length = 80;
      if (str === null) {
        return "";
      }
      if (str.length < length) {
        return str;
      }
      return str.substring(0, length) + '...';
    },
    sendLeads: function (uniqueId, network_id) {
      this.$vs.loading();
      let network = this.networks_list.filter(({id}) => id === network_id);
      axios.post('https://storsleads.club/api/form/lead', {
        uniqueId,
        network,
        network_name: network[0].network_name,
        network_id: network[0].id
      })
          .then((response) => {
            if (!response.data.status) {
              throw response.data.msg;
            }
            this.$vs.notify({
              title: 'Success',
              text: response.data.msg,
              iconPack: 'feather',
              icon: 'icon-smile',
              color: 'success'
            })
            this.getLeads();
            this.$vs.loading.close();
          })
          .then(() => {
            this.activePopup = false;
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
    randomPassword: function (max, min) {
      let passwordChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
          randPwLen = Math.floor(Math.random() * (max - min + 1)) + min,
          randPassword = Array(randPwLen).fill(passwordChars).map(function (x) {
            return x[Math.floor(Math.random() * x.length)]
          }).join('');
      let password_regex = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;
      while (!password_regex.test(randPassword)) {
        return this.randomPassword(9, 9);
      }
      return randPassword;
    },
    sendLeadsOtherNetwork: function (networkId) {
      console.log("networkId", networkId);
      console.log("this.selectNetworkData", this.selectNetworkData);
      let lead = this.selectNetworkData;
      let urlParameters = this.urlParamsObj(this.selectNetworkData.url_params);
      axios.post('form/lead', {
        fn: lead.first_name,
        ln: lead.last_name,
        country: lead.country,
        phone: lead.prefix + " " + lead.phone,
        email: lead.email,
        pwd: this.randomPassword(8, 8),
        ci: urlParameters.ci,
        ri: urlParameters.ri,
        network_id: networkId,
        resend_ip: lead.ip,
        offer_id: lead.offer_id,
      }).then((response) => {
        if(response.data.status) {
          document.getElementById(`send_${networkId}`).innerHTML = 'Sent';
          document.getElementById(`send_${networkId}`).style.borderColor = 'green';
          document.getElementById(`send_${networkId}`).style.color = 'green';
          document.getElementById(`send_${networkId}`).style.width = '149.094 px';
        } else {
          document.getElementById(`send_${networkId}`).innerHTML = 'Network Decline';
          document.getElementById(`send_${networkId}`).style.borderColor = 'red';
          document.getElementById(`send_${networkId}`).style.color = 'red';
          document.getElementById(`send_${networkId}`).style.width = '149.094 px';
        }
      }).catch((error) => {
        document.getElementById(`send_${networkId}`).innerHTML = 'Network Decline';
        document.getElementById(`send_${networkId}`).style.borderColor = 'red';
        document.getElementById(`send_${networkId}`).style.color = 'red';
        document.getElementById(`send_${networkId}`).style.width = '149.094 px';
      })
    },
    setDateRange: function () {
      let start_date = new Date(this.filters.start_date),
          end_date = new Date(this.filters.end_date);
      const start_day = (start_date.getDate() < 10 ? '0' : '') + start_date.getDate(),
          end_day = (end_date.getDate() < 10 ? '0' : '') + end_date.getDate(),
          start_month = ((start_date.getMonth() + 1) < 10 ? '0' : '') + (start_date.getMonth() + 1),
          end_month = ((end_date.getMonth() + 1) < 10 ? '0' : '') + (end_date.getMonth() + 1);
      this.filters.start_date = this.filters.start_date !== '' ? start_date.getFullYear() + '-' + (start_month) + '-' + start_day : '';
      this.filters.end_date = this.filters.end_date !== '' ? end_date.getFullYear() + '-' + (end_month) + '-' + end_day : '';
    },
  },
  watch: {
    filters: {
      handler: function (newVal) {
        this.filters = newVal;
        this.getLeads();
      },
      deep: true
    },

  },
  beforeMount() {
    this.getLeads();
    this.getNetworks();
    this.getCampaigns();
    this.getRotators();
    this.getCountries();
  }
}
</script>

<style scoped>
#FilterBtn {
  padding: 7px 20px;
}

.vs-popup--content {
  height: 100%;
}

.con-vs-popup {
  height: 100%;
}
</style>