import { LemonIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  // @ts-ignore
  icon: LemonIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Item Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'description',
      title: 'Description',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'servingSize',
      title: 'Serving Size',
      type: 'string',
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
