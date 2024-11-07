import { LemonIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  // @ts-ignore
  icon: LemonIcon,
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
      title: 'Item Name',
      type: 'internationalizedArrayString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.0.value',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'servingSizes',
      title: 'Serving Sizes & Prices',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'size',
              title: 'Serving Size',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
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
