import Ajv from "ajv"

const tractstack_schema = {
  "$id": "https://schema.tractstack.com/tractstack.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Tract Stack data schema",
  "description": "Tract Stack by At Risk Media",
  "required": ["tractstack_id","title","title_tag"],
  "type": "object",
  "properties": {
    "tractstack_id": {"type": "integer"},
    "title": {"type": "string"},
    "title_tag": {"type": "string"},
    "storysteps": {
      "type": "array",
      "items": {
        "type": "number",
        "minimum": "1"
      }
    }
  },
  "additionalProperties": false
}

const storystep_schema = {
  "$id": "https://schema.tractstack.com/storystep.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Story Step data schema",
  "description": "Tract Stack by At Risk Media",
  "required": ["storystep_id","tractstack_id","title","title_tag"],
  "type": "object",
  "properties": {
    "storystep_id": {"type": "integer"},
    "tractstack_id": {"type": "integer"},
    "title": {"type": "string"},
    "title_tag": {"type": "string"}
  },
  "additionalProperties": false
}

const storystep_sample_data = {
  storystep_id: 1,
  tractstack_id: 1,
  title: "At Risk Media dot com menu",
  title_tag: "menu"
}

const tractstack_sample_data = {
  tractstack_id: 1,
  title: "At Risk Media dot com hero",
  title_tag: "AtRiskMedia",
}

export function CookUpTractStack( data ) {
  console.log( "Loaded gatsby-source-tractstack" );
  console.log( typeof data, data )
  const Ajv = require("ajv")
  const tractstack_ajv = new Ajv()
  const validate = ajv.compile(tractstack_schema)
  const valid = validate(tractstack_sample_data)
  if (!valid) console.log(validate.errors)
  else console.log("validated json schema")
  return "";
}
