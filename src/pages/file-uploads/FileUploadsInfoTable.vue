<template>
   <VSimpleTable dense>
      <thead>
         <tr>
            <th>Name</th>
            <th>Host</th>
            <th>Username</th>
            <th>Port</th>
         </tr>
      </thead>
      <tbody>
         <tr
            v-for="site in sites"
            :key="site.id"
         >
            <td>{{ site.name }}</td>
            <td>{{ site.host }}</td>
            <td>{{ site.username }}</td>
            <td>{{ site.port }}</td>
         </tr>
      </tbody>
   </VSimpleTable>
</template>

<script>
export default {
   props: {
      sites: {
         required: true,
         type: Array,
      },
   },
};
</script>
