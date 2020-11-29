package com.github.peacetrue.dita;

import org.junit.jupiter.api.Test;
import reactor.core.scheduler.Schedulers;

import java.util.concurrent.Executors;

/**
 * @author : xiayx
 * @since : 2020-11-29 04:09
 **/
class DitaUtilsTest {

    @Test
    void resolvePdfFilePath() {

    }

    @Test
    void executePdf() {
        // /Users/xiayx/Documents/Projects/pdftag/docs/antora/modules/ROOT/attachment/dita-ot-2.3/bin/dita
        // -input Mi_giftBox_label_Cn/template-c03f985d7c3e40979fdd6799ea5ffc62.dita -format pdf
        // -output /Users/xiayx/Documents/Projects/pdftag/02-output/output
        // -Dargs.input.dir=/Users/xiayx/Documents/Projects/pdftag/02-output/2020/11/28/Mi_giftBox_label_Cn
        // -Dcustomization.dir=/Users/xiayx/Documents/Projects/learn-dita-ot/src/test/resources/watermark

        DitaUtils.executePdf("/Users/xiayx/Documents/Projects/pdftag/docs/antora/modules/ROOT/attachment/dita-ot-2.3",
                "Mi_giftBox_label_Cn/template-3a0b6976a1484e9da4d9c82c3cebb95a.dita",
                "/Users/xiayx/Documents/Projects/pdftag/02-output/output",
                "-Dargs.input.dir=/Users/xiayx/Documents/Projects/pdftag/02-output/2020/11/28/Mi_giftBox_label_Cn",
                "-Dcustomization.dir=/Users/xiayx/Documents/Projects/learn-dita-ot/src/test/resources/watermark"
        )
                .publishOn(Schedulers.fromExecutorService(Executors.newFixedThreadPool(10)))
                .subscribe(value -> System.out.println("-----------" + value));

    }

    @Test
    void execute() {
    }
}
