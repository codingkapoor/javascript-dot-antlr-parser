# js-dot-antlr-parser
The objective of this project is to demostrate how to capture diagnostics i.e., semantic and syntactic errors for DOT language using ANTLR parser written in Javascript.

# Installation
```script
npm install --save js-dot-antlr-parser
```

# Usage
```javascript
const jdap = require('js-dot-antlr-parser');
console.log(JSON.stringify(jdap.doValidation("gaph { \n a -- b \n a - b \n b - a [color=blue] \n }")));
console.log(JSON.stringify(jdap.doValidation("gaph { \n a -- b \n a - b \n b - a [color=blue] \n }").semanticErrors));
console.log(JSON.stringify(jdap.doValidation("gaph { \n a -- b \n a - b \n b - a [color=blue] \n }").syntacticErrors));
```

# Output
```
{
	"syntacticErrors": [{
		"message": "token recognition error at: '- '",
		"line": 2,
		"character": 3,
		"symbol": "",
		"length": 1
	}, {
		"message": "token recognition error at: '- '",
		"line": 3,
		"character": 3,
		"symbol": "",
		"length": 1
	}],
	"semanticErrors": [{
		"message": "mismatched input 'gaph' expecting {STRICT, GRAPH, DIGRAPH}",
		"line": 0,
		"character": 0,
		"symbol": "gaph",
		"length": 4
	}]
}
```
