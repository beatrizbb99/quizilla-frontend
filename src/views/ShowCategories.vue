<template>
  <div>
    <h1>Kategorien:</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Beschreibung</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.category_id">
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>
            <button @click="deleteCategory(category.category_id, category.name)">Delete</button>
            <button @click="editCategory(category)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="newCategory()">Neue Kategorie</button>
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

<style scoped></style>
