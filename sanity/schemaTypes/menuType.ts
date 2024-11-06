import { MenuIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const menuType = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  // @ts-ignore
  icon: MenuIcon,
  preview: {
    select: {
      title: 'title',
      image: 'image.asset',
    },
    prepare({ title, image }) {
      return {
        title: title.find((t: any) => t._key === 'en')?.value,
        media: image,
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'internationalizedArrayString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'internationalizedArrayText',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
