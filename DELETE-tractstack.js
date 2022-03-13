"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookUpTractStack = CookUpTractStack;

var _ajv = _interopRequireDefault(require("ajv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var tractstack_schema = {
  "$id": "https://schema.tractstack.com/tractstack.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Tract Stack data schema",
  "description": "Tract Stack by At Risk Media",
  "required": ["tractstack_id", "title", "title_tag"],
  "type": "object",
  "properties": {
    "tractstack_id": {
      "type": "integer"
    },
    "title": {
      "type": "string"
    },
    "title_tag": {
      "type": "string"
    },
    "storysteps": {
      "type": "array",
      "items": {
        "type": "number",
        "minimum": "1"
      }
    }
  },
  "additionalProperties": false
};
var storystep_schema = {
  "$id": "https://schema.tractstack.com/storystep.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Story Step data schema",
  "description": "Tract Stack by At Risk Media",
  "required": ["storystep_id", "tractstack_id", "title", "title_tag"],
  "type": "object",
  "properties": {
    "storystep_id": {
      "type": "integer"
    },
    "tractstack_id": {
      "type": "integer"
    },
    "title": {
      "type": "string"
    },
    "title_tag": {
      "type": "string"
    }
  },
  "additionalProperties": false
};
var storystep_sample_data = {
  storystep_id: 1,
  tractstack_id: 1,
  title: "At Risk Media dot com menu",
  title_tag: "menu"
};
var tractstack_sample_data = {
  tractstack_id: 1,
  title: "At Risk Media dot com hero",
  title_tag: "AtRiskMedia"
};

function CookUpTractStack(data) {
  console.log("Loaded gatsby-source-tractstack");
  console.log(_typeof(data), data);

  var Ajv = require("ajv");

  var tractstack_ajv = new Ajv();
  var validate = ajv.compile(tractstack_schema);
  var valid = validate(tractstack_sample_data);
  if (!valid) console.log(validate.errors);else console.log("validated json schema");
  return "";
}
//# sourceMappingURL=DELETE-tractstack.js.map