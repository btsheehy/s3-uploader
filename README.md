# s3-uploader

This application allows users to upload files from their local machine to an AWS S3 Bucket and view statistics related to the uploads. It features a React frontend with TypeScript and a Node.js backend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v20 or later)
- pnpm
- AWS account with S3 access
- S3 bucket with correct permissions configured

### Installation

1. Clone the repository:
`git clone https://github.com/btsheehy/s3-uploader.git`
2. Install dependencies:
`pnpm install`
3. Create a `.env` file in the `packages/backend` directory with the following
environment variables:
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET_NAME=
JWT_SECRET=
PORT=4000
```
4. Start the development server:
`pnpm dev`

5. Navigate to `http://localhost:3000` in your browser to view the application Register a user to upload files and view statistics. To fill the database with test data and create more interesting graphs, run the following command from the root directory: `node scripts/fillDatabaseWithDummyData.js`

## Design Choices and Trade-offs

1. **Monorepo Structure**: We chose a monorepo structure to keep the frontend and backend code in a single repository. This simplifies development and deployment but may increase complexity for very large projects.

2. **DIY Authentication**: We rolled our own password salting and hashing combined with JSON Web Tokens. JWTs provide stateless authentication, which is scalable and works well with serverless architectures. However, for sensitive applications, a more robust solution like OAuth2 or SSO may be preferable.

3. **SQLite for Database**: SQLite is used for its simplicity and zero-configuration nature. It's perfect for development and small to medium applications but may need to be replaced with a more robust solution for high-traffic production environments.

4. **Tailwind CSS for Styling**: Tailwind CSS was chosen for rapid UI development. It provides a utility-first approach that speeds up the styling process but can lead to verbose class names in components.

5. **AWS API Keys for S3 Bucket Access**: Due to the scale of the project, we used long-term AWS API keys for S3 bucket access. For larger projects, IAM roles with temporary credentials are recommended for better security.
