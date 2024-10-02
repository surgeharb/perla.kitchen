import { LemonIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const recipeType = defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  // @ts-ignore
  icon: LemonIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Recipe Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
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
