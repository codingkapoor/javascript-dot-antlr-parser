const antlr4 = require('antlr4/index');

const DOTLexer = require('./parser/generated/DOTLexer').DOTLexer;
const DOTParser = require('./parser/generated/DOTParser').DOTParser;
const DOTListener = require('./parser/generated/DOTListener').DOTListener;

const DOTSyntacticErrorListener = require('./parser/DOTSyntacticErrorListener').DOTSyntacticErrorListener;
const DOTSemanticErrorListener = require('./parser/DOTSemanticErrorListener').DOTSemanticErrorListener;

function doValidation(text) {
    var is = new antlr4.InputStream(text);
    var lexer = new DOTLexer(is);
    var tokens  = new antlr4.CommonTokenStream(lexer);
    var parser = new DOTParser(tokens);
       
    parser.buildParseTrees = true;

    var syntacticErrorListener = new DOTSyntacticErrorListener();
    var semanticErrorListener = new DOTSemanticErrorListener();

    lexer.removeErrorListeners();
    lexer.addErrorListener(syntacticErrorListener);

    parser.removeErrorListeners();
    parser.addErrorListener(semanticErrorListener);

    var tree = parser.graph();   

    antlr4.tree.ParseTreeWalker.DEFAULT.walk(new DOTListener(), tree);

    return {
        "syntacticErrors": syntacticErrorListener.diagnostics,
        "semanticErrors": semanticErrorListener.diagnostics
    };
}

exports.doValidation = doValidation;

