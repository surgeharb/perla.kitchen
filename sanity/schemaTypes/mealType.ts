import { LemonIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const mealType = defineType({
  name: 'meal',
  title: 'Meal',
  type: 'document',
  // @ts-ignore
  icon: LemonIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Meal Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'servingSize',
      title: 'Serving Size',
      type: 'number',
    }),
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'reference',
      to: [{ type: 'menu' }],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});