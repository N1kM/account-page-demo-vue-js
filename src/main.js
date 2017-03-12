import Vue from 'vue'
import VueResource from 'vue-resource';

// Calls 'VueResource.install(Vue)'
Vue.use(VueResource);

var config = {
  apiURL: window.location.origin + '/api'
}

Vue.component('customer-section', {
  template: `
    <div v-if="customer">
      <div class="content">
        <div class="media">
          <div class="media-left">
            <figure class="image" style="height: 40px; width: 40px;">
              <img v-bind:src="customer.avatar">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ customer.firstName }} {{ customer.lastName }}</p>
            <p class="subtitle is-6">{{ customer.username }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  props: ["customer"]
})

Vue.component('bills-section', {
  template: `
    <div v-if="bills">
      <p class="title">Your latest bills...</p>
      <div v-if="bills[loadBill]" v-bind:loadBill="loadBill">
        <table style="margin-bottom: 20px;">
          <thead>
            <tr>
              <th>Total</th>
              <th>Bill Date</th>              
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ bills[loadBill].total }}</td>
              <td>{{ bills[loadBill].billDate }}</td>
              <td>
                <ul>
                  <li>Minutes: {{ bills[loadBill].used.minutes }}</li>
                  <li>SMS: {{ bills[loadBill].used.text }}</li>
                  <li>Data: {{ bills[loadBill].used.data }}</li>                  
                </ul>
              </td>
            </tr>
          </tbody>
        </table>            
      </div>
      <div class="content">    
        <div v-for="(value, key) in bills" style="margin-bottom: 5px;">
          {{ value.id }} <button class="button is-small is-primary" @click="showBillDetails(key)">Show Bill</button>
        </div>
      </div>
    </div>
  `,
  props: ["bills"],
  data: function () {
    return {
      loadBill: "0"
    }
  },
  methods: {
    showBillDetails(key) {
      this.loadBill = key;
    }
  }   
})

Vue.component('devices-section', {
  template: `
    <div v-if="devices">
      <p class="title">Your devices...</p>
      <div class="content">     
        <div v-for="device in devices" :key="device.id">     
          {{ device.manuafacturer }} {{ device.product }} {{ device.model }}
        </div>
      </div>
    </div>
  `,
  props: ["devices"]
})

Vue.component('contract-section', {
  template: `
    <div v-if="contract">
      <p class="title">Your contract...</p>
      <div class="content">    
        {{ contract.name }}
      </div>
    </div>
  `,
  props: ["contract"]
})

Vue.component('last-months-usages-section', {
  template: `
    <div v-if="contract">
      <p class="title">Your usage last month...</p>

      <nav class="level is-mobile">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tweets</p>
            <p class="title">3,456</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Following</p>
            <p class="title">123</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Followers</p>
            <p class="title">456K</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Likes</p>
            <p class="title">789</p>
          </div>
        </div>
      </nav>

    </div>
  `,
  props: ["bills", "contract"]
})

new Vue({
  el: '#app',
  data: {
    bills: [],
    devices: [],
    contract: {},
    customer: {}    
  },
  mounted: function () {
    this.getBills();
    this.getDevices();        
    this.getContract();
    this.getCustomer();    
  },  
  methods: {
    getBills() {
      var route = config.apiURL + '/bills.json';

      this.$http.get(route).then((response) => {
        this.bills = response.body.bills;
      });
    },
    getDevices() {
      var route = config.apiURL + '/devices.json';

      this.$http.get(route).then((response) => {
        this.devices = response.body.devices;
      });
    },
    getContract() {
      var route = config.apiURL + '/contract.json';

      this.$http.get(route).then((response) => {
        this.contract = response.body.contract;
      });
    },
    getCustomer() {
      var route = config.apiURL + '/customer.json';

      this.$http.get(route).then((response) => {
        this.customer = response.body.customer;
      });
    }            
  }    
})