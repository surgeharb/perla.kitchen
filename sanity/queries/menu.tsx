import { groq } from 'next-sanity';

export const QueryMenus = groq`*[_type == "menu"] {
  _id,
  title,
  slug,
  image
}`;

export const QueryMenuItems = groq`*[_type == "menuItem" && menu->slug.current == $menu] {
  _id,
  title,
  description,
  slug,
  price,
  image,
  menu -> {
    title
  }
}`;

export const QueryMenuItem = groq`*[_type == "menuItem" && slug.current == $slug][0] {
  _id,
  title,
  description,
  servingSize,
  price,
  image
}`;

export const QueryWeeklyMeals = groq`*[_type == "weeklyMeal"] {
  _id,
  "title": title[_key == $language][0].value,
  "description": description[_key == $language][0].value,
  price,
  availableDate,
  menuItems[] -> {
    _id,
    title,
    description,
    price,
    image
  }
}`;
