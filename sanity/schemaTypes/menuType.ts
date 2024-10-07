import { MenuIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const menuType = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  // @ts-ignore
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
