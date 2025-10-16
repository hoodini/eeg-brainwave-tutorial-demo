---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# Global Rules for AI Coding Assistant
Every time we change the codebase, please ensure to create a meaningful commit message that accurately describes the changes made. This helps maintain a clear project history and makes it easier for others (and future you) to understand the evolution of the codebase.

The format of the commit message should be concise yet descriptive, ideally summarizing the essence of the changes in a single line. If the changes are complex and require more detail, feel free to add a longer description in the body of the commit message.

In every commit message, please include the following elements:
1. **Type of Change**: Specify whether it's a bug fix, feature addition, refactor, documentation update, etc.
2. **Scope**: Indicate the area of the codebase affected (e.g., UI, backend, database, etc.).
3. **Description**: A brief summary of what was changed and why.
4. Indicate it has been created by AI.

After writing the commit message, please review it to ensure clarity and accuracy before finalizing the commit. Then, create the PR with the commit message included. And provide the link to the PR for approval.