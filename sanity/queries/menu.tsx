import { groq } from 'next-sanity';

export const QueryMenus = groq`*[_type == "menu"] {
  _id,
  "title": title[_key == $language][0].value,
  slug,
  image,
  _updatedAt
}`;

export const QueryMenuItems = groq`*[_type == "menuItem" && menu->slug.current == $menu] {
  _id,
  "title": title[_key == $language][0].value,
  "description": description[_key == $language][0].value,
  slug,
  image,
  menu -> {
    "title": title[_key == $language][0].value
  },
  _updatedAt
}`;

export const QueryMenuItem = groq`*[_type == "menuItem" && slug.current == $slug][0] {
  _id,
  "title": title[_key == $language][0].value,
  "description": description[_key == $language][0].value,
  servingSizes[] {
    size,
    price
  },
  image,
  menu -> {
    "title": title[_key == $language][0].value
  }
}`;

export const QueryWeeklyMeals = groq`*[_type == "weeklyMeal"] {
  _id,
  _updatedAt,
  "description": description[_key == $language][0].value,
  price,
  availableDate,
  menuItems[] -> {
    _id,
    "title": title[_key == $language][0].value,
    "description": description[_key == $language][0].value,
    image,
    slug
  }
}`;

export const QueryWeeklyMealWithItem = groq`*[_type == "weeklyMeal" && $itemId in menuItems[]._ref] | order(_updatedAt desc)[0] {
  _id,
  _updatedAt,
  "description": description[_key == $language][0].value,
  price,
  availableDate,
  menuItems[] -> {
    _id,
    "title": title[_key == $language][0].value,
    "description": description[_key == $language][0].value,
    image,
    slug
  }
}`;
