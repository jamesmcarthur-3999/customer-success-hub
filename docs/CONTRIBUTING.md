# Contributing Guide

Thank you for your interest in contributing to the Customer Success Hub project. This document provides guidelines and instructions for contributing.

## Development Workflow

### Setting Up Development Environment

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/customer-success-hub.git`
3. Install dependencies: `npm install`
4. Create a branch for your feature: `git checkout -b feature/your-feature-name`

### Development Guidelines

- Use TypeScript for all code
- Follow the existing code style and structure
- Write clear commit messages
- Add tests for new functionality
- Update documentation as needed

### Commit Message Format

We follow a simplified version of the Conventional Commits specification:

```
<type>: <description>

[optional body]

[optional footer]
```

Types include:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Formatting changes
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **test**: Adding or updating tests
- **chore**: Changes to build process or auxiliary tools

Example: `feat: add customer filtering by renewal quarter`

### Pull Request Process

1. Update the README.md or documentation with details of your changes if appropriate
2. Make sure your code passes all tests and linting
3. Submit a pull request to the main repository
4. The PR will be reviewed by the project maintainers

## Project Structure

Please follow the existing project structure:

- Place components in the appropriate directory (e.g., `src/components`)
- Add new pages in `src/pages`
- Create utility functions in `src/utils`
- Add styles in `src/styles`
- Update types in `src/types`

## Coding Standards

### Naming Conventions

- **Files**: Use kebab-case for file names (e.g., `customer-detail.tsx`)
- **Components**: Use PascalCase for component names (e.g., `CustomerDetail`)
- **Functions**: Use camelCase for function names (e.g., `formatCurrency`)
- **Variables**: Use camelCase for variable names (e.g., `customerData`)
- **Constants**: Use UPPER_SNAKE_CASE for constants (e.g., `API_ENDPOINT`)

### Style Guide

- Use Tailwind CSS for styling
- Follow the design system and component patterns
- Use the provided color palette and spacing system

### Testing

- Write unit tests for utility functions
- Write component tests for complex components
- Test edge cases and error scenarios

## Getting Help

If you need help or have questions, please:

1. Check the documentation first
2. Look for existing issues on GitHub
3. Create a new issue with a clear description of your question or problem

## License

By contributing to this project, you agree that your contributions will be licensed under the project's license.

Thank you for contributing to Customer Success Hub!
