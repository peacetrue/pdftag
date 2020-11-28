package com.github.peacetrue.spring;

import org.springframework.context.expression.MapAccessor;
import org.springframework.expression.Expression;
import org.springframework.expression.ParserContext;
import org.springframework.expression.common.TemplateParserContext;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;

import java.util.Map;

/**
 * @author : xiayx
 * @since : 2020-11-27 23:06
 **/
public abstract class SpringExpressionUtils {

    protected SpringExpressionUtils() {
    }

    private static final SpelExpressionParser PARSER = new SpelExpressionParser();
    private static final ParserContext PARSER_CONTEXT = new TemplateParserContext();

    public static String parse(String expressionString, Map<String, Object> params) {
        Expression expression = PARSER.parseExpression(expressionString, PARSER_CONTEXT);
        StandardEvaluationContext context = new StandardEvaluationContext();
        context.addPropertyAccessor(new MapAccessor());
        context.setRootObject(params);
        return expression.getValue(context, String.class);
    }
}
