var ds = lf.schema.create('olympia', 1);
ds.createTable('Medal').
  addColumn('city', lf.Type.STRING).
  addColumn('color', lf.Type.STRING).
  addColumn('country', lf.Type.STRING).
  addColumn('discipline', lf.Type.STRING).
  addColumn('eventGender', lf.Type.STRING).
  addColumn('event', lf.Type.STRING).
  addColumn('firstName', lf.Type.STRING).
  addColumn('gender', lf.Type.STRING).
  addColumn('lastName', lf.Type.STRING).
  addColumn('sport', lf.Type.STRING).
  addColumn('year', lf.Type.NUMBER).
  addIndex('idx_year', ['year']).
  addIndex('idx_lastName', ['lastName']);


