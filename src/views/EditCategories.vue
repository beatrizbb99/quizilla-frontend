<template>
    <div>
        <h2>Kategorie:</h2>
        <input v-model="newCategoryName" placeholder="category name"
            :class="{ 'error': isSubmitted && !newCategoryName }" />
        <input v-model="newCategoryDescription" placeholder="category description"
            :class="{ 'error': isSubmitted && !newCategoryDescription }" />
        <button @click="saveCategory">Speichern</button>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { useToast } from 'vue-toast-notification';
import { updateCategory, createCategory } from '../services/category.database.handler';

const props = defineProps({
    id: String,
    name: String,
    description: String
});

const router = useRouter();
const toast = useToast();
const newCategoryName = ref(props.name || '');
const newCategoryDescription = ref(props.description || '');
const isSubmitted = ref(false);

const saveCategory = async () => {
    isSubmitted.value = true;

    if (!newCategoryName.value || !newCategoryDescription.value) {
        toast.error('Bitte die Felder ausfüllen.');
        return;
    }

    try {
        if (props.id) {
            await updateCategory(props.id, {
                category_id: props.id,
                name: newCategoryName.value,
                description: newCategoryDescription.value
            });
            toast.success('Kategorie wurde bearbeitet.');
        } else {
            await createCategory({
                name: newCategoryName.value,
                description: newCategoryDescription.value
            });
            toast.success('Neue Kategorie wurde erstellt.');
        }
        router.push({ name: 'ShowCategories' });
    } catch (error) {
        console.error('Error updating/creating category:', error);
    }
};
</script>


<style scoped></style>
