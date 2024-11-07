import { TrolleyIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { client } from '../lib/client';

export const weeklyMealType = defineType({
  name: 'weeklyMeal',
  title: 'Weekly Meal',
  type: 'document',
  // @ts-ignore
  icon: TrolleyIcon,
  preview: {
    select: {
      title: 'menuItems.0.title.0.value',
      menuItemImage: 'menuItems.0.image.asset',
    },
    prepare({ title, menuItemImage }) {
      return {
        title,
        media: menuItemImage,
      };
    },
  },
  fields: [
    defineField({
      name: 'menuItems',
      title: 'Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'menuItem' }] }],
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
        source: async (doc: any) => {
          const menuItem = await client.getDocument(doc.menuItems[0]._ref);
          return menuItem?.title[0]?.value;
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'availableDate',
      title: 'Available Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in euros',
      initialValue: 10,
    }),
  ],
});
