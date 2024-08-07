const { ExecuteQuery } = require('./sequelize')

exports.RunSchemaMigrations = async () => {
  console.log('**** Running DB Migrations ****')
  scripts = [
    {
      table_name: 'organisations',
      ddl: `CREATE TABLE organisations (
        org_id varchar(40) primary key,
        name varchar(50) not null,
        is_active boolean not null default true,
        registered_at TIMESTAMPTZ not null default NOW()
      );`,
      binds: {}
    },
    {
      table_name: 'patients',
      ddl: `CREATE TABLE patients (
        patient_id varchar(40) unique,
        org_id varchar(40) references organisations(org_id),
        name VARCHAR(100),
        gender CHAR(1),
        created_at TIMESTAMPTZ not null default NOW()
      );`,
      binds: {}
    },
    {
      table_name: 'measurements',
      ddl: `CREATE TABLE measurements (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE,
        uom VARCHAR(10),
        key varchar(100),
        keywords varchar(255)
      );`,
      binds: {}
    },
    {
      table_name: 'metrics',
      ddl: `CREATE TABLE metrics (
        id SERIAL primary key,
        patient_id varchar(40) references patients(patient_id),
        measurement_id int references measurements(id),
        value varchar(20),
        timestamp timestamptz not null default NOW()
      );`,
      binds: {}
    },
    {
      table_name: 'organisations',
      dml: `INSERT INTO organisations
              (org_id, name, is_active, registered_at)
            VALUES
              ($org_id, $name, $is_active, $registered_at)
            ON CONFLICT
              (org_id)
            DO NOTHING;`,
      binds: {
        org_id: '8gj4djk6s-a5ad-444b-b58c-358dcbd72dc3',
        name: 'Sample Org',
        is_active: true,
        registered_at: 'Now()'
      }
    },
    {
      table_name: 'patients',
      dml: `INSERT INTO patients
              (patient_id, org_id, name, created_at)
            VALUES
              ($patient_id, $org_id, $name, $created_at)
            ON CONFLICT
              (patient_id)
            DO NOTHING;`,
      binds: {
        patient_id: 'gk6dhgh-9a60-4980-bb8b-787bf82689d7',
        org_id: '8gj4djk6s-a5ad-444b-b58c-358dcbd72dc3',
        name: 'Test Pateint',
        created_at: 'Now()'
      }
    },
    {
      table_name: 'measurements',
      dml: `INSERT INTO measurements
              (name, uom, key, keywords)
            VALUES
              ($name, $uom, $key, $keywords)
            ON CONFLICT
              (name)
            DO NOTHING;`,
      binds: {
        name: 'Heart Rate',
        uom: 'beats/min',
        key: 'HEART_RATE',
        keywords: 'HEART_RATE, Heart, Heart Rate'
      }
    },
    {
      table_name: 'measurements',
      dml: `INSERT INTO measurements
              (name, uom, key, keywords)
            VALUES
              ($name, $uom, $key, $keywords)
            ON CONFLICT
              (name)
            DO NOTHING;`,
      binds: {
        name: 'Weight',
        uom: 'Kg',
        key: 'WEIGHT',
        keywords: 'Weight, WEIGHT'
      }
    },
    {
      table_name: 'measurements',
      dml: `INSERT INTO measurements
              (name, uom, key, keywords)
            VALUES
              ($name, $uom, $key, $keywords)
            ON CONFLICT
              (name)
            DO NOTHING;`,
      binds: {
        name: 'Height',
        uom: 'cm',
        key: 'HEIGHT',
        keywords: 'Height'
      }
    },
    {
      table_name: 'measurements',
      dml: `INSERT INTO measurements
              (name, uom, key, keywords)
            VALUES
              ($name, $uom, $key, $keywords)
            ON CONFLICT
              (name)
            DO NOTHING;`,
      binds: {
        name: 'Blood Glucose',
        uom: 'mmol/L',
        key: 'BLOOD_GLUCOSE_LEVELS',
        keywords: 'BLOOD_GLUCOSE_LEVELS, Blood, Glucose'
      }
    },
    {
      table_name: 'measurements',
      dml: `INSERT INTO measurements
              (name, uom, key, keywords)
            VALUES
              ($name, $uom, $key, $keywords)
            ON CONFLICT
              (name)
            DO NOTHING;`,
      binds: {
        name: 'Blood Pressure',
        uom: 'mmHg',
        key: 'BP',
        keywords: 'Blood Pressure, BP, BLOOD, Pressure'
      }
    },
    {
      table_name: 'measurements',
      dml: `INSERT INTO measurements
              (name, uom, key, keywords)
            VALUES
              ($name, $uom, $key, $keywords)
            ON CONFLICT
              (name)
            DO NOTHING;`,
      binds: {
        name: 'Steps',
        uom: '',
        key: 'STEPS',
        keywords: 'Steps, STEPS, COUNT, FOOTSTEPS'
      }
    },
  ]

  for (const script of scripts) {
    if (script.ddl) {
      let exists = await ExecuteQuery(`Select * FROM ${script.table_name}`)
      if (exists.error) {
        let re = await ExecuteQuery(script.ddl, script.binds)
        if (!re.error) {
          console.log(`Table ${script.table_name} created successfully.`)
        } else {
          console.log(`Error occured while creating Table ${script.table_name}, ${re.error}`)
        }
      } else {
        console.log(`Table ${script.table_name} already exists.`)
      }
    }else if(script.dml){
      let re = await ExecuteQuery(script.dml, script.binds)
      if (!re.error) {
        console.log(`Script executed successfully.`)
      } else {
        console.log(`Error occured while executing DML ${script.table_name}, ${re.error}`)
      }
    }
  }
}

exports.GetMeasurements = async () => {
  return await ExecuteQuery(`SELECT * FROM measurements;`)
}