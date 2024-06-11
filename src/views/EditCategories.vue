<template>
    <div>
        <h2>Kategorie:</h2>
        <input v-model="newCategoryName" placeholder="category name" />
        <input v-model="newCategoryDescription" placeholder="category description" />
        <p v-if="error" class="error-message">Bitte geben Sie einen Namen und eine Beschreibung für die Kategorie ein.</p>
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
const error = ref(false);

const saveCategory = async () => {
    try {
        if(newCategoryName.value && newCategoryDescription.value) {
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
        } else {
            error.value = true;
        }
    } catch (error) {
        console.error('Error updating/creating category:', error);
    }
};
</script>


<style scoped></style>
