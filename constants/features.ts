import {
  Columns2,
  Download,
  type LucideIcon,
  Moon,
  Save,
  Search,
  Trash2,
} from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    icon: Columns2,
    title: 'Live split preview',
    description:
      'Type markdown on the left and watch it render on the right, instantly. No build step, no guessing.',
  },
  {
    icon: Save,
    title: 'Debounced auto-save',
    description:
      'Every keystroke is saved to your browser automatically, so you never lose a thought.',
  },
  {
    icon: Search,
    title: 'Search everything',
    description:
      'Filter your entire notebook by title in a single keystroke. Find any note in seconds.',
  },
  {
    icon: Download,
    title: 'Export to .md',
    description:
      'Download any note as a clean markdown file, named automatically from the title.',
  },
  {
    icon: Trash2,
    title: 'Safe deletes',
    description:
      'A friendly confirmation modal makes sure you never delete a note by accident.',
  },
  {
    icon: Moon,
    title: 'Easy on the eyes',
    description:
      'A calm dark mode built on a deep forest green, plus a crisp light theme.',
  },
]