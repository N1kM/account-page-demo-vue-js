import Vue from 'vue'
import VueResource from 'vue-resource'
import Moment from 'moment'

// Calls 'VueResource.install(Vue)'
Vue.use(VueResource);

var config = {
  apiURL: window.location.origin + '/api'
}

Vue.component('customer-section', {
  template: `
    <div v-if="customer">
      <div class="content">
        <div class="media" style="margin-bottom: 20px;">
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
        <p class="title">Manage how we notify you</p>
        <pre>{{ customer.notifications }}</pre>        
        <ul v-for="(type, key) in customer.notifications">
          <li><button class="button is-small" v-on:click="toggleActive(key, type)" v-bind:class="{ 'is-success': type}">{{ key | titleCase }}</button></li>
        </ul>
      </div>
    </div>
  `,
  props: ["customer"],
  methods: {
    toggleActive: function(key, type){
      this.customer.notifications[key] = !type;
    }
  }  
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
              <td>{{ bills[loadBill].billDate | dateTimeFormatted }}</td>
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
        <ul v-for="device in devices" :key="device.id">     
          <li>{{ device.manuafacturer }} {{ device.product }} {{ device.model }}</li>
        </ul>
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
        <ul>
          <li>Start Date: {{ contract.startDate | dateTimeFormatted}}</li>
          <li>End Date: {{ contract.endDate | dateTimeFormatted}}</li>          
        </ul>
      </div>
    </div>
  `,
  props: ["contract"]
})

Vue.filter('dateTimeFormatted', function (date) {
  return Moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
});

Vue.filter('titleCase', function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

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