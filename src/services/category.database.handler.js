import { ref } from 'vue';
import fetchWithAuth from './fetchWithAuth';

export const categories = ref([]);

export async function getAllCategories() {
    try {
        const data = await fetchWithAuth('/api/categories');
        categories.value = data;
    } catch (error) {
        throw new Error(`Error fetching categories: ${error.message}`);
    }
}

export async function getCategory(id) {
    try {
        const data = await fetchWithAuth(`/api/categories/${id}`);
        return data;
    } catch (error) {
        throw new Error(`Error fetching category with id ${id}: ${error.message}`);
    }
}

export async function createCategory(category) {
    try {
        await fetchWithAuth('/api/categories/create', {
            method: 'POST',
            body: JSON.stringify(category)
        });
        // categories.value.push(category);
    } catch (error) {
        throw new Error(`Error creating category: ${error.message}`);
    }
}

export async function updateCategory(id, category) {
    try {
        await fetchWithAuth(`/api/categories/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify(category)
        });
        console.log(`Category with id ${id} was successfully updated.`);
    } catch (error) {
        throw new Error(`Error updating category with id ${id}: ${error.message}`);
    }
}

export async function deleteCategory(id, name) {
    try {
        await fetchWithAuth(`/api/categories/delete/${id}/${name}`, {
            method: 'DELETE'
        });
        categories.value = categories.value.filter(category => category.category_id !== id);
    } catch (error) {
        throw new Error(`Error deleting category with id ${id}: ${error.message}`);
    }
}
