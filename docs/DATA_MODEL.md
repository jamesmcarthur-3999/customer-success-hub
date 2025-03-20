# Data Model

This document outlines the data structure for the Customer Success Hub. The system uses a flexible, extensible data model to accommodate future additions and changes.

## Customer Object

```typescript
interface Customer {
  // Core Identifiers
  id: string;                    // Unique identifier
  name: string;                  // Company name
  createdAt: string;             // ISO Date string
  updatedAt: string;             // ISO Date string
  
  // Account Management
  currentOwner: string;          // Current CSM
  proposedNewOwner?: string;     // New CSM for transition
  
  // Account Details
  accountDetails: {
    healthStatus: 'Good' | 'Attention Needed' | 'At Risk';
    renewalDate: string;         // ISO Date string
    renewalQuarter: string;      // e.g. "2025-Q2"
    currentARR: number;          // Annual recurring revenue
    employees: number;           // Customer employee count
    mkCompanyEmployees: number;  // MadKudu employee count
    productsUsed: string[];      // Array of product names
    primaryUseCase: string;      // Main use case description
    inCoreWorkflow: boolean;     // In core workflow flag
    customerNotified: boolean;   // Notified of transition
    
    // Additional fields can be added here
    [key: string]: any;          // Extensible properties
  };
  
  // Key People
  keyStakeholders: {
    name: string;                // Full name
    title: string;               // Job title
    role: string;                // Role in relationship (e.g. "Executive Sponsor")
    email?: string;              // Contact email
    phone?: string;              // Contact phone
    notes?: string;              // Additional notes
    lastContact?: string;        // ISO Date string
  }[];
  
  // Content Sections
  executiveSummary: string;      // Overview text
  
  valueRealization: string[];    // Array of key benefits
  
  activeProjects: {
    name: string;                // Project name
    description: string;         // Project description
    status: 'Not Started' | 'In Progress' | 'Complete' | 'On Hold';
    startDate?: string;          // ISO Date string
    targetDate?: string;         // ISO Date string
    notes?: string;              // Additional notes
  }[];
  
  risks: {
    description: string;         // Risk description
    impact: 'High' | 'Medium' | 'Low';
    mitigation: string;          // Mitigation plan
    status: 'Active' | 'Mitigated' | 'Accepted';
  }[];
  
  actionItems: {
    description: string;         // Action description
    owner: 'MadKudu' | 'Customer' | 'Joint';
    deadline?: string;           // ISO Date string
    status: 'Not Started' | 'In Progress' | 'Complete';
    notes?: string;              // Additional notes
  }[];
  
  // Notes and Source Data
  additionalNotes: string;       // Free-form notes
  
  // Communication Records
  communications: {
    type: 'Call' | 'Email' | 'Meeting' | 'Slack' | 'Other';
    date: string;                // ISO Date string
    summary: string;             // Brief summary
    participants: string[];      // People involved
    fullContent?: string;        // Complete transcript/content
    source?: string;             // Source system (e.g. "Gong")
    aiSummary?: string;          // AI-generated summary
    tags?: string[];             // Categorization tags
  }[];
  
  // Tracking and Metadata
  metadata: {
    lastSummaryGeneration?: string;  // ISO Date string
    dataSources: string[];           // Sources of customer data
    customSections?: {               // Additional custom sections
      title: string;
      content: string | any[];        // Section content
      type: 'text' | 'list' | 'custom'; // Format type
    }[];
    tags?: string[];                 // Organizational tags
    dataQuality?: number;            // 1-10 score of data completeness
    version: number;                 // Data schema version
  };
}
```

## Database Structure

The application will use a combination of:

1. **Structured JSON Files**: For individual customer data
2. **SQLite Database**: For efficient querying and indexing
3. **File Storage**: For large documents, transcripts, and exports

### File Organization

```
/data
  /customers
    /[customer-id]
      customer.json      # Core customer data
      communications/    # Communication records
        call-yyyy-mm-dd.json
        meeting-yyyy-mm-dd.json
      documents/         # Related documents
        [filename].pdf
      exports/           # Generated exports
        summary-yyyy-mm-dd.pdf
  /system
    customer-index.json  # Quick lookup index
    settings.json        # Application settings
    user-preferences.json # User preferences
  /backup                # Automated backups
```

## Data Relationships

- Each customer has a unique ID (derived from name or randomly generated)
- Communications are linked to customers via customer ID
- Documents are linked to customers via customer ID
- Users can be assigned to customers as owners

## Extension Points

The data model is designed for extensibility:

1. **Custom Fields**: The `accountDetails` object can accept additional properties
2. **Custom Sections**: The `metadata.customSections` array allows for new data sections
3. **Tags System**: Both customers and communications can have tags for flexible categorization
4. **Version Tracking**: The schema version enables future data migrations

## Search Indexing

The following fields will be indexed for search functionality:

- Customer name
- Stakeholder names and emails
- Executive summary
- Project names and descriptions
- Risk descriptions
- Action items
- Communication summaries
- Tags

## Data Import/Export

### Import Sources
- CSV files
- JSON data
- API responses (future)

### Export Formats
- PDF summaries
- CSV data exports
- JSON data dumps

## Future Considerations

- Multi-user permission system
- Real-time collaboration
- Change history tracking
- Data quality scoring and enhancement
