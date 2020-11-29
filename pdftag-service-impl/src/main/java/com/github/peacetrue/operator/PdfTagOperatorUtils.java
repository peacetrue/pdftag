package com.github.peacetrue.operator;

import com.github.peacetrue.core.OperatorCapable;
import com.github.peacetrue.core.OperatorCapableImpl;

/**
 * @author : xiayx
 * @since : 2020-11-29 04:57
 **/
public abstract class PdfTagOperatorUtils {

    protected PdfTagOperatorUtils() {
    }

    public static <S extends OperatorCapable<Id>, T extends OperatorCapableImpl<Id>, Id> T setOperator(S source, T target) {
        target.setOperatorId(source.getOperatorId());
        target.setOperatorName(source.getOperatorName());
        return target;
    }

}
