# Calendare Server Administration UI

Administration and self service UI for the Calendare Server, a calendar and contacts server.

# Administration Interface

The Administration UI provides a centralized dashboard for users to manage their profiles, resources, and access credentials.

## Account Initialization

Users authenticate via an **OIDC (OpenID Connect) provider** to register or log in. Upon first login, the system automatically initializes a default environment for the Principal (the user), which includes:

- A personal calendar.
- A personal address book.

## Credential Management

The UI allows users to generate unique access credentials. For enhanced security, it is **strongly recommended** to generate a distinct access key and password combination for each individual device or calendar client. These credentials are used during the manual setup of external applications.

## Resource Management

Depending on assigned permissions, users can:

- Create additional calendars and address books.
- Modify metadata, including Display Name, Timezone, and Category Color.

## Permissions and Delegation

Users can grant others access to their resources through a fine-grained permission system. Supported access levels include:

- Read only: View events or contacts without making changes.
- Read/Write: Full ability to create, edit, and delete entries.

## Membership and Overview

The UI provides a comprehensive overview where users can audit their own access rights, see which resources have been shared with them, and view their current group memberships.

# Quickstart

Before deploying the Administration UI, ensure the core server is fully operational.

- **Server Setup**: Please follow the [Calendare Server Installation Guide](https://github.com/closureOSS/calendare/blob/main/Doc/INSTALL.md) to configure the backend enviroment and pre-requisites.

- **UI Deployment**: Once the server is ready, you can deploy the Administration interface using our [official Helm Chart](./deploy/README.md).

- **Custom UI Deployment**: While we provide a Helm chart for Kubernetes, the Administration UI is a static web application after compilation. This means it can be hosted on any static web server or cloud storage service (e.g., AWS S3, Azure Blob Storage, or Nginx).

## Configuration

The application relies on a `appsettings.json` file located in the web root directory. If you are using the provided Helm chart, this file is injected automatically via a ConfigMap. If you are deploying manually, ensure this file exists in your web root. Refer to the [Helm Chart README](./deploy/README.md) for details about the parameters.

**Example** `appsettings.json`:

```json
{
  "apiBaseUrl": "https://calendare.example.com",
  "oidcUri": "https://auth.example.com",
  "oidcClientId": "calendare-ui",
  "oidcScopes": "openid profile email groups offline_access",
  "oidcSilentCheckSsoFallback": true,
  "oidcMessageReceiveTimeout": 1000
}
```
