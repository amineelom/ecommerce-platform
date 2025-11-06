# Contributing to E-Commerce Platform

Thank you for your interest in contributing to the E-Commerce Platform! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Report issues responsibly

## Getting Started

### 1. Fork the Repository

```bash
git clone https://github.com/yourusername/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Make Your Changes

- Follow the existing code style
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed

### 5. Test Your Changes

```bash
# Run tests
npm test

# Check code quality
npm run lint

# Build for production
npm run build
```

### 6. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature" -m "Description of changes"
```

### Commit Message Format

Use conventional commits:

```
feat: add new feature
fix: fix a bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

### 7. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 8. Create a Pull Request

1. Go to the original repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template
5. Submit the PR

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Use meaningful variable names
- Add comments for complex logic
- Follow ESLint rules

### File Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── store/         # Zustand stores
├── utils/         # Utility functions
├── constants/     # Constants
└── App.jsx        # Main app component

server/
├── models/        # Database models
├── controllers/   # Business logic
├── routes/        # API routes
├── middleware/    # Middleware
├── services/      # External services
└── server.js      # Server entry point
```

### Component Guidelines

```javascript
// Use functional components
const MyComponent = ({ prop1, prop2 }) => {
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

### API Guidelines

- Use RESTful conventions
- Return consistent response format
- Include proper error handling
- Document endpoints

### Database Guidelines

- Use meaningful field names
- Add proper indexes
- Include timestamps
- Validate data

## Testing

### Write Tests

```javascript
// Example test
describe('ProductCard', () => {
  it('should render product information', () => {
    const product = { name: 'Test', price: 99.99 };
    render(<ProductCard product={product} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Run Tests

```bash
npm test
npm test -- --coverage
```

## Documentation

### Update Documentation

- Update README.md for major changes
- Add API documentation for new endpoints
- Include examples and usage instructions
- Document configuration options

### Documentation Format

```markdown
## Feature Name

Brief description of the feature.

### Usage

```javascript
// Code example
```

### Parameters

- `param1` - Description
- `param2` - Description

### Returns

Description of return value
```

## Pull Request Process

1. **Update Documentation** - Update README.md and other docs
2. **Add Tests** - Include tests for new features
3. **Check CI** - Ensure all checks pass
4. **Request Review** - Ask maintainers for review
5. **Address Feedback** - Make requested changes
6. **Merge** - PR will be merged once approved

## Issue Guidelines

### Reporting Bugs

Include:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Screenshots/logs if applicable

### Requesting Features

Include:
- Clear description of the feature
- Use case and motivation
- Proposed implementation (optional)
- Alternative solutions (optional)

## Development Workflow

### 1. Setup Development Environment

```bash
# Install dependencies
npm install

# Start development servers
npm start

# Or separately:
npm run server    # Terminal 1
npm run dev       # Terminal 2
```

### 2. Database Setup

```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas
# Update MONGODB_URI in .env
```

### 3. Environment Variables

```bash
# Copy example file
cp .env.example .env

# Update with your values
```

### 4. Code Quality

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Performance Guidelines

- Minimize bundle size
- Optimize images
- Use lazy loading
- Cache API responses
- Minimize database queries
- Use indexes for frequently queried fields

## Security Guidelines

- Never commit secrets
- Use environment variables
- Validate all inputs
- Sanitize data
- Use HTTPS
- Keep dependencies updated
- Follow OWASP guidelines

## Deployment

### Before Deploying

- [ ] All tests pass
- [ ] Code is reviewed
- [ ] Documentation is updated
- [ ] No breaking changes
- [ ] Performance is acceptable
- [ ] Security is verified

## Getting Help

- Check existing issues and discussions
- Read documentation
- Ask in discussions
- Contact maintainers

## Recognition

Contributors will be recognized in:
- README.md
- Release notes
- GitHub contributors page

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🎉
