# API Documentation

This document describes the API endpoints available when the application is connected to Supabase. Supabase auto-generates RESTful APIs from the database schema using PostgREST.

---

## Base URL

```
https://your-project-ref.supabase.co/rest/v1/
```

## Authentication

All API requests require authentication via an API key:

```bash
# Using the anon key (client-side)
curl 'https://your-project-ref.supabase.co/rest/v1/staff_profiles' \
  -H 'apikey: YOUR_ANON_KEY' \
  -H 'Authorization: Bearer YOUR_ANON_KEY'

# Using the service role key (server-side, admin access)
curl 'https://your-project-ref.supabase.co/rest/v1/staff_profiles' \
  -H 'apikey: YOUR_SERVICE_ROLE_KEY' \
  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY'
```

---

## Staff Profiles

### List All Staff

```http
GET /rest/v1/staff_profiles
```

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `select` | string | Columns to return (default: `*`) |
| `order` | string | Sort order (e.g., `last_name.asc`) |
| `limit` | integer | Maximum rows to return |
| `offset` | integer | Rows to skip (for pagination) |
| `status` | string | Filter by status (`eq.active`, `eq.on_leave`, etc.) |
| `department_id` | string | Filter by department |
| `or` | string | OR conditions |

**Example — Get all active staff sorted by name:**

```bash
curl 'https://ref.supabase.co/rest/v1/staff_profiles?status=eq.active&order=last_name.asc' \
  -H 'apikey: YOUR_KEY' \
  -H 'Authorization: Bearer YOUR_KEY'
```

**Example — Get staff with department name (join):**

```bash
curl 'https://ref.supabase.co/rest/v1/staff_profiles?select=*,departments(name)' \
  -H 'apikey: YOUR_KEY' \
  -H 'Authorization: Bearer YOUR_KEY'
```

**Example — Search by name:**

```bash
curl 'https://ref.supabase.co/rest/v1/staff_profiles?or=(first_name.ilike.*amara*,last_name.ilike.*amara*)' \
  -H 'apikey: YOUR_KEY' \
  -H 'Authorization: Bearer YOUR_KEY'
```

**Response:**

```json
[
  {
    "id": "uuid-here",
    "employee_id": "EMP-001",
    "first_name": "Amara",
    "last_name": "Diallo",
    "email": "amara.diallo@ngo.org",
    "phone": "+221 77 123 4567",
    "role": "admin",
    "status": "active",
    "department_id": "dept-uuid",
    "position": "Country Director",
    "location": "Dakar",
    "country": "Senegal",
    "hire_date": "2019-03-15",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### Get Staff by ID

```http
GET /rest/v1/staff_profiles?id=eq.{staff_id}&select=*,departments(name),certifications(*)
```

### Create Staff

```http
POST /rest/v1/staff_profiles
Content-Type: application/json

{
  "employee_id": "EMP-019",
  "first_name": "New",
  "last_name": "Staff",
  "email": "new.staff@ngo.org",
  "phone": "+1 555 000 0000",
  "role": "staff",
  "status": "active",
  "department_id": "dept-uuid",
  "position": "Program Officer",
  "location": "New York",
  "country": "USA",
  "hire_date": "2024-03-01"
}
```

### Update Staff

```http
PATCH /rest/v1/staff_profiles?id=eq.{staff_id}
Content-Type: application/json

{
  "status": "on_leave",
  "position": "Senior Program Officer"
}
```

### Delete Staff

```http
DELETE /rest/v1/staff_profiles?id=eq.{staff_id}
```

---

## Training Programs

### List All Programs

```http
GET /rest/v1/training_programs
```

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `status` | string | Filter by status (`eq.active`, `eq.completed`, `eq.draft`) |
| `category` | string | Filter by category |
| `is_mandatory` | boolean | Filter mandatory programs |
| `order` | string | Sort order |

**Example — Get active mandatory programs:**

```bash
curl 'https://ref.supabase.co/rest/v1/training_programs?status=eq.active&is_mandatory=eq.true' \
  -H 'apikey: YOUR_KEY' \
  -H 'Authorization: Bearer YOUR_KEY'
```

### Create Program

```http
POST /rest/v1/training_programs
Content-Type: application/json

{
  "title": "New Training Program",
  "description": "Description of the training",
  "category": "Technical",
  "status": "draft",
  "duration_hours": 16,
  "max_participants": 25,
  "instructor": "Instructor Name",
  "location": "Online",
  "is_mandatory": false,
  "start_date": "2024-05-01",
  "end_date": "2024-05-05"
}
```

---

## Training Enrollments

### List Enrollments

```http
GET /rest/v1/training_enrollments
```

**Example — Get enrollments for a specific staff member:**

```bash
curl 'https://ref.supabase.co/rest/v1/training_enrollments?staff_id=eq.{staff_id}&select=*,training_programs(title,category)' \
  -H 'apikey: YOUR_KEY' \
  -H 'Authorization: Bearer YOUR_KEY'
```

**Example — Get enrollments for a specific program:**

```bash
curl 'https://ref.supabase.co/rest/v1/training_enrollments?program_id=eq.{program_id}&select=*,staff_profiles(first_name,last_name,position)' \
  -H 'apikey: YOUR_KEY' \
  -H 'Authorization: Bearer YOUR_KEY'
```

### Enroll Staff

```http
POST /rest/v1/training_enrollments
Content-Type: application/json

{
  "staff_id": "staff-uuid",
  "program_id": "program-uuid",
  "status": "enrolled"
}
```

### Update Enrollment Status

```http
PATCH /rest/v1/training_enrollments?id=eq.{enrollment_id}
Content-Type: application/json

{
  "status": "completed",
  "completed_at": "2024-03-15T00:00:00Z",
  "score": 92.5
}
```

---

## Certifications

### List Certifications

```http
GET /rest/v1/certifications
```

**Example — Get expiring certifications:**

```bash
curl 'https://ref.supabase.co/rest/v1/certifications?is_active=eq.true&expiry_date=lte.2024-06-30&select=*,staff_profiles(first_name,last_name,email)' \
  -H 'apikey: YOUR_KEY' \
  -H 'Authorization: Bearer YOUR_KEY'
```

### Add Certification

```http
POST /rest/v1/certifications
Content-Type: application/json

{
  "staff_id": "staff-uuid",
  "name": "PMP Certification",
  "issuing_body": "PMI",
  "issued_date": "2024-01-15",
  "expiry_date": "2027-01-15",
  "is_active": true
}
```

---

## Departments

### List Departments

```http
GET /rest/v1/departments?select=*,staff_profiles(count)&order=name.asc
```

---

## Real-Time Subscriptions

Subscribe to live database changes using the Supabase client:

```typescript
import { supabase } from '@/lib/supabase'

// Subscribe to all changes on staff_profiles
const channel = supabase
  .channel('staff-changes')
  .on('postgres_changes',
    {
      event: '*',        // INSERT, UPDATE, DELETE, or '*'
      schema: 'public',
      table: 'staff_profiles'
    },
    (payload) => {
      console.log('Staff change:', payload.eventType, payload.new)
    }
  )
  .subscribe()

// Subscribe to enrollment changes
const enrollChannel = supabase
  .channel('enrollment-changes')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'training_enrollments' },
    (payload) => {
      console.log('Enrollment change:', payload)
    }
  )
  .subscribe()

// Unsubscribe when done
supabase.removeChannel(channel)
```

---

## Row Level Security

All tables have RLS enabled. Access is controlled by policies:

| Table | Policy | Access |
|---|---|---|
| `departments` | Authenticated read | All authenticated users |
| `staff_profiles` | Authenticated read | All authenticated users |
| `training_programs` | Authenticated read | All authenticated users |
| `training_enrollments` | Authenticated read | All authenticated users |
| `certifications` | Self read | Staff can view own certifications |
| `performance_reviews` | Self read | Staff can view own reviews |

To extend policies for admin/manager write access, add custom policies:

```sql
-- Allow admins to modify staff records
CREATE POLICY "Admins can modify staff"
  ON staff_profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
```

---

## Error Handling

Supabase returns standard HTTP status codes:

| Code | Meaning |
|---|---|
| `200` | Success |
| `201` | Created |
| `400` | Bad request (invalid parameters) |
| `401` | Unauthorized (missing or invalid API key) |
| `403` | Forbidden (RLS policy denied) |
| `404` | Not found |
| `409` | Conflict (duplicate key) |
| `500` | Server error |

**Error Response Format:**

```json
{
  "message": "Row level security policy violation",
  "code": "42501",
  "details": null,
  "hint": null
}
```

---

## Pagination

Use `limit` and `offset` for pagination:

```bash
# First page (20 items)
GET /rest/v1/staff_profiles?limit=20&offset=0

# Second page
GET /rest/v1/staff_profiles?limit=20&offset=20

# Third page
GET /rest/v1/staff_profiles?limit=20&offset=40
```

**Headers for total count:**

```bash
GET /rest/v1/staff_profiles?limit=20&offset=0
Prefer: count=exact
```

Response header: `Content-Range: 0-19/18` (showing total count)