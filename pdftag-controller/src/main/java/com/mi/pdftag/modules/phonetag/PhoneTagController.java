package com.mi.pdftag.modules.phonetag;

import com.github.peacetrue.imports.ImportsResult;
import com.github.peacetrue.imports.ImportsService;
import com.github.peacetrue.imports.csv.CsvImportsSetting;
import com.mi.pdftag.VersionType;
import com.mi.pdftag.modules.tag.TagGeneratePdf;
import com.mi.pdftag.modules.tag.TagService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.SequenceInputStream;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

import static com.github.peacetrue.file.FileController.*;

/**
 * 标签控制器
 *
 * @author xiayx
 */
@Slf4j
@RestController
@RequestMapping(value = "/phone-tags")
public class PhoneTagController {

    @Autowired
    private PhoneTagService phoneTagService;

    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Mono<PhoneTagVO> addByForm(PhoneTagAdd params) {
        log.info("新增标签信息(请求方法+表单参数)[{}]", params);
        return phoneTagService.add(params);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<PhoneTagVO> addByJson(@RequestBody PhoneTagAdd params) {
        log.info("新增标签信息(请求方法+JSON参数)[{}]", params);
        return phoneTagService.add(params);
    }

    @GetMapping(params = "page")
    public Mono<Page<PhoneTagVO>> query(PhoneTagQuery params, Pageable pageable, String... projection) {
        log.info("分页查询标签信息(请求方法+参数变量)[{}]", params);
        return phoneTagService.query(params, pageable, projection);
    }

    @GetMapping
    public Flux<PhoneTagVO> query(PhoneTagQuery params, Sort sort, String... projection) {
        log.info("全量查询标签信息(请求方法+参数变量)[{}]", params);
        return phoneTagService.query(params, sort, projection);
    }

    @GetMapping("/{id}")
    public Mono<PhoneTagVO> getByUrlPathVariable(@PathVariable Long id, String... projection) {
        log.info("获取标签信息(请求方法+路径变量)详情[{}]", id);
        return phoneTagService.get(new PhoneTagGet(id), projection);
    }

    @RequestMapping("/get")
    public Mono<PhoneTagVO> getByPath(PhoneTagGet params, String... projection) {
        log.info("获取标签信息(请求路径+参数变量)详情[{}]", params);
        return phoneTagService.get(params, projection);
    }

    @PutMapping(value = {"", "/*"}, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Mono<Integer> modifyByForm(PhoneTagModify params) {
        log.info("修改标签信息(请求方法+表单参数)[{}]", params);
        return phoneTagService.modify(params);
    }

    @PutMapping(value = {"", "/*"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Integer> modifyByJson(@RequestBody PhoneTagModify params) {
        log.info("修改标签信息(请求方法+JSON参数)[{}]", params);
        return phoneTagService.modify(params);
    }

    @DeleteMapping("/{id}")
    public Mono<Integer> deleteByUrlPathVariable(@PathVariable Long id) {
        log.info("删除标签信息(请求方法+URL路径变量)[{}]", id);
        return phoneTagService.delete(new PhoneTagDelete(id));
    }

    @DeleteMapping(params = "id")
    public Mono<Integer> deleteByUrlParamVariable(PhoneTagDelete params) {
        log.info("删除标签信息(请求方法+URL参数变量)[{}]", params);
        return phoneTagService.delete(params);
    }

    @RequestMapping(path = "/delete")
    public Mono<Integer> deleteByPath(PhoneTagDelete params) {
        log.info("删除标签信息(请求路径+URL参数变量)[{}]", params);
        return phoneTagService.delete(params);
    }

    @Autowired
    private ImportsService importsService;

    @PostMapping(params = "fileCount=1")
    public Mono<ImportsResult> imports(@RequestPart("filePart") FilePart file) {
        log.info("导入CSV文件[{}]", file.filename());
        CsvImportsSetting importsSetting = new CsvImportsSetting();
        importsSetting.setHeader(new String[]{"标签种类", "商品名称", "认证型号", "包装内含", "执行标准", "CMIIT ID", "进网许可证", "产品名称", "颜色", "存储空间", "生产日期", "商标", "制造商", "制造商地址"});
        importsSetting.setCharset(StandardCharsets.UTF_8);
        importsSetting.setMaxRowCount(100);
        return file.content()
                .map(DataBuffer::asInputStream)
                .reduce(SequenceInputStream::new)
                .flatMap(inputStream -> Mono.fromCallable(() -> importsService.imports(inputStream, importsSetting)))
                ;
    }

    @Autowired
    private TagService tagService;

    //能通过参数 _type=generatePdf 覆盖创建和修改方法
    @RequestMapping(value = {"", "/*"}, method = {RequestMethod.POST, RequestMethod.PUT}, params = "_type=generatePdf")
    public Mono<String> generatePdf(@RequestParam String versionType, PhoneTagAdd params) {
        log.info("生成 PDF 文件[{}]", params);
        return tagService.generatePdf(new TagGeneratePdf(versionType, params));
    }

    @GetMapping(params = "_type=export")
    public Mono<Void> export(ServerHttpResponse response, String versionType, PhoneTagVO vo) {
        log.info("导出[{}]", vo);
        return tagService.generatePdf(new TagGeneratePdf(versionType, vo))
                .flatMap(pdfPath -> {
                    boolean isReproduction = VersionType.REPRODUCTION.getCode().equals(versionType);
                    String dispositionType = isReproduction ? DISPOSITION_TYPE_INLINE : DISPOSITION_TYPE_ATTACHMENT;
                    return writeLocalFile(response, dispositionType, pdfPath);
                });
    }

    @GetMapping(value = "/{id}/export")
    public Mono<Void> export(ServerHttpResponse response, @PathVariable Long id, String versionType) {
        return phoneTagService.get(new PhoneTagGet(id))
                .flatMap(vo -> this.export(response, Objects.toString(versionType, VersionType.REPRODUCTION.getCode()), vo));
    }

}
