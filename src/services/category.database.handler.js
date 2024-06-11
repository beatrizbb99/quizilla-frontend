import { ref } from 'vue';

export const categories = ref([]);

export async function getAllCategories() {
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        categories.value = data;
    } catch (error) {
        throw new Error('Error fetching categories:', error);
    }
}

export async function getCategory(id) {
    try {
        const response = await fetch(`/api/categories/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching category with id ${id}:`, error);
    }
}

export async function createCategory(category) {
    try {
        const response = await fetch('/api/categories/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //categories.value.push(category);
    } catch (error) {
        throw new Error('Error creating category:', error);
    }
}

export async function updateCategory(id, category) {
    try {
        const response = await fetch(`/api/categories/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        console.log(`Category with id ${id} was successfully updated.`);
    } catch (error) {
        throw new Error(`Error updating category with id ${id}:`, error);
    }
}


export async function deleteCategory(id, name) {
    try {
        const response = await fetch(`/api/categories/delete/${id}/${name}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        categories.value = categories.value.filter(category => category.category_id !== id);
    } catch (error) {
        throw new Error(`Error deleting category with id ${id}:`, error);
    }
}
