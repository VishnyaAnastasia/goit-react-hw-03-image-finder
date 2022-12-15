import React from 'react';
import axios from 'axios';

export async function fetch(query, page) {
  try {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=30926244-0d1827d5be25c89cfafbcf30b&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
    );
    const pages = Math.ceil(data.totalHits / 12);

    const pictures = data.hits.map(
      ({ id, webformatURL, largeImageURL, tags }) => {
        const small = webformatURL;
        const large = largeImageURL;
        const alt = tags;

        return {
          id,
          small,
          large,
          alt,
        };
      }
    );

    return {
      pages,
      pictures,
    };
  } catch (error) {
    console.error(error);
  }
}
