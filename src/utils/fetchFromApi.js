import axios from 'axios'; 

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com'
// console.log(process.env.RAPID_API_KEY);
const options = {
  params: {
    maxResults: '50'
  },
  headers: {
    'X-RapidAPI-Key': 'fb59f8ce5fmshd6bef842d5b8357p1c9c18jsna0216e794011',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchFromAPI=async(url)=>{
   const {data}= await axios.get(`${BASE_URL}/${url}`,options);
   return data;
}