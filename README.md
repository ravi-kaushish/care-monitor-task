# Care Monitor Task

Welcome to the Care Monitor Task! This is a Node.js application designed with simplicity and ease of setup in mind. Let's delve into the details.

## Getting Started

To install the project dependencies, run the following command:

```bash
npm i
```

## Running the Application

The application server can be started in two modes:

### Development Mode

For development purposes, use the following command:

```bash
npm run dev
```

### Production Mode

For deploying the application in a production environment, use:

```bash
npm run start
```

## Application Structure

The application is structured as follows:

- `server.js`: This is the main file.
- `routes`: This directory contains the application API routes.
- `middleware`: This directory contains middlewares for endpoint protection, request validations, etc.
- `controllers`: This directory handles the request-response cycle and contains the high-level business logic and data flow of the application.
- `utils`: This directory contains raw functions, reusable, independent modules to use across the application server, routes, middlewares, and controller.
- `Dockerfile`: This file is used to containerize the Node.js application.

## Configuration Options

The application can be configured using the following options:

- `PORT=8000`: The port on which your application server will run.
- `API_VERSION=v1`: The API version used in the path params to distinguish between different versions.
- `REQUEST_MAX_BODY_SIZE_MB=10`: The maximum request body size enabled for the server.
- `DATABASE_URL=YOUR_POSTGRES_DATABASE_URL`: The Postgres database URL in the `postgres://username:password@host:port/database` format.
- `DATABASE_LOGGING=false`: Whether to enable database operation logging.
- `DATABASE_CONNECTION_REFRESH_TIME=1`: The time to flush the pooled connection and reconnect to the database.
- `ENABLE_SCHEMA_MIGRATION=true`: Scaffold required database entities and execute any init scripts needed for the sample APIs to work.

## API Endpoints Definitions

```
http://localhost:8001/api/v1/server/health GET 
http://localhost:8001/api/v1/server/map GET
http://localhost:8001/api/v1/clinical-data/composite/ingest POST
http://localhost:8001/api/v1/clinical-data/composite/process POST
```

## Database Schema

```sql
CREATE TABLE public.organisations (
	org_id varchar(40) NOT NULL,
	"name" varchar(50) NOT NULL,
	is_active bool DEFAULT true NOT NULL,
	registered_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT organisations_pkey PRIMARY KEY (org_id)
);

CREATE TABLE public.patients (
	patient_id varchar(40) NULL,
	org_id varchar(40) NULL,
	"name" varchar(100) NULL,
	gender bpchar(1) NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT patients_patient_id_key UNIQUE (patient_id),
	CONSTRAINT patients_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organisations(org_id)
);

CREATE TABLE public.measurements (
	id serial4 NOT NULL,
	"name" varchar(50) NULL,
	uom varchar(10) NULL,
	"key" varchar(100) NULL,
	keywords varchar(255) NULL,
	CONSTRAINT measurements_name_key UNIQUE (name),
	CONSTRAINT measurements_pkey PRIMARY KEY (id)
);

CREATE TABLE public.metrics (
	id serial4 NOT NULL,
	patient_id varchar(40) NULL,
	measurement_id int4 NULL,
	value varchar(20) NULL,
	"timestamp" timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT metrics_pkey PRIMARY KEY (id),
	CONSTRAINT metrics_measurement_id_fkey FOREIGN KEY (measurement_id) REFERENCES public.measurements(id),
	CONSTRAINT metrics_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id)
);
```