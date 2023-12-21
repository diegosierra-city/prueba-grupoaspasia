import type { Meta, StoryObj } from '@storybook/react';

import Card from './Card';
import type { Book } from '../../redux/interfaces';

const meta = {
 title: 'Componentes/Card',
 component: Card,
 parameters: {
   layout: 'centered',
 },  
} as Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    url: '',
    name: 'My Book',
    isbn: '123456789',
    authors: ['García Marquez'],
    numberOfPages: 2430,
    publisher: 'Planeta',
    country: 'Colombia',
    mediaType: 'Cuero',
    released: '2023-06-01',
    characters: [],
povCharacters: [],
favorite: false 
      } as Book
    
  
}