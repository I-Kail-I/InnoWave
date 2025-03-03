"use server"

export async function getCities() {
  try {
    const response = await fetch(process.env.COUNTRY_LIST_API_URL);
    const data = await response.json();
    return data.data; 
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}
