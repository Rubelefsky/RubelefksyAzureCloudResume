# Azure Cloud Resume Challenge

A serverless cloud resume website with a visitor counter, built on Microsoft Azure as part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/docs/the-challenge/azure/).

🌐 **Live Site:** [rubelefskyazurecloud.net](https://www.rubelefskyazurecloud.net)

## Architecture

```
┌─────────────────────┐     ┌──────────────────────┐     ┌─────────────────────┐
│                     │     │                      │     │                     │
│   Azure Storage     │     │   Azure Functions    │     │   Azure CosmosDB    │
│   (Static Website)  │────▶│   (Python API)       │────▶│   (Table API)       │
│                     │     │                      │     │                     │
└─────────────────────┘     └──────────────────────┘     └─────────────────────┘
         │                                                          
         │                                                          
         ▼                                                          
┌─────────────────────┐                                             
│                     │                                             
│     Azure CDN       │                                             
│   (HTTPS + Cache)   │                                             
│                     │                                             
└─────────────────────┘                                             
```

## Project Structure

This project uses two repositories:

| Repository | Purpose |
|------------|---------|
| [RubelefksyAzureCloudResume](https://github.com/Rubelefsky/RubelefksyAzureCloudResume) | Frontend - HTML, CSS, JavaScript |
| [RubelefskyAzureCloudResume-Backend](https://github.com/Rubelefsky/RubelefskyAzureCloudResume-Backend) | Backend - Azure Function (Python) |

## Features

- ✅ Responsive resume website with modern dark theme
- ✅ Visitor counter with real-time updates
- ✅ Serverless backend API (Azure Functions)
- ✅ NoSQL database (CosmosDB Table API)
- ✅ HTTPS enabled via Azure CDN
- ✅ Custom domain configuration
- 🔄 CI/CD with GitHub Actions (in progress)

---

## Challenge Progress

### Completed Steps

- [x] **Step 1: Certification** - Azure AZ-900 Fundamentals
- [x] **Step 2: HTML** - Resume content in HTML
- [x] **Step 3: CSS** - Modern dark theme styling
- [x] **Step 4: Static Website** - Deployed to Azure Storage
- [x] **Step 5: HTTPS** - Configured via Azure CDN
- [x] **Step 6: DNS** - Custom domain (rubelefskyazurecloud.net)
- [x] **Step 7: JavaScript** - Visitor counter frontend code
- [x] **Step 8: Database** - CosmosDB with Table API (Serverless)
- [x] **Step 9: API** - Azure Function with HTTP trigger
- [x] **Step 10: Python** - Backend code using Azure SDK
- [x] **Step 13: Source Control** - GitHub repositories

### In Progress

- [ ] **Step 11: Tests** - Python unit tests
- [ ] **Step 12: Infrastructure as Code** - ARM templates
- [ ] **Step 14: CI/CD (Backend)** - GitHub Actions
- [ ] **Step 15: CI/CD (Frontend)** - GitHub Actions
- [ ] **Step 16: Blog Post** - Document the journey

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python 3.12, Azure Functions |
| Database | Azure CosmosDB (Table API, Serverless) |
| Hosting | Azure Storage Static Website |
| CDN | Azure CDN |
| DNS | Custom domain |
| Source Control | GitHub |
| CI/CD | GitHub Actions (planned) |
| IaC | ARM Templates (planned) |

---

## Backend Setup

### Prerequisites

- Python 3.11+
- [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local) v4
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- Azure subscription

### Local Development

1. **Clone the backend repository:**
   ```bash
   git clone https://github.com/Rubelefsky/RubelefskyAzureCloudResume-Backend.git
   cd RubelefskyAzureCloudResume-Backend
   ```

2. **Create local.settings.json:**
   ```json
   {
     "IsEncrypted": false,
     "Values": {
       "AzureWebJobsStorage": "UseDevelopmentStorage=true",
       "FUNCTIONS_WORKER_RUNTIME": "python",
       "AzureWebJobsStorage_CosmosDB": "YOUR_COSMOSDB_CONNECTION_STRING"
     },
     "Host": {
       "CORS": "*",
       "CORSCredentials": false
     }
   }
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run locally:**
   ```bash
   func start
   ```

5. **Test the API:**
   ```bash
   curl http://localhost:7071/api/GetVisitorCount
   ```

### Deployment

```bash
az login
func azure functionapp publish YOUR-FUNCTION-APP-NAME
```

---

## Frontend Setup

### Local Development

1. **Clone the frontend repository:**
   ```bash
   git clone https://github.com/Rubelefsky/RubelefksyAzureCloudResume.git
   cd RubelefksyAzureCloudResume
   ```

2. **Update API URL in script.js:**
   ```javascript
   const API_URL = 'https://your-function-app.azurewebsites.net/api/GetVisitorCount';
   ```

3. **Open index.html in a browser** or use a local server:
   ```bash
   python -m http.server 8000
   ```

### Deployment

Upload files to Azure Storage `$web` container via Azure Portal or Azure CLI:

```bash
az storage blob upload-batch \
  --account-name YOUR_STORAGE_ACCOUNT \
  --destination '$web' \
  --source .
```

---

## Azure Resources

| Resource | Purpose | Configuration |
|----------|---------|---------------|
| Storage Account | Static website hosting | Standard LRS |
| CosmosDB | Visitor count database | Table API, Serverless |
| Function App | API backend | Python 3.12, Consumption plan |
| CDN | HTTPS + caching | Microsoft CDN |

---

## API Reference

### Get/Increment Visitor Count

**Endpoint:** `GET /api/GetVisitorCount`

**Response:**
```json
{
  "count": 42
}
```

Each request increments the counter and returns the new value.

---

## Lessons Learned

1. **Region Quotas** - Some Azure regions have quota limits for serverless resources. If deployment fails, try a different region.

2. **Environment Variables** - Use Application Settings (not Connection Strings tab) for function app configuration.

3. **CORS Configuration** - Must include all origins that will access the API (custom domain, storage URL, etc.)

4. **Secrets Management** - Never commit `local.settings.json`. Use `.gitignore` and store secrets in Azure Application Settings.

5. **CDN Caching** - Changes may take up to 45 minutes to propagate. Test with direct storage URL first.

---

## Resources

- [Cloud Resume Challenge - Azure](https://cloudresumechallenge.dev/docs/the-challenge/azure/)
- [Azure Functions Python Documentation](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-python)
- [Azure CosmosDB Table API](https://docs.microsoft.com/en-us/azure/cosmos-db/table/introduction)
- [Azure Storage Static Websites](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website)

---

## Author

**Brandon Rubell**

- Website: [rubelefsky.com](https://rubelefsky.com)
- LinkedIn: [brandonsrubell](https://www.linkedin.com/in/brandonsrubell/)
- GitHub: [Rubelefsky](https://github.com/Rubelefsky)

---

## License

This project is open source and available under the [MIT License](LICENSE).
