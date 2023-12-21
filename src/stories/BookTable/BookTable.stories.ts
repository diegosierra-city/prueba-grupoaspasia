import type { Meta, StoryObj } from '@storybook/react';

import BookTable from './BookTable';
import type { Book } from '../../redux/interfaces';

const meta = {
 title: 'Componentes/BookTable',
 component: BookTable,
 parameters: {
   layout: 'centered',
 },  
} satisfies Meta<typeof BookTable>;

export default meta;
type Story = StoryObj<typeof BookTable>;

export const Primary: Story = {
  args: {
   listBook: {
    listBook: [
      {
        name: "El principito",
        authors: ["Antoine de Saint-Exupéry"],
        country: "Francia", 
        numberOfPages: 112,
        favorite: true,
        url: "1",
        isbn: "123456" 
      } as Book,
      { 
        name: "Cien años de soledad",
        authors: ["Gabriel García Márquez"], 
        country: "Colombia",  
        numberOfPages: 471,
        favorite: false, 
        url: "2",
        isbn: "456789"
      } as Book
    ]
  }
  },
 
};