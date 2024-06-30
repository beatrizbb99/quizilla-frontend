<template>
  <div class="container">
    <h1>Kategorien:</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Beschreibung</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.category_id">
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>
            <button @click="editCategory(category)" class="regular-button edit-button btn">Edit</button>
            <button @click="deleteCategory(category.category_id, category.name)" class="regular-button delete-button btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="newCategory()" class="regular-button btn new">Neue Kategorie</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { categories, getAllCategories, deleteCategory } from '../services/category.database.handler';

const router = useRouter();

const fetchCategories = async () => {
  await getAllCategories();
};

const newCategory = () => {
  router.push({
    name: 'CreateCategories'
  });
};

const editCategory = (category) => {
  router.push({
    name: 'EditCategories',
    params: { id: category.category_id },
    query: { name: category.name, description: category.description },
  });
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.btn {
  font-size: 14pt;
  width: 20%;
}

.new {
  margin-top: 50px;
}
</style>
