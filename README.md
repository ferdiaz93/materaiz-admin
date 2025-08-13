# React Minimal Template

A modern, feature-rich React template built with TypeScript, Material-UI, and best practices for enterprise applications.

## Features

- 🎨 **Material-UI Components**: Pre-built form components and UI elements
- 📱 **Responsive Design**: Mobile-first approach with responsive layouts
- 🌐 **Internationalization**: Built-in i18n support with react-i18next
- 🔒 **Authentication**: Complete auth flow with protected routes
- 📝 **Form Handling**: Advanced form components with react-hook-form
- 🎭 **Mock Services**: Integrated MSW for API mocking
- ⚡ **Vite**: Lightning-fast build tool and development server
- 🧪 **TypeScript**: Full type safety and better developer experience

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
yarn install

# Start development server
yarn start
```

### Configuration

1. Open `src/config.ts`:

   - Enable/disable features using the `ENABLED_FEATURES` object
   - Customize app name and logo
   - Configure API endpoints and environment variables

2. Mock Service Worker (Development Only):
   - Pre-defined handlers in `src/mocks/handlers`
   - Toggle mocking server through settings drawer
   - Customize mock responses for development

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── form/          # Form components
│   └── common/        # Shared components
├── features/          # Feature-based modules
├── hooks/             # Custom React hooks
├── locales/          # i18n translations
├── mocks/            # MSW mock handlers
├── routes/           # Route definitions
├── services/         # API services
├── theme/            # MUI theme customization
└── utils/            # Utility functions
```

## Available Scripts

- `yarn start` - Start development server
- `yarn build` - Build for production
- `yarn test` - Run tests
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

## Form Components

Our template includes a comprehensive set of form components built on top of Material-UI:

### Basic Components

- `TemplateTextField` - Enhanced text input
- `TemplatePasswordField` - Secure password input
- `TemplateNumberField` - Numeric input with validation
- `TemplateSelectField` - Dropdown selection
- `TemplateCheckboxField` - Checkbox input
- `TemplateDatePickerField` - Date selection

### Advanced Components

- `TemplateMultiSelectField` - Multiple selection
- `TemplateAutocompleteField` - Autocomplete with suggestions
- `TemplateDateTimePickerField` - Date and time selection

All form components support:

- Form validation
- Error handling
- Accessibility
- Internationalization
- Custom styling

## Theme Customization

1. Modify theme settings in `src/theme/`:

   - `palette.ts` - Color schemes
   - `typography.ts` - Font settings
   - `shadows.ts` - Shadow definitions

2. Use theme context for dynamic theme switching:
   ```tsx
   import { useTheme } from '@mui/material/styles';
   ```

## Internationalization

1. Add translations in `src/locales/`
2. Use translation hook:
   ```tsx
   import { useTranslation } from 'react-i18next';
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
