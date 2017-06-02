<template>
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
          <hr />
          <p>Email: {{ customer.email }}</p>
          <p>Address:<br />{{ customer.addressLine1 }}, <span v-if="customer.addressLine2">{{ customer.addressLine2 }},</span> {{ customer.town }}<span v-if="customer.county">, {{ customer.county }}</span><br />{{ customer.country }}, {{ customer.postcode }}</p>
        </div>
      </div>
      <p class="title">Manage how we notify you</p>
      <pre>{{ customer.notifications }}</pre>
      <ul v-for="(type, key) in customer.notifications">
        <li><button class="button is-small" v-on:click="toggleActive(key, type)" v-bind:class="{ 'is-success': type}">{{ key | titleCase }}</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerSection'
}
</script>
