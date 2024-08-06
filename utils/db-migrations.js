const { ExecuteQuery } = require('./sequelize')

exports.RunSchemaMigrations = async () => {
  console.log('**** Running DB Migrations ****')
  scripts = [
    {
      table_name: 'patients',
      ddl: `CREATE TABLE organisations (
	    org_id varchar(40) primary key,
	    name varchar(50) not null,
	    is_active boolean not null default true,
	    registered_at TIMESTAMPTZ not null default NOW()
    )`,
      binds: {}
    },
    {
      table_name: 'patients',
      ddl: `CREATE TABLE patients (
      patient_id varchar(40) primary key,
      org_id varchar(40) references organisations(org_id),
      name VARCHAR(100),
      gender CHAR(1),
      created_at TIMESTAMPTZ not null default NOW()
    );`,
      binds: {}
    }
  ]

  for (const script of scripts) {
    let exists = await ExecuteQuery(`Select * FROM ${script.table_name}`)
    if (exists.error) {
      let re = await ExecuteQuery(script.ddl, script.binds)
      if (!re.error) {
        console.log(`Created Table ${script.table_name}`)
      } else {
        console.log(`Error occured while executing DLL for Table ${script.table_name}`)
      }
    }else{
      console.log(`Table ${script.table_name} already exists, skipping migration.`)
    }
  }
}
