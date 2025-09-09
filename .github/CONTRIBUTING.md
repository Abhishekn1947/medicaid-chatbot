# Contributing to Medicaid Chatbot

Thank you for your interest in contributing to the Medicaid Chatbot project! This guide will help you get started.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please treat all community members with respect and create a welcoming environment for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include:

- A clear, descriptive title
- Steps to reproduce the behavior
- Expected vs actual behavior  
- Screenshots if applicable
- Your environment details (browser, device, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- A clear, descriptive title
- Detailed description of the proposed functionality
- Use cases and benefits
- Any relevant mockups or examples

### Pull Requests

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Add or update tests as needed
5. Ensure all tests pass
6. Update documentation
7. Submit a pull request

## Development Guidelines

### Code Style

- Follow the [Angular Style Guide](https://angular.io/guide/styleguide)
- Use TypeScript strict mode
- Write meaningful commit messages
- Keep functions small and focused
- Use descriptive variable and function names

### Chatbot Content Guidelines

When adding or modifying chatbot responses:

- **Accuracy**: Ensure all Medicaid information is current and correct
- **Clarity**: Use plain language that's easy to understand
- **Accessibility**: Consider users with different literacy levels
- **Multilingual**: Update all supported languages when adding new content
- **Empathy**: Write responses that are helpful and compassionate

### Testing

- Write unit tests for new functionality
- Test multilingual features in all supported languages
- Verify responsive design on different screen sizes
- Test chatbot interactions thoroughly
- Ensure accessibility compliance

### Documentation

- Update the README if you change functionality
- Document new chatbot topics in the knowledge base
- Include code comments for complex logic
- Update API documentation for service changes

## Development Setup

1. **Prerequisites**
   - Node.js 18+
   - Angular CLI 19.2.1
   - Git

2. **Installation**
   ```bash
   git clone https://github.com/YOUR_USERNAME/medicaid-chatbot.git
   cd medicaid-chatbot
   npm install
   ```

3. **Development Server**
   ```bash
   ng serve
   ```

4. **Running Tests**
   ```bash
   ng test
   ng e2e
   ```

## Project Structure

- `src/app/components/` - UI components
- `src/app/services/` - Business logic and data services
- `src/app/services/chat.service.ts` - Chatbot knowledge base and logic
- `.github/` - GitHub templates and workflows
- `docs/` - Additional documentation

## Chatbot Knowledge Base

When updating the chatbot's knowledge base:

1. **Adding New Topics**
   - Add keywords to help users find the information
   - Provide comprehensive, accurate responses
   - Include relevant action buttons
   - Test with various user inputs

2. **Multilingual Updates**
   - Translate new content to all supported languages
   - Maintain consistency across languages
   - Consider cultural nuances

3. **Testing Responses**
   - Test with different phrasings of the same question
   - Verify action buttons work correctly
   - Check escalation flows

## Submitting Changes

1. **Before Submitting**
   - Run `ng test` to ensure all tests pass
   - Run `ng build` to check for build errors
   - Test your changes thoroughly
   - Update documentation

2. **Pull Request Process**
   - Use the pull request template
   - Provide clear description of changes
   - Link relevant issues
   - Request review from maintainers

3. **Review Process**
   - Maintainers will review your PR
   - Address any feedback promptly  
   - Be open to suggestions and changes
   - Once approved, your changes will be merged

## Getting Help

If you need help or have questions:

- Check the existing [Issues](https://github.com/YOUR_USERNAME/medicaid-chatbot/issues)
- Create a new issue with the "question" label
- Reach out to maintainers

## Recognition

Contributors will be recognized in the project README and release notes. We appreciate all contributions, big and small!

Thank you for helping make healthcare information more accessible! 🏥