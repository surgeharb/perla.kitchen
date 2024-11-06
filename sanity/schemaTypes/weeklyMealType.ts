import { TrolleyIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const weeklyMealType = defineType({
  name: 'weeklyMeal',
  title: 'Weekly Meal',
  type: 'document',
  // @ts-ignore
  icon: TrolleyIcon,
  preview: {
    select: {
      title: 'menuItems.0.title',
      menuItemImage: 'menuItems.0.image.asset',
    },
    prepare({ title, menuItemImage }) {
      return {
        title: title.find((t: any) => t._key === 'en')?.value,
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
        source: 'title',
      },
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
