// У файлі pixabay-api.js зберігай функції для виконання HTTP-запитів:

// getImagesByQuery(query, page). Ця функція повинна приймати два параметри
//  query (пошукове слово, яке є рядком) та page (номер сторінки, яка є числом),
//   здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.

import axios from 'axios';

const API_KEY = '25313829-c54e0cdb371427617e83b262e';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
