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
  data: () => ({
    customer: null
  }),  
  created: function () {
    this.fetchData()
  },  
  methods: {
    fetchData() {
      var route = config.apiURL + '/customer.json';

      this.$http.get(route).then((response) => {
        this.customer = response.body.customer;
      });
    }
  }  
})

Vue.component('bills-section', {
  template: `
    <div v-if="bills">
      <p class="title">Your latest bills...</p>
      <div class="content">    
        <div v-for="bill in bills" :key="bill.id">
          {{ bill.id }}
        </div>
      </div>
    </div>
  `,
  data: () => ({
    bills: null
  }),  
  created: function () {
    this.fetchData()
  },  
  methods: {
    fetchData() {
      var route = config.apiURL + '/bills.json';

      this.$http.get(route).then((response) => {
        this.bills = response.body.bills;
      });
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
  data: () => ({
    devices: null
  }),  
  created: function () {
    this.fetchData()
  },  
  methods: {
    fetchData() {
      var route = config.apiURL + '/devices.json';

      this.$http.get(route).then((response) => {
        this.devices = response.body.devices;
      });
    }
  }  
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
  data: () => ({
    contract: null
  }),  
  created: function () {
    this.fetchData()
  },  
  methods: {
    fetchData() {
      var route = config.apiURL + '/contract.json';

      this.$http.get(route).then((response) => {
        this.contract = response.body.contract;
      });
    }
  }  
})

new Vue({
  el: '#app',
  data: {
  }
})